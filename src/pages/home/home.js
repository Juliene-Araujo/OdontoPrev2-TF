
export default () => {
  const container = document.createElement('div');
  const template = `  
  <div class="body-home">
    <main class="container-home">
      <div class="home-btn-text">
        <div class="text-title-home">
          <h1 class="h1"> Especialistas em odontologia </h1>
        </div>
        <p class="text-home">Grupo OdontoPrev: líder em planos odontologicos na América Latina.
          <br><br>
          O plano dental mais completo para você, sua família e seus colaboradores, com qualidade e segurança. 
          Um novo jeito de cuidar da sua saúde bucal.
        </p>
        <span class="space-btn-home">
          <button class="btn-patients btn-home" id="btn-patients">
            Beneficiário 
          </button>
          <button class="btn-dentist btn-home" id="btn-dentist">
            Dentista
          </button>
        <span>
      </div>
      <picture class="slider home-page-img">
        <img class="selected" src="assets/logo/foto.jpeg">
        <img src="assets/logo/foto2.jpeg">
        <img src="assets/logo/foto3.jpeg">
      </picture>
    </main>  
  </div>
    `;
  container.innerHTML = template;

  const btnPatients = container.querySelector('#btn-patients');
  const btnDentists = container.querySelector('#btn-dentist');

  btnDentists.addEventListener('click', () => {
    window.location.hash = '#login-dentist';
  })

  btnPatients.addEventListener('click', () => {
    window.location.hash = '#login-patient';
  })

  let time = 5000;
  let imageIndex = 0;
  let imageSelected = container.querySelectorAll('.slider img');
  let maxImage = imageSelected.length;

  const nextImage = () => {
    imageSelected[imageIndex].classList.remove('selected');
    imageIndex++
    if (imageIndex >= maxImage) {
      imageIndex = 0;
    }
    imageSelected[imageIndex].classList.add('selected');
  }

  const start = () => {
    setInterval(() => { nextImage() }, time);
  }
  console.log(start);

  start()

  return container;
};