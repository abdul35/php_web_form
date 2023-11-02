const form = document.querySelector(".email");
const emailInput = document.querySelector('.email');
const phoneNumber = document.querySelector(".tel");
const statusSucces = document.querySelector('.status__succes');
const statusError = document.querySelector(".status__error");

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call(document.querySelectorAll('.tel'), function(input) {
        let keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });

});


form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const elems = e.target.elements

    const formData = new FormData();

    formData.append("name", elems[0].value)
    formData.append("email", elems[1].value)
    formData.append("phone", elems[2].value)

    const res = await fetch("server.php", {
        method: "POST",
        body: formData
    })
})


emailInput.addEventListener("input", (e) => {
    validateEmail(e.target.value);
    const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    const text = 'Адрес электронной почты введен неправильно!'
})

phoneNumber.addEventListener("focusout", (e) => {
    const phone = e.target.value;
    const re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
    const text = 'Номер телефона введен неправильно!'
    
    if (re.test(phone)) {
       return statusError.textContent = text       
    } 
    statusError.textContent = ''
})
