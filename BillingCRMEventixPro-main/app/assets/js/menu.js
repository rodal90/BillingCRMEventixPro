"use strict"
console.log("menu.js 1.2")

const root = "../"

const modules = [
    {
        "text": "inicio",
        "link": "dashboard/index.html"
    },
    {
        "text": "clientes",
        "link": "customers/index.html"
    },
    {
        "text": "proveedores",
        "link": "providers/index.html"
    }
    ,
    {
        "text": "presupuestos",
        "link": "budgets/index.html"
    }
    ,
    {
        "text": "operaciones",
        "link": "operations/index.html"
    }
]

initMenu()

function initMenu() {
    const logo = new CreateNewElement("img", "logo-img", "").element;
    logo.src = "../../assets/images/logo.jpg"
    const mainHeader = document.querySelector("body > header");
    const nav = new CreateNewElement("nav", "main-nav", "", "").element;
    mainHeader.append(logo, nav);
    modules.forEach(module => {
        const link = new CreateNewElement("a", "nav-button", module.text, "").element;
        link.href = root + module.link
        nav.append(link)
    });

    /// Pruebas
    buttonHost(nav);
}



/// Pruebas
function buttonHost(nav) {

    console.log("Host: "+  host);

    const hostBtn = document.createElement('button');
    hostBtn.classList.add('host-change-btn');
    switch (host) {
        case "https://coreapp.pixelandbyte.es/api/":
            hostBtn.classList.add('host-remote');
            hostBtn.textContent = "Remoto";
            break;
        case "http://localhost/eventixpro/api/":
            hostBtn.classList.add('host-local');
            hostBtn.textContent = "Local";
            break;

    }
    hostBtn.addEventListener('click', ev => {
        ev.preventDefault();

        switch (host) {
            case "https://coreapp.pixelandbyte.es/api/":
                localStorage.setItem('eventixHost', "http://localhost/eventixpro/api/");
                host = "http://localhost/eventixpro/api/";
                hostBtn.classList.remove('host-remote');
                hostBtn.classList.add('host-local');
                hostBtn.textContent = "Local";
                break;
            case "http://localhost/eventixpro/api/":
                localStorage.setItem('eventixHost', "https://coreapp.pixelandbyte.es/api/");
                host = "https://coreapp.pixelandbyte.es/api/";
                hostBtn.classList.remove('host-local');
                hostBtn.classList.add('host-remote');
                hostBtn.textContent = "Remoto";
                break;

        }
        console.log(host);
        initURLs();
    });
    nav.append(hostBtn);
}