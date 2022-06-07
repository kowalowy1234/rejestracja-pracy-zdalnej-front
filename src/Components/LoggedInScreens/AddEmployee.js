/* eslint-disable no-unused-vars */
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext"
import { RadioButton } from 'primereact/radiobutton';
import { useFormik } from "formik";
import * as Yup from "yup"
import endpoints from "../../endpoints";
import axios from "axios";
import NewUserModal from "./NewUserModal";
import { useState } from "react";


const AddEmployee = (props) => {

  const [createdUser, setCreatedUSer] = useState({username_c: '', password_c: '', created: false});

  const setCreatedFalse = () => {
    setCreatedUSer({username: '', password: '', created: false});
  }
  
  const companyId = `${props.companyId}`;

  const newUserData = useFormik({
    initialValues: {
      newUserType: 'pracownik',
      newUserName: '',
      newUserLastName: '',
      newUserPESEL : '',
      newUserEmail : '',
      newUserPhoneNumber: '',
    },
    validationSchema: Yup.object({
      newUserName: 
        Yup.string()
        .max(45, "Imię nie może być dłuższe niż 45 znaków")
        .required("Pole Imię nie może być puste"),
      newUserLastName: 
        Yup.string()
        .max(45, "Nazwisko nie może być dłuższe niż 45 znaków")
        .required("Pole Nazwisko nie może być puste"),
      newUserPESEL : 
        Yup.string()
        .matches(/^[0-9]{11}$/, "PESEL powinien składać się z dokładnie 11 cyfr")
        .required("Pole PESEL nie może być puste"),
      newUserEmail : 
        Yup.string()
        .max(45, "E-mail nie może być dłuższy niż 45 znaków")
        .email("Niepoprawny format adresu e-mail")
        .required("Pole E-mail nie może być puste"),
      newUserPhoneNumber: 
        Yup.string()
        .matches(/^[0-9]{9}$/, "Numer telefonu powinien składać się z dokładnie 9 cyfr")
        .required("Pole Numer telefonu nie może być puste"),
    }),
    onSubmit: () => createUser(),
  })

  const createUser = () => {

    const username = generateUsername(newUserData.values.newUserName, newUserData.values.newUserPESEL)
    const password = generatePassword();

    axios.post(endpoints.usersAndRegister, {
        username: username,
        first_name: newUserData.values.newUserName,
        last_name: newUserData.values.newUserLastName,
        pesel:  newUserData.values.newUserPESEL,
        email: newUserData.values.newUserEmail,
        phone: newUserData.values.newUserPhoneNumber,
        firma: companyId,
        is_staff: newUserData.values.newUserType === 'kierownik' || newUserData.values.newUserType === 'admin' ? 'True' : 'False',
        is_superuser: newUserData.values.newUserType === 'admin' ? 'True' : 'False',
        password: password,
        re_password: password,
      }).then(response => {
        toggleModal(username, password);
      }).catch(() => {
        alert('Wystąpił błąd przy tworzeniu nowego konta. Istnieje już konto z takim numerem PESEL lub adresem E-mail.');
      })
  }

  const toggleModal = (username, password) => {
    setCreatedUSer({
      username_c: username,
      password_c: password,
      created: true,
    });
  }

  const turnModalOff = () => {
    setCreatedUSer({
      username_c: '',
      password_c: '',
      created: false,
    });
  }

  const  generatePassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*0123456789"; 

    let password = '';
    const charactersLength = characters.length;
    const passwordLength = 12
    for ( let i = 0; i < passwordLength; i++ ) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return password;
  }

  const generateUsername = (name, pesel) => {
    const numbersLength = 4;
    let username = name;
    for ( let i = 0; i < numbersLength; i++ ) {
      username += pesel.charAt(Math.floor(Math.random() * pesel.length));
    }
    return username
  }

  return (
      <div className="screen-container">
        <h2 style={{fontSize: '20px', paddingRight: '10px'}}><i className="pi pi-user-plus" style={{fontSize: '32px', paddingRight: '10px'}}></i>Utwórz konto nowego użytkownika</h2>
        <p>Domyślnie utworzone konto będzie miało uprawnienia pracownika, jeżeli inna opcja nie zostanie zaznaczona.</p>
        <form onSubmit={newUserData.handleSubmit}>

          <div className="new-user-radio">
            
            <div>
              <RadioButton onChange={newUserData.handleChange} inputId="pracownik" value="pracownik" name="newUserType" checked={newUserData.values.newUserType === 'pracownik'}/>
              <label htmlFor="pracownik">Pracownik</label>
            </div>

            <div>
              <RadioButton onChange={newUserData.handleChange} inputId="kierownik" value="kierownik" name="newUserType" checked={newUserData.values.newUserType === 'kierownik'}/>
              <label htmlFor="kierownik">Kierownik</label>
            </div>

            <div>
              <RadioButton onChange={newUserData.handleChange} inputId="admin" value="admin" name="newUserType" checked={newUserData.values.newUserType === 'admin'} />
              <label htmlFor="admin">Administrator</label>
            </div>

          </div>

          <InputText 
            onBlur={newUserData.handleBlur} 
            onChange={newUserData.handleChange} 
            value={newUserData.values.newUserName} 
            name='newUserName' placeholder="Imię"
          />
          {
            newUserData.touched.newUserName && newUserData.errors.newUserName 
            ? <p>{newUserData.errors.newUserName}</p> 
            : null
          }


          <InputText 
            onBlur={newUserData.handleBlur} 
            onChange={newUserData.handleChange} 
            value={newUserData.values.newUserLastName} 
            name='newUserLastName' placeholder="Nazwisko"
          />
          {
            newUserData.touched.newUserLastName && newUserData.errors.newUserLastName 
            ? <p>{newUserData.errors.newUserLastName}</p> 
            : null
          }


          <InputText 
            onBlur={newUserData.handleBlur} 
            onChange={newUserData.handleChange} 
            value={newUserData.values.newUserPESEL} 
            name='newUserPESEL' placeholder="PESEL"
          />
          {
            newUserData.touched.newUserPESEL && newUserData.errors.newUserPESEL 
            ? <p>{newUserData.errors.newUserPESEL}</p> 
            : null
          }

          <InputText 
            onBlur={newUserData.handleBlur} 
            onChange={newUserData.handleChange} 
            value={newUserData.values.newUserEmail} 
            name='newUserEmail' placeholder="E-mail"
          />
          {
            newUserData.touched.newUserEmail && newUserData.errors.newUserEmail 
            ? <p>{newUserData.errors.newUserEmail}</p> 
            : null
          }

          <InputText 
            onBlur={newUserData.handleBlur} 
            onChange={newUserData.handleChange} 
            value={newUserData.values.newUserPhoneNumber} 
            name='newUserPhoneNumber' 
            placeholder="Numer telefonu"
          />
          {
            newUserData.touched.newUserPhoneNumber && newUserData.errors.newUserPhoneNumber 
            ? <p>{newUserData.errors.newUserPhoneNumber}</p> 
            : null
          }

          <Button label='Utwórz użytkownika' type="submit"/>
        </form>
        {createdUser.created && <NewUserModal toggle={turnModalOff} username={createdUser.username_c} password={createdUser.password_c}/>}
      </div>
  )
}

export default AddEmployee