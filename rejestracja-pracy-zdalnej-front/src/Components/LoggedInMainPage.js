import { Routes, Route } from 'react-router-dom';
import '../Styles/App.css';
import AddEmployee from './LoggedInScreens/AddEmployee';
import AssignRemoteWork from './LoggedInScreens/AssignRemoteWork';
import MainPage from './LoggedInScreens/MainPage';
import RemoteWork from './LoggedInScreens/RemoteWork';
import Stats from './LoggedInScreens/Stats';

const LoggedInMainPage = () => {

  const company = sessionStorage.getItem('nazwaFirmy')

  if (sessionStorage.getItem('admin'))
    return(
        <div className="loggedIn">
          <h1>Zalogowano jako administrator</h1>
          <h2>Firma: {company}</h2>
          <Routes>
            <Route path="*" element={<MainPage />} />
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="dodaj_pracownika" element={<AddEmployee />} />
          </Routes>
        </div>
    )

  if (sessionStorage.getItem('kierownik'))
    return (
      <div className="loggedIn">
        <h2>Zalogowano jako kierownik</h2>
        <h2>Firma: {company}</h2>
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="dodaj_pracownika" element={<MainPage />} />
          <Route exact path="ekran_pracy_zdalnej" element={<RemoteWork />} />
          <Route exact path="wyznacz_prace" element={<AssignRemoteWork />} />
          <Route exact path="statystyki" element={<Stats />} />
        </Routes>
      </div>
    );

  return (
    <div className="loggedIn">
      <h2>Zalogowano jako pracownik</h2>
      <h2>Firma: {company}</h2>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="ekran_pracy_zdalnej" element={<RemoteWork />} />
      </Routes>
    </div>
  )
}

export default LoggedInMainPage;
