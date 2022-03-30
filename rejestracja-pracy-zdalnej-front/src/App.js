import './Styles/App.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from 'axios';
import Nav from './Components/Nav'
import LoginForm from './Components/LoginForm'
import LoggedInMainPage from './Components/LoggedInMainPage';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState()

  const handleSignIn = () => {
    setLoggedInUser(true);
  }

  const handleSignOut = () => {
    axios.post('http://127.0.0.1:8000/auth/token/logout/',localStorage.getItem('token'),{
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      localStorage.clear();
      setLoggedInUser(false)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <Nav signOut={handleSignOut} />
      {localStorage.getItem("token") === null ? <LoginForm login={handleSignIn}/> : <LoggedInMainPage />}
    </div>
  );
}

export default App;
