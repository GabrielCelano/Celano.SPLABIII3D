import Mascota from "./anuncio_animal.js";
import crearTabla from "./tabla.js";

const url = "http://localhost:3001/anuncios";
const $form = document.forms[0];
const $btnGuardar = document.getElementById("btnGuardar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");
const $inputPromedio = document.getElementById("inputPromedio");

/* SPINNER */
//#region
const cargarSpinner = () => {
  const divSpinner = document.querySelector(".spinner");

  if (!divSpinner.hasChildNodes()) {
    const spinner = document.createElement("img");
    spinner.setAttribute("src", "./img/cat.gif");
    spinner.setAttribute("alt", "icono spinner");
    divSpinner.appendChild(spinner);
  }
};

const eliminarSpinner = () => {
  const divSpinner = document.querySelector(".spinner");
  while (divSpinner.hasChildNodes()) {
    divSpinner.removeChild(divSpinner.firstChild);
  }
};
//#endregion

/* HTTP*/
//#region
/* GET */
const getAnunciosFetchAsync = async (filtro = "todos") => {
  try {
    cargarSpinner();
    alertaCustom("Buscando anuncios");
    const res = await fetch(url);
    if (!res.ok) {
      throw Promise.reject(res);
    }
    const data = await res.json();
    if (filtro === "todos") {
      aplicarReduce(data);
      actualizarTabla(data);
    } else {
      let nuevaData = data.filter(function (anuncio) {
        if (anuncio.animal == filtro) return anuncio;
      });
      aplicarReduce(nuevaData);
      actualizarTabla(nuevaData);
    }
  } catch (err) {
    console.error(err.status, err.statusText);
  }
};
getAnunciosFetchAsync();

const getAnuncioAjax = (id) => {
  alertaCustom("Buscando anuncio");
  cargarSpinner();
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        $btnEliminar.disabled = false;
        $btnCancelar.disabled = false;
        $btnGuardar.disabled = false;
        llenarFormulario(data);
        eliminarAlertaCustom();
        eliminarSpinner();
      } else {
        console.error(xhr.status, xhr.statusText);
      }
    }
  });

  xhr.open("GET", `${url}/${id}`);
  xhr.send();
};
/* POST */
const postAnuncioAjax = (nuevoAnuncio) => {
  alertaCustom("Guardando");
  cargarSpinner();
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        actualizarTabla(data);
      } else {
        console.error(xhr.status, xhr.statusText);
      }
    }
  });

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf8");
  xhr.send(JSON.stringify(nuevoAnuncio));
};
/* DELETE */
const deleteAnuncioAjax = (id) => {
  alertaCustom("Eliminando");
  cargarSpinner();
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
      } else {
        console.error(xhr.status, xhr.statusText);
      }
    }
  });

  xhr.open("DELETE", `${url}/${id}`);
  xhr.send();
};
/* PUT */
const putAnuncioAjax = (nuevoAnuncio) => {
  alertaCustom("Modificando");
  cargarSpinner();
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        eliminarAlertaCustom();
      } else {
        console.error(xhr.status, xhr.statusText);
      }
    }
  });

  xhr.open("PUT", `${url}/${nuevoAnuncio.id}`);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf8");
  xhr.send(JSON.stringify(nuevoAnuncio));
};

/* ACTUALIZAR TABLA */
function actualizarTabla(lista) {
  const container = document.querySelector(".table-responsive");
  while (container.hasChildNodes()) {
    container.removeChild(container.firstElementChild);
  }
  if (lista) {
    container.appendChild(crearTabla(lista));
  }
  eliminarAlertaCustom();
  eliminarSpinner();
}
//#endregion

/* EVENTOS */
//#region
document.getElementById("slcFiltro").addEventListener("change", (e) => {
  if (e.target.value === "gato") {
    getAnunciosFetchAsync(e.target.value);
  } else if (e.target.value === "perro") {
    getAnunciosFetchAsync(e.target.value);
  } else {
    getAnunciosFetchAsync();
  }
});

window.addEventListener("submit", () => {
  if (validarAlta()) {
    const id = $form.id.value,
      titulo = $form.txtTitulo.value,
      descripcion = $form.txtDescripcion.value,
      animal = $form.rdoAnimal.value,
      castrado = $form.chkCastrado.value,
      precio = parseInt($form.nmbPrecio.value),
      raza = $form.txtRaza.value,
      fechaNacimiento = $form.dateFecha.value,
      vacuna = $form.slcVacunas.value;

    const anuncio = new Mascota(
      id,
      titulo,
      descripcion,
      precio,
      animal,
      raza,
      fechaNacimiento,
      vacuna,
      castrado
    );
    if ($btnGuardar.value === "btnGuardar") {
      anuncio.id = Date.now();
      postAnuncioAjax(anuncio);
    } else {
      putAnuncioAjax(anuncio);
    }
  }
});

window.addEventListener("click", (e) => {
  if (e.target.matches("tr td")) {
    mostrarBotones();
    $btnGuardar.value = "btnModificar";
    $btnGuardar.disabled = true;
    $btnEliminar.disabled = true;
    $btnCancelar.disabled = true;
    getAnuncioAjax(parseInt(e.target.parentElement.dataset.id));
  }
});

window.addEventListener("load", () => {
  document
    .getElementById("btnCancelar")
    .addEventListener("click", ocultarBotones);
  document.getElementById("btnEliminar").addEventListener("click", () => {
    deleteAnuncioAjax(parseInt($form.id.value));
  });
  document
    .getElementById("chkCastrado")
    .addEventListener("click", verificarCheckbox);

  document.getElementById("columTitulo").addEventListener("change", () => {
    $("td:nth-child(1)").toggle();
    $("th:nth-child(1)").toggle();
  });
  document.getElementById("columTransaccion").addEventListener("change", () => {
    $("td:nth-child(2)").toggle();
    $("th:nth-child(2)").toggle();
  });
  document.getElementById("columDescripcion").addEventListener("change", () => {
    $("td:nth-child(3)").toggle();
    $("th:nth-child(3)").toggle();
  });
  document.getElementById("columPrecio").addEventListener("change", () => {
    $("td:nth-child(4)").toggle();
    $("th:nth-child(4)").toggle();
  });
  document.getElementById("columAnimal").addEventListener("change", () => {
    $("td:nth-child(5)").toggle();
    $("th:nth-child(5)").toggle();
  });
  document.getElementById("columRaza").addEventListener("change", () => {
    $("td:nth-child(6)").toggle();
    $("th:nth-child(6)").toggle();
  });
  document.getElementById("columFecha").addEventListener("change", () => {
    $("td:nth-child(7)").toggle();
    $("th:nth-child(7)").toggle();
  });
  document.getElementById("columVacuna").addEventListener("change", () => {
    $("td:nth-child(8)").toggle();
    $("th:nth-child(8)").toggle();
  });
  document.getElementById("columCastrado").addEventListener("change", () => {
    $("td:nth-child(9)").toggle();
    $("th:nth-child(9)").toggle();
  });
});

//#endregion

/* FORMULARIO */
//#region
function llenarFormulario(anuncio) {
  $form.id.value = anuncio.id;
  $form.txtTitulo.value = anuncio.titulo;
  $form.txtDescripcion.value = anuncio.descripcion;
  $form.nmbPrecio.value = anuncio.precio;
  $form.txtRaza.value = anuncio.raza;
  $form.rdoAnimal.value = anuncio.animal;
  $form.dateFecha.value = anuncio.fecha_de_nacimiento;
  $form.slcVacunas.value = anuncio.vacuna;
  if (anuncio.castrado === "si") {
    $form.chkCastrado.checked = true;
  } else {
    $form.chkCastrado.checked = false;
  }
}

function ocultarBotones() {
  $form.reset();
  $btnEliminar.setAttribute("class", "invisible");
  $btnCancelar.setAttribute("class", "invisible");
  $btnGuardar.value = "btnGuardar";
  $form.id.value = "";
}

function mostrarBotones() {
  document
    .getElementById("btnEliminar")
    .setAttribute("class", "btn btn-danger");
  document
    .getElementById("btnCancelar")
    .setAttribute("class", "btn btn-warning");
}
//#endregion

/* ALERT */
//#region
function alertaCustom(mensaje) {
  const alerta = document.getElementById("alertaCustom");
  alerta.removeAttribute("style");

  if (mensaje == "Eliminando")
    alerta.setAttribute("class", "alert alert-danger text-center");
  else alerta.setAttribute("class", "alert alert-primary text-center");

  alerta.setAttribute("role", "alert");
  alerta.innerText = mensaje + "...";
}

function eliminarAlertaCustom() {
  const alert = document.getElementById("alertaCustom");
  alert.setAttribute("style", "display: none;");
  alert.removeAttribute("class");
}
//#endregion

/* VALIDACIONES */
//#region
function validarString(element) {
  if (element.value.length === 0 || !isNaN(element.value)) {
    alert("Solo ingresar letras!");
    element.focus();
  } else {
    return 1;
  }
}

function validarAlta() {
  if (
    validarString($form.txtTitulo) &&
    validarString($form.txtDescripcion) &&
    validarString($form.txtRaza)
  ) {
    return 1;
  }
  return 0;
}

function verificarCheckbox() {
  const checkBox = document.getElementById("chkCastrado");
  if (checkBox.checked == true) {
    checkBox.setAttribute("value", "si");
  } else {
    checkBox.setAttribute("value", "no");
  }
}
//#endregion

function aplicarReduce(data) {
  let sum = data.reduce(function (anterior, actual) {
    return (anterior += actual.precio);
  }, 0);
  $inputPromedio.setAttribute("value", `${sum / data.length}`);
  return sum;
}
