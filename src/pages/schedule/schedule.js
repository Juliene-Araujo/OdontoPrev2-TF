import { convertData } from "../../lib/convert.js";
import {
  getAuthPatient,
  getSchedule,
  scheduleAppointment,
  getDentists,
  cancelAppointment,
} from "../../lib/storage.js";

export default () => {

  const patient = getAuthPatient();
  console.log(patient)
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
        
          <section class="filter-dentist">
          <div class="plocation">
          <p class="findlocation section-select">Encontre um dentista OdontoPrev perto de você:</p>
      <select name="select-states " id="select-states" class="selects">
        <option value="default">Estado</option>
      </select>
      <select name="select-citys" id="select-citys" class="selects">
        <option value="default">Cidade</option>
      </select>
      </div>
      <div class="input-label search">
          <label  id="labelSearch">Busque pelo endereço ou nome do seu dentista: </label>
          <input  type="text" class="search-bar" name="input-search" id="input-search" placeholder="🔎 ex: Estado, Bairro, Nome..."/>
      </div>
    </section>
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
  const menuCitys = container.querySelector('#select-citys');
  const inputSearch = container.querySelector('#input-search');

  const btnHome = document.querySelector(".logo-img");
  btnHome.addEventListener("click", () => {
    window.location.hash = '#home';
  });


  const extractStates = (listState) => {
    const templateState = listState.map((dentist) => dentist.state);
    const templateSelect = templateState.filter((elem, i, array) => array.indexOf(elem) === i);
    menuStates.innerHTML += templateSelect.map((state) => `<option value="${state}">${state}</option>`);
  };
  extractStates(dentistsData);


  const extractCitys = (listState) => {
    const templateCity = listState.map((dentist) => dentist.city);
    const templateSelect = templateCity.filter((elem, i, array) => array.indexOf(elem) === i);
    menuCitys.innerHTML += templateSelect.map((city) => `<option value="${city}">${city}</option>`);
  };
  extractCitys(dentistsData);


  const printSchedule = (dentistList) => {
    table.innerHTML = '';
    const schedule = getSchedule();
    dentistList.forEach((dentist) => {
      const dentistsSchedule = schedule.filter((time) => time.status == 'available' && time.dentistUid == dentist.uid)
      const dentistsScheduleElement = dentistsSchedule.map(time => `
            <div class="schedule-date-time">
              <div class="detist-date">${convertData(time.date)}</div> 
              ${time.status === "available"
          ? `<div data-id=${time.id} class="schedule-date schedule-time">${time.time} :00 `
          : ""
        }
              <div class="modal modal-appointments">
              <div class="internal-modal">
                <p> Deseja confirmar seu agendamento?</p>
                <div>Para o dia ${convertData(time.date)}</div>
                <div>às ${time.time}:00h.</div>
                <div> com Dr.(a) ${dentist.name}.</div>
                <div> Seu dentista tem o prazo de até 1 dia útil para confirmar sua consulta.</div>
                <button class="btn-del" data-sim="true"> SIM </button>
                <button class="btn-del" data-nao="true"> NÃO </button>
              </div>
            </div>
              </div>
          </div>
          `).join('');
      table.innerHTML += `
          <div class="dentist-template">
            <div class="dentist-info">
              <div class="dentist-picture"> 
                <img src="./assets/icons/others/user.svg" class="dentist-pfp" alt="dentist picture">
              </div>
              <p class="dentist-name"><strong>Dentista:</strong> ${dentist.name}.</p>
              <p class="dentist-name"><strong>Endereço:</strong> ${dentist.address}.</p>
            </div> 
            ${dentistsScheduleElement}
          </div>`;
    })


    const availability = table.querySelectorAll(".schedule-date");
    availability.forEach((avail) => {
      avail.addEventListener("click", (e) => {
        const patient = getAuthPatient();
        const id = e.currentTarget.dataset.id;
        const modal = e.currentTarget.querySelector('.modal');
        if (id) {
          modal.style.display = 'flex';
        }
        if (e.target.dataset.sim) {
          modal.style.display = 'none';
          const patient = getAuthPatient();
          scheduleAppointment(id, patient.uid)
          printSchedule(dentistList);
        }
        if (e.target.dataset.nao) {
          modal.style.display = 'none';
        }
      });
    })
  };


  printSchedule(dentistsData);


  const printSchedulePatient = () => {
    const templatePatients = getSchedule()
      .filter((time) => time.patientUid === patientsData.uid && time.status == "confirmed")
      .map((time) => {
        const dentist = dentistsData.find((dentist) => dentist.uid == time.dentistUid);
        return `
        <div data-id=${time.id} class="schedule-date">
          <div class="scheduling-information">
            <p><strong>Data de agendamento:</strong> ${convertData(time.date)} às ${time.time}:00hs.</p>  
            <p><strong>Dentista:</strong> Dra. ${dentist.name}.</p> 
            <p><strong>Local de atendimento:</strong> ${dentist.address}.</p>
          </div>
          <div>
            <button data-id=${time.id} class="btn-cancel-appointment" id="btn-cancel-appointment">Cancelar Agendamento</button>
              <div class="modal">
                <div class="internal-modal">
                  <p> Deseja cancelar esse agendamento?</p>
                  <div>Para ${convertData(time.date)}</div>
                  <div>às ${time.time}:00h, com Dr(a). ${dentist.name}?</div>
                  <button class="btn-del" data-action="confirm"> SIM </button>
                  <button class="btn-del" data-action="cancel"> NÃO </button>
                  </div>
                </div>
          </div>
        </div>
   `;
      })

    tablePatient.innerHTML += templatePatients;

  };

  printSchedulePatient();

  const cancelBtn = tablePatient.querySelectorAll('.btn-cancel-appointment');

  cancelBtn.forEach((btn) => {
    btn.addEventListener("click", (el) => {
      const target = el.currentTarget.dataset.id;
      const targetParent = el.target.parentElement.dataset;
      const modal = el.target.parentElement.querySelector('.modal');
      if (target) {
        modal.style.display = 'flex';
        modal.addEventListener("click", (e) => {
          const action = e.target.dataset.action;
          switch (action) {
            case "confirm":
              cancelAppointment(target);
              modal.style.display = 'none';
              window.location.reload();
              break;
            case "cancel":
              modal.style.display = 'none';
              break;
          }
        })
      }
    });
  });

  const filterSearch = (dentists, text) =>
    dentists.filter((dentist) => dentist.address.toLowerCase().includes(text.toLowerCase()) || dentist.name.toLowerCase().includes(text.toLowerCase()));
  console.log(filterSearch);

  inputSearch.addEventListener("input", () => {
    let text = inputSearch.value;
    const result = filterSearch(dentistsData, text)
    console.log(result)
    printSchedule(result);
  });


  menuStates.addEventListener('change', () => {
    const state = menuStates.value;
    const result = dentistsData.filter((dentist) => dentist.state == state)
    printSchedule(result);
    filter = result;
  });

  menuCitys.addEventListener('change', () => {
    const city = menuCitys.value;
    const result = dentistsData.filter((dentist) => dentist.city == city)
    printSchedule(result);
  });


  return container;
};