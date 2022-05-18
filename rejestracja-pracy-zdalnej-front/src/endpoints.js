
const host = "http://127.0.0.1:8000/auth/";

const endpoints = {
  employees: `${host}users/`,
  companies : `${host}firma/`,
  remoteWorkRecord : `${host}zapis-pracy/`,
  remoteWork : `${host}praca/`,
  remoteWorkRecord : `${host}zapis-pracy`,
  remoteWork : `${host}praca`,
  login: `${host}token/login/`,
  logout: `${host}token/logout/`,
  currentUser: `${host}users/me/`,
  usersAndRegister: `${host}users/`,
  workedMinutes: `${host}przepracowane-minuty/`,
}

export default endpoints;