import '../Styles/App.css';
import {
  NavLink
} from "react-router-dom";

const Links = () => {


  const token = sessionStorage.getItem('token')
  const admin = sessionStorage.getItem('admin')
  const kierownik = sessionStorage.getItem('kierownik')

  const mainScreen = <NavLink activeClassName='active' to='/'><li><i className='pi pi-home'></i>Ekran główny</li></NavLink>
  const remoteWorkScreen = <NavLink activeClassName='active' to='ekran_pracy_zdalnej'><li><i className='pi pi-desktop'></i>Ekran pracy zdalnej</li></NavLink>
  const addEmployeesScreen = <NavLink activeClassName='active' to="dodaj_pracownika"><li><i className='pi pi-user-plus'></i>Dodaj pracownika</li></NavLink> 
  const assignRemoteWorkScreen = <NavLink activeClassName='active' to='wyznacz_prace'><li><i className='pi pi-calendar-plus'></i>Wyznacz pracę zdalną</li></NavLink>
  const statsScreen = <NavLink activeClassName='active' to='statystyki'><li><i className='pi pi-chart-line'></i>Statystyki</li></NavLink>
  
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