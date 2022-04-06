import { Routes, Route } from 'react-router-dom';
import '../Styles/App.css';
import AddEmployee from './LoggedInScreens/AddEmployee';
import AssignRemoteWork from './LoggedInScreens/AssignRemoteWork';
import MainPage from './LoggedInScreens/MainPage';
import RemoteWork from './LoggedInScreens/RemoteWork';
import Stats from './LoggedInScreens/Stats';

const LoggedInMainPage = (props) => {
  
  if (sessionStorage.getItem('admin'))
    return(
        <div className="loggedIn">
          {/* <Profile type='administrator' company={props.companyName}/> */}
          <div></div>
          <Routes>
            <Route path="*" element={<MainPage />} />
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="dodaj_pracownika" element={<AddEmployee companyId={sessionStorage.getItem('companyId')}/>} />
          </Routes>
        </div>
    )

  if (sessionStorage.getItem('kierownik'))
    return (
      <div className="loggedIn">
        {/* <Profile type='kierownik' company={props.companyName}/> */}
        <div></div>
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
      {/* <Profile type='pracownik' company={props.companyName}/> */}
      <div></div>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="ekran_pracy_zdalnej" element={<RemoteWork />} />
      </Routes>
    </div>
  )
}

export default LoggedInMainPage;
