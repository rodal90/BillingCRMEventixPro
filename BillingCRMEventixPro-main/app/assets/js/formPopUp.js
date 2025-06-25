"use strict"
console.log("formpopup.js 1.1");

class FormPopUp {
    screenBlock = document.createElement("div")
    container = document.createElement("div")
    form = document.createElement("form")
    aceptButton = document.createElement("button")
    cancelButton = document.createElement("button")
    titleForm = document.createElement("h2")
   

    constructor(title, fieldsetsNewContact,id, mode ="create") {
        this.screenBlock.classList.add("screen-block")
        this.container.classList.add("form-popup")
        this.form.classList.add("form-newcontact")

        // añadir los elementos del formulario usando la clase GenerateFormElement
        fieldsetsNewContact.forEach(fieldset => {
            this.form.append(fieldset);
        });

        this.titleForm.textContent = title;
        this.aceptButton.textContent = mode === "create" ? "Agregar nuevo contacto" : "Guardar cambios";
        this.cancelButton.textContent = "Cancelar";
        

        // añadir los botones al formulario
        this.form.append(this.aceptButton, this.cancelButton);
        this.container.append(this.titleForm,this.form);
        this.screenBlock.append(this.container);


        this.aceptButton.addEventListener("click", e => {
            e.preventDefault()
            if (mode === "create") {
                this.getDataForm(id);
            } else {
                this.updateContact(id);
            }
        })

        this.cancelButton.addEventListener("click", e => {
            e.preventDefault()
            this.closePopUp()
        })
        document.querySelector("body").append(this.screenBlock);
    }
    closePopUp() {
        this.screenBlock.remove()
    }
    getDataForm(idCustomer){
        const formContactData =  new FormData(this.form);
        formContactData.append("id_customer",idCustomer);
        console.log(formContactData);
        fetch(urlCustomersContacts, { method: "POST",body:formContactData}).then(response => {
            if (!response.ok) {
                throw new Error("Error en post customers " + response.statusText);
            }
            return response.json();

        }).then(msg => {
            console.log("Respuesta recibida:", msg);
            new MessageBox("success", "Contacto guardado correctamente.");
         
        }).catch(error => {
            new MessageBox("error", error);
        })
 
    }
    updateContact(idCustomer){
        console.log("entra");
        const formUpdateCustomerData =  new FormData(this.form);
        formUpdateCustomerData.append("id_customer",idCustomer);

        fetch(urlCustomers, { method: "POST", body: formUpdateCustomerData }).then(response => {
            if (!response.ok) {
                throw new Error("Error en UPDATE customers " + response.statusText);
            }
            return response.json();

        }).then(msg => {
            console.log("Respuesta recibida:", msg);
            idClienteNuevo = msg.id;
            new MessageBox("success", "Customer editado correctamente.");
            newContactButton.element.disabled = false;

        }).catch(error => {
            new MessageBox("error", error);
        })
        
    }

}