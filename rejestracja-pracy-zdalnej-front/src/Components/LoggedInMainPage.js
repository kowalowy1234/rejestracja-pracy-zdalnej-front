import { Route, Router } from 'react-router-dom';
import '../Styles/App.css';

const LoggedInMainPage = () => {

  if (sessionStorage.getItem('admin'))
    return(
        <div className="loggedIn">
          <h1>Zalogowano jako admin</h1>
        </div>
    )
  if (sessionStorage.getItem('kierownik'))
    return (
      <div className="loggedIn">
        <h2>Zalogowano jako kierownik</h2>
      </div>
    );
  return (
    <div className="loggedIn">
      <h2>Zalogowano jako pracownik</h2>
    </div>
  )
}

export default LoggedInMainPage;
