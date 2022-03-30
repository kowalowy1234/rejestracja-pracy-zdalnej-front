import '../Styles/App.css';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from 'axios';

const LoginForm = (props) => {
  

  const [userData, setUserData] = useState({username: '', password: ''})

  const [errorAlert, setErrorAlert] = useState(false)

  const HandleUserData= (event) => {
    setUserData(prevData => (
      {
        ...prevData,
        [event.target.name]: event.target.value
      }
    ))
  }

  const HandleLogin = (event) => {
    event.preventDefault()

    axios.post('http://127.0.0.1:8000/auth/token/login', {
      username: userData.username,
      password: userData.password
    })
    .then(function (response) {
      const token = response.data.auth_token
      FetchUserData(token)
      localStorage.setItem('token', token)
      props.login()
    })
    .catch(function (error) {
      console.log(error);
      setErrorAlert(true)
    });
  }

  const FetchUserData = (token) => {
      axios.get(`http://127.0.0.1:8000/auth/users/me/`,{
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(function (response) {
      const firmaId = response.data.firma;
      if(response.data.is_superuser)
        localStorage.setItem('admin', response.data.is_superuser);
      else if(response.data.is_staff)
        localStorage.setItem('kierownik', response.data.is_staff);
      localStorage.setItem('firmaId', response.data.firma);
      FetchCompanyName(firmaId);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  const FetchCompanyName = (firmaId) => {
    console.log('fetchcompanyname')
    axios.get(`http://127.0.0.1:8000/auth/firma/${firmaId}`)
    .then(function (response) {
      localStorage.setItem('nazwaFirmy', response.data.nazwaFirmy);
      window.location.reload(false);
    }).catch(function(error){
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  console.log(errorAlert)

  return (
    <div className='loginFormWrapper'>

      <form className='loginForm'>
        <i className='pi pi-user' style={{'fontSize': '1.7em', 'color': '#a0a0a0'}}></i>
        <InputText 
          name='username'
          placeholder='Nazwa użytkownika'
          value={userData.username}
          onChange={HandleUserData}
        />
        <Password 
          name='password'
          placeholder='Hasło'
          feedback={false}
          toggleMask = {true}
          value={userData.password}
          onChange={HandleUserData}
        />
        <Button 
          label='Zaloguj'
          onClick={HandleLogin}
        />
        {errorAlert && <p>Wprowadzone dane są nieprawidłowe</p>}
      </form>
    </div>
  );
}

export default LoginForm;
