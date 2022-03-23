import './Styles/App.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Nav from './Components/Nav'
import LoginForm from './Components/LoginForm'
import LoggedInMainPage from './Components/LoggedInMainPage';
import { useState } from 'react';


const App = () => {

  const [loggedInUser, setLoggedInUser] = useState('')

  const handleSignIn = () => {
    setLoggedInUser(localStorage.getItem('username'))
  }

  const handleSignOut = () => {
    localStorage.removeItem('username')
    setLoggedInUser('')
  }

  return (
    <div className="App">
      <Nav handleSignOut={handleSignOut}/>
      {localStorage.getItem("username") === null ? <LoginForm handleSignIn={handleSignIn}/> : <LoggedInMainPage />}
    </div>
  );
}

export default App;
