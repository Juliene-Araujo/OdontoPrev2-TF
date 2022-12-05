import { authDentists, filterDentistByLoginAndPassword } from "../../../lib/storage.js";
import {
  validateEmail,
  validatePassword,
} from "../../../lib/data/validation.js";

export default () => {
  const containerLoginDentist = document.createElement('div');    
  containerLoginDentist.classList.add('container-login-dentist')    
  const templateLoginDentist = `  
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
        <input type="email" placeholder="Digite seu e-mail" id="input-email" class="input-login-dentist">
        <input type="password" placeholder="Digite sua senha" id="input-password" class="input-login-dentist">
        <a href="" class="forgot-password" id="id-forgot-password">Esqueci minha senha</a>
        <p id="error-message" class="error-message"></p>
        <p class="text-dentist-login">Ainda não é um dentista OdontoPrev?</p>
        <a href="" class="btn-register">Cadastra-se</a>
        <button id="btn-login-dentist" class="login-dentist-btn">Entrar</button>
      </form>          
  </div>

    `;
  containerLoginDentist.innerHTML = templateLoginDentist; 

  const emailDentist = containerLoginDentist.querySelector('#input-email');
  const passwordDentist = containerLoginDentist.querySelector('#input-password');
  const btnLoginDentist = containerLoginDentist.querySelector('#btn-login-dentist');
  const errorMessage = containerLoginDentist.querySelector("#error-message");

  btnLoginDentist.addEventListener("click", () => {

    const dentist = filterDentistByLoginAndPassword(emailDentist.value, passwordDentist.value);
    const emailValidation = validateEmail(emailDentist.value);
    const passwordValidation = validatePassword(passwordDentist.value);
    if (emailValidation) {
      errorMessage.innerHTML = emailValidation;
    } else if (passwordValidation) {
      errorMessage.innerHTML = passwordValidation;
    } else {
      if (dentist !== null) {
        authDentists(dentist.uid);
        console.log(dentist.uid);
        window.location.hash = "#appointment";
      } else {
        errorMessage.innerHTML =
        "Conta não cadastrada. Entre com as credenciais disponibilizadas no readme.";
      }
    }
  });

  const btnHome = document.querySelector(".logo-img");
  btnHome.addEventListener("click", () => {
    window.location.hash = '#home';
  });

  return containerLoginDentist;
};