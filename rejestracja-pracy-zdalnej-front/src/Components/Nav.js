import '../Styles/App.css';
import { Button } from 'primereact/button';

const Nav = (props) => {

  const signOutButton = <div>
      <Button 
        label="Wyloguj"
        onClick={props.handleSignOut}
      />
    </div>

  const loggedInUser = localStorage.getItem('username')

  return (
    <nav>
      {/* <ul>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>       
      </ul> */}
      <h1>Rejestracja pracy zdalnej</h1>
      {/* <h3>
        <p>Zaloguj się</p>
        <i className='pi pi-sign-in' style={{'fontSize': '1.7em', 'color': '#a0a0a0'}}></i>
      </h3> */}

      {loggedInUser && signOutButton}

    </nav>
  );
}

export default Nav;
