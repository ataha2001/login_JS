let regEmail = document.getElementById('regEmail')
let regPassword = document.getElementById('regPassword')
let regConfirm = document.getElementById('regConfirm')
let regSubmitBtn = document.getElementById('regSubmitBtn')
let logSubmitBtn = document.getElementById('logSubmitBtn')
let users = []
let allUsers = JSON.parse(window.localStorage.getItem("users") || "[]")
let products = []
let allproducts = JSON.parse(window.localStorage.getItem("products") || "[]")

let logEmail = document.getElementById('logEmail')
let logPassword = document.getElementById('logPassword')

let resetPasswordBtn = document.getElementById('resetPassword')
let resetEmail = document.getElementById('resetEmail')

function registerLoadFunction() {
    regSubmitBtn.addEventListener('click', regSubmitBtnClick)
}
function loginLoadFunction() {
    
    logSubmitBtn.addEventListener('click', logSubmitBtnClick)
}

function resetPasswordLoadFunction() {
    resetPasswordBtn.addEventListener('click', resetPasClickordBtn)
    
}

function resetPasClickordBtn() {
    var resetEmailCheck = resetEmail.value
    if (resetEmailCheck == "" || resetEmailCheck == null){
    }else{
        Swal.fire({
            title: 'Thanks',
            text: 'Please check your email to get new Password ',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        
    }

    
}
async function productsLoadFunction() {
     

    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json();
    console.log(data.products);
    let html=""
    const output = document.querySelector('.container')
    data.products.forEach(product => {
       
        let showCard = `
            <div class="card " style="width: 18rem;">
                <img src="${product.images[0]}" class="card-img-top"  alt="...">
                <div class="card-body">
                   <h2 class="card-title ">${product.title}</h2>
                    <p class="card-text ">${product.description}</p>
                    <p class="card-text">${product.price}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `
        output.insertAdjacentHTML("beforeend", showCard)
    });

    
    }

async function fetchProductsData() {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json();
    // console.log(data)
    window.localStorage.setItem('products', JSON .stringify(data))
}

function showProducts(data) {
    console.log('after load page data = ',data)
    
    const cocktail = data.drinks[0];
  const cocktailDiv = document.getElementById("output");
  // cocktail name
  const cocktailName = cocktail.strDrink;
  const heading = document.createElement("h1");
  heading.innerHTML = cocktailName;
  cocktailDiv.appendChild(heading);
   
}


function regSubmitBtnClick(e) {
    e.preventDefault();
    var regEmailCheck = regEmail.value
    var regPasswordCheck = regPassword.value
    var regConfirmCheck = regConfirm.value
    if (regEmailCheck == "" || regEmailCheck == null 
        ||  regPasswordCheck == "" || regPasswordCheck == null 
        ||  regConfirmCheck == "" || regConfirmCheck == null
        || regPasswordCheck != regConfirmCheck){
        Swal.fire({
            title: 'Error!',
            text: 'Please check your entry ',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }else {
        const user = {
            email: regEmailCheck,
            password : regPasswordCheck
        }
        let check =  CheckUser(regEmailCheck, allUsers)
        if (check){
            Swal.fire({
                title: 'Error!',
                text: 'user already registered .. please login',
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("index.html");
                
                }
              })
          
        }else {
            allUsers.push(user)
            window.localStorage.setItem('users', JSON .stringify(allUsers))
            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: 'User Data has been saved',
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                window.location.replace("index.html");
            })
        }
    }
    
}
function CheckUser(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].email === obj) {
            return true;
        }
    }

    return false;
}

function logSubmitBtnClick(e) {
    e.preventDefault();
    var logEmailCheck = logEmail.value
    var logPasswordCheck = logPassword.value
    if (logEmailCheck == "" || logEmailCheck == null 
        ||  logPasswordCheck == "" || logPasswordCheck == null ){
        Swal.fire({
            title: 'Error!',
            text: 'Please check your entry ',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }  else {
        let checkuser =  CheckUser(logEmailCheck, allUsers)
        let checkpassword = CheckPassword(logPasswordCheck, allUsers)
        if (checkuser) {
            if (checkpassword){
                window.location.replace("products.html");
            }else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please check your entry ',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
    
            }

            
        }else {
            Swal.fire({
                title: 'Error!',
                text: 'Please check your entry ',
                icon: 'error',
                confirmButtonText: 'Ok'
              })

        }
    }
}
function CheckPassword(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].password === obj) {
            return true;
        }
    }

    return false;
}


// class User {
//     #e;
//     constructor(id, name, age) {
//         this.id = id
//         this.name = name
//         this.age = age
//         this.#e = "500 ash"
//     }
//     gete(){
//         return parseInt(this.#e)
//     }
// }
// let userOne = new User(5,'ali',30)
// console.log("check e", userOne.gete());
// class Admin extends User {
//     constructor(id, name, age,gete, rule){
//         super(id, name, age,gete);
//         this.rule = rule;
//     }
// }
// let ashraf = new Admin(100, "ashraf", 50,20)
// console.log(ashraf.gete())

// let url = "https://api.github.com/users/ataha2001/repos"
// fetch(url).then((result) => {
//     let data = result.json()
//     console.log(data)
//     return data
// }).then((data) =>{
//     data.length = 3
//     return data
// }).then((data) =>{
//     console.log("Last data =", data);
// }).catch((error) => console.log(error)).finally(console.log("final line"))

// let url = "https://api.github.com/users/ataha2001/repos"
// async function getData() {
//     console.log("beror promiss");
//     try {
//         let res = await fetch(url)
//         let data = await res.json()
//         console.log("Data = ", data[0].name)
        
//     } catch (err) {
//         console.log(`you have error in data ${err}`)
//     } finally{
//         console.log("After all prosess");
//     }
// }
// getData()