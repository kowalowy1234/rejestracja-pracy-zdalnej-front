import '../Styles/App.css';

const LoggedInMainPage = () => {

  return (
    <div className="loggedIn">
      <h1>Pomyślnie zalogowano jako {localStorage.getItem("username")}</h1>
    </div>
  );
}

export default LoggedInMainPage;
