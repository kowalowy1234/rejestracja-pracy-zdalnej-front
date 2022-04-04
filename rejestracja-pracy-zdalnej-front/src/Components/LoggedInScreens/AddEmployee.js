import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext"
import { RadioButton } from 'primereact/radiobutton';
import { useState } from "react";


const AddEmployee = () => {

  const [newUserData, setNewUserData] = useState({
    newUserType: 'pracownik',
    newUserName: '',
    newUserLastName: '',
    newUserPESEL: '',
    newUserEmail: '',
    newUserPhoneNumber: '',
  })

  const [createError, setCreateError] = useState({show: false, description: ''})

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setNewUserData(prevUserData => ({
      ...prevUserData,
      [name] : value
    }))
  }

  const createUser = (event) => {
    event.preventDefault();
    validate();
  }

  const validate = () => {

    if(newUserData.newUserName === ''){
      setCreateError({
        show: true,
         description: 'Pole mię nie może być puste!'
      })
    } else if (newUserData.newUserLastName === ''){
      setCreateError({
        show: true,
         description: 'Pole nazwisko nie może być puste!'
      })
    } else if (newUserData.newUserPESEL === '') {
      setCreateError({
        show: true,
        description: 'Pole PESEL nie może być puste!'
      })
    } else if (newUserData.newUserEmail === '') {
      setCreateError({
        show: true,
        description: 'Pole e-mail nie może być puste!'
      })
    } else if (newUserData.newUserPhoneNumber === '') {
      setCreateError({
        show: true,
        description: 'Pole numer telefonu nie może być puste!'
      })
    }

  }

  return (
      <div className="screen-container">
        <h2><i className="pi pi-user-plus" style={{fontSize: '32px', paddingRight: '10px'}}></i>Utwórz konto nowego użytkownika</h2>
        <p>Domyślnie utworzone konto będzie miało uprawnienia pracownika, jeżeli inna opcja nie zostanie zaznaczona.</p>
        <form>

          <div className="new-user-radio">
            
            <div>
              <RadioButton inputId="pracownik" value="pracownik" name="newUserType" onChange={handleChange} checked={newUserData.newUserType === 'pracownik'}/>
              <label htmlFor="pracownik">Pracownik</label>
            </div>

            <div>
              <RadioButton inputId="kierownik" value="kierownik" name="newUserType" onChange={handleChange} checked={newUserData.newUserType === 'kierownik'}/>
              <label htmlFor="kierownik">Kierownik</label>
            </div>

            <div>
              <RadioButton inputId="admin" value="admin" name="newUserType" onChange={handleChange} checked={newUserData.newUserType === 'admin'}/>
              <label htmlFor="admin">Administrator</label>
            </div>

          </div>

          <InputText name='newUserName' onChange={handleChange} placeholder="Imię"/>
          <InputText name='newUserLastName' onChange={handleChange} placeholder="Nazwisko"/>
          <InputText name='newUserPESEL' onChange={handleChange} placeholder="PESEL"/>
          <InputText name='newUserEmail' onChange={handleChange} placeholder="E-mail"/>
          <InputText name='newUserPhoneNumber' onChange={handleChange} placeholder="Numer telefonu"/>

          <Button label='Utwórz użytkownika' onClick={createUser}/>

        </form>
        {createError.show && <p style={{textAlign: 'center', color: 'red'}}>{createError.description}</p>}
      </div>
  )
}

export default AddEmployee