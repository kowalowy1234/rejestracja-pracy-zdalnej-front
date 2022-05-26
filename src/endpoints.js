
<<<<<<< HEAD
// const host = "https://deploy-test-praca.herokuapp.com/auth/";
const host = "http://127.0.0.1:8000/auth/";
=======
const host = "https://deploy-test-praca.herokuapp.com/auth/";
// const host = "http://127.0.0.1:8000/auth/";

>>>>>>> f835da72260809a84f41b02d84e1f647ffd86813
const endpoints = {
  employees: `${host}users/`,
  companies : `${host}firma/`,
  remoteWorkRecord : `${host}zapis-pracy`,
<<<<<<< HEAD
  remoteWork : `${host}praca/`,
=======
  remoteWork : `${host}praca`,
>>>>>>> f835da72260809a84f41b02d84e1f647ffd86813
  login: `${host}token/login/`,
  logout: `${host}token/logout/`,
  currentUser: `${host}users/me/`,
  usersAndRegister: `${host}users/`,
  workedMinutes: `${host}przepracowane-minuty/`,
}

export default endpoints;