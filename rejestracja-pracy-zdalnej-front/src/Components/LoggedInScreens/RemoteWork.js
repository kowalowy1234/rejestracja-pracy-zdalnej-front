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
  const listaRekordow = dane.map((rekord) => (
    rekord.idPracownika === Number(id) ?
    (<p><b>Remaining: {rekord.minutyPozostalo}</b></p>) : null
    ))
    console.log(listaRekordow)
    return (
    <>
    <div className='remaining'>
          {listaRekordow[0]}
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

  const [counter, setCounter] = useState(60);
  const [value1, setValue1] = useState(1);
  const [disabledIncrementBtn, setDisabledIncrementBtn] = useState(false);
  const [disabledDecrementBtn, setDisabledDecrementBtn] = useState(true);

  React.useEffect(() => {
    const timer =
      value1 > 0 && setInterval(() => setValue1(value1 + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const increment = () => {
    const value = value1 + 1;
    setValue1(value);
    setDisabledIncrementBtn(value === 100);
    setDisabledDecrementBtn(false);
  }

const decrement = () => {
    const value = value1 - 1;
    setValue1(value);
    setDisabledIncrementBtn(false);
    setDisabledDecrementBtn(value === 0);
  }

  return (
    <div className="licznik">
          <Knob value={value1} size={150} readOnly />
          <Button label="Increment" onClick={increment} className="mr-2" disabled={disabledIncrementBtn} />
          <Button label="Decrement" onClick={decrement} disabled={disabledDecrementBtn} />
          Countdown: {counter}
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