const carrusel = document.getElementById("carrusel-perritos");
async function catalogoMascotas() {
    carrusel.innerHTML = "";
    const data = await index();
    data.forEach((mascota) => {
        carrusel.innerHTML += `
                            <li class="splide__slide">
                                <button class="medalla">
                                    <img src="./img/perritoadopcion1-removebg.png" alt="Perrito">
                                    <h3>${mascota.name}</h3>
                                    <p>${mascota.age}</p>
                                </button>
                            </li>
        
        
        `;
    });
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

splide.mount();
catalogoMascotas();
