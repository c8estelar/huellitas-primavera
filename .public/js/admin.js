const form = document.getElementById("form-mascota");
const inputs = document.querySelectorAll(".form-control, .form-select")
let idEditando = null;
const modalElement = document.getElementById("modalMascota");
const modalMascota = bootstrap.Modal.getOrCreateInstance(modalElement);
const tituloModal = document.getElementById("tituloModalMascota");
let activos = document.getElementById("activos")
let proceso = document.getElementById("proceso")
let adoptados = document.getElementById("adoptados")
document.getElementById("btnNuevaMascota").addEventListener("click", creacion);
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const mascota = Object.fromEntries(formData.entries());
    mascota.age = Number(mascota.age);
    if(idEditando){
        await update(idEditando, mascota)
    }
    else{
        await store(mascota);
    }

    listarMascotas();
    creacion()
    modalMascota.hide()
});
const table = document.getElementById("tabla-mascotas");

async function listarMascotas() {
    const mascotas = await index();
        activos.innerText = mascotas.filter((mascota) => mascota.status === "Disponible").length
        proceso.innerText = mascotas.filter((mascota) => mascota.status === "Process").length
        adoptados.innerText = mascotas.filter((mascota) => mascota.status === "Adoptado").length
    table.innerHTML = "";
    mascotas.forEach((mascota) => {
        table.innerHTML += `
                        <tr>
                            <td>${mascota.id}</td>
                            <td><img src="${mascota.img}" id="img-table"></td>
                            <td>${mascota.name}</td>
                            <td>${mascota.genre}</td>
                            <td>${mascota.race}</td>
                            <td>${mascota.age} ${mascota.ageUnit}</td>
                            <td>${mascota.size}</td>
                            <td>${mascota.status}</td>
                            <td>${mascota.details}</td>
                            <td> <button class="btn btn-warning btn-edit" data-id="${mascota.id}">EDIT</button> <button class="btn btn-danger btn-delete" data-id="${mascota.id}">DELETE</button> </td>
                        </tr>
                        `;
                    })

    const buttons = table.querySelectorAll(".btn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const id = btn.dataset.id
            if (btn.classList.contains("btn-delete")) {
                borrarMascotas(id)
            } else if (btn.classList.contains("btn-edit")) {
                editarMascotas(id)
            }
        });
    });
}

async function borrarMascotas(id) {
    if (id === idEditando){
        creacion()
    }
    await deleteData(id);
    listarMascotas();
}
async function editarMascotas(id) {
    const datos = await ModificarMascota(id)
    if(!datos) return;
    idEditando = id;
    edicion()
    inputs.forEach(input => {
        input.value = datos[input.name]
    });
    modalMascota.show()
}
const btnForm = document.getElementById("btnSubmit")
function edicion(){
    btnForm.style.backgroundColor= "var(--coral-profundo)"
    btnForm.textContent = "EDITAR"
    tituloModal.textContent = "Editar mascota"
}
function creacion(){
    idEditando = null
    btnForm.style.backgroundColor = "var(--terciario)"
    btnForm.textContent = "GUARDAR"
    tituloModal.textContent = "Registrar mascota"
    form.reset()
}

listarMascotas();
