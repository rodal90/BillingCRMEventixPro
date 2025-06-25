"use strict"
console.log("dashboard.js 1.1")

const token = localStorage.getItem("eventixtoken");

if(token){
    initDasboard()
}else{
    window.location.href = "../login/index.html";
}


function initDasboard(){
    const mainContent = document.querySelector("main")
    const dasboardSales = new CreateNewElement("div","dashboard-shortcut","","")
    const salesTitle = new CreateNewElement("h2","","Presupuestos pendientes","")
    const budgetsList = new CreateNewElement("div","budgets-list","","")
    dasboardSales.element.append(salesTitle.element,budgetsList.element)
    mainContent.append(dasboardSales.element)

    fetch(presupuestosPendientes,{method:"GET"}).then(response=>{
        if(!response.ok){
            throw new Error("Error leyendo json")
        }
        return response.json()
    }).then(data=>{
        printBugets(data)
    }).catch(error=>{
        new MessageBox("error",error,"","")
    })

    function printBugets(budgets){
        budgets.forEach(budget => { 
            const budgetRow = new CreateNewElement("div","budget-row","","");
            budgetRow.element.classList.add(budget.estado)
            budgetRow.element.innerHTML = `<p><strong>${budget.nombre_cliente}</strong> | ${budget.nombre_contacto}</p>`
            budgetRow.element.innerHTML += `<p><span class="estado ${budget.estado}">${budget.estado}</span></p>`
            budgetRow.element.innerHTML += `<p> fecha alta: ${budget.fecha_creacion	}</p>`
            budgetRow.element.innerHTML += `<p> <strong> ${budget.importe} €</strong></p>`
            budgetsList.element.append(budgetRow.element)
        });
    }
}