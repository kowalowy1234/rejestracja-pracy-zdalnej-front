
const host = "http://127.0.0.1:8000/auth/";

const endpoints = {
  employees: `${host}users/`,
  companies : `${host}firma/`,
<<<<<<< HEAD
  remoteWorkRecord : `${host}zapis-pracy/`,
  remoteWork : `${host}praca/`,
=======
  remoteWorkRecord : `${host}zapis-pracy`,
  remoteWork : `${host}praca`,
>>>>>>> ekran_praca_zdalna_v1
  login: `${host}token/login/`,
  logout: `${host}token/logout/`,
  currentUser: `${host}users/me/`,
  usersAndRegister: `${host}users/`,
<<<<<<< HEAD
  workedMinutes: `${host}przepracowane-minuty/`,
=======
>>>>>>> ekran_praca_zdalna_v1
}

export default endpoints;