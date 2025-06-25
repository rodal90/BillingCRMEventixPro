"use strict"
console.log("usuarios_listado.js 1.4")

const mainContainer = document.querySelector("main > .wrapper");

getUsuarios();

function getUsuarios(page = 1, size = 25) {
    fetch(`${urlUsers}`, {
        method: "GET",
        /*headers: {
            "Authorization": `Bearer ${token}` // Incluye el token en el encabezado
        }*/
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "/";
            } 
            if (!response.ok) {
                throw new Error("Error en la consulta: " + response.statusText);
            }
            return response.json();
        })
        .then(usuarios => {
            console.log(usuarios);
        })
        .catch(error => {
            new MessageBox(error, 'error');
        });
}




/*
function paginacionUsuarios(registros, total, size) {
    console.log("entro a paginar");
    const paginador = new Paginador(registros, total, size, (page) => getUsuarios(page, size));
    mainContainer.append(paginador.contenedor);
}
*/



