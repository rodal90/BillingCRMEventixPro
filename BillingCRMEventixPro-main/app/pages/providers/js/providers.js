"use strict"
console.log("providers1.1")
initProviders()

function initProviders() {
    class providerRow {

        constructor(data) {
            this.rowContainer = new CreateNewElement("div", "provider-row")
            const dataContainer = new CreateNewElement("div", "provider-data").element
            this.rowContainer.element.append(dataContainer)

            const providerName = new CreateNewElement("h3", "", data.name)
            const providerCif = new CreateNewElement("p", "", data.cif)
            const providerPhone = new CreateNewElement("p", "", data.phone)
            const providerEmail = new CreateNewElement("p", "", data.email)
            const providerEditButton = new CreateNewElement("button", "button btn-green", "Editar")
            providerEditButton.element.addEventListener("click", e => {
                e.preventDefault()
                editClient(data)
            })

            dataContainer.append(
                providerName.element,
                providerCif.element,
                providerPhone.element,
                providerEmail.element,
                providerEditButton.element
            );

        }
    }

    const main = document.querySelector("main")
    initToolBar("listado")
    const title = new CreateNewElement("h1", "", "Listado Proveedores")
    const paginacionContainer = new CreateNewElement("div", "", "aaa").element
    const listContainer = new CreateNewElement("div", "provider-list-container", "", "")
    main.append(title.element, paginacionContainer, listContainer.element)

    getProvider()
    function initToolBar(vista) {
        const toolBar = new CreateNewElement("div", "tool-bar", "", "").element
        if (vista == "listado") {
            const newButton = new CreateNewElement("button", "button btn-blue", "Nuevo cliente", "")
            newButton.element.addEventListener("click", e => {
                e.preventDefault()
                newProvider()
            })
            const searchFieldSet = new GenerateFormElement("text", "Buscar", "search", "searcher", "")
            const searchButton = new CreateNewElement("button", "button btn-blue", "buscar", "")
            searchButton.element.addEventListener("click", e => {
                e.preventDefault()
                searchClients()
            })
            searchFieldSet.fieldset.append(searchButton.element)
            toolBar.append(newButton.element, searchFieldSet.fieldset)
        }
        if (vista == "nuevo") {
            const buttonSave = new CreateNewElement("button", "button btn-green", "Guardar", "").element
            buttonSave.addEventListener("click", e => {
                e.preventDefault()
                saveProvider()
            })
            const buttonNewContact = new CreateNewElement("button", "button btn-blue", "Nuevo contacto", "boton-nuevo-contacto").element
            buttonNewContact.disabled = "disable";
            toolBar.append(buttonSave, buttonNewContact)
        }
        if (vista == "editar") {
            const buttonSave = new CreateNewElement("button", "button btn-green", "Guardar", "").element
            buttonSave.addEventListener("click", e => {
                e.preventDefault()
                saveProvider()
            })
            const buttonNewContact = new CreateNewElement("button", "button ", "Nuevo contacto", "boton-nuevo-contacto").element
            toolBar.append(buttonSave, buttonNewContact)
        }
        main.append(toolBar)
    }
    function getProvider(page = 1, size = 10) {
        fetch(`${urlProviders}?page=${page}&size=${size}`, { method: "GET" }).then(response => {
            if (!response.ok) {
                throw new Error("Error en getProvider " + response.statusText)
            }
            return response.json()
        }).then(data => {
            console.log(data)
            paginacionContainer.innerHTML = ""
            listContainer.element.innerHTML = ""
            providerPagination(data.total_records, data.total_pages, data.page_size)
            printProviders(data.providers);

        }).catch(error => {
            new MessageBox("error", error)
        })
    }
    function printProviders(data) {
        data.forEach(provider => {
            const newProvider = new providerRow(provider);
            listContainer.element.append(newProvider.rowContainer.element);
        })
    }
    function newProvider() {
        main.innerHTML = ""
        title.element.textContent = "Nuevo proveedor"
        initToolBar("nuevo")
        main.append(title.element)
        let temporal;
        const formNewProvider = new CreateNewElement("form", "new-provider-form", "", "").element
        temporal = new GenerateFormElement("text", "Nombre cliente: ", "provider-name", "", "")
        const inputProviderName = temporal.fieldset
        temporal = new GenerateFormElement("text", "Teléfono: ", "provider-phone", "", "")
        const inputProviderPhone = temporal.fieldset
        temporal = new GenerateFormElement("text", "Dirección: ", "provider-address", "", "")
        const inputProviderAddress = temporal.fieldset
        temporal = new GenerateFormElement("text", "CIF: ", "provider-vatnumber", "", "")
        const textareaProviderVatnumber = temporal.fieldset
        formNewProvider.append(
            inputProviderName,
            inputProviderPhone,
            inputProviderAddress,
            textareaProviderVatnumber)
        main.append(formNewProvider)
    }
    function editClient(data) {
        console.log(data)
        main.innerHTML = ""
        initToolBar("editar")
        const title = new CreateNewElement("h1", "", "Edición Proveedor").element
        const botonNuevoContacto = document.querySelector("#boton-nuevo-contacto")
        botonNuevoContacto.removeAttribute("disabled")
        botonNuevoContacto.classList.add("btn-blue")
        botonNuevoContacto.addEventListener("click", e => {
            e.preventDefault()
            formularioNuevoContacto(data.id)
        })
        const editionContainer = new CreateNewElement("div", "provider-edition-container").element
        /*##### */
        const formUpdateProvider = new CreateNewElement("form", "new-provider-form", "", "").element
        const inputIdProvider = new GenerateFormElement("hidden", "", "id-provider", "", data.id).fieldset
        const inputProviderName = new GenerateFormElement("text", "Nombre cliente: ", "provider-name", "", data.name).fieldset
        const inputProviderPhone = new GenerateFormElement("text", "Teléfono: ", "provider-phone", "", data.phone).fieldset
        const inputProviderAddress = new GenerateFormElement("text", "Dirección: ", "provider-address", "", data.address).fieldset
        const textareaProviderVatnumber = new GenerateFormElement("text", "CIF: ", "provider-vatnumber", "", data.vat_number).fieldset

        formUpdateProvider.append(
            inputIdProvider,
            inputProviderName,
            inputProviderPhone,
            inputProviderAddress,
            textareaProviderVatnumber)

        const contactsContainer = new CreateNewElement("div", "contacts-container").element
        const contactsArray = data.contacts
        contactsArray.forEach(contact => {
            const newContactBlock = new CreateNewElement("div", "contact-block").element
            const newContactName = new CreateNewElement("p", "", contact.name).element
            const newContactPhone = new CreateNewElement("p", "", contact.phone).element
            const newContactEmail = new CreateNewElement("p", "", contact.email).element
            const newContactObservations = new CreateNewElement("p", "", contact.observations).element
            const contactEditButton = new CreateNewElement("button", "button btn-green", "editar").element
            contactEditButton.addEventListener("click", e => {
                e.preventDefault()
                editarContacto(contact)
            })
            newContactBlock.append(
                newContactName,
                newContactPhone,
                newContactEmail,
                newContactObservations,
                contactEditButton
            )
            contactsContainer.append(newContactBlock)
        })

        editionContainer.append(formUpdateProvider, contactsContainer)
        main.append(title, editionContainer)
        function editarContacto(contacto) {
            console.log("editando Contacto :", contacto)

            const ventana = new CreateNewElement("div", "ventana-nuevo-contacto", "", "").element
            const headerVentana = new CreateNewElement("div", "ventana-header", "", "").element
            const closeButton = new CreateNewElement("div", "ventana-close", "X", "").element
            const titulo = new CreateNewElement("h2", "titulo-ventana", "Edición contacto", "").element
            const formContacto = new CreateNewElement("form", "form-nuevo-contacto", "", "").element
            const idInput = new GenerateFormElement("hidden", "id: ", "id_contacto", "", contacto.id).fieldset
            const nombreInput = new GenerateFormElement("text", "Nombre: ", "contact-name", "", contacto.name).fieldset
            const telefonoInput = new GenerateFormElement("text", "Telefono: ", "contact-phone", "", contacto.phone).fieldset
            const emailInput = new GenerateFormElement("text", "email: ", "contact-email", "", contacto.email).fieldset
            const observacionesInput = new GenerateFormElement("textarea", "Observaciones: ", "contact-observations", "", contacto.observations).fieldset
            const saveButton = new CreateNewElement("button", "", "Guardar", "").element
            const idProviderInput = new GenerateFormElement("hidden", "", "id_provider", "gl-hidden", contacto.id_provider).fieldset
            headerVentana.append(titulo, closeButton)
            formContacto.append(idInput, nombreInput, telefonoInput, emailInput, observacionesInput, saveButton, idProviderInput)
            ventana.append(headerVentana, formContacto)
            closeButton.addEventListener("click", e => {
                e.preventDefault()
                ventana.remove()
            })
            saveButton.addEventListener("click", e => {
                e.preventDefault()
                const datosContacto = new FormData(formContacto)
                guardarContacto(datosContacto)
            })
            document.querySelector("body").append(ventana);
            function guardarContacto(datos) {
                fetch(urlProviders, { method: "POST", body: datos }).then(response => {
                    if (!response.ok) {
                        throw new Error("Error en la consulta" + response.statusText)
                    }
                    return response.json()
                }).then(data => {
                    new MessageBox("informacion", data.msg)
                    ventana.remove()
                }).catch(error => {
                    new MessageBox("error", error)
                })
            }
        }
    }
    function searchClients() {
        alert("buscando proveedores")
    }
    function saveProvider() {
        const form = document.querySelector(".new-provider-form");
        const dataProviderForm = new FormData(form)
        fetch(urlProviders, { method: "POST", body: dataProviderForm }).then(
            response => {
                if (!response.ok) {
                    throw new Error("Error" + response.statusText)
                }
                return response.json()
            }
        ).then(msg => {

            const botonNuevoContacto = document.querySelector("#boton-nuevo-contacto")
            botonNuevoContacto.removeAttribute("disabled")
            botonNuevoContacto.classList.add("btn-blue")
            botonNuevoContacto.addEventListener("click", e => {
                e.preventDefault()
                formularioNuevoContacto(msg.id)
            })

            new MessageBox("info", msg.msg)
        }).catch(error => {
            new MessageBox("error", error)
        })
    }
    function formularioNuevoContacto(providerId) {
        const ventana = new CreateNewElement("div", "ventana-nuevo-contacto", "", "").element
        const headerVentana = new CreateNewElement("div", "ventana-header", "", "").element
        const closeButton = new CreateNewElement("div", "ventana-close", "X", "").element
        const titulo = new CreateNewElement("h2", "titulo-ventana", "Nuevo contacto", "").element
        const formContacto = new CreateNewElement("form", "form-nuevo-contacto", "", "").element
        const nombreInput = new GenerateFormElement("text", "Nombre: ", "contact-name", "", "").fieldset
        const telefonoInput = new GenerateFormElement("text", "Telefono: ", "contact-phone", "", "").fieldset
        const emailInput = new GenerateFormElement("text", "email: ", "contact-email", "", "").fieldset
        const observacionesInput = new GenerateFormElement("textarea", "Observaciones: ", "contact-observations", "", "").fieldset
        const saveButton = new CreateNewElement("button", "button btn-green", "Guardar", "").element
        const idProviderInput = new GenerateFormElement("hidden", "", "id_provider", "gl-hidden", providerId).fieldset
        headerVentana.append(titulo, closeButton)
        formContacto.append(nombreInput, telefonoInput, emailInput, observacionesInput, saveButton, idProviderInput)
        ventana.append(headerVentana, formContacto)
        closeButton.addEventListener("click", e => {
            e.preventDefault()
            ventana.remove()
        })
        saveButton.addEventListener("click", e => {
            e.preventDefault()
            const datosContacto = new FormData(formContacto)
            guardarContacto(datosContacto)
        })
        document.querySelector("body").append(ventana);
        function guardarContacto(datos) {
            fetch(urlContacts, { method: "POST", body: datos }).then(response => {
                if (!response.ok) {
                    throw new Error("Error en la consulta" + response.statusText)
                }
                return response.json()
            }).then(data => {
                new MessageBox("informacion", data.msg)
                ventana.remove()
            }).catch(error => {
                new MessageBox("error", error)
            })
        }
    }
    function providerPagination(registros, total, size) {
        const paginador = new Paginador(registros, total, size, (page) => getProvider(page, size));
        paginacionContainer.append(paginador.contenedor);

    }




}