import { Calendar } from 'primereact/calendar';
import "primeicons/primeicons.css";
import React, { useState, useRef } from 'react';
import axios from 'axios';
import endpoints from '../../endpoints';
import { Knob } from 'primereact/knob';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';

const DanePracownika = () => {

  const token = sessionStorage.getItem('token')
  const [dane, setDane] = useState(null)

    //pobranie danych o aktualnie zalogowanym użytkowniku
    React.useEffect(() => {
    axios.get(endpoints.currentUser, {
      headers: {
        'Authorization': `Token ${token}`}
    })
    .then((response) => {
      setDane(response.data);
    });
  }, []);
  if (!dane) return null;
  return (
    <>
    <Praca idPracownika={dane.id} imie={dane.first_name} nazwisko={dane.last_name}/>
    </>
  )
}

const Praca = (props) => {
  const [checked, setChecked] = useState(false);
  const dzis = new Date().toISOString().split('T')[0];
  const toast = useRef(null);
  const dataProbna = '2022-05-12'
  const showSticky = () => {
    toast.current.show({severity: 'warn', summary: 'Uwaga!', 
    detail: 'Dzisiejsza data jest ostatnim dniem pracy zdalnej', sticky: true});
}
  //pobranie danych o pracy aktualnie zalogowanego użytkownika
  const [dane, setPraca] = useState(null);
  React.useEffect(() => {
    axios.get(`${endpoints.remoteWork}/${props.idPracownika}`)
    .then(function (response) {
      setPraca(response.data);
      if(response.data.dataZakonczenia==dzis) showSticky()
      console.log(response.data.dataZakonczenia)
    }).catch(function(error){
      console.log(error);
    });
  },[]);
  if (!dane) return null;

  let czyWsrodku = false
  if(dzis>=dane.dataRozpoczecia && dzis<=dane.dataZakonczenia){
    czyWsrodku = true 
  } else {
    czyWsrodku = false 
  }
  const toggleDaty = () => {

  }
  // if(dane.dataZakonczenia==dzienDzien){
  //   return showSticky()
  // } 

  console.log(czyWsrodku)

  const godzinaWyswietlana = Math.floor(dane.minutyPozostalo/60)
  const minutaWyswietlana = dane.minutyPozostalo%60
    return (
    <>
    <Toast ref={toast} />
    <div className='kontenerDoPracy'>
      <div className='pracaA'>
        <div className='name'>
        <i className="pi pi-user" style={{'fontSize': '1.5em'}}></i>&nbsp;{props.imie} {props.nazwisko}
        </div>
        <div className='remaining'>
        <p><b>Pozostało: {godzinaWyswietlana} godz i {minutaWyswietlana} min</b></p>
        </div>
        <Licznik srodek={czyWsrodku} id={props.idPracownika} minutyStart={dane.minutyPozostalo}/>
      </div>
      <div>
      <ToggleButton checked={checked} onChange={(e) => setChecked(e.value)} 
      onLabel="Ukryj mój zakres pracy" offLabel="Pokaz mój zakres pracy" 
      className="p-button-rounded p-button-info"/>
      <div className='pracaB'>
      Początek: {checked ? dane.dataRozpoczecia : '-'} <br/>
      Koniec: {checked ? dane.dataZakonczenia : '-'}
      </div>
      </div>
    </div>
    </>
  )
} 


const Calendarz = (props) => {

  const selectedDates = [props.dataRozpoczeciaPracy, props.dataZakonczeniaPracy];

  return (
      <div>
          <Calendar selectionMode="range" 
              value={selectedDates} readOnlyInput inline showWeek />
      </div>
  );
}

const Licznik = (props) => {
  const id = sessionStorage.getItem('idPracownika')
  const toast = useRef(null);
  let czyWSrodku = props.srodek
  // 
  // console.log(czyWSrodku)
  // if (czyWSrodku==='true'){
  //   kurdeNo=false
  // }else{
  //   kurdeNo=true
  // }
  // console.log(kurdeNo)
  const [value1, setValue1] = useState(0);
  let [counter, setCounter] = useState(0);
  let [minuta, setMinuta] = useState(0);
  let [godzina, setGodzina] = useState(0);
  const [disabledStartBtn, setDisabledStartBtn] = useState(false);
  const [disabledStopBtn, setDisabledStopBtn] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [disabledSaveBtn, setDisabledSaveBtn] = useState(true);
  const [userRemoteWorkData, setRemoteWorkData] = useState({minutes: ''})
  let minutyNaStarcie = props.minutyStart
  console.log(minutyNaStarcie)
  const zapisanoPracę = () => {
    toast.current.show({severity:'success', summary: 'Zapisano pracę', 
    detail:'Praca pomyślnie zapisana', life: 3000});
  }
  const rozpoczętoPracę = () => {
    toast.current.show({severity:'info', summary: 'Rozpoczęto pracę',
     detail:'Do zapisu wymagana jest przepracowana minimum 1 minuta', life: 3000});
  }
  const zatrzymanoPracę = () => {
    toast.current.show({severity:'warn', summary: 'Zatrzymano pracę',
     detail:'Praca została wstrzymana', life: 3000});
  }
  const BladPracy = () => {
    toast.current.show({severity:'error', summary: 'Błąd rozpoczęcia pracy',
     detail:'Dzisiejsza data i data wyznaczonej pracy nie pokrywają się', life: 3000});
  }
  function refreshPage() {
    window.location.reload(false);
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
    if(czyWSrodku===true){
      setIsActive(true)
      rozpoczętoPracę()
      const value = counter;
      setCounter(value);
      setDisabledStartBtn(true);
      setDisabledStopBtn(false);
      setDisabledSaveBtn(true);
    }else{
      setIsActive(false)
      BladPracy()
    }
  }
//funkcja zatrzymująca licznik
const stop = () => {
    zatrzymanoPracę()
    setIsActive(false);
    const value = counter;
    setValue1(value);
    setDisabledStopBtn(value === 0);
    setDisabledStopBtn(true);
    setDisabledStartBtn(false);
    setDisabledSaveBtn(false);
    if(minuta===0) setDisabledSaveBtn(true);
    setRemoteWorkData( () => ({
      minutes: valueDoZapisu}))
  }
  console.log(props.id)
  const updateMinutes = (minutyUpdate) => {
    axios.put(`${endpoints.remoteWork}/${props.id}`, {
      idPracownika: id, 
      minutyPozostalo: minutyUpdate
    })
  }
  //funkcja do zapisywania przepracowanego czasu
  const dzis = new Date();
  const timeWorking = () => {
    axios.post(endpoints.remoteWorkRecord, {
      idPracownika: props.id,
      data: dzis,
      przepracowaneMinuty: userRemoteWorkData.minutes
    }).then(function (response) {
      console.log(response)
    })
  }

  const save = () => {
    zapisanoPracę()
    const minutyUpdate = minutyNaStarcie - userRemoteWorkData.minutes;
    console.log(minutyUpdate)
    timeWorking()
    updateMinutes(minutyUpdate)
    setDisabledSaveBtn(true);
    refreshPage()
  }

    let sekunda = counter
    
    if(counter===60){
      setMinuta(minuta + 1)
      setCounter(0)
    }
    if(minuta===60){
      setGodzina(godzina +1 )
      setMinuta(0)
    }
    let zegarek = ""
    let godzinaWyswietlana=godzina
    if(godzina<10) godzinaWyswietlana="0"+godzinaWyswietlana
    let minutaWyswietlana=minuta
    if(minutaWyswietlana<10) minutaWyswietlana="0"+minutaWyswietlana
    let sekundaWyswietlana=sekunda
    if(sekundaWyswietlana<10) sekundaWyswietlana="0"+sekundaWyswietlana
    zegarek = godzinaWyswietlana+":"+minutaWyswietlana+":"+sekundaWyswietlana
    let valueDoKnoba = counter + (minuta*60) + (godzina*60)
    let valueDoZapisu = minuta + (godzina*60)
  
  return (
    <div className="licznik">
          <Toast ref={toast} />
          <Knob value={valueDoKnoba} size={200} max={minutyNaStarcie*60} readOnly valueTemplate={zegarek}/>
          <Button label="Zacznij pracę" onClick={start} className="mr-2" disabled={disabledStartBtn} />
          <Button label="Zatrzymaj pracę" onClick={stop} disabled={disabledStopBtn} />
          <Button label="Zapisz pracę" onClick={save} disabled={disabledSaveBtn} />
    </div>
  )
}

const RemoteWork = () => {
  return (
    <div className="screen-container">
      <h2 style={{marginBottom: '20px'}}><i className='pi pi-desktop' style={{fontSize: '20px', marginRight: '10px'}}></i>Ekran pracy zdalnej</h2>
      <hr style={{width: '100%', backgroundColor: 'rgb(233, 233, 233)', border: '1px solid rgb(233, 233, 233)', marginBottom: '20px'}}></hr>
          <DanePracownika/>
        <div className='pracaB'>
        </div>
      </div>
  )
}

export default RemoteWork