let percentShirts = document.querySelector(".percent-shirts")
let percentAccessories = document.querySelector(".percent-accessories")
let percentShoes = document.querySelector(".percent-shoes")
let percentShorts = document.querySelector(".percent-shorts")

let minimumPercentShirts = document.querySelector(".minimum-percent-shirts")
let minimumPercentAcc = document.querySelector(".minimum-percent-acc")
let minimumPercentShoes = document.querySelector(".minimum-percent-shoes")
let minimumPercentShorts = document.querySelector(".minimum-percent-shorts")

let totalProducts = document.querySelector(".total-products")

let productInput = document.querySelector(".product-input")
let categorySelect = document.querySelector(".category-select")
let quantityInput = document.querySelector(".quantity-input")

const miniValuePercent = 10

let shirtsTotal = 0
let accTotal = 0
let shoesTotal = 0
let shortsTotal = 0
let totalItens = 0

const submitBtn = document.getElementById('submitBtn');
const stockBtn =  document.getElementById('stockBtn')
const successMessage = document.getElementById('successMessage');

const editContainer = document.querySelector('.edit-container');
const mainContainer = document.querySelector('.main-container');

let index = 0

submitBtn.addEventListener('click', addItens)

categorySelect.addEventListener('change', () => {
  index = categorySelect.selectedIndex
})

stockBtn.addEventListener('click', () => {
  editContainer.style.display = 'block';
  mainContainer.style.display = 'none';
});

//Função para adicionar os itens assim que o botão é pressionado
//A função chama as outras dentro dela mesma

function addItens(){
  let toAdd = 0 

  //Condições para adicionar o valor a sua respectiva variável
  if(categorySelect[index].value == "shirts" && productInput.value != ""){
    toAdd = parseInt(quantityInput.value)
    shirtsTotal += toAdd
    submitBtn.addEventListener('click', showAddMessage);
    canUpdate = true
  }else if (categorySelect[index].value == "accessories" && productInput.value != ""){
    toAdd = parseInt(quantityInput.value)
    accTotal += toAdd
    submitBtn.addEventListener('click', showAddMessage);
  }else if(categorySelect[index].value == "shoes" && productInput.value != ""){
    toAdd = parseInt(quantityInput.value)
    shoesTotal += toAdd
    submitBtn.addEventListener('click', showAddMessage);
  }else if(categorySelect[index].value == "shorts" && productInput.value != ""){
    toAdd = parseInt(quantityInput.value)
    shortsTotal += toAdd
    submitBtn.addEventListener('click', showAddMessage);
  }else{
    window.alert("Erro, cheque os valores")
  }
  
  updateTexts()
  saveDataToLocalStorage()
  percentShirts.innerHTML = percentageUpdates(shirtsTotal) + "%" 
  percentAccessories.innerHTML = percentageUpdates(accTotal) + "%" 
  percentShoes.innerHTML = percentageUpdates(shoesTotal) + "%" 
  percentShorts.innerHTML = percentageUpdates(shortsTotal) + "%" 
}

//Atualiza os textos, como total de produtos e a cor dos valores mínimos
function updateTexts() {
  totalItens = shirtsTotal + accTotal + shoesTotal + shortsTotal
  totalProducts.innerHTML = totalItens

  updatePercentageColors();
}

//Função especializada em atualizar as cores dos spans de valores mínimos
function updatePercentageColors() {
  let percentageShirts = percentageUpdates(shirtsTotal);
  let percentageAccessories = percentageUpdates(accTotal);
  let percentageShoes = percentageUpdates(shoesTotal);
  let percentageShorts = percentageUpdates(shortsTotal);

  percentShirts.innerHTML = percentageShirts + "%";
  percentAccessories.innerHTML = percentageAccessories + "%";
  percentShoes.innerHTML = percentageShoes + "%";
  percentShorts.innerHTML = percentageShorts + "%";

  setPercentageColor(percentageShirts, minimumPercentShirts);
  setPercentageColor(percentageAccessories, minimumPercentAcc);
  setPercentageColor(percentageShoes, minimumPercentShoes);
  setPercentageColor(percentageShorts, minimumPercentShorts);
}

//Função especializada em mudar a cor, recebendo dois parâmetros
function setPercentageColor(percentage, element) {
  if (percentage < miniValuePercent) {
    element.style.color = "red";
  } else {
    element.style.color = ""; // Reset color to default
  }
}

//Função que retorna o novo valor de porcentagem que será aplicado no HTML
function percentageUpdates(toUpdate){
  let newPercentage = 0
  newPercentage = Math.floor((toUpdate * 100)/totalItens)
  return newPercentage

}

// Salvar no local storage
function saveDataToLocalStorage() {
  const dataToSave = {
    shirtsTotal,
    accTotal,
    shoesTotal,
    shortsTotal,
    totalItens
  };

  localStorage.setItem('inventoryData', JSON.stringify(dataToSave));
}

// Carregar no local storage
function loadDataFromLocalStorage() {
  const savedData = localStorage.getItem('inventoryData');

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    shirtsTotal = parsedData.shirtsTotal || 0;
    accTotal = parsedData.accTotal || 0;
    shoesTotal = parsedData.shoesTotal || 0;
    shortsTotal = parsedData.shortsTotal || 0;
    totalItens = parsedData.totalItens || 0;

    updateTexts();
    updatePercentageColors();
  }
}

// Chama quando carrega a página
window.addEventListener('load', loadDataFromLocalStorage);

function showAddMessage(){
  successMessage.classList.add('show-message');
  setTimeout(() => {
    successMessage.classList.remove('show-message');
  }, 3000);
}
