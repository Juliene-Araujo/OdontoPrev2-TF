export const getDentists = () => {
  return JSON.parse(localStorage.getItem("dentists"));
};

export const getPatients = () => {
  return JSON.parse(localStorage.getItem("patients"));
};

export const getSchedule = () => {
  return JSON.parse(localStorage.getItem("schedule"));
};

const getScheduleById = (scheduleId) => {
  const scheduleById = getSchedule();
  const filter = scheduleById.filter(
    (schedule) => schedule.id === parseInt(scheduleId)
  );
  if (filter !== null) {
    return filter[0];
  }
};

export const confirmAppointment = (scheduleId) => {
  updateStatusAppointment(scheduleId, "confirmed");
};

export const cancelAppointment = (scheduleId) => {
  updateStatusAppointment(scheduleId, "available");
};

const updateStatusAppointment = (scheduleId, status) => {
  const schedule = getScheduleById(scheduleId);
  schedule.status = status;
  const scheduleList = getSchedule();
  let schedulePosition = 0;
  for (let i = 0; i < scheduleList.length; i++) {
    if (scheduleList[i].id == scheduleId) {
      schedulePosition = i;
    }
  }
  scheduleList[schedulePosition] = schedule;
  localStorage.setItem("schedule", JSON.stringify(scheduleList));
}

export const scheduleAppointment = (scheduleId, patientId) => {
  const schedule = getScheduleById(scheduleId);
  schedule.patientUid = patientId;
  schedule.status = "pending";
  const scheduleList = getSchedule();
  let schedulePosition = 0;
  for (let i = 0; i < scheduleList.length; i++) {
    if (scheduleList[i].id == scheduleId) {
      schedulePosition = i;
    }
  }
  scheduleList[schedulePosition] = schedule;
  localStorage.setItem("schedule", JSON.stringify(scheduleList));
};

export const filterDentistByLoginAndPassword = (email, password) => {
  const dentists = getDentists();
  const dentistsFilter = dentists.filter(
    (dentist) => dentist.email === email && dentist.password === password
  );
  if (dentistsFilter.length > 0) {
    return dentistsFilter[0];
  } else return null;
};

export const authDentists = (idDentist) => {
  return localStorage.setItem("auth-dentist", idDentist);
};

export const getAuthDentist = () => {
  const auth = parseInt(localStorage.getItem("auth-dentist"));
  const dentists = getDentists();
  const dentistsFilter = dentists.filter((dentist) => dentist.uid === auth);
  if (dentistsFilter.length > 0) {
    return dentistsFilter[0];
  } else return null;
};

export const filterPatientByLoginAndPassword = (email, password) => {
  const patients = getPatients();
  const patientsFilter = patients.filter(
    (patient) => patient.email === email && patient.password === password
  );
  if (patientsFilter.length > 0) {
    return patientsFilter[0];
  } else return null;
};

export const authPatients = (idPatient) => {
  return localStorage.setItem("auth-patient", idPatient);
};

export const getAuthPatient = () => {
  const auth = parseInt(localStorage.getItem("auth-patient"));
  const patients = getPatients();
  const patientsFilter = patients.filter((patient) => patient.uid === auth);
  if (patientsFilter.length > 0) {
    return patientsFilter[0];
  } else return null;
};

const createDentistsData = () => {
  const dentistsArr = [];
  const dentistJuliene = {
    uid: 1,
    name: "Juliene",
    state: "São Paulo",
    city: "São Paulo",
    district: "Ipiranga",
    address: "Rua Nazaré, 123, Ipiranga, São Paulo - SP",
    email: "julienefjs@hotmail.com",
    password: "123456",
  };
  const dentistAriane = {
    uid: 2,
    name: "Ariane",
    state: "Paraná",
    city: "Curitiba",
    district: "Centro",
    address: "Rua Afonso Pena, 456, Centro, Curitiba - PR",
    email: "ariane@hotmail.com",
    password: "123456",
  };
  const dentistRodolfo = {
    uid: 3,
    name: "Rodolfo Alves",
    state: "Rio de Janeiro",
    city: "Rio de Janeiro",
    district: "Centro",
    address: "Rua Amarelos, 789, Centro, Rio de Janeiro - RJ",
    email: "rodolfo@hotmail.com",
    password: "123456",
  };
  const dentistAna = {
    uid: 4,
    name: "Ana Marques",
    state: "São Paulo",
    city: "Osasco",
    district: "Bela Vista",
    address: "Rua Valmar Verde, 456, Bela Vista, Osasco - SP",
    email: "ana@hotmail.com",
    password: "123456",
  };
  const dentistCarlos = {
    uid: 5,
    name: "Carlos Augusto Silva",
    state: "Paraná",
    city: "Curitiba",
    district: "Boa Vista",
    address: "Rua Monte Andrade, 12354, Boa Vista, Barueri - SP",
    email: "carlos@hotmail.com",
    password: "123456",
  };
  dentistsArr.push(dentistJuliene);
  dentistsArr.push(dentistAriane);
  dentistsArr.push(dentistRodolfo);
  dentistsArr.push(dentistAna);
  dentistsArr.push(dentistCarlos);
  localStorage.setItem("dentists", JSON.stringify(dentistsArr));
};

const createPatientsData = () => {
  const patientsArr = [];
  const patientTamyres = {
    uid: 123,
    name: "Tamyres",
    email: "tamyres@hotmail.com",
    password: "123456",
  };
  const patientFabiany = {
    uid: 231,
    name: "Fabiany",
    email: "fabiany@hotmail.com",
    password: "123456",
  };
  const patientRaquel = {
    uid: 4,
    name: "Raquel",
    email: "raquel@hotmail.com",
    password: "123456",
  };
  patientsArr.push(patientTamyres);
  patientsArr.push(patientFabiany);
  patientsArr.push(patientRaquel);

  localStorage.setItem("patients", JSON.stringify(patientsArr));
};

const createScheduleData = () => {
  const schedulesArr = [];
  const firstAppointment = {
    id: 1,
    dentistUid: 2,
    patientUid: null,
    time: 9,
    date: new Date("2022/12/02"),
    status: "available",
  };
  const secondAppointment = {
    id: 2,
    dentistUid: 2,
    patientUid: null,
    time: 10,
    date: new Date("2022/12/05"),
    status: "available",
  };
  const thirdAppointment = {
    id: 3,
    dentistUid: 2,
    patientUid: null,
    time: 10,
    date: new Date("2022/12/06"),
    status: "available",
  };
  const fourthAppointment = {
    id: 4,
    dentistUid: 2,
    patientUid: null,
    time: 11,
    date: new Date("2022/12/07"),
    status: "available",
  };
  const fifthAppointment = {
    id: 5,
    dentistUid: 2,
    patientUid: null,
    time: 11,
    date: new Date("2022/12/08"),
    status: "available",
  };
  const sixthAppointment = {
    id: 6,
    dentistUid: 2,
    patientUid: null,
    time: 11,
    date: new Date("2022/12/09"),
    status: "available",
  };
  const seventhAppointment = {
    id: 7,
    dentistUid: 2,
    patientUid: null,
    time: 11,
    date: new Date("2022/12/12"),
    status: "available",
  };
  schedulesArr.push(firstAppointment);
  schedulesArr.push(secondAppointment);
  schedulesArr.push(thirdAppointment);
  schedulesArr.push(fourthAppointment);
  schedulesArr.push(fifthAppointment);
  schedulesArr.push(sixthAppointment);
  schedulesArr.push(seventhAppointment);
  localStorage.setItem("schedule", JSON.stringify(schedulesArr));
};

export const initData = () => {
  createDentistsData();
  createPatientsData();
  createScheduleData();
};
