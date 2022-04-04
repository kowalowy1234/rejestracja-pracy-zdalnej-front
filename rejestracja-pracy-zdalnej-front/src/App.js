import './Styles/App.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from 'axios';
import Nav from './Components/Nav'
import LoginForm from './Components/LoginForm'
import LoggedInMainPage from './Components/LoggedInMainPage';
import { useState } from 'react';

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState({type: null, company: null})

  const handleSignIn = () => {
    FetchUserData(sessionStorage.getItem('token'))
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
    if(response.data.is_superuser){
      sessionStorage.setItem('admin', true);
      FetchCompanyName(firmaId)
      setLoggedInUser(prevUser => ({...prevUser, type: 'admin'}))
    }
    else if(response.data.is_staff){
      sessionStorage.setItem('kierownik', true)
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
    sessionStorage.setItem('nazwaFirmy', response.data.nazwaFirmy)
  }).catch(function(error){
  })
  .then(function () {
    // always executed
  });
}

  const handleSignOut = () => {
    axios.post('http://127.0.0.1:8000/auth/token/logout/',sessionStorage.getItem('token'),{
      headers: {
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      sessionStorage.clear();
      setLoggedInUser({type: null, company: null})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <Nav signOut={handleSignOut} companyName={loggedInUser.company}/>
      {sessionStorage.getItem("token") === null ? <LoginForm login={handleSignIn}/> : <LoggedInMainPage companyName={loggedInUser.company}/>}
    </div>
  );
}

export default App;
