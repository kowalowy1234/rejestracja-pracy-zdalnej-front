import { useEffect, useState } from 'react';
import '../Styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Links = () => {

  const token = localStorage.getItem('token')
  const admin = localStorage.getItem('admin')
  const kierownik = localStorage.getItem('kierownik')
  
  const employeeLinks =       
    <ul>
      <li><a href=''>Ekran pracy zdalnej</a></li>  
    </ul>

  const adminLinks =
      <Router>
        <ul>
          <li><Link to="/dodaj_pracownika">Dodaj pracownika</Link></li>      
        </ul>
      </Router>

  const  managerLinks =    
      <ul>
        <li><a href=''>Ekran pracy zdalnej</a></li>
        <li><a href=''>Wyznacz pracę zdalną</a></li>   
      </ul>

  const links = admin ? adminLinks : (kierownik ? managerLinks : (token ? employeeLinks : null))

  return (
    links
  )
}

export default Links;