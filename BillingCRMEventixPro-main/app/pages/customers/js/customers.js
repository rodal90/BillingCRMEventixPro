"use strict"
console.log("customers.js 1.2")



initCustomers()

function initCustomers() {

    class CustomerRow {
        constructor(data) {
            this.rowContainer = new CreateNewElement("div", "customer-row")
            const dataContainer = new CreateNewElement("div", "customer-data").element
            const contactsContainer = new CreateNewElement("div", "customer-contacts").element
            this.rowContainer.element.append(dataContainer, contactsContainer)
            const customerName = new CreateNewElement("h3", "", data.name)
            const customerVat = new CreateNewElement("p", "", data.vat_number)
            const customerAddress = new CreateNewElement("p", "", data.address)
            const customerPhone = new CreateNewElement("p", "", data.phone)
            const customerEditButton = new CreateNewElement("button", "button btn-green", "Editar")
            customerEditButton.element.addEventListener("click", e => {
                e.preventDefault()
                editClient(data)
            })
            dataContainer.append(
                customerName.element,
                customerVat.element,
                customerAddress.element,
                customerPhone.element,
                customerEditButton.element
            );
            data.contacts.forEach(contact => {
                const contactBlock = new CreateNewElement("div", "contact-block").element
                const newContactName = new CreateNewElement("p", "", contact.name).element
                const newContactPhone = new CreateNewElement("p", "", contact.phone).element
                const newContactEmail = new CreateNewElement("p", "", contact.email).element
                const newContactObservations = new CreateNewElement("p", "", contact.observations).element
                contactBlock.append(
                    newContactName,
                    newContactPhone,
                    newContactEmail,
                    newContactObservations
                )
                contactsContainer.append(contactBlock)
            })

        }
    }

    const main = document.querySelector("main")
    initToolBar("listado")

    const title = new CreateNewElement("h1", "", "Listado Clientes").element
    const paginacionContainer = new CreateNewElement("div","paginacion-container","").element
    const listContainer = new CreateNewElement("div", "customer-list-container", "", "").element
    main.append(title, paginacionContainer, listContainer)

    getCustomers()
    function initToolBar(vista) {
        const toolBar = new CreateNewElement("div", "tool-bar", "", "").element
        if (vista == "listado") {
            const newButton = new CreateNewElement("button", "button btn-blue", "Nuevo cliente", "")
            newButton.element.addEventListener("click", e => {
                e.preventDefault()
                newClient()
            })
            const searchFieldSet = new GenerateFormElement("text", "Buscar", "search", "searcher", "")
            const searchButton = new CreateNewElement("button", "button btn-blue", "buscar", "")
            searchButton.element.addEventListener("click", e => {
                e.preventDefault()
                const textSearch = searchFieldSet.fieldset.querySelector("input[name='search']").value;
                searchClients(textSearch)
            })
            searchFieldSet.fieldset.append(searchButton.element)
            toolBar.append(newButton.element, searchFieldSet.fieldset)
        }
        if (vista == "nuevo") {
            const buttonSave = new CreateNewElement("button", "button btn-green", "Guardar", "").element
            buttonSave.addEventListener("click", e => {
                e.preventDefault()
                saveCustomer()
            })
            const buttonNewContact = new CreateNewElement("button", "button", "Nuevo contacto", "boton-nuevo-contacto").element
            buttonNewContact.disabled = "disable";
            toolBar.append(buttonSave, buttonNewContact)
        }
        if (vista == "editar") {
            const buttonSave = new CreateNewElement("button", "button btn-green", "Guardar", "").element
            buttonSave.addEventListener("click", e => {
                e.preventDefault()
                saveCustomer()
            })
            const buttonNewContact = new CreateNewElement("button", "button", "Nuevo contacto", "boton-nuevo-contacto").element
            toolBar.append(buttonSave, buttonNewContact)
        }
        main.append(toolBar)
    }
    function getCustomers(page = 1, size = 10) {
        fetch(`${urlCustomers}?page=${page}&size=${size}`, { method: "GET" }).then(response => {
            if (!response.ok) {
                throw new Error("Error en get customers " + response.statusText)
            }
            return response.json()
        }).then(data => {
            paginacionContainer.innerHTML=""
            listContainer.innerHTML=""
            customerPagination(data.total_records, data.total_pages, data.page_size);
            printCustomers(data.customers);
     
        }).catch(error => {
            new MessageBox("error", error)
        })
    }
    function printCustomers(data) {
        data.forEach(customer => {
            const newCustomer = new CustomerRow(customer);
            listContainer.append(newCustomer.rowContainer.element);
        })
    }
    function newClient() {
        main.innerHTML = ""
        const title = new CreateNewElement("h1", "", "Nuevo cliente").element 
        initToolBar("nuevo")
        main.append(title)
        let temporal;
        const formNewCustomer = new CreateNewElement("form", "new-customer-form", "", "").element
        temporal = new GenerateFormElement("text", "Nombre cliente: ", "customer-name", "", "")
        const inputCustomerName = temporal.fieldset
        temporal = new GenerateFormElement("text", "Teléfono: ", "customer-phone", "", "")
        const inputCustomerPhone = temporal.fieldset
        temporal = new GenerateFormElement("text", "Dirección: ", "customer-address", "", "")
        const inputCustomerAddress = temporal.fieldset
        temporal = new GenerateFormElement("text", "CIF: ", "customer-vatnumber", "", "")
        const textareaCustomerVatnumber = temporal.fieldset
        formNewCustomer.append(
            inputCustomerName,
            inputCustomerPhone,
            inputCustomerAddress,
            textareaCustomerVatnumber)
        main.append(formNewCustomer)
    }
    function editClient(data) {
        console.log(data)
        main.innerHTML = ""
        initToolBar("editar")
        const title = new CreateNewElement("h1", "", "Edición Cliente").element
        const botonNuevoContacto = document.querySelector("#boton-nuevo-contacto")
        botonNuevoContacto.removeAttribute("disabled")
        botonNuevoContacto.classList.add("btn-blue")
        botonNuevoContacto.addEventListener("click", e => {
            e.preventDefault()
            formularioNuevoContacto(data.id)
        })
        const editionContainer = new CreateNewElement("div", "customer-edition-container").element
        /*##### */
        const formUpdateCustomer = new CreateNewElement("form", "new-customer-form", "", "").element
        const inputUpdate = new GenerateFormElement("hidden", "", "update", "", true).fieldset
        const inputIdCustomer = new GenerateFormElement("hidden", "", "id-customer", "", data.id).fieldset
        const inputCustomerName = new GenerateFormElement("text", "Nombre cliente: ", "customer-name", "", data.name).fieldset
        const inputCustomerPhone = new GenerateFormElement("text", "Teléfono: ", "customer-phone", "", data.phone).fieldset
        const inputCustomerAddress = new GenerateFormElement("text", "Dirección: ", "customer-address", "", data.address).fieldset
        const textareaCustomerVatnumber = new GenerateFormElement("text", "CIF: ", "customer-vatnumber", "", data.vat_number).fieldset

        formUpdateCustomer.append(
            inputIdCustomer,
            inputUpdate,
            inputCustomerName,
            inputCustomerPhone,
            inputCustomerAddress,
            textareaCustomerVatnumber)

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

        editionContainer.append(formUpdateCustomer, contactsContainer)
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
            const idCustomerInput = new GenerateFormElement("hidden", "", "id_customer", "gl-hidden", contacto.id_customer).fieldset
            headerVentana.append(titulo, closeButton)
            formContacto.append(idInput,nombreInput, telefonoInput, emailInput, observacionesInput, saveButton, idCustomerInput)
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
    }
    function searchClients(textSearch) {
        fetch(`${urlCustomers}?search=${textSearch}`, { method: "GET" }).then(response => {
            if (!response.ok) {
                throw new Error("Error en get customers " + response.statusText)
            }
            return response.json()
        }).then(data => {
            paginacionContainer.innerHTML=""
            listContainer.innerHTML=""
            customerPagination(data.total_records, data.total_pages, data.page_size);
            printCustomers(data.customers);
     
        }).catch(error => {
            new MessageBox("error", error)
        })
    }
    
    function saveCustomer() {
        const form = document.querySelector(".new-customer-form");
        const dataCustomerForm = new FormData(form)
        fetch(urlCustomers, { method: "POST", body: dataCustomerForm }).then(
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
    function formularioNuevoContacto(customerId) {
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
        const idCustomerInput = new GenerateFormElement("hidden", "", "id_customer", "gl-hidden", customerId).fieldset
        headerVentana.append(titulo, closeButton)
        formContacto.append(nombreInput, telefonoInput, emailInput, observacionesInput, saveButton, idCustomerInput)
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
    function customerPagination(registros, total, size) {
        const paginador = new Paginador(registros, total, size, (page) => getCustomers(page, size));
        paginacionContainer.append(paginador.contenedor);
    }
    
}