import '../lib/firebase/config.js';
import home from '../pages/home/home.js';
import loginDentist from '../pages/login/dentist/login-dentist.js';
import loginPatient from '../pages/login/patient/login-patient.js';
import schedule from '../pages/schedule/schedule.js';
import appointment from '../pages/appointment/appointment.js';
import { initData } from './storage.js';

const main = document.querySelector('.main');
const initScreens = () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#':
      main.appendChild(home());
      break;
    case '#login-dentist':
      main.appendChild(loginDentist());
      break;
    case '#login-patient':
      main.appendChild(loginPatient());
      break;
    case '#schedule':
      main.appendChild(schedule());

      break;
      case '#appointment':
        main.appendChild(appointment());
        break;
    default: main.appendChild(home());
  }
};

const btnHome = document.querySelector(".logo-img");
btnHome.addEventListener("click", () => {
  window.localtion.hash="#home"
})

window.addEventListener('hashchange', () => {
  initScreens();
});

window.addEventListener('load', () => {
  initScreens();
});

if(localStorage.length==0){
  initData();
}