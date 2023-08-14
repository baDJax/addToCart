import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-458d2-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById("add-button")
let inputField = document.getElementById("input-field")
let shoppingList = document.getElementById("shopping-list")

addBtn.addEventListener('click', () => {
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    clearInput()
})

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    clearList()
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemId = currentItem[0]
        let currentItemValue = currentItem[1]
        
        appendList(currentItem)
    }} else{
        shoppingList.innerHTML = "NO ITEMS YET"
    }
})

function clearInput() {
    inputField.value = ""
}

function appendList(item) {
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener('dblclick', function() {
        let exactLocation = ref(database, `shoppingList/${itemId}`)
        remove(exactLocation)
    })
    shoppingList.append(newEl)
}

function clearList(){
    shoppingList.innerHTML = ""
}