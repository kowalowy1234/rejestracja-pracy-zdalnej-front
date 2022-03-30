import { useEffect, useState } from 'react';
import '../Styles/App.css';

const Links = () => {

  const token = localStorage.getItem('token')
  const admin = localStorage.getItem('admin')
  const kierownik = localStorage.getItem('kierownik')
  
  const employeeLinks =       
    <ul>
      <li>Employee 1</li>
      <li>Employee 2</li>
      <li>Employee 3</li>       
    </ul>

  const adminLinks =    
      <ul>
        <li>Admin 1</li>
        <li>Admin 2</li>
        <li>Admin 3</li>       
      </ul>
  const  managerLinks =    
      <ul>
        <li>Manager 1</li>
        <li>Manager 2</li>
        <li>Manager 3</li>       
      </ul>

  const links = admin ? adminLinks : (kierownik ? managerLinks : (token ? employeeLinks : null))

  return (
    links
  )
}

export default Links;