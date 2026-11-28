const form = document.getElementById("form-mascota");
const inputs = document.querySelectorAll(".form-control, .form-select")
let idEditando = null;
const modalElement = document.getElementById("modalMascota");
const modalMascota = bootstrap.Modal.getOrCreateInstance(modalElement);
const tituloModal = document.getElementById("tituloModalMascota");
document.getElementById("btnNuevaMascota").addEventListener("click", creacion);
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const mascota = Object.fromEntries(formData.entries());
    mascota.age = Number(mascota.age);
    btnForm.disabled = true;

    try {
        if (idEditando) {
            await update(idEditando, mascota);
        } else {
            await store(mascota);
        }

        await listarMascotas();
        creacion();
        modalMascota.hide();
    } finally {
        btnForm.disabled = false;
    }
});
const table = document.getElementById("tabla-mascotas");
const fallbackImage = "./img/perritoadopcion1-removebg.png";

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getStatusClass(status) {
    if (status === "Proceso" || status === "Process") return "pet-status-proceso";
    if (status === "Adoptado") return "pet-status-adoptado";
    return "pet-status-disponible";
}

function actualizarResumen(mascotas) {
    const disponibles = mascotas.filter((mascota) => mascota.status === "Disponible").length;
    const enProceso = mascotas.filter((mascota) => mascota.status === "Proceso" || mascota.status === "Process").length;
    const adoptados = mascotas.filter((mascota) => mascota.status === "Adoptado").length;

    document.getElementById("stat-disponibles").textContent = disponibles;
    document.getElementById("stat-proceso").textContent = enProceso;
    document.getElementById("stat-adoptados").textContent = adoptados;
    document.getElementById("stat-total").textContent = mascotas.length;
}

async function listarMascotas() {
    const mascotas = await index();
    actualizarResumen(mascotas);
    table.innerHTML = "";

    if (mascotas.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="10" class="empty-state">
                    <i class="bi bi-paw" aria-hidden="true"></i>
                    No hay mascotas registradas.
                </td>
            </tr>`;
        return;
    }

    mascotas.forEach((mascota) => {
        const photo = mascota.img || fallbackImage;
        table.innerHTML += `
                        <tr>
                            <td>${escapeHTML(mascota.id)}</td>
                            <td><img class="pet-photo" src="${escapeHTML(photo)}" alt="${escapeHTML(mascota.name)}"></td>
                            <td>${escapeHTML(mascota.name)}</td>
                            <td>${escapeHTML(mascota.genre)}</td>
                            <td>${escapeHTML(mascota.race)}</td>
                            <td>${escapeHTML(mascota.age)} ${escapeHTML(mascota.ageUnit)}</td>
                            <td>${escapeHTML(mascota.size)}</td>
                            <td><span class="pet-status ${getStatusClass(mascota.status)}">${escapeHTML(mascota.status)}</span></td>
                            <td>${escapeHTML(mascota.details || "Sin detalles")}</td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-warning btn-edit" data-id="${escapeHTML(mascota.id)}" title="Editar mascota" aria-label="Editar a ${escapeHTML(mascota.name)}">
                                        <i class="bi bi-pencil-square" aria-hidden="true"></i>
                                    </button>
                                    <button class="btn btn-danger btn-delete" data-id="${escapeHTML(mascota.id)}" title="Eliminar mascota" aria-label="Eliminar a ${escapeHTML(mascota.name)}">
                                        <i class="bi bi-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        `;
    });
    const buttons = table.querySelectorAll(".btn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const id = btn.dataset.id
            if (btn.classList.contains("btn-delete")) {
                await borrarMascotas(id)
            } else if (btn.classList.contains("btn-edit")) {
                await editarMascotas(id)
            }
        });
    });

    table.querySelectorAll(".pet-photo").forEach((image) => {
        image.addEventListener("error", () => {
            if (image.src.endsWith(fallbackImage)) return;
            image.src = fallbackImage;
        });
    });
}

async function borrarMascotas(id) {
    if (!window.confirm("¿Eliminar esta mascota del registro?")) return;

    if (id === idEditando){
        creacion()
    }
    await deleteData(id);
    await listarMascotas();
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
