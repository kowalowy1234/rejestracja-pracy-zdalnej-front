import React, {Component} from "react";
import { Card } from "react-bootstrap";
import EkranPracyZdalnej from "./icons/EkranPracyZdalnej.png";
import EkranWyznaczaniaPracyZdalnej from "./icons/EkranWyznaczaniaPracyZdalnej.png";
import Statystyki from "./icons/Statystyki.png";
import DodajPracownika from "./icons/DodajPracownika.png";
import { Link } from 'react-router-dom';

const Cards = () => {
  return (
    <Link to='ekran_pracy_zdalnej'>
    <Card style={{ width: '15rem', height: '20rem'}}>
    <Card.Img variant="top" src={EkranPracyZdalnej} />
    <Card.Body>
      <Card.Title>Ekran pracy zdalnej</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
    </Card.Body>
    </Card>
    </Link>
  )
}

const Cards2 = () => {
  return (
    <Link to='wyznacz_prace'>
    <Card style={{ width: '15rem', height: '20rem'}}>
    <Card.Img variant="top" src={EkranWyznaczaniaPracyZdalnej} />
    <Card.Body>
      <Card.Title>Wyznacz pracę zdalną</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
    </Card.Body>
    </Card>
    </Link>
  )
}

const Cards3 = () => {
  return (
    <Link to='statystyki'>
    <Card style={{ width: '15rem', height: '20rem'}}>
    <Card.Img variant="top" src={Statystyki} />
    <Card.Body>
      <Card.Title>Statystyki</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
    </Card.Body>
    </Card>
    </Link>
  )
}

const Cards4 = () => {
  return (
    <Link to='dodaj_pracownika'>
    <Card style={{ width: '15rem', height: '20rem'}}>
    <Card.Img variant="top" src={DodajPracownika} />
    <Card.Body>
      <Card.Title>Dodaj pracownika</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
    </Card.Body>
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