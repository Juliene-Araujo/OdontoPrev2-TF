import { convertData } from "../../lib/convert.js";
import {
  getAuthPatient,
  getSchedule,
  scheduleAppointment,
  getDentists,
} from "../../lib/storage.js";

  const patient = getAuthPatient();
  const schedule = getSchedule();

export default () => {
  const container = document.createElement('div');
  const template = `    
  <div class="my-schedule main-page-schedule">
    <div class="scheduling-patient">
      <span class="patient-name">Olá, ${patient.name}.</span>
      <strong class="next-appointments">Seus próximos agendamentos:</strong>
      <div class="scheduling-confirmed">      
      </div>
    </div>
    <h1 class="schedule-an-appointment">Agende uma consulta com nossos dentistas:</h1>
    <section class="filter-dentist">
    <p class="findlocation">Encontre um dentista no seu estado:</p>
      <select name="select-states" id="select-states" class="selects">
        <option value="default">Estado</option>
      </select>
      </section>
      
          <div class="schedule-dentist">
          </div> 
    </div>  
  </div>
    `;
  container.innerHTML = template;

  const patientsData = getAuthPatient();
  const dentistsData = getDentists();
  const table = container.querySelector(".schedule-dentist");
  const tablePatient = container.querySelector(".scheduling-confirmed")
  const menuStates = container.querySelector('#select-states');
  // const menuSpecialties = container.querySelector('#select-states');
  const postDentists = container.querySelector('#box-dentists');

  // menu Estado //
  const extractStates = (listState) => {
    const templateState = listState.map((dentist) => dentist.state);
    const templateSelect = templateState.filter((elem, i, array) => array.indexOf(elem) === i);
    menuStates.innerHTML += templateSelect.map((state) => `<option value="${state}">${state}</option>`);
  };

  extractStates(dentistsData);


  
  const printSchedule = (dentistList) => {
    table.innerHTML = '';
    const schedule = getSchedule();
    dentistList.forEach((dentist) => {
      const dentistsSchedule = schedule.filter((time) => time.status == 'available' && time.dentistUid == dentist.uid)
      const dentistsScheduleElement = dentistsSchedule.map(time => `

            <div class="schedule-date-time">
              <div class="detist-date">${convertData(time.date)}</div> 
              ${
                time.status === "available"
                  ? `<div data-id=${time.id} class="schedule-date schedule-time">${time.time} :00 `
                  : ""
              }
              </div>
          </div>

          `).join('');
               table.innerHTML += `
          <div class="dentist-template">
            <div class="dentist-info">
              <div class="dentist-picture"> 
                <img src="./assets/icons/others/user.svg" class="dentist-pfp" alt="dentist picture">
              </div>
              <p class="dentist-name">Dentista: ${dentist.name}.</p>
            </div> 
            ${dentistsScheduleElement}
          </div>`;
    })
      
    const availability = table.querySelectorAll(".schedule-date");
    availability.forEach((avail) => {
      avail.addEventListener("click", (e) => {
        const patient = getAuthPatient();
        const id = e.currentTarget.dataset.id;
        scheduleAppointment(id, patient.uid)
        printSchedule(dentistList);
        console.log(id);
      });
    })
  };

  printSchedule(dentistsData);
 
  // template da agenda do beneficiário
  const printSchedulePatient = () => {  
    const templatePatients = getSchedule()
      .filter((time) => time.patientUid === patientsData.uid && time.status == "confirmed" )
      .map((time) => {
        const dentist = dentistsData.find((dentist) => dentist.uid == time.dentistUid);
        return `
        <div data-id=${time.id} class="schedule-date">
          <div class="scheduling-information">
            <p><strong>Data de agendamento:</strong> ${convertData(time.date)} às ${time.time}:00hs.</p>  
            <p><strong>Dentista:</strong> Dra. ${dentist.name}.</p> 
            <p><strong>Local de atendimento:</strong> ${dentist.address}.</p>
          </div>
          <button class="btn-cancel-appointment" id="btn-cancel-appointment">Cancelar Agendamento</button>
        </div>
   `;
      })

    tablePatient.innerHTML += templatePatients;

  };

  printSchedulePatient();

  // template 

  menuStates.addEventListener('change', () => {
    const state = menuStates.value;
    console.log(state)
    const result = dentistsData.filter((dentist) => dentist.state == state)
    console.log(result)
    printSchedule(result);
  });

  return container;
};