/* eslint-disable no-loop-func */
import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import endpoints from '../../endpoints';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';

const AssignRemoteWork = (props) => {

  const toastWarning = useRef(null);
  const toastSuccess = useRef(null);
  const toastError = useRef(null);
  const toastBC = useRef(null);

  const [users, setUsers] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  };  
  
  const today = new Date();
  const tomorrow = new Date();
  today.setDate(today.getDate() + 1);
  tomorrow.setDate(tomorrow.getDate() + 2);

  const [selectedDates, setSelectedDates] = useState([today, tomorrow]);

  const [selectedTime, setSelectedTime] = useState({hours: 0, minutes: 1});

  const diffTime = Math.abs(selectedDates[1] - selectedDates[0]);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

  // pobieranie przefiltrowanej listy pracowników tylko z danej firmy
  useEffect(() => {

    axios.get(endpoints.usersAndRegister, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    }).then(response => {

      const employees = response.data;
      
      let employeesFiltered = employees.filter(user => {
        return (Number(user.firma) === Number(props.companyId)) && (user.is_superuser === false);
      });

      let employeesMapped = employeesFiltered.map(user => (
        {
          label: `${user.first_name} ${user.last_name} | ${user.email}`,
          value: user.id,
        }
      ))
      setAllUsers(employeesMapped);

    }).catch(error => {
      console.log(error);
    })

  }, []);

  const sendRequest = () => {

    const begin = formatDate(selectedDates[0]);
    const end = formatDate(selectedDates[selectedDates.length-1]);

    if (users.length === 0) {
      showWarning();
      return null;
    }

    for(let i = 0; i < users.length; i++) {
      axios.put(`${endpoints.remoteWork}${users[i]}`, {
        idPracownika: users[i],
        dataRozpoczecia: begin,
        dataZakonczenia: end,
        minutyStart: (selectedTime.hours * 60) + selectedTime.minutes,
        minutyPozostalo: (selectedTime.hours * 60) + selectedTime.minutes,
        zlecajacy: '3',
      }).then(() => {
        showSuccess();
      }).catch(() => {
        showError();
      });
    };
  }

  const clearForm = () => {
    setUsers([]);
    setSelectedDates([today, tomorrow]);
    setSelectedTime({hours: 0, minutes: 1});
  }

  const clearToasts = () => {
    toastBC.current.clear();
  }

  const showWarning = () => {
    clearToasts();
    toastWarning.current.show({life: 5000, severity: 'warn', summary: 'Uwaga.', detail: 'Nie wybrano żadnego pracownika.'});
  }

  const showSuccess = () => {
    clearToasts();
    toastSuccess.current.clear();
    toastSuccess.current.show({life: 5000, severity: 'success', summary: 'Sukces.', detail: 'Pomyślnie przydzielono pracę.'});
  }

  const showError = () => {
    clearToasts();
    toastError.current.clear();
    toastError.current.show({life: 5000, severity: 'error', summary: 'Błąd.', detail: 'Coś poszło nie tak podczas wysyłania danych.'});
  }

  const showConfirm = () => {
    toastBC.current.show({ severity: 'info', sticky: true, content: (
        <div className="flex flex-column" style={{flex: '1'}}>
            <div className="text-center">
                <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                <h4>Wyznaczyć pracę wybranym pracownikom?</h4>
                <p>Potwierdź aby kontynuować.</p>
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent:'space-between', gap: '25px'}}>
                <div style={{flex: 1,}}>
                    <Button style={{width: '100%'}} type="button" label="Potwierdź" className="p-button-primary" onClick={sendRequest}/>
                </div>
                <div style={{flex: 1,}}>
                    <Button style={{width: '100%'}} type="button" label="Anuluj" className="p-button-danger" onClick={clearToasts}/>
                </div>
            </div>
        </div>
    ) });
  }



  return (
    <div className="screen-container">
      <Toast ref={toastWarning} position="bottom-center" />
      <Toast ref={toastSuccess} position="bottom-center" />
      <Toast ref={toastError} position="bottom-center" />
      <Toast ref={toastBC} position="bottom-center" />
      <h2 style={{marginBottom: '20px'}}><i className='pi pi-desktop' style={{fontSize: '20px', marginRight: '10px'}}></i>Ekran wyznaczania pracy zdalnej</h2>
      <hr style={{width: '100%', backgroundColor: 'rgb(233, 233, 233)', border: '1px solid rgb(233, 233, 233)', marginBottom: '20px'}}></hr>
      {/* Lista pracowników */}
      <div className='stats-header assign-header'>
        <label htmlFor="select" style={{paddingBottom: '10px'}}>Pracownicy</label>
        <MultiSelect 
          inputId='select'
          selectedItemsLabel={`Wybrano ${users.length} pracowników`} 
          maxSelectedLabels={1} filter={true} 
          placeholder="Pracownicy" 
          value={users} 
          options={allUsers} 
          onChange={(e) => setUsers(e.value)}   
        />
      </div>
      {/* Pola wyboru daty */}
      <div className='stats-header assign-header' style={{
        flexDirection: 'column',
        alignItems: 'center'
        }}>
        <div className='timeSelect'>
          <div style={{alignSelf: 'flex-start',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
            <label htmlFor="calendar">Okres pracy</label>
            <Calendar 
              inputId='calendar'
              dateFormat='yy-m-d'
              appendTo='self'
              selectionMode="range"
              minDate={today}
              value={selectedDates}
              onChange = {(e) => setSelectedDates(e.value)}
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
            <label htmlFor="verticalHours">Ilość godzin</label>
            <InputNumber
              inputId='verticalHours' 
              style={{width: '4rem'}}
              name='hours'
              showButtons buttonLayout="vertical"
              min={0}
              max={ diffDays * 8 }
              value={selectedTime.hours}
              onChange={(e) => setSelectedTime(prevTime => {
                if (e.value === diffDays * 8) {
                  return {
                    ...prevTime,
                    hours: e.value,
                    minutes: 0,
                  };
                } else if (e.value === 0) {
                  return {
                    ...prevTime,
                    hours: e.value,
                    minutes: 1,
                  }
                } else {
                  return {
                    ...prevTime,
                    hours: e.value,
                  };
                }
              })}
                />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
            <label htmlFor="verticalMinutes">Ilość Minut</label>
            <InputNumber 
              inputId='verticalMinutes'
              style={{width: '4rem'}}
              name='minutes'
              showButtons buttonLayout="vertical"
              min={selectedTime.hours === diffDays * 8 ? 0 : selectedTime.hours > 0 ? 0 : 1}
              disabled={selectedTime.hours === diffDays * 8 ? true : false}
              max={59}
              value={selectedTime.minutes}
              onChange={(e) => setSelectedTime(prevTime => (
                {
                  ...prevTime,
                  minutes: e.value
                }
              ))}
            />
          </div>
          <div className='buttons'>
            <Button 
              label='Zatwierdź'
              icon="pi pi-check"
              onClick={showConfirm}
              />
            <Button 
              className='p-button-danger'
              label='Wyczyść formularz'
              icon="pi pi-times"
              onClick={clearForm}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignRemoteWork