import '../Styles/App.css';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import NavLinks from './NavLinks'

const Nav = (props) => {

  const loggedInUser = localStorage.getItem('token');

  const handleSignOut = () =>{
    props.signOut();
  }

  const [userType, setUserType] = useState(null)

  const signOutButton =
      <Button 
        label="Wyloguj"
        onClick={handleSignOut}
        className='sign-out-button'
      />;

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
