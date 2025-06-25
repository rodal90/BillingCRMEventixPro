class BarraDeAcciones {
    constructor(apartado) {
        this.contenedorBarra = document.createElement("div");
        this.contenedorBarra.classList.add("barra-acciones");

        if (apartado === "listado") {
            this.contenedorBarra.classList.add("barra-acciones-listado");

            const contenedorBuscador = document.createElement("div");
            contenedorBuscador.classList.add("contenedor-acciones-buscador");

            const inputBuscador = document.createElement("input");
            inputBuscador.type = "text";
            inputBuscador.placeholder = "Buscar por nombre";

            const botonBuscar = document.createElement("button");
            botonBuscar.textContent = "Buscar";
            botonBuscar.addEventListener("click", () => {
                if (inputBuscador.value !== "") {
                    buscarCliente(inputBuscador.value);
                }
            });

            contenedorBuscador.append(inputBuscador, botonBuscar);

            const botonNuevoCliente = document.createElement("a");
            botonNuevoCliente.textContent = "Nuevo Usuario";
            botonNuevoCliente.href = "usuarios_alta.html";

            this.contenedorBarra.append(botonNuevoCliente, contenedorBuscador);
        }

        if (apartado === "nuevo" || apartado === "editar") {
            this.contenedorBarra.classList.add("barra-acciones-nuevo");

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "Guardar";
            botonGuardar.addEventListener("click", (e)=>{
                (apartado === "nuevo" ? guardarAlta() : guardarEdicion());
            })

            this.contenedorBarra.append(botonGuardar);
        }
    }

    obtenerContenedor() {
        return this.contenedorBarra;
    }
}
