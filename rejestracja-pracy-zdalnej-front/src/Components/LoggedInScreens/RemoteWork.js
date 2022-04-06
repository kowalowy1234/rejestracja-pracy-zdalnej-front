import { Calendar } from 'primereact/calendar';
import "primeicons/primeicons.css";
import React, { useState } from 'react';
import Profile from '../Profile';
import axios from 'axios';

// class Dane extends React.Component {
//   state = {
//     persons: []
//   }

//   componentDidMount() {
//     axios.get(`http://127.0.0.1:8000/auth/users/me/`)
//       .then(res => {
//         const imie = res.data.first_name;
//         this.setState({ persons });
//       })
//   }

//   render() {
//     return (
//       <ul>
//         {
//           this.state.persons
//             .map(person =>
//               <li key={person.id}>{person.name}</li>
//             )
//         }
//       </ul>
//     )
//   }
// }

// const Dane1 = () => {
//   const token = sessionStorage.getItem('token')
//   const admin = sessionStorage.getItem('admin')
//   const kierownik = sessionStorage.getItem('kierownik')

//   return (
//     <div>{kierownik}</div>
//   )
// }


const Name = () => {

  return (
      <div className='name'>
          <i className="pi pi-user" style={{'fontSize': '2em'}}>Lorem Lorem</i>
      </div>
  )
}


const Remaining = () => {

  return (
      <div className='remaining'>
          <p><b>Remaining: </b></p>
      </div>
  )
}

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

const RemoteWork = () => {
  return (
    <div className="screen-container">
      <h1>Ekran pracy zdalnej</h1>
      <div className='podkont'>

        <Name/>
        <Remaining/>
      </div>
      <div className='kalendarz'>
        <Calendarz/>
      </div>
    </div>
  )
}

export default RemoteWork