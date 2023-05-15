/*GET NECESSARY ELEMENTS */
const myForm = document.getElementById('myForm')
const nameElement = document.getElementById('name')
const nameLabel = document.getElementById('nameLabel')
const surname = document.getElementById('surname')
const surnameLabel = document.getElementById('surnameLabel')
const email = document.getElementById('email')
const emailLabel = document.getElementById('emailLabel')
const message = document.getElementById('message')
const messageLabel = document.getElementById('messageLabel')
const submitBtn = document.getElementById('submitBtn')
const modal = document.getElementById('modal')
const modalMessage = document.getElementById('modalMessage')


// EVENT LİSTENERS
myForm.addEventListener('submit', (event) => {
    event.preventDefault()
    /*VALIDATION*/
    if(nameElement.value === ""){
        nameLabel.classList.add("error")
        nameElement.focus()
    }
    if(surname.value === ""){
        surnameLabel.classList.add("error")
        surname.focus()
    }
    if(email.value === "" || validateEmail(email.value) === false){
        emailLabel.classList.add("error")
        email.focus()
    }
    if(message.value === ""){
        messageLabel.classList.add("error")
        message.focus()
    }
    /*FORM ACCEPTED AND SEND FORM TO THE API*/
    if(
        nameElement.value !== "" &&
        surname.value !== "" &&
        email.value !== "" &&
        validateEmail(email.value) &&
        message.value !== ""
    ){
        const data = {
            name: nameElement.value,
            surname: surname.value,
            email: email.value,
            message: message.value,
            date:new Date()
        }
        submitBtn.classList.add("sendingFormBtn");
        submitBtn.disabled = true;
        submitBtn.innerText = "Gönderiliyor...";
        fetch("http://localhost:3004/add-form",{
            method:"post", 
            headers:{"Content-Type": "application/json"}, 
            body: JSON.stringify(data),
        })
        .then((response) => {
            return response.json()
        })
        .then((data) =>{
           console.log(data); 
           /*SAVE FORM SUCCESS*/
           if(data.status === 200){
            setTimeout(() =>{
                var audio = new Audio("./assets/effect.mp3")
                audio.play()
                submitBtn.classList.remove("sendingFormBtn");
                submitBtn.disabled = false;
                submitBtn.innerText = "Gönder";
                modal.style.display = 'flex';
                modalMessage.innerText = data.message
                setTimeout(() =>{
                    modal.style.display = 'none';
                    nameElement.value = ""
                    surname.value = ""
                    email.value = ""
                    message.value = ""
                    audio.pause()
                }, 3000)
            }, 3000)
           }
        })
        .catch((error) =>{
            console.log(error)
        })
    }

})

nameElement.addEventListener("keypress", (event) =>{
    if(event.target.value.length > 2){
        nameLabel.classList.remove("error");
    }else{
        nameLabel.classList.add("error");
    }
})








// NNECESSARY FUNCTIONS
const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
