let prodName = document.querySelector("#prodName");
let prodPrice = document.querySelector("#prodPrice");
let prodModel = document.querySelector("#prodModel");
let prodDesc = document.querySelector("#prodDesc");
let addBtn = document.getElementById("addbtn");
let upBtn = document.getElementById("upbtn");
let search = document.getElementById("search");
let form = document.getElementById("form");
let indexNum;
let listFoundedBySearch;
let isSearching = false;
let prodList;
if (localStorage.getItem("product list") == null) {
  prodList = [];
} else {
  prodList = JSON.parse(localStorage.getItem("product list"))
  display(prodList)
  
}

function addProd() {
  if (validateNameProduct() === true && validatePriceProduct() == true && validateModelProduct() == true) {

  
  let prod = {
    name: prodName.value,
    price: prodPrice.value,
    model: prodModel.value,
    desc: prodDesc.value
  }
  prodList.push(prod),
  display(prodList);
  localStorage.setItem("product list",JSON.stringify( prodList))
  clear();
  form.querySelectorAll("input").forEach(input=>{
    input.classList.remove("false")
    input.classList.remove("true")
  })
}
}
addBtn.addEventListener("click", function(){
  addProd();
});

function display(prodList) {
  var product = '';
  for (var i = 0; i < prodList.length;i++){
    product += `
    <tr>
      <td>${i + 1}</td>
      <td>${prodList[i].newName ? prodList[i].newName : prodList[i].name}</td>
      <td>${prodList[i].price}</td>
      <td>${prodList[i].model}</td>
      <td>${prodList[i].desc}</td>
      <td><button onclick="getProductUpDate(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="delProd(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
    ` 
  }
  
  document.getElementById("tbody").innerHTML = product;
}
function clear() {
  prodName.value = '';
  prodPrice.value = '';
  prodModel.value = '';
  prodDesc.value = '';
}



function delProd(index) {
  prodList.splice(index,1);
  localStorage.setItem("product list",JSON.stringify( prodList))
  display(prodList);
}

function getProductUpDate(index) {
prodName.value = prodList[index].name;
prodPrice.value = prodList[index].price;
prodModel.value = prodList[index].model;
prodDesc.value = prodList[index].desc;
document.getElementById("addbtn").classList.add("d-none");
document.getElementById("upbtn").classList.remove("d-none");
indexNum = index;
}
function updatePtoduct(){
  document.getElementById("addbtn").classList.remove("d-none");
  document.getElementById("upbtn").classList.add("d-none");
  var product = {
    name: prodName.value,
    price: prodPrice.value,
    model: prodModel.value,
    desc: prodDesc.value
  }
  localStorage.setItem("product List", JSON.stringify(prodList));
  prodList.splice(indexNum, 1, product)
  display(prodList);
  clear();
}



upBtn.addEventListener("click", function(){
  updatePtoduct();
});

// function 


// ? SEARCH

search.addEventListener("input",function(){
  let val = search.value;
  let matchedPtoduct = [];
  for (let i = 0; i < prodList.length; i++) {
    if (prodList[i].name.toLowerCase().includes(val.toLowerCase()) === true) {
      matchedPtoduct.push(prodList[i])
      prodList[i].newName = (prodList[i].name.toLowerCase().replace(val.toLowerCase(),`<span class="text-danger">${val}</span>`))
    }
    
  }
  display(matchedPtoduct)
}) 



// ! ==========  VALIDATION  ==============

// ? VALIDATE NAME
function validateNameProduct() {
  let regex = /^([a-z]{3,18}$)/i
  if (regex.test(prodName.value) === true) {
    prodName.classList.replace("false","true")
    return true
  } else {
    prodName.classList.add("false")
    if (prodName.value == "") {
      prodName.classList.remove("false")
      prodName.classList.remove("true")
    }
    return false
  }

}

// ? VALIDATE PRICE
function validatePriceProduct () {
  let regex = /^([0-9]){2,5}$/
  if (regex.test(prodPrice.value) === true) {
    prodPrice.classList.replace("false","true")
    return true
  } else {
    prodPrice.classList.add("false")
    if (prodPrice.value == "") {
      console.log("ee7");
      prodPrice.classList.remove("false")
      prodPrice.classList.remove("true")
    }
    return false
  }
}



// ? VALIDATE MODEL
function validateModelProduct () {
  let regex = /^(Television|television|Mobile|mobile|laptop|Laptop)$/
  if (regex.test(prodModel.value) === true) {
    prodModel.classList.replace("false","true")
    return true
  } else {
    prodModel.classList.add("false")
    if (prodModel.value == "") {
      prodModel.classList.remove("false")
      prodModel.classList.remove("true")
      }
  return false
  }
}


prodName.addEventListener("input",function(){
  validateNameProduct();
})

prodPrice.addEventListener("input",function(){
  validatePriceProduct();
})


prodModel.addEventListener("input",function(){
  validateModelProduct();
})




