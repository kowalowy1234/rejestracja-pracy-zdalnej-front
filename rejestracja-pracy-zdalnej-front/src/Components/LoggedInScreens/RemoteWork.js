import { Calendar } from 'primereact/calendar';
import "primeicons/primeicons.css";
import React, { useState } from 'react';
import axios from 'axios';
import endpoints from '../../endpoints';
import { Knob } from 'primereact/knob';
import { Button } from 'primereact/button';


const DanePracownika = () => {

  const token = sessionStorage.getItem('token')
  const [dane, setImie] = useState({imie: null, nazwisko: null,})

    //pobranie danych o aktualnie zalogowanym użytkowniku
    React.useEffect(() => {
    axios.get(endpoints.currentUser, {
      headers: {
        'Authorization': `Token ${token}`}
    })
    .then(function (response){
      sessionStorage.setItem('idPracownika', response.data.id)
      setImie( () => ({
        imie: `${response.data.first_name}`, 
        nazwisko : `${response.data.last_name}`}))
    }).catch(function(error){
      console.log(error);
    });
  },[]);
  return (
    <>
    {dane.imie} {dane.nazwisko}
    </>
  )
}

const Praca = () => {
  //pobranie danych o pracy aktualnie zalogowanego użytkownika
  const [dane, setPraca] = useState(null);
  React.useEffect(() => {
    axios.get(endpoints.remoteWork)
    .then(function (response) {
      setPraca(response.data);
    }).catch(function(error){
      console.log(error);
    });
  },[]);
  const id = sessionStorage.getItem('idPracownika')
  console.log(dane)
  if (!dane) return null;
  //petla do sprawdzenia i wyciagniecia minut z id aktualnie zalogowanego uzytkownika
  //people.filter(person => person.age < 60).map(filteredPerson => (
  const listaRekordow = dane.filter(rekord => rekord.idPracownika === Number(id) && 
  Number(rekord.minutyPozostalo)>0).map(rekordFiltered => (
    rekordFiltered.minutyPozostalo
  ))


  //   if(rekord.idPracownika === Number(id) && Number(rekord.minutyPozostalo)>0){
  //     return rekord.minutyPozostalo}
  // })



  sessionStorage.setItem('minutyNaStarcie', listaRekordow)
  console.log(sessionStorage.getItem('minutyPoSave'))
  const sprawdzanie = listaRekordow - sessionStorage.getItem('minutyPoSave')
  console.log(sprawdzanie)
    return (
    <>
    <div className='remaining'>
      <p><b>Remaining:  {sprawdzanie}</b></p>
    </div>
    </>
  )
}


const Name = () => {

  return (
      <div className='name'>
          <i className="pi pi-user" style={{'fontSize': '2em'}}>&nbsp;<DanePracownika/></i>
      </div>
  )
}


// const Remaining = () => {

//   return (
//       <div className='remaining'>
//           <p><b>Remaining: <Praca/></b></p>
//       </div>
//   )
// }

const Calendarz = () => {


  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month - 1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;
  const [date, setDate] = useState(null);

  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  return (
      <div>
          <Calendar className='calendar' value={date} onChange={(e) => setDate(e.value)} inline showWeek />
      </div>
  );
}

const Licznik = () => {
  const id = sessionStorage.getItem('idPracownika')
  const [value1, setValue1] = useState(0);
  const [counter, setCounter] = useState(0);
  const [disabledStartBtn, setDisabledStartBtn] = useState(false);
  const [disabledStopBtn, setDisabledStopBtn] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [disabledSaveBtn, setDisabledSaveBtn] = useState(true);
  const [userRemoteWorkData, setRemoteWorkData] = useState({minutes: ''})
  const minutyNaStarcie = sessionStorage.getItem('minutyNaStarcie')
  function toggle() {
    setIsActive(!isActive);
  }
  //odmierzanie czasu
  React.useEffect(() => {
    let timer = null;
    if (isActive) {
    timer =
      counter >= 0 && setInterval(() => setCounter(counter + 1), 1000);}
    else if(!isActive && counter!==0){
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, counter]);

  //funkcja startująca licznik
  const start = () => {
    setIsActive(true)
    const value = counter;
    setCounter(value);
    setDisabledStartBtn(true);
    setDisabledStopBtn(false);
    setDisabledSaveBtn(true);
  }
//funkcja zatrzymująca licznik
const stop = () => {
    setIsActive(false);
    const value = counter;
    setValue1(value);
    setDisabledStopBtn(value === 0);
    setDisabledStopBtn(true);
    setDisabledStartBtn(false);
    setDisabledSaveBtn(false);
    setRemoteWorkData( () => ({
      minutes: value}))
  }

  const updateMinutes = (minutyUpdate) => {
    axios.put(`${endpoints.remoteWork}/${id}`, {
      idPracownika: id, 
      minutyPozostalo: minutyUpdate
    })
  }
  //funkcja do zapisywania przepracowanego czasu
  const dzis = new Date();
  console.log(dzis)
  const timeWorking = () => {
    axios.post(endpoints.remoteWorkRecord, {
      idPracownika: id,
      data: dzis,
      przepracowaneMinuty: userRemoteWorkData.minutes
    }).then(function (response) {
      console.log(response)
    })
  }

  const save = () => {
    const minutyUpdate = minutyNaStarcie - userRemoteWorkData.minutes;
    console.log(minutyUpdate)
    sessionStorage.setItem('minutyPoSave', userRemoteWorkData.minutes)
    console.log(sessionStorage.getItem('minutyPoSave'))
    timeWorking()
    updateMinutes(minutyUpdate)
    setDisabledSaveBtn(true);
  }


  return (
    <div className="licznik">
          <Knob value={counter} size={150} max={minutyNaStarcie} readOnly />
          <Button label="Zacznij pracę" onClick={start} className="mr-2" disabled={disabledStartBtn} />
          <Button label="Zatrzymaj pracę" onClick={stop} disabled={disabledStopBtn} />
          <Button label="Zapisz pracę" onClick={save} disabled={disabledSaveBtn} />
          
    </div>
  )
}

const RemoteWork = () => {
  return (
    <div className="screen-container">
      <h1>Ekran pracy zdalnej</h1>
      <div className='podkont'>
        <Name/>
        <Praca/>
      </div>
      <div className='kalendarz'>
        <Calendarz/>
      </div>
      <Licznik/>
    </div>
  )
}

export default RemoteWork