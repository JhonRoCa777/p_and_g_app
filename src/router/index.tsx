const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

export const ROUTER = {
  MAIN: '',
  HOME: {
    MAIN: 'home',
    CALCULATOR: 'calculadora',
    DASHBOARD: 'dashboard'
  },
  UNAUTHORIZED: 'denegado',
  LOGIN: () => window.location.href = LOGIN_URL
};
