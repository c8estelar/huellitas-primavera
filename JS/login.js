let email = document.getElementById("inputEmail3");
let password = document.getElementById("inputPassword3");
const boton = document.getElementById("boton");
const fallo = document.getElementById("fallo");

const realEmail = "admin@huellitasdeprimavera.org";
const realPassword = "huellitas2025";

boton.addEventListener("click", function logIn(){
    if (email.value === realEmail && password.value === realPassword) {
        window.location.href = "http://127.0.0.1:5500/index.html"
    }
    else {
        fallo.innerText = "Inicio de sesión fallido (CAMPOS INCORRECTOS)"
        fallo.style.color = "red";
        email.value = null;
        password.value = null;
    }
} )
