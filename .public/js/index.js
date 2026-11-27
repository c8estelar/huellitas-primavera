const carrusel = document.getElementById("carrusel-perritos");
const total = document.getElementById("stat-total")
const hembras = document.getElementById("stat-hembras")
const machos = document.getElementById("stat-machos")
const menores = document.getElementById("stat-cachorros")
async function catalogoMascotas() {
    carrusel.innerHTML = "";
    const mascotas = await index();
        total.innerText = mascotas.filter((mascota) => mascota.status === "Disponible").length
        hembras.innerText = mascotas.filter((mascota) => mascota.genre === "Hembra").length
        machos.innerText = mascotas.filter((mascota) => mascota.genre === "Macho").length
        menores.innerText = mascotas.filter((mascota) => ((mascota.age < 3)&&(mascota.ageUnit === "Años")) || ((mascota.age < 36)&& (mascota.ageUnit === "Meses")) ).length

    mascotas.forEach((mascota) => {
        carrusel.innerHTML += `
                            <li class="splide__slide">
                                <button class="medalla">
                                    <img src="${mascota.img || "./img/perritoadopcion1-removebg.png"}" alt="${mascota.name}">
                                    <h3>${mascota.name}</h3>
                                    <small>${mascota.race}</small>
                                    <p>${mascota.age}</p>
                                </button>
                            </li>
        
        
        `;
    });
    splide.mount();
}
var splide = new Splide(".splide", {
    type: "loop",
    perPage: 4,
    perMove: 1,
    gap: "1.5rem",
    focus: "center",
    breakpoints: {
        1024: { perPage: 3 },
        768: { perPage: 2 },
        480: { perPage: 1 },
    },
});

catalogoMascotas();
