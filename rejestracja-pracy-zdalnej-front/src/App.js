import './Styles/App.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Nav from './Components/Nav'
import LoginForm from './Components/LoginForm'


const App = () => {
  return (
    <div className="App">
      <Nav />
      <LoginForm />
    </div>
  );
}

export default App;
