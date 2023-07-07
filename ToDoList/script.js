import datos from "../datas/data.json" assert {type: "json"};
import { Slope } from "../datas/clases.js";

const lista = document.querySelector("#list-slopes");
const myModal = new bootstrap.Modal(document.getElementById('modalGift'));

let idUpdate = null;

window.mostrar = (id) => {
    console.log(id);
    idUpdate = id;
    let index = datos.findIndex((item) => item.id == idUpdate); 

    document.querySelector("#slopeModal").value = datos[index].slope;
    document.querySelector("#numberModal").value = datos[index].numberSlope;

    myModal.show();
};

function cargarTable() {
    lista.innerHTML = ""
    datos.map((item) => {
        const fila = document.createElement('tr');
        fila.innerHTML =
            `<td>${item.slope}
         <td>${item.numberSlope}
        <td><button class="btn-delete" onclick="deleted(${item.id})">Delete</button>
        <button class="btn-abrir" onclick="mostrar(${item.id})">Update</button>`;
        lista.append(fila);
    });
};

const updateSlope=(event)=>{
    event.preventDefault();
    let index = datos.findIndex((item) => item.id == idUpdate); 

    datos[index].slope = document.querySelector("#slopeModal").value;
    datos[index].numberSlope = document.querySelector("#numberModal").value;
    cargarTable();
    myModal.hide();
}

const agregarSlope = (event) => {
    event.preventDefault();

    let id = datos.at(-1).id + 1;
    let slope = document.querySelector("#nameSlope").value;
    let numbere = document.querySelector("#numberPriority").value;

    datos.push(new Slope(id, slope, numbere));
    document.querySelector("#slope-form").reset();
    cargarTable();
}

window.deleted = (id) => {
    let index = datos.findIndex((item) => item.id == id);

    let validar = confirm(
        `Quieres eliminar: ${datos[index].slope}?`
    );

    if (validar) {
        datos.splice(index, 1);
        cargarTable();
    }
};

cargarTable();

document.querySelector("#slope-form").addEventListener("submit", agregarSlope);
document.querySelector("#formModal").addEventListener("submit", updateSlope);

