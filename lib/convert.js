export const convertData = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDay();
  const ptBr = date.toLocaleDateString('pt-br');
  switch (day) {
    case 0:
      return `Domingo – 
      ${ptBr} `;
    case 1:
      return `Segunda – 
      ${ptBr} `;
    case 2:
      return `Terça – 
      ${ptBr} `;
    case 3:
      return `Quarta – ${ptBr} `;
    case 4:
      return `Quinta – ${ptBr} `;
    case 5:
      return `Sexta – ${ptBr}`;
    case 6:
      return `Sábado – ${ptBr}`;
  }
}