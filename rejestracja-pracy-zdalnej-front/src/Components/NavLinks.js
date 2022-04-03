import { useEffect, useState } from 'react';
import '../Styles/App.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const Links = () => {

  const token = sessionStorage.getItem('token')
  const admin = sessionStorage.getItem('admin')
  const kierownik = sessionStorage.getItem('kierownik')

  const mainScreen = <li><Link to='/'><i class='pi pi-home'></i>Ekran główny</Link></li>
  const remoteWorkScreen = <li><Link to='ekran_pracy_zdalnej'><i class='pi pi-desktop'></i>Ekran pracy zdalnej</Link></li>
  const addEmployeesScreen = <li><Link to="dodaj_pracownika"><i class='pi pi-user-plus'></i>Dodaj pracownika</Link></li>  
  const assignRemoteWorkScreen = <li><Link to='wyznacz_prace'><i class='pi pi-calendar-plus'></i>Wyznacz pracę zdalną</Link></li>
  const statsScreen = <li><Link to='statystyki'><i class='pi pi-chart-line'></i>Statystyki</Link></li> 
  
  const employeeLinks =       
    <ul>
        {mainScreen}
        {remoteWorkScreen}
    </ul>

  const adminLinks =
        <ul>
          {mainScreen}
          {addEmployeesScreen}    
        </ul>

  const  managerLinks =  
        <ul>
          {mainScreen}
          {remoteWorkScreen}
          {assignRemoteWorkScreen}
          {statsScreen}  
        </ul>

  const links = admin ? adminLinks : (kierownik ? managerLinks : (token ? employeeLinks : null))

  return (
    links
  )
}

export default Links;