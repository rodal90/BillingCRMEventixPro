"use strict"
console.log("login.js 1.1");

initLogin();
function initLogin() {

    const containerLogin = new CreateNewElement("div", "login-container", "", "");
    containerLogin.element.classList.add("gl-round-corners");
    const formLogin = new CreateNewElement("form", "", "", "");
    const titleLogin = new CreateNewElement("h1", "title-login", "Login", "");
    const inputUser = new GenerateFormElement("text", "Usuario: ", "user", "", "");
    const inputPassword = new GenerateFormElement("password", "Contraseña: ", "password", "", "");
    const buttonLogin = new CreateNewElement("button", "gl-button-primary", "Acceder", "");
    const buttonSwitchPassword = new CreateNewElement("button", "button-switch-login", "", "");

    buttonSwitchPassword.element.classList.add("active");
    buttonSwitchPassword.element.addEventListener("click", e => {
        e.preventDefault();
        e.target.classList.toggle("active"); //el classList tiene add remove y toggle que son los dos. el evento objetivo o target obejct
        const tipo = inputPassword.fieldset.querySelector("input").type;

        if (tipo == "password") {
            inputPassword.fieldset.querySelector("input").type = "text"
        } else {
            inputPassword.fieldset.querySelector("input").type = "password"
        }

    });

    buttonLogin.element.addEventListener("click", e => {
        e.preventDefault();
        //const datoFormulario= new FormData(formLogin.element);
        //console.log(datoFormulario);
        const datosFormulario = {
            "user": formLogin.element.querySelector("input[name='user']").value,
            "pass": formLogin.element.querySelector("input[name='password']").value,
        }

        login(datosFormulario);
    });

    inputPassword.fieldset.append(buttonSwitchPassword.element);

    formLogin.element.append(inputUser.fieldset, inputPassword.fieldset, buttonLogin.element);
    containerLogin.element.append(titleLogin.element, formLogin.element);

    console.log(containerLogin.element);
    document.querySelector("body").append(containerLogin.element);


    function login(dataForm) {
      
        fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Error en la consulta")
            }
            return response.json()
        }).then(data => {
            console.log("los datos: ", data)

            if(data.token){
                new MessageBox("info",data.mensaje,"","");
                localStorage.setItem("eventixtoken", data.token) //damos de alta la variable eventixtoken y le asignamos la información del token
                window.location.href="../dashboard/index.html";

            }else{
                new MessageBox("error",data.mensaje,"","")
            }
        }).catch(error => {
            console.log(error)
        })
    }
};