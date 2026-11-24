const form = document.getElementById("form-mascota");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const mascota = Object.fromEntries(formData.entries());
    mascota.age = Number(mascota.age);
    await store(mascota);
    listarMascotas();
    form.reset();
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
                        </tr>
                        `;
    });

}
listarMascotas();
