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
        if (res.ok) {
            return await res.json();
        } else {
            console.error("Error en POST:", res.status);
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
            return data;
        } else {
            console.error("error en GET:", res.status);
            return [];
        }
    } catch (error) {
        console.error("Error en GET:", error);
        return [];
    }
}
async function deleteData(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            console.log("DELETE: Recurso eliminado");
        } else {
            console.error("DELETE falló");
        }
    } catch (error) {
        console.error("Error en DELETE:", error);
    }
}
async function update(id, mascota) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mascota),
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            console.error("Error en PUT:", res.status)
        }
    } catch (error) {
        console.error("Error en PUT:", error);
    }
}
async function ModificarMascota(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            console.error("Error en ModificarMascota:", res.status)
            return null;
        }
    } catch (error) {
        console.error("Error en GET:", error);
    }
}
