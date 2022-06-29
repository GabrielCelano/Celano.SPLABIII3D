const url = "http://localhost:3001/anuncios";
const tableContainer = document.querySelector(".table-container");
const getAnunciosAjax = () => {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        crearAnuncios(data);
      } else {
        console.error(xhr.status, xhr.statusText);
      }
    }
  });

  xhr.open("GET", url);
  xhr.send();
};

getAnunciosAjax();

function crearAnuncios(vec) {
  vec.forEach((element) => {
    console.log(element);
    tableContainer.appendChild(crearAnuncio(element));
  });
}

function crearAnuncio(elemento) {
  const container = document.createElement("div"),
        div1 = document.createElement("div"),
        div2 = document.createElement("div"),
        div3 = document.createElement("div"),
        div4 = document.createElement("div"),
        div5 = document.createElement("div"),
        div6 = document.createElement("div"),
        div7 = document.createElement("div"),
        h4 = document.createElement("h4"),
        h6 = document.createElement("h6"),
        p1 = document.createElement("p"),
        p2 = document.createElement("p"),
        p3 = document.createElement("p"),
        p4 = document.createElement("p"),
        p5 = document.createElement("p"),
        img1 = document.createElement("img"),
        img2 = document.createElement("img"),
        img3 = document.createElement("img"),
        img4 = document.createElement("img");


  container.setAttribute("class", "container");

  div1.setAttribute("class", "card-columns row pt-3 justify-content-center");
  container.appendChild(div1);

  div2.setAttribute("class", "col-6");
  div1.appendChild(div2);

  div3.setAttribute("class", "card text-center");
  div2.appendChild(div3);
  
  div4.setAttribute("class", "card-header");
  h4.innerText = elemento.titulo;
  div4.appendChild(h4);
  div3.appendChild(div4);

  div5.setAttribute("class", "card-body");
  div3.appendChild(div5);

  div6.setAttribute("class", "card-title");
  h6.innerText = elemento.descripcion;
  div6.appendChild(h6);
  p1.innerText = '$'+elemento.precio;
  div5.appendChild(div6);
  div5.appendChild(p1);

  div7.setAttribute("class", "card-text");

  img1.setAttribute("src", "../img/pie.svg");
  p2.innerText = elemento.raza;
  p2.appendChild(img1);
  div7.appendChild(p2);


  img2.setAttribute("src", "../img/gato.svg");
  p3.innerText = elemento.fecha_de_nacimiento;
  p3.appendChild(img2);
  div7.appendChild(p3);

  img3.setAttribute("src", "../img/vacuna.svg");
  p4.innerText = elemento.vacuna;
  p4.appendChild(img3);
  div7.appendChild(p4);

  img4.setAttribute("src", "../img/bisturi.svg");
  p5.innerText = elemento.castrado;
  p5.appendChild(img4);
  div7.appendChild(p5);
  
  div5.appendChild(div7);
  return container;
}

/* function crearCartel(elemento) {
  const div = document.createElement("div"),
    h1 = document.createElement("h1"),
    h5 = document.createElement("h5"),
    h4 = document.createElement("h4"),
    p1 = document.createElement("p"),
    p2 = document.createElement("p"),
    p3 = document.createElement("p"),
    p4 = document.createElement("p"),
    img1 = document.createElement("img"),
    img2 = document.createElement("img"),
    img3 = document.createElement("img"),
    img4 = document.createElement("img");

  h1.innerText = elemento.titulo;
  div.appendChild(h1);

  h5.innerText = elemento.descripcion;
  div.appendChild(h5);
  h4.innerText = "$ " + elemento.precio;
  div.appendChild(h4);

  img1.setAttribute("src", "../img/pie.svg");
  img1.setAttribute("class", "svg");
  div.appendChild(img1);
  p1.innerText = elemento.raza;
  p1.setAttribute("class", "info");
  div.appendChild(p1);

  img2.setAttribute("src", "../img/gato.svg");
  img2.setAttribute("class", "svg");
  div.appendChild(img2);
  p2.innerText = elemento.fecha_de_nacimiento;
  p2.setAttribute("class", "info");
  div.appendChild(p2);

  img3.setAttribute("src", "../img/vacuna.svg");
  img3.setAttribute("class", "svg");
  div.appendChild(img3);
  p3.innerText = elemento.vacuna;
  p3.setAttribute("class", "info");
  div.appendChild(p3);

  img4.setAttribute("src", "../img/bisturi.svg");
  img4.setAttribute("class", "svg");
  div.appendChild(img4);
  p4.innerText = elemento.castrado;
  p4.setAttribute("class", "info");
  div.appendChild(p4);
  return div;
}
 */