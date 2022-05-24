import React from "react";
import { Card } from 'primereact/card';
import EkranPracyZdalnej from "./icons/EPZ.png";
import EkranWyznaczaniaPracyZdalnej from "./icons/EWPZ.png";
import Statystyki from "./icons/S.png";
import DodajPracownika from "./icons/DodajPracownika.png";
import { Link } from 'react-router-dom';


const Cards = () => {

  const header = (
      <img alt="Card" src={EkranPracyZdalnej} />
  );

  return (
        <Link to='ekran_pracy_zdalnej'>
          <Card title="Ekran pracy zdalnej" header={header}>
              <p className="m-0" style={{lineHeight: '1.2'}}>Przejdź do panelu zarządzania swoją pracą zdalną</p>
          </Card>
        </Link>
  )
}

const Cards2 = () => {

  const header = (
      <img alt="Card" src={EkranWyznaczaniaPracyZdalnej} />
  );

  return (
        <Link to='wyznacz_prace'>
          <Card title="Ekran wyznaczania pracy zdalnej" header={header}>
              <p className="m-0" style={{lineHeight: '1.2'}}>Przejdź do panelu wyznaczania pracy zdalnej pracownikom</p>
          </Card>
        </Link>
  )
}

const Cards3 = () => {

  const header = (
      <img alt="Card" src={Statystyki} />
  );

  return (
        <Link to='statystyki'>
          <Card title="Statystyki" header={header}>
              <p className="m-0" style={{lineHeight: '1.2'}}>Przejdź do panelu wykresów i statystyk pracy zdalnej</p>
          </Card>
        </Link>
  )
}

const Cards4 = () => {

  const header = (
      <img alt="Card" src={DodajPracownika} />
  );

  return (
        <Link to='dodaj_pracownika'>
          <Card title="Dodaj pracownika" header={header}>
              <p className="m-0" style={{lineHeight: '1.2'}}>Przejdź do panelu dodawania pracowników i ich uprawnień</p>
          </Card>
        </Link>
  )
}


const MainPage = () => {
  const remoteWorkScreenCard = <Cards/>
  const assignRemoteWorkScreenCard = <Cards2/>
  const statsScreenCard = <Cards3/>
  const addEmployeesScreenCard = <Cards4/>

  const token = sessionStorage.getItem('token')
  const admin = sessionStorage.getItem('admin')
  const kierownik = sessionStorage.getItem('kierownik')

  const employeeCards =       
  <div className="kontenerDoKart">
      <div className="karta">{remoteWorkScreenCard}</div>
  </div>

const adminCards =
  <div className="kontenerDoKart">
        <div className="karta">{addEmployeesScreenCard}</div>
  </div>

const  managerCards =  
      <div className="kontenerDoKart">
        <div className="karta">{remoteWorkScreenCard}</div>
        <div className="karta">{assignRemoteWorkScreenCard}</div>
        <div className="karta">{statsScreenCard}</div>
      </div>

  const karty = admin ? adminCards : (kierownik ? managerCards : (token ? employeeCards : null))
  return (
    <>
      {karty}
    </>
  )
}


export default MainPage