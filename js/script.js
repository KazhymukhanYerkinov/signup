
const form = document.getElementById('form');
const modal = document.getElementById('modal');


const namee = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');



togglePassword1.addEventListener('click', function (e) {
    const type = password1.getAttribute('type') === 'password' ? 'text':'password';
    password1.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

togglePassword2.addEventListener('click', function (e) {
    const type = password2.getAttribute('type') === 'password' ? 'text':'password';
    password2.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

form.addEventListener('submit', e => {
    const n = namee.value.trim();
    const s = surname.value.trim();
    const em = email.value.trim();
    const p1 = password1.value.trim();
    const p2 = password2.value.trim();


    e.preventDefault();
    if (validationInput(n,s,em,p1,p2)) {
        modal.className = 'modal open';
        let user = {
            email: em,
            first_name: n,
            last_name: s,
            password: p1,
            re_password: p2,
        }

        fetch('http://185.146.3.44/api/v1/auth/moderators/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        document.getElementById('name').value = '';
        document.getElementById('surname').value = '';
        document.getElementById('email').value = '';
        document.querySelector('#password1').value = '';
        document.querySelector('#password2').value = '';  
    } 
    
});

function validationInput(n,s,e,p1,p2) {
    

    let isSubmit = true;


    if (n === '') {
        setErrorFor(namee, 'Пожалуйста, укажите свое имя')
        isSubmit = false;
    }
    else namee.parentElement.className = 'form__group success'
    if (s === '') {
        setErrorFor(surname, 'Пожалуйста, укажите свою фамилию');
        isSubmit = false;
    }
    else surname.parentElement.className = 'form__group success'
    if (e === '') {
        setErrorFor(email, 'Пожалуйста, укажите свой email');
        isSubmit = false;
    }
    else if (!isEmail(e)) {
        setErrorFor(email, 'Введен некорректный email адрес');
        isSubmit = false;
    }
    else email.parentElement.className = 'form__group success'
    if (p1 === '') {
        setErrorFor(password1, 'Пожалуйста, укажите свой пароль')
        isSubmit = false;
    }
    else if (p1.length < 8) {
        setErrorFor(password1, 'Используйте не менее 8 символов')
        isSubmit = false;
    }
    else password1.parentElement.className = 'form__group success'
    if (p2 === '') {
        setErrorFor(password2, 'Пожалуйста, укажите свой пароль')
        isSubmit = false;
    }
    else if (p1 !== p2) {
        setErrorFor(password2, 'Пароли не совпадают')
        isSubmit = false;
    }
    else if (p2.length < 8) {
        setErrorFor(password2, 'Используйте не менее 8 символов')
        isSubmit = false;
    }
    else password2.parentElement.className = 'form__group success'

    return isSubmit;

}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form__group error';
    small.innerText = message

}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function closeModal() {
    modal.className = 'modal'
}