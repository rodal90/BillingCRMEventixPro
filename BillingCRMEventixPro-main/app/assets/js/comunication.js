"use strict"
console.log("comunication 1.1")


let providerId = '';
let tipoFormulario = '';

function newCommunication(data) {
    console.log(data);
    console.log(data.id_customer);

    const overlay = document.createElement("div");
    overlay.classList.add("screen-block")

    const formulario = document.createElement("form");
    formulario.classList.add("messagebox")

    const title = document.createElement("h2");
    title.textContent = "Nueva Comunicación";
    formulario.appendChild(title);


    const bodyRadios = [
        {
            label: "Cliente",
            value: "isClient"
        },
        {
            label: "Proveedor",
            value: "isProvider"
        }
    ];



    const radioContainer = new GenerateFormElement("radio", "¿A quien va?", "who", "newmessage-radio-section", bodyRadios).fieldset
    //radioContainer.style.marginBottom = "20px";
    formulario.append(radioContainer);

    // Formularios
    const formCliente = document.createElement("div");
    formCliente.style.display = "none";

    const inputIdCliente = document.createElement("input");
    inputIdCliente.type = "text";
    inputIdCliente.hidden = true;
    inputIdCliente.value = 1;
    inputIdCliente.name = "id_cliente"
    inputIdCliente.placeholder = "ID Cliente";

    const inputIdCaso = document.createElement("input");
    inputIdCaso.type = "text";
    inputIdCaso.hidden = true;
    inputIdCaso.value = data.title;
    inputIdCaso.name = "id_caso"
    inputIdCaso.placeholder = "ID Caso";

    const textAreaMensaje = document.createElement("textarea");
    textAreaMensaje.placeholder = "Inserta el mensaje al proveedor";

    const buttonEnviarCliente = document.createElement("button");
    buttonEnviarCliente.textContent = "Enviar";
    buttonEnviarCliente.addEventListener("click", () => {
        const idCliente = inputIdCliente.value.trim();
        const idCaso = inputIdCaso.value.trim();
        const mensaje = textAreaMensaje.value.trim();

        if (idCliente && idCaso && mensaje) {
            alert(`Mensaje enviado al cliente ${idCliente} sobre el caso ${idCaso}: ${mensaje}`);
            //Llamamos al php de communications
            saveComunication(formulario);
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    formCliente.append(inputIdCliente, inputIdCaso, textAreaMensaje, buttonEnviarCliente);
    formulario.append(formCliente);

    // Formulario de proveedor
    const formProveedor = document.createElement("div");
    formProveedor.style.display = "none";

    // Barra de búsqueda para proveedores
    const searchField = document.createElement("input");
    searchField.type = "text";
    searchField.placeholder = "Buscar proveedor...";

    const searchButton = document.createElement("button");
    searchButton.textContent = "Buscar";
    searchButton.addEventListener("click", (e) => {
        e.preventDefault()
        const searchTerm = searchField.value;
        if (searchTerm) {
            searchProviders(searchTerm);  // Realizar la búsqueda de proveedores
        } else {
            alert("Por favor, ingresa un término de búsqueda.");
        }
    });

    // Contenedor para mostrar los resultados de la búsqueda
    const resultContainer = document.createElement("div");
    resultContainer.id = "search-results"; // ID para identificar los resultados

    formProveedor.appendChild(searchField);
    formProveedor.appendChild(searchButton);
    formProveedor.appendChild(resultContainer);  // Agregar el contenedor para los resultados
    formulario.appendChild(formProveedor);

    const radioButtons = radioContainer.querySelectorAll('input[type="radio"]'); //buscamos con query selector all los radio del radiocontainer
    //para cada radiobutton declaramos la logica para cambiar entre formularios de proveedor y cliente
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            console.log(`Seleccionaste: ${event.target.value}`);
            tipoFormulario = event.target.value;
            if (tipoFormulario === "isClient") {
                formCliente.style.display = "block";
                formProveedor.style.display = "none";
                formCliente.classList.add("active");
                formProveedor.classList.remove("active");
            } else if (tipoFormulario === "isProvider") {
                formCliente.style.display = "none";
                formProveedor.style.display = "block";
                formProveedor.classList.add("active");
                formCliente.classList.remove("active");
            }
        });
    });


    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });

    overlay.appendChild(formulario);
    document.body.appendChild(overlay);
}

function searchProviders(searchTerm) {
    console.log("Realizando búsqueda de proveedores con el término:", searchTerm);

    // Limpiar resultados anteriores
    const resultContainer = document.getElementById("search-results");
    resultContainer.innerHTML = "";  // Limpiar los resultados previos

    alert(urlProviders);
    // Realizar la solicitud a la API o backend para obtener los proveedores
    fetch(`${urlProviders}?search=${searchTerm}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.providers && data.providers.length > 0) {
                data.providers.forEach(provider => {
                    // Crear un contenedor para cada proveedor
                    const providerRow = document.createElement("div");
                    providerRow.style.marginBottom = "10px";
                    providerRow.textContent = `Proveedor: ${provider.name} - ID: ${provider.id}`;
                    //no se borra recogemos el id de proveedor para luego usarlo en el mensaje
                    providerId = `${provider.id}`;

                    // Agregar un botón para seleccionar este proveedor
                    const selectButton = document.createElement("button");
                    selectButton.textContent = "Seleccionar";
                    selectButton.addEventListener("click", (e) => {
                        e.preventDefault()
                        //alert(`Proveedor seleccionado: ${provider.name}`);
                        generarformularioMensajeProveedor();
                        // Aquí puedes hacer lo que necesites con el proveedor seleccionado
                    });

                    providerRow.appendChild(selectButton);
                    resultContainer.appendChild(providerRow);  // Añadir el proveedor al contenedor de resultados
                });
            } else {
                resultContainer.innerHTML = "No se encontraron proveedores.";
            }
        })
        .catch(error => {

            resultContainer.innerHTML = "Error al realizar la búsqueda.";
        });
        function generarformularioMensajeProveedor() {
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "1000";
        
            const formulario = document.createElement("div");
            formulario.style.backgroundColor = "#fff";
            formulario.style.padding = "20px";
            formulario.style.borderRadius = "8px";
            formulario.style.width = "90%";
            formulario.style.maxWidth = "400px";
            formulario.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
            formulario.style.position = "relative";
        
            const title = document.createElement("h2");
            title.textContent = "Mensaje al cliente";
            formulario.appendChild(title);
        
        
            // Formularios
            const formMensajeProveedor = document.createElement("form");
            formMensajeProveedor.style.display = "block";
        
            const inputIdCliente = document.createElement("input");
            inputIdCliente.type = "text";
            inputIdCliente.hidden = true;
            inputIdCliente.value = 1;
            inputIdCliente.name = "id_cliente";
            inputIdCliente.placeholder = "ID Cliente";
        
            const inputIdCaso = document.createElement("input");
            inputIdCaso.type = "text";
            inputIdCaso.hidden = true;
            inputIdCaso.value = "Mensaje proveedor";
            inputIdCaso.name = "id_caso";
            inputIdCaso.placeholder = "ID Caso";
        
            const textAreaMensaje = document.createElement("textarea");
            textAreaMensaje.placeholder = "Inserta el mensaje al cliente";
        
            const buttonEnviarCliente = document.createElement("button");
            buttonEnviarCliente.textContent = "Enviar";
            buttonEnviarCliente.addEventListener("click", (e) => {
                e.preventDefault();
                const idCliente = inputIdCliente.value.trim();
                const idCaso = inputIdCaso.value.trim();
                const mensaje = textAreaMensaje.value.trim();
        
                if (idCliente && idCaso && mensaje) {
                    alert(`Mensaje enviado al cliente ${idCliente} sobre el caso ${idCaso}: ${mensaje}`);
                    saveComunication(formulario);
                } else {
                    alert("Por favor, completa todos los campos.");
                }
            });
        
            formMensajeProveedor.append(inputIdCliente, inputIdCaso, textAreaMensaje, buttonEnviarCliente);
            formulario.append(formMensajeProveedor);
            // Cerrar el formulario al hacer clic fuera de él
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    document.body.removeChild(overlay);
                }
            });
        
            overlay.appendChild(formulario);
            document.body.appendChild(overlay);
        }
}


function saveComunication(formulario) {
    console.log("formulario",formulario)

    const datos = new FormData(formulario); // Crear un FormData para enviar los datos
    let esCliente = false; // Variable para distinguir entre cliente y proveedor

    /*  if (formCliente) {
          // Formulario de cliente activo
          const idCliente = formCliente.querySelector('input[placeholder="ID Cliente"]').value.trim();
          const idCaso = formCliente.querySelector('input[placeholder="ID Caso"]').value.trim();
          const mensaje = formCliente.querySelector('textarea').value.trim();
  
          if (!idCliente || !idCaso || !mensaje) {
              alert("Por favor, completa todos los campos del formulario de cliente.");
              return;
          }
  
          // Agregar datos al FormData
          datos.append("id_user", 1); // ID de usuario, reemplázalo con el valor correcto
          datos.append("id_customer", idCliente);
          datos.append("title", idCaso);
          datos.append("body", mensaje);
          datos.append("id_provider", null); // Campo nulo porque es cliente
          console.log(datos);
          esCliente = true;
  
      } else if (formProveedor) {
          // Formulario de proveedor activo
          const mensajeProveedor = formProveedor.querySelector('input[name="textoProveedor"');
  
          if (!mensajeProveedor) {
              alert("Por favor, completa todos los campos del formulario de proveedor.");
              return;
          }
  
          // Agregar datos al FormData
          datos.append("id_user", 1); // ID de usuario, reemplázalo con el valor correcto
          datos.append("id_provider", providerId);
          datos.append("title", "Mensaje a proveedor"); // Puedes cambiar el título según sea necesario
          datos.append("body", mensajeProveedor);
          datos.append("id_customer", null); // Campo nulo porque es proveedor
          console.log(datos);
      } else {
          alert("No se ha detectado ningún formulario activo.");
          return;
      }
  */
    // Enviar datos al servidor
    fetch(urlCommunications, {
        method: "POST",
        body: datos,
        mode: 'no-cors'
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en la consulta: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            new MessageBox("informacion", esCliente ? "Comunicación con cliente guardada." : "Comunicación con proveedor guardada.");
        })
        .catch((error) => {
            new MessageBox("error", `Error al guardar la comunicación: ${error.message}`);
        });
}