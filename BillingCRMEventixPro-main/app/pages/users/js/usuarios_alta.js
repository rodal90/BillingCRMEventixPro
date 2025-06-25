"use strict"
console.log("usuarios_alta.js 1.1")

const mainContainer = document.querySelector("main > .wrapper");

init();

function init() {


    const titular = document.createElement("h1");
    titular.textContent = "Usuarios | Alta";

    const formularioAlta = document.querySelector("#registerForm")
    const selectRoles  = formularioAlta.querySelector("#role");

    fetch(urlRoles,{method:`GET`}).then(response=>{
        response.json().then(roles=>{
            roles.forEach(role => {
                const opcionRole = document.createElement("option")
                opcionRole.value = role.id
                opcionRole.textContent = role.description
                selectRoles.append(opcionRole)                
            });
        })
    })

    const newbarra = new BarraDeAcciones("nuevo")
    mainContainer.innerHTML = "";
    mainContainer.append(titular, newbarra.obtenerContenedor(), formularioAlta);
    const buttonSubmit = formularioAlta.querySelector("#button-submit")
    buttonSubmit.addEventListener("click", e => {
        e.preventDefault()
        registerUser()
    })


}

function registerUser() {
    const formulario = document.querySelector("#registerForm")
    
    const datosFormulario = new FormData(formulario)
    console.log(datosFormulario);
    
    const password = formulario.querySelector("#password").value;
    const confirmPassword = formulario.querySelector("#confirmPassword").value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }   

    fetch(urlUsers, {
        method: 'POST',
        body: datosFormulario        
    })
        .then(response => {
            console.log("response: ", response)
            if (response.status == 401) {
                window.location.href = "/";
            } 
            if (!response.ok) {
                throw new Error("error en la creacion de usuario: " + response.status)
            }
            return response.json()
            
        }).then(data=>{
            const confirmacion = new MessageBox(data.mensaje, "informacion")
        }).catch(error => {
            const alerta = new MessageBox(error.mensaje, "error")
        });
}