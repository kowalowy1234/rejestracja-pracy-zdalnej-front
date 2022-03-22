import '../Styles/App.css';
import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const LoginForm = () => {
  
  const [userData, setUserData] = useState({username: '', password: ''})

  const [users, setUsers] = useState([''])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/pracownik')
    .then(response => response.json())
    .then(data => setUsers(data));
    
  }, [])

  console.log(users);
  
  const handleClick = e => {
    e.preventDefault();

    const findUser = users.find(user => user.login === userData.username && user.haslo === userData.password)

    console.log(findUser)

    findUser ? localStorage.setItem('username', userData.username) : console.log('Wprowadzono złe dane');

    localStorage.setItem('username', userData.username);
  }

  const handleUsername = e => {
    setUserData(prevData => {
      return {
        ...prevData,
        username: e.target.value
      }
    })
  }

  const handlePassword = e => {
    setUserData(prevData => {
      return {
        ...prevData,
        password: e.target.value
      }
    })
  }


  return (
    <div className='loginFormWrapper'>

      <form className='loginForm'>
        <i className='pi pi-user' style={{'fontSize': '1.7em', 'color': '#a0a0a0'}}></i>
        <InputText 
          placeholder='Nazwa użytkownika'
          value={userData.username}
          onChange={handleUsername}
        />
        <Password 
          placeholder='Hasło'
          feedback={false}
          toggleMask = {true}
          value={userData.password}
          onChange={handlePassword}
        />
        <Button 
          label='Zaloguj'
          onClick={handleClick}
        />
      </form>
    </div>
  );
}

export default LoginForm;
