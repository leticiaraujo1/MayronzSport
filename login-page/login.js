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
  tentativas()
  if(login.value == "admin" && password.value == "@dmiN" && triesNumber > 0){
    window.location.href = "../main-page/index.html"
  }
  
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


