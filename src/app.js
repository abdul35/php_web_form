const emailInput = document.querySelector('.email');
const phoneNumber = document.querySelector(".tel");
const statusSucces = document.querySelector('.status__succes');
const statusError = document.querySelector(".status__error");

const validateEmail = function (email)  {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateNum = function (phone) {

    const re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
    const text = 'Номер телефона введен неправильно!'
    
    if (!re.test(phone)) {
        statusError.textContent = text       
        return false 
    } 
    statusError.textContent = ''
    return true
}

const sendForm = async function (formData) {
    const res = await fetch("server.php", {
        method: "POST",
        body: formData
    })
    console.log(res);
    if (res.ok) {
        statusSucces.textContent = "Заявка успешно отправлено"
        return
    } else {
        statusSucces.textContent = "Заявка не отправлено"
        
    }
}

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


document.forms["myForm"].addEventListener("submit", function (e)  {

    e.preventDefault()
    let isValid = true;
    let email = document.forms.myForm?.email.value;
    // let phone = document.forms.myForm?.phone.value;
    let name = document.forms.myForm.name.value;
    console.log(emailInput.value, phoneNumber.value, document.forms.myForm.name.value);
    if (!emailInput.value || !phoneNumber.value) {
        isValid = false
        return
    }

    if (!validateEmail(emailInput.value)) {
        isValid = false
    }

    if (!validateNum(phoneNumber.value)) {
        isValid = false
    }
    if (isValid) {
        console.log('gg');
        const formData = new FormData();
        
        formData.append("name", name)
        formData.append("email", emailInput.value)
        formData.append("phone", phoneNumber.value)
        
        sendForm(formData)
    }
})

