const form = document.getElementById("form-mascota");
const inputs = document.querySelectorAll(".form-control, .form-select")
let idEditando = null;
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
});
const table = document.getElementById("tabla-mascotas");

async function listarMascotas() {
    const mascotas = await index();
    table.innerHTML = "";
    mascotas.forEach((mascota) => {
        table.innerHTML += `
                        <tr>
                            <td>${mascota.id}</td>
                            <td>${mascota.name}</td>
                            <td>${mascota.genre}</td>
                            <td>${mascota.race}</td>
                            <td>${mascota.age}</td>
                            <td>${mascota.size}</td>
                            <td>${mascota.details}</td>
                            <td> <button class="btn btn-warning btn-edit" data-id="${mascota.id}">EDIT</button> <button class="btn btn-danger btn-delete" data-id="${mascota.id}">DELETE</button> </td>
                        </tr>
                        `;
    });
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
    
}
const btnForm = document.getElementById("btnSubmit")
function edicion(){
    btnForm.classList.remove("btn-primary")
    btnForm.classList.add("btn-warning")
    btnForm.textContent = "EDIT"
}
function creacion(){
    idEditando = null
    btnForm.classList.remove("btn-warning")
    btnForm.classList.add("btn-primary")
    btnForm.textContent = "SAVE"
    form.reset()
}

listarMascotas();
