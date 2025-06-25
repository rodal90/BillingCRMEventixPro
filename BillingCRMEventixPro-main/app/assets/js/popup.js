"use strict";
console.log("popup.js 1.1");

/* Forma de usar:

    const alert = new PopUp("alert", "This is an alert message.", () => console.log("Alert dismissed!"));

    const comfirm = new PopUp("confirm", "Are you sure you want to proceed?", () => console.log("Confirmed!"), () => console.log("Cancelled!"), { confirmText: "Yes", cancelText: "No" });

    const error = new PopUp("error", "An error occurred while processing your request.", () => console.log("Error acknowledged!"), null, { confirmText: "Okay" });

    const success = new PopUp("success", "Your request was successful.", () => console.log("Success acknowledged!"), null, { confirmText: "Okay" });

*/

class PopUp {
    overlay = document.createElement("div");
    box = document.createElement("div");
    messageText = document.createElement("p");
    btnConfirm = document.createElement("button");
    btnCancel = document.createElement("button");
    btnClose = document.createElement("button");

    constructor(type, message, onConfirm = () => { }, onCancel = () => { }, options = {}) {
        const { confirmText = "Accept", cancelText = "Close", closeText = "X" } = options;

        this.overlay.classList.add("popup-overlay");
        this.box.classList.add("popup-box", `popup-${type}`);
        this.messageText.textContent = message;

        this.btnConfirm.textContent = confirmText;
        this.btnCancel.textContent = cancelText;
        this.btnClose.textContent = closeText;

        this.box.append(this.messageText);
        this.overlay.append(this.box);

        this.btnClose.classList.add("popup-close-btn");
        this.box.append(this.btnClose);

        this.btnClose.addEventListener("click", this.close.bind(this));

        if (type === "confirm") {
            this.box.append(this.btnConfirm, this.btnCancel);
            this.btnConfirm.addEventListener("click", () => {
                onConfirm();
                this.close();
            });
            this.btnCancel.addEventListener("click", () => {
                onCancel();
                this.close();
            });
        } else if (type === "error") {
            this.box.append(this.btnConfirm);
            this.btnConfirm.addEventListener("click", this.close.bind(this));
        } else if (type === "success") { // 添加 success 类型处理
            this.box.append(this.btnConfirm);
            this.btnConfirm.addEventListener("click", this.close.bind(this));
        } else {
            this.box.append(this.btnConfirm);
            this.btnConfirm.addEventListener("click", this.close.bind(this));
        }

        document.body.append(this.overlay);
    }

    close() {
        this.overlay.remove();
    }

}
