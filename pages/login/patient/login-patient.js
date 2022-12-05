import { authPatients, filterPatientByLoginAndPassword } from "../../../lib/storage.js";
import {
  validateEmail,
  validatePassword
} from "../../../lib/data/validation.js"

export default () => {
  const containerLoginPatient = document.createElement('div');
  containerLoginPatient.classList.add('container-login-patient')    
  const templateLoginPatient = `    
  <div class="box">
    <div class="box">    
    <div class="login-logo">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img class="logo-img" src="./assets/logo/logo-art.svg" alt="logo">
          </div>
        <div class="flip-card-back">
          <h1>OdontoPrev</h1>
          <p>O nosso desejo é</p>
          <p>despertar sorrisos</p>
        </div>
      </div>
    </div>
  </div> 
  
    <form class="login-form">
      <p class="welcome">Bem-vindo de volta!</p>
      <input type="email" placeholder="Digite seu e-mail" id="input-email" class="input-login-patient">
      <input type="password" placeholder="Digite sua senha" id="input-password" class="input-login-patient">
      <a href="" class="forgot-password" id="id-forgot-password">Esqueci minha senha</a>
      <p id="error-message" class="error-message"></p>

      <p class="text-patient-login">É beneficiário e não possui uma conta?</p>
      <a href="" class="btn-register">Cadastra-se</a>

      <button id="btn-login-patient" class="login-patient-btn">Entrar</button>
    </form>          
  </div>
    `;
  containerLoginPatient.innerHTML = templateLoginPatient; 

  const emailPatient = containerLoginPatient.querySelector('#input-email');
  const passwordPatient = containerLoginPatient.querySelector('#input-password');
  const btnLoginPatient = containerLoginPatient.querySelector('#btn-login-patient');
  const errorMessage = containerLoginPatient.querySelector('#error-message');

  btnLoginPatient.addEventListener('click', () => {

    const patient = filterPatientByLoginAndPassword(emailPatient.value, passwordPatient.value);
    const emailValidation = validateEmail(emailPatient.value);
    const passwordValidation = validatePassword(passwordPatient.value);
    if (emailValidation) {
      errorMessage.innerHTML = emailValidation;
    } else if (passwordValidation) {
      errorMessage.innerHTML = passwordValidation;
    } else {
      if (patient !== null) {
        authPatients(patient.uid);
        console.log(patient.uid);
        window.location.hash = "#schedule";
      } else {
        errorMessage.innerHTML =
          "Conta não cadastrada. Entre com as credenciais disponibilizadas no readme.";
      }
    }

  })

  const btnHome = document.querySelector(".logo-img");
  btnHome.addEventListener("click", () => {
    window.location.hash = '#home';
  });
    
  return containerLoginPatient;
};