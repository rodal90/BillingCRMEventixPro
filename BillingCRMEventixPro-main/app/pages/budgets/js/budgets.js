"use strict"
console.log("createNewBudget.js 1.2")

initBudgets();

function initBudgets() {
    //Para crear un nuevo elemento constructor(element, css, content, id)

    //Para crear un nuevo formulario constructor(type, label, name, css, value) 

    class BudgetRow {

        budgetBlock;

        constructor(data) {
            this.budgetBlock = new CreateNewElement("div", "budget-block").element;
            const statusContainer = new CreateNewElement("div", "status-container").element;
            const buttonsContainer = new CreateNewElement("div", "buttons-container").element;
            const openingContainer = new CreateNewElement("div", "opening-container").element;
            const clientData = new CreateNewElement("div", "client-data").element;
            const datesContainer = new CreateNewElement("div", "dates-container").element;
            const pdfContainer = new CreateNewElement("div", "pdf-container").element;

            //
            if (data.file) {
                const extension = data.file.split('.').pop();
                if (extension == "pdf") {
                    const linkPdf = new CreateNewElement("a", "link-pdf").element
                    linkPdf.href = "../../assets/documentos/" + data.file
                    linkPdf.target = "_blank"
                    linkPdf.textContent = data.file
                    pdfContainer.append(linkPdf)
                } else {
                    const imagen = new CreateNewElement("img", "img-budget").element;
                    imagen.src = "../../assets/documentos/" + data.file;
                    pdfContainer.append(imagen)
                }
            }

            this.budgetBlock.append(statusContainer, buttonsContainer, openingContainer, clientData, datesContainer, pdfContainer);

            const aplazadaLabel = new CreateNewElement("p", "", data.state_name).element;
            const budgetDateState = new CreateNewElement("p", "", data.date_state).element;


            const budgetEditButton = new CreateNewElement("button", "button-edit", "Editar").element;
            const budgetNewComunicationButton = new CreateNewElement("button", "button-comunication", "Nueva Comunicación").element;
            const budgetDeniedButton = new CreateNewElement("button", "button-denied", "Rechazar").element;
            const budgetAcceptButton = new CreateNewElement("button", "button-accept", "Aceptar").element;
            const budgetSendButton = new CreateNewElement("button", "button-send", "Enviar").element;


            if (!data.date_send) { data.date_send = "No Enviado" }
            const budgetStatus = new CreateNewElement("p", "", "Envio: " + data.date_send).element;
            const budgetDateSent = new CreateNewElement("p", "", "Alta : " + data.date_start).element;

            const budgetTitle = new CreateNewElement("h2", "", data.title).element;
            const budgetClient = new CreateNewElement("p", "", data.customer_name).element;
            const budgetContact = new CreateNewElement("p", "", data.contact_name).element;
            const budgetContactEmail = new CreateNewElement("p", "", data.email).element;
            const budgetContactPhone = new CreateNewElement("p", "", data.phone).element;

            const budgetDescription = new CreateNewElement("p", "", data.description).element;
            if (!data.date_finish) { data.date_finish = "No Finalizada" }
            const budgetCurrentAmount = new CreateNewElement("p", "", "Monto Actual: " + data.current_amount + " €").element;



            budgetEditButton.addEventListener("click", e => {
                e.preventDefault()
                editBudget(data);
            });

            budgetNewComunicationButton.addEventListener("click", e => {
                e.preventDefault();

            });

            budgetDeniedButton.addEventListener("click", e => {
                e.preventDefault();

            });

            budgetAcceptButton.addEventListener("click", e => {
                e.preventDefault();

            });

            budgetSendButton.addEventListener("click", e => {
                e.preventDefault();

            });


            statusContainer.append(
                aplazadaLabel,
                budgetDateState
            );

            buttonsContainer.append(
                budgetEditButton,
                budgetNewComunicationButton,
                budgetDeniedButton,
                budgetAcceptButton,
                budgetSendButton
            );

            openingContainer.append(
                budgetDateSent,
                budgetStatus
            );

            clientData.append(
                budgetTitle,
                budgetClient,
                budgetContact,
                budgetContactEmail,
                budgetContactPhone
            );

            datesContainer.append(
                budgetDescription,
                budgetCurrentAmount
            );

        }
    }


    function initToolBarBudget(vista) {
        const toolBar = new CreateNewElement("div", "tool-bar", "", "").element

        if (vista == "listado") {
            const newButton = new CreateNewElement("button", "button btn-blue", "Nuevo Budget", "")
            newButton.element.addEventListener("click", e => {
                e.preventDefault();
                newBudget();
            })
            const searchFieldSet = new GenerateFormElement("text", "Buscar", "search", "searcher", "")
            const searchButton = new CreateNewElement("button", "button btn-blue", "Buscar", "")
            searchButton.element.addEventListener("click", e => {
                e.preventDefault();
                const textSearch = searchFieldSet.fieldset.querySelector("input[name='search']").value;
                console.log(searchFieldSet.fieldset);
                searchBudgets(textSearch);
            })
            searchFieldSet.fieldset.append(searchButton.element)
            toolBar.append(newButton.element, searchFieldSet.fieldset)



        };

        if (vista == "nuevo") {
            const buttonSave = new CreateNewElement("button", "button btn-green", "Guardar", "").element
            buttonSave.addEventListener("click", e => {
                e.preventDefault();
                saveBudget();
            })
            const searchFieldSet = new GenerateFormElement("text", "Buscar", "Search", "searcher", "").fieldset
            const buttonSearchContact = new CreateNewElement("button", "button", "Buscar Cliente", "boton-buscar-cliente").element
            buttonSearchContact.disabled = "disable";
            toolBar.append(buttonSave, searchFieldSet, buttonSearchContact);
        };


        if (vista == "editar") {
            const buttonSave = new CreateNewElement("button", "button btn-green", "Guardar", "").element
            buttonSave.addEventListener("click", e => {
                e.preventDefault();
                saveBudget();
            })

            toolBar.append(buttonSave)
        }


        main.append(toolBar);
    }

    const main = document.querySelector("main")

    initToolBarBudget("listado");
    //initToolBarBudget("listado")
    const title = new CreateNewElement("h1", "", "Listado de Presupuestos ").element;
    const paginacionContainer = new CreateNewElement("div", "", "Aqui va la paginación").element;
    const listContainer = new CreateNewElement("div", "budgets-list-container", "", "").element;
    main.append(title, paginacionContainer, listContainer);


    getBudgets();

    function getBudgets(page = 1, size = 12) {
        fetch(`${urlBudgets}?page=${page}&size=${size}`, { method: "GET" }).then(response => {
            if (!response.ok) {
                throw new Error("Error en get customers " + response.statusText)
            }
            return response.json()
        }).then(data => {
            paginacionContainer.innerHTML = ""
            listContainer.innerHTML = ""
            budgetsPaginacion(data.total_records, data.total_pages, data.page_size)
            printbudgets(data.budgets);
        }).catch(error => {
            new MessageBox("error", error)
        })
    };

    function saveBudget() {
        const bodyForm = {};
       
        const title= document.querySelector('input[name="budget-title"]').value;
        const description= document.querySelector('input[name="budget-description"]').value;
        const budgetAmount= document.querySelector('input[name="budget-current-amount"]').value;

        bodyForm.title=title;
        bodyForm.description=description;
        bodyForm.budgetAmount=budgetAmount;
       

        const items= document.querySelectorAll(".new-concept-container");
        const newItems= new Array();

        items.forEach((item)=>{
            const itemsObj= {};
            itemsObj.itemDescription= item.querySelector("input[name='item-title']").value;
            itemsObj.itemAmount=item.querySelector("input[name='item-amount']").value;
          newItems.push(itemsObj)
        });
        
        bodyForm.items = newItems;

     const bodyFormStringfy = JSON.stringify(bodyForm);

        console.log('savethisBudget: '+ bodyFormStringfy);
        fetch(urlBudgets,
            {
                method: "POST",
                body: bodyFormStringfy
            }
        ).then(response => {
            console.log("respuesta", response)
            if (!response.ok) {
                throw new Error("Error en post budgets " + response.statusText)
            }
            return response.json()
        }).then(data => {
            console.log(data);
            alert("vamoh");
        }).catch(error => {
            new MessageBox("error", error)
        })
    }

    function printbudgets(data) {
        data.forEach(budget => {
            const newBudget = new BudgetRow(budget);
            listContainer.append(newBudget.budgetBlock);
        })
    };

    function editBudget(data) {
        console.log(data);
        main.innerHTML = "";
        initToolBarBudget("editar");
        const title = new CreateNewElement("h1", "", "Edición de Presupuestos").element;
        const editionContainer = new CreateNewElement("div", "budget-edition-container").element;

        const formUpdateBudget = new CreateNewElement("form", "new-budget-form", "", "").element;
        const inputIdBudget = new GenerateFormElement("hidden", "", "id-budget", "", data.id).fieldset;
        const inputBudgetTitle = new GenerateFormElement("text", "Titulo: ", "budget-title", "", data.title).fieldset;
        const inputBudgetDescription = new GenerateFormElement("text", "Descripción: ", "budget-description", "", data.description).fieldset;
        const inputBudgetAmount = new GenerateFormElement("text", "Importe: ", "budget-current-amount", "", data.current_amount).fieldset;

        formUpdateBudget.append(inputIdBudget, inputBudgetTitle, inputBudgetDescription, inputBudgetAmount);
        editionContainer.append(formUpdateBudget);
        main.append(title, editionContainer);
    }

    function newBudget() {
        console.log();
        main.innerHTML = "";
        initToolBarBudget("nuevo");
        
        const title = new CreateNewElement("h1", "", "Nuevo Presupuesto").element;
        const editionContainer = new CreateNewElement("div", "budget-edition-container").element;
        const newConceptCont = new CreateNewElement("div", "new-concept-cont").element;
        const formUpdateBudget = new CreateNewElement("form", "new-budget-form", "", "").element;
        formUpdateBudget.enctype = "multipart/form-data";
        const newConceptButton = new CreateNewElement("button", "button-newconcept", "Nuevo concepto").element;
        const inputBudgetTitle = new GenerateFormElement("text", "Titulo: ", "budget-title", "", "").fieldset;
        const inputBudgetAmount = new GenerateFormElement("text", "Importe: ", "budget-current-amount", "", "").fieldset;
        const inputBudgetDescription = new GenerateFormElement("text", "Descripción: ", "budget-description", "", "").fieldset;
       // const inputPDF = new GenerateFormElement("file", "Documento PDF:", "documento-pdf", "", "").fieldset;

        // Hacer el campo de importe total readonly
        const amountInput = inputBudgetAmount.querySelector("input");
        amountInput.readOnly = true;

        newConceptButton.addEventListener("click", e => {
            e.preventDefault();
            const newConceptElement = newConcept(newConceptCont,amountInput);

            newConceptCont.append(newConceptElement);

            updateTotalAmount(newConceptCont, amountInput);

        });

        formUpdateBudget.append(inputBudgetTitle, inputBudgetDescription, inputBudgetAmount, newConceptButton, newConceptCont);
        editionContainer.append(formUpdateBudget);
        main.append(title, editionContainer);


       
    };

    function searchBudgets(textSearch) {
        fetch(`${urlBudgets}?search=${textSearch}`, { method: "GET" }).then(response => {
            if (!response.ok) {
                throw new Error("Error en get customers " + response.statusText)
            }
            return response.json()
        }).then(data => {
            paginacionContainer.innerHTML = ""
            listContainer.innerHTML = ""
            //  customerPagination(data.total_records, data.total_pages, data.page_size);
            printbudgets(data.budgets);

        }).catch(error => {
            new MessageBox("error", error)
        })
    };

    function newConcept(container, amountInput) {

        const newConceptContainer = new CreateNewElement("div", "new-concept-container").element;
        const newConcepttitle = new CreateNewElement("h2", "", "Nuevo Concepto").element;
        const formNewConcept = new CreateNewElement("form", "new-concept-form", "", "").element;


        const inputItemTitle = new GenerateFormElement("text", "Descripción de Concepto: ", "item-title", "", "").fieldset;
        const inputItemAmount = new GenerateFormElement("number", "Precio: ", "item-amount", "", "").fieldset;

        inputItemAmount.querySelector("input").addEventListener('input', () => {
            updateTotalAmount(container, amountInput);
        });

        formNewConcept.append(inputItemTitle, inputItemAmount);
        newConceptContainer.append(newConcepttitle, formNewConcept);

        return newConceptContainer;
    };

    function updateTotalAmount(conceptContainer, amountInput) {
        const total = getAllAmounts(conceptContainer);
        console.log("Total calculado: ", total); 
        amountInput.value = total;
    }

    function getAllAmounts(conceptContainer) {

        let totalItemAmount = 0;

        const allItemsAmount = conceptContainer.querySelectorAll(".new-concept-form input[name='item-amount']");

        allItemsAmount.forEach(amount => {
            const value = parseFloat(amount.value) || 0;
            console.log("Valor de input de precio: ", value);
            totalItemAmount += value;

        });
        console.log("Total de todos los elementos: ", totalItemAmount);
        return totalItemAmount;
    };



    function budgetsPaginacion(registros, total, size) {
        const paginador = new Paginador(registros, total, size, (page) => getBudgets(page, size))
        paginacionContainer.append(paginador.contenedor)
    };

}