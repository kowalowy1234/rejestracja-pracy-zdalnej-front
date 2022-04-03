import '../Styles/App.css';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import NavLinks from './NavLinks'
import { Link } from 'react-router-dom';

const Nav = (props) => {

  const loggedInUser = sessionStorage.getItem('token');

  const handleSignOut = () =>{
    props.signOut();
  }

  const [userType, setUserType] = useState(null)

  const signOutButton =
    <div style={{textAlign: 'right'}}>
      <Link to='/'>
      <Button 
        label="Wyloguj"
        icon='pi pi-sign-out'
        onClick={handleSignOut}
        className='sign-out-button'
      /></Link>
    </div>

  // const Links = admin ? <AdminLinks /> : (manager ? <ManagerLinks /> : (loggedInUser ? <EmployeeLinks /> : null))
  return (
    <nav>
      {loggedInUser && <NavLinks />}
      {!loggedInUser && <h1>Rejestracja pracy zdalnej</h1>}
      {loggedInUser && signOutButton}
    </nav>
  );
}

export default Nav;
