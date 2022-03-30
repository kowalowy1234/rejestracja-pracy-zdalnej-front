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

  const [loggedInUser, setLoggedInUser] = useState({type: null, company: null})

  console.log(loggedInUser)

  const handleSignIn = () => {
    FetchUserData(localStorage.getItem('token'))
    FetchCompanyName()
  }

  const FetchUserData = (token) => {
    axios.get(`http://127.0.0.1:8000/auth/users/me/`,{
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  .then(function (response) {
    const firmaId = Number(response.data.firma);
    console.log(firmaId);
    if(response.data.is_superuser){
      localStorage.setItem('admin', true);
      FetchCompanyName(firmaId)
      setLoggedInUser(prevUser => ({...prevUser, type: 'admin'}))
    }
    else if(response.data.is_staff){
      localStorage.setItem('kierownik', true)
      FetchCompanyName(firmaId)
      setLoggedInUser(prevUser => ({...prevUser, type: 'kierownik'}))
    }
    else{
      FetchCompanyName(firmaId)
      setLoggedInUser(prevUser => ({...prevUser, type: 'employee'}))
    }
  })
}

const FetchCompanyName = (firmaId) => {
  axios.get(`http://127.0.0.1:8000/auth/firma/${firmaId}`)
  .then(function (response) {
    setLoggedInUser(prevUser => ({...prevUser, company: `${response.data.nazwaFirmy}`}))
    localStorage.setItem('nazwaFirmy', response.data.nazwaFirmy)
  }).catch(function(error){
  })
  .then(function () {
    // always executed
  });
}

  const handleSignOut = () => {
    axios.post('http://127.0.0.1:8000/auth/token/logout/',localStorage.getItem('token'),{
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      localStorage.clear();
      setLoggedInUser({type: null, company: null})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <Nav signOut={handleSignOut} companyName={loggedInUser.company}/>
      {localStorage.getItem("token") === null ? <LoginForm login={handleSignIn}/> : <LoggedInMainPage />}
    </div>
  );
}

export default App;
