const BODY = document.getElementById("main");

let intervalo;
let botonclick = false;
let boton = document.createElement("button");
let titulo = document.createElement("h1");
let date = document.createElement("input");
let tabla = document.createElement("table");
let trow = document.createElement("tr");
let tituloMes = document.createElement("th");
let tituloDia = document.createElement("th");
let tituloHora = document.createElement("th");
let tituloMinuto = document.createElement("th");
let tituloSegundo = document.createElement("th");
let trow2 = document.createElement("tr");
let valorMes = document.createElement("td");
let valorDia = document.createElement("td");
let valorHora = document.createElement("td");
let valorMinuto = document.createElement("td");
let valorSegundo = document.createElement("td");

titulo.textContent = "La fecha límite es: ...";
tituloMes.textContent = " Mes ";
tituloDia.textContent = " Día ";
tituloHora.textContent = " Horas ";
tituloMinuto.textContent = " Minutos ";
tituloSegundo.textContent = " Segundos ";

BODY.append(titulo);
tabla.append(trow);
trow.append(tituloMes, tituloDia, tituloHora, tituloMinuto, tituloSegundo);
tabla.append(trow2);
trow2.append(valorMes, valorDia, valorHora, valorMinuto, valorSegundo);
BODY.append(tabla);
BODY.append(boton);
BODY.append(date);

date.setAttribute("type", "text");
boton.textContent = "Submit";
boton.setAttribute("type", "button");

boton.addEventListener("click", cargar);
function cargar() {
  if (Date.parse(date.value)) {
    titulo.innerText = "La fecha límite es: " + date.value + ".";
    clearInterval(intervalo);
    contar();
    botonclick = true;
    intervalo = window.setInterval(contar, 1000);
  }
}

function contar() {
  if (botonclick) {
    const Fecha = new Date(date.value);
    const Now = new Date();
    const Diferecia = Fecha - Now;

    if (Diferecia < 0) {
      valorMes.textContent = "";
      valorDia.textContent = "";
      valorHora.textContent = "";
      valorMinuto.textContent = "";
      valorSegundo.textContent = "Tiempo agotado";
      clearInterval(intervalo);
    } else {
      const Mes = Math.floor(Diferecia / (30 * 24 * 60 * 60 * 1000));
      const Dia = Math.floor(
        (Diferecia % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
      );
      const Horas = Math.floor(
        (Diferecia % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const Minutos = Math.floor((Diferecia % (60 * 60 * 1000)) / (60 * 1000));
      const Segundos = Math.floor((Diferecia % (60 * 1000)) / 1000);

      valorMes.textContent = Mes;
      valorDia.textContent = Dia;
      valorHora.textContent = Horas;
      valorMinuto.textContent = Minutos;
      valorSegundo.textContent = Segundos;

      if (Mes > 1) {
        tabla.style.color = "green";
      } else if (Dia < 7) {
        tabla.style.color = "red";
      } else if (Dia < 14) {
        tabla.style.color = "orange";
      }

      if (
        Mes === 0 &&
        Dia === 0 &&
        Horas === 0 &&
        Minutos === 0 &&
        Segundos === 0
      ) {
        alert("¡El tiempo ha llegado!");
        clearInterval(intervalo);
      }
    }
  }
  botonclick = false;
}
