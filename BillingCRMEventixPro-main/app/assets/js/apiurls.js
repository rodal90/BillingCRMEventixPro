"use strict"
console.log("apiurls.js 1.1");

let host = "https://coreapp.pixelandbyte.es/api/";
//const host = "http://localhost/eventixpro/api/";

// const urlLogin= host + "login.php";
// const presupuestosPendientes = host + "presupuestos_pendientes.json";
// const urlCustomers = host + "customers.php";
// const urlContacts = host + "customer_contacts.php";
// const urlProviders = host + "providers.php";
// const urlBudgets = host + "budgets.php";

if (localStorage.getItem('eventixHost')) {
    host = localStorage.getItem('eventixHost');
} else {
    localStorage.setItem('eventixHost', "https://coreapp.pixelandbyte.es/api/");
    host = "https://coreapp.pixelandbyte.es/api/";
}
let urlLogin = host + "login.php";
let presupuestosPendientes = host + "presupuestos_pendientes.json";
let urlCustomers = host + "customers.php";
let urlContacts = host + "customer_contacts.php";
let urlProviders = host + "providers.php";
let urlBudgets = host + "budgets.php";
let urlUsers = host + "users.php";
let urlRoles = host + "roles.php";


function initURLs() {
     urlLogin = host + "login.php";
     presupuestosPendientes = host + "presupuestos_pendientes.json";
     urlCustomers = host + "customers.php";
     urlContacts = host + "customer_contacts.php";
     urlProviders = host + "providers.php";
     urlBudgets = host + "budgets.php";
     urlUsers = host + "users.php";
     urlRoles = host + "roles.php";
}