"use strict"
console.log("createnewelement.js  1.1") 
class CreateNewElement{
    element
    constructor(element, css, content, id){

        this.element = document.createElement(element)
        if(css != "" && css != undefined){
            this.element.className = css
        }
        if(content != "" && content != undefined){
            this.element.innerHTML = content
        }
        if(id !="" && id != undefined){
            this.element.id = id
        }        
        
    }
}