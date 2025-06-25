"use strict"
console.log("generateFormElement.js 1.1")

class GenerateFormElement {
    fieldset = document.createElement("fieldset")
    input
    label
    constructor(type, label, name, css, value) {
        
        this.label = document.createElement("label")
        this.label.textContent = label
        if (css != "") {
            this.fieldset.classList.add(css)
        }
        if(type == "hidden"){
            this.fieldset.style.display = "none";
        }
        switch (type) {
            case "checkbox":
                console.log("checkbox")
                break;
            case "radio":
                console.log("radio")
                break;
            case "textarea":
                this.input = document.createElement("textarea")
                this.input.name = name
                if(value != ""){
                    this.input.textContent = value
                }
                this.fieldset.append(this.label,this.input)
                break
            case "select":
                this.input = document.createElement("select")
                value.forEach(valor=>{
                    const option = document.createElement("option")
                    option.textContent = valor.text
                    option.value = valor.value
                    this.input.append(option)
                })
                this.fieldset.append(this.label,this.input)
                break
            default:
                this.input = document.createElement("input")
                this.input.type = type
                this.input.name = name
                if(value != ""){
                    this.input.value = value
                }
                this.fieldset.append(this.label,this.input)
                break
        }
    }
}