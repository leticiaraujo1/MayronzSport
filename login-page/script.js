let login = document.querySelector(".input-login")
let password = document.querySelector(".input-password")
let button = document.querySelector(".but")
let tries = document.querySelector(".tentativas-span")
let triesLabel = document.querySelector(".tentativas")
let passwordEye = document.querySelector(".fa-solid")
button.addEventListener("click",enter)
passwordEye.addEventListener("click", seePassword)
let triesNumber = 4



password.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {  
      enter()
    }
});


function onLoad(){
  triesLabel.style.visibility = "hidden"
}


function enter(){
  fetch("logins.txt")
  .then((res) => res.text())
  .then((text) => {
    let arrLogins = text.split(', ')
    let indexLog = arrLogins.indexOf(login.value)

    if (arrLogins.includes(login.value) && indexLog%2==0 && arrLogins[indexLog + 1]==password.value){
      window.location.href = "../main-page/index.html"
    } else {
      tentativas()
    }
  }) 
}

function tentativas(){
  if(triesNumber == 0){
    alert("Numero de tentativas excedidas, recarregue a página")
  }else if(login.value !== "admin" || password.value !== "@dmiN"){
    triesNumber--
    triesLabel.style.visibility = "visible"
    tries.innerHTML = triesNumber
  }
}

function seePassword() {
  if(password.type == 'password'){
    password.type = 'text'
  }else{
    password.type = 'password'
  }
}


