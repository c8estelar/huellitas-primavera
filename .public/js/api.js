const API_URL = "http://localhost:3000/mascotas";
async function store(mascota) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mascota),
        });
        if (res.ok){
                    return await res.json();
        }
        else{
            console.error("Error en POST:", res.status)
        }
    } catch (error) {
        console.error("Error en POST:", error);
    }
}
async function index() {
    try {
        const res = await fetch(API_URL);
        if (res.ok) {
            const data = await res.json();
            mascota = data
            return mascota;
        }
        else{
            console.error("error en GET:", res.status)
            return []
        }
    } catch (error) {
        console.error("Error en GET:", error);
        return []
    }
}

