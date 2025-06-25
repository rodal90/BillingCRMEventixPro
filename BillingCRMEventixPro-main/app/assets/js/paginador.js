"use strict"
console.log("paginador.js 1.1")

class Paginador {
    constructor(totalRecords, totalPages, pageSize, action) {
        this.pageSize = pageSize;
        this.pagesQuantity = totalPages;
        this.contenedor = document.createElement("div");
        this.contenedor.classList.add("paginacion");

        for (let i = 1; i <= this.pagesQuantity; ++i) {
            const elemento = document.createElement("div");
            elemento.classList.add("paginacion-elemento");
            elemento.textContent = i;
            elemento.addEventListener("click", () => {
                action(i, this.pageSize);
            });
            this.contenedor.append(elemento);
        }

        const totales = document.createElement("div");
        totales.classList.add("paginacion-totales");
        totales.textContent = "Total resultados: " + totalRecords;
        this.contenedor.append(totales);
    }
}
