let userList = [];

const signIn = document.querySelector('.signin__wrapper');
const signUp = document.querySelector('.signup__wrapper');

const profileSignUp = document.querySelector('.profile__btn');
const profile = document.querySelector('.profile');

const signInLink = document.querySelector('.signin__link');
const signUpLink = document.querySelector('.signup__link');

const signInBtn = document.querySelector('.signin__btn');
const signUpBtn = document.querySelector('.signup__btn');

const signUpFirst = document.querySelector('.signup__first');
const signUpSecond = document.querySelector('.signup__second');
const signUpEmail = document.querySelector('.signup__email');
const signUpPassword = document.querySelector('.signup__password');

const signInEmail = document.querySelector('.signin__email');
const signInPassword = document.querySelector('.signin__password');

let activeUser = -1;

profileSignUp.addEventListener('click', () => {
    profile.style.display = 'none';
    signIn.style.display = 'flex';
    activeUser = -1;
})

signInLink.addEventListener('click', () => {    
    signUp.style.display = 'none';
    signIn.style.display = 'flex';
})

signUpLink.addEventListener('click', () => {
    signUp.style.display = 'flex';
    signIn.style.display = 'none';
})

signInBtn.addEventListener('click', () =>{            
    if (!getUserList()) {                
        signInBtn.after(notification('Local storage is empty'));
        setTimeout(clearNotification, 3000);                    
    } else {
        userValidation();
    }
})

function userValidation() {
    let list = getUserList();
    list.forEach(item => {
        if (item.email === signInEmail.value && item.password === signInPassword.value) {
            activeUser = item.number;
        } 
    })
    console.log('active', activeUser);
    if (activeUser >= 0) {
        console.log(activeUser);
        signInEmail.value = "";
        signInPassword.value = "";

        document.querySelector('.profile__name').textContent = `${userList[activeUser].firstName} ${userList[activeUser].secondName}`;
        document.querySelector('.profile__email').textContent = userList[activeUser].email;

        profile.style.display = 'flex';
        signIn.style.display = 'none';



    } else {
        signInBtn.after(notification('No such user or invalid email'));
        setTimeout(clearNotification, 3000);                    
    }    
}

function notification(message) {
    const info = document.createElement('p');
    info.classList.add('notification');
    info.textContent = message;    
    return info;
}

function clearNotification() {
    document.querySelector('.notification').remove()
}

function getUserList() {
    userList = JSON.parse(localStorage.getItem('myUserList'));    
    if (!userList) userList = [];
    return userList
}

function checkAllFields() {    
    if (checkFirst() && checkSecond() && checkEmail() && checkPassword())
      return true
      else return false
}

function checkFirst() {
    if (signUpFirst.value.length) 
    return true
    else {
        signUpFirst.after(notification('Input First Name'));
        setTimeout(clearNotification, 3000);                    
        return false
    }
}
function checkSecond() {
    if (signUpSecond.value.length) 
    return true
    else {
        signUpSecond.after(notification('Input second Name'));
        setTimeout(clearNotification, 3000);                    
        return false
    }
}
function checkEmail() {    
    if (signUpEmail.value.length) {
        let list = JSON.parse(localStorage.getItem('myUserList'));
        let result = true;
        if (list) {
            list.forEach(element => {
                if (element.email === signUpEmail.value) {
                    signUpEmail.after(notification('this email already exist'));
                    setTimeout(clearNotification, 3000);                            
                    result = false;
                }                
            });
        }
        return result
    }    
    else {
        signUpEmail.after(notification('Input Email'));
        setTimeout(clearNotification, 3000);                    
        return false
    }
}
function checkPassword() {
    if (signUpPassword.value.length) 
    return true
    else {
        signUpPassword.after(notification('Input Password'));
        setTimeout(clearNotification, 3000);                    
        return false
    }
}

signUpBtn.addEventListener('click', () => {
    if (checkAllFields()) {
        console.log(userList);
        userList.push({            
            number: userList.length,
            firstName: signUpFirst.value,
            secondName: signUpSecond.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        });
        signUpFirst.value = "",
        signUpSecond.value = "",
        signUpEmail.value = "",
        signUpPassword.value = "";
        console.log(userList);
        localStorage.setItem('myUserList', JSON.stringify(userList));
    }
})