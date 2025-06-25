"use strict"
console.log("messages.js 1.1")

class MessageBox {
    screenBlock = document.createElement("div")
    container = document.createElement("div")
    message = document.createElement("p")
    aceptButton = document.createElement("button")
    cancelButton = document.createElement("button")
    type
    constructor(type, message, actionAcept, paramsAcept) {
        this.screenBlock.classList.add("screen-block")
        this.container.classList.add("messagebox", type)
        this.message.textContent = message
        this.aceptButton.textContent = "aceptar"
        this.cancelButton.textContent = "cancelar"
        this.container.append(this.message, this.aceptButton)
        this.screenBlock.append(this.container)
        if (type == "confirm") {
            console.log(actionAcept)
            if(actionAcept != ""){
                this.aceptButton.addEventListener("click",e=>{
                    e.preventDefault()
                    actionAcept()
                    this.closeBox()
                })
            }
            this.container.append(this.cancelButton)
            this.cancelButton.addEventListener("click",e=>{
                e.preventDefault()
                this.closeBox()
            })

        } else {
            this.aceptButton.addEventListener("click", e => {
                e.preventDefault()
                this.closeBox()
            })
        }
        document.querySelector("body").append(this.screenBlock)
    }
    closeBox() {
        this.screenBlock.remove()
    }
}