const submitBtn = document.getElementById("submitBtn");
const inputArea = document.getElementById("input");
const itemArea = document.getElementById("second-area");

submitBtn.addEventListener("click", addItem);

const homeSection = document.getElementById("Home");
const todaySection = document.getElementById("Today");
const weekSection = document.getElementById("Week");
const goalsSection = document.getElementById("Goals");
const notesSection = document.getElementById("Notes");
const activeSection = document.querySelector(".active");

const sectionArray = [homeSection, todaySection, weekSection, goalsSection, notesSection];

let localStorageItems;
let context = document.querySelector(".active").textContent;

addEventSectionListener();

loadList(context);

function addEventSectionListener() {
    Array.from(sectionArray).forEach((item) => {

        item.addEventListener("click", () => {
            Array.from(sectionArray).forEach(item => item.classList.remove("active"));
            item.classList.add("active");
            context = document.querySelector(".active").textContent;
            itemArea.innerHTML = "";
            loadList(context);
        }

    )});
}





function saveList(todoText, context) {
    localStorageItems = JSON.parse(localStorage.getItem(`${context}-list`) || "[]");
    localStorageItems.push(todoText.textContent);
    localStorage.setItem(`${context}-list`, JSON.stringify(localStorageItems));
    // console.log(JSON.parse(localStorage.getItem("todo-list")));
}

// function editList() {

// }



function loadList(context) {
    localStorageItems = JSON.parse(localStorage.getItem(`${context}-list`) || "[]");
    if (localStorageItems !== null) {
        localStorageItems.forEach(element => {
            let toDoItem = document.createElement("div");
            toDoItem.classList.add("todo-list-item");
            toDoItem.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span class="todo-text" contenteditable="false"></span>
            <div class="todo-item-group">
                <img src="imgs/edit.svg" alt="edit" class="editImg">
                <img src="imgs/cross.svg" alt="edit" class="crossImg">
                <img src="imgs/tick.svg" alt="edit" class="tickImg">
            </div>
            `;
            let todoText = toDoItem.querySelector(".todo-text");
            todoText.textContent = element;

    
            let checkBox = toDoItem.querySelector(".checkbox");
            let todoItemGroup = toDoItem.querySelector(".todo-item-group");
            let editBtn = todoItemGroup.querySelector(".editImg");
            let crossBtn = todoItemGroup.querySelector(".crossImg");
            let tickBtn = todoItemGroup.querySelector(".tickImg");

            crossBtn.style.display = "none";
            tickBtn.style.display = "none";

            itemArea.appendChild(toDoItem);
            const handleDel = () => deleteToDoText(context, toDoItem);
            todoText.addEventListener("click", handleDel);

                
            editBtn.addEventListener("click", () => {
                todoText.removeEventListener("click", handleDel);
                editActive(todoText, toDoItem, crossBtn, tickBtn, editBtn);
            })

            checkBox.addEventListener("change", () => {
                if (checkBox.checked) {
                    todoText.style.textDecoration = "line-through";
                    todoText.style.color = "#808080";
                }
                else {
                    todoText.style.color = "#000000";
                    todoText.style.textDecoration = "none";
                }
            })
    })}

}

function addItem() {
    context = document.querySelector(".active").textContent;
    let toDoItem = document.createElement("div");
    toDoItem.classList.add("todo-list-item");


    toDoItem.innerHTML = `
    <input type="checkbox" class="checkbox">
    <span class="todo-text" contenteditable="false"></span>
    <div class="todo-item-group">
        <img src="imgs/edit.svg" alt="edit" class="editImg">
        <img src="imgs/cross.svg" alt="edit" class="crossImg">
        <img src="imgs/tick.svg" alt="edit" class="tickImg">
    </div>
    `;
    let todoText = toDoItem.querySelector(".todo-text");
    todoText.classList.add("not-editing");
    todoText.textContent = inputArea.value;



    let checkBox = toDoItem.querySelector(".checkbox");
    let todoItemGroup = toDoItem.querySelector(".todo-item-group");
    let editBtn = todoItemGroup.querySelector(".editImg");
    let crossBtn = todoItemGroup.querySelector(".crossImg");
    let tickBtn = todoItemGroup.querySelector(".tickImg");

    crossBtn.style.display = "none";
    tickBtn.style.display = "none";

    if (toDoItem.textContent.trim() !== "") {


        function handleDel() {
            deleteToDoText(context, toDoItem);
        }
        todoText.addEventListener("click", handleDel);

        editBtn.addEventListener("click", () => {
            todoText.removeEventListener("click", handleDel);
            editActive(todoText, toDoItem, crossBtn, tickBtn, editBtn);
        })

        checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                todoText.style.textDecoration = "line-through";
                todoText.style.color = "#808080";
            }
            else {
                todoText.style.color = "#000000";
                todoText.style.textDecoration = "none";
            }
        })
        saveList(todoText, context);
        itemArea.innerHTML = "";
        loadList(context);
    }


    inputArea.value = "";
}

function editActive(todoText, toDoItem, crossBtn, tickBtn, editBtn) {
    todoText.classList.remove("not-editing");
    
    let currentText = todoText.textContent;

    todoText.contentEditable = "true";
    todoText.focus();
    crossBtn.style.display = "inline";
    tickBtn.style.display = "inline";
    editBtn.style.display = "none";

    tickBtn.addEventListener("click", () => {
        const todoIndex = Array.from(itemArea.children).indexOf(toDoItem);
        if (todoIndex !== -1) {
            let context = document.querySelector(".active").textContent;
            localStorageItems[todoIndex] = todoText.textContent;
            localStorage.setItem(`${context}-list`, JSON.stringify(localStorageItems));
        }
            
        tickCross(tickBtn, todoText, crossBtn, editBtn);

    
    })

    crossBtn.addEventListener("click", () => {
        tickCross(tickBtn, todoText, crossBtn, editBtn);
        todoText.textContent = currentText;
    })
}


function tickCross(tickBtn, todoText, crossBtn, editBtn) {
    todoText.contentEditable = "false";
    crossBtn.style.display = "none";
    tickBtn.style.display = "none";
    editBtn.style.display = "inline";
    todoText.classList.add("not-editing");
}

function deleteToDoText(context, toDoItem) {
    const todoIndex = Array.from(itemArea.children).indexOf(toDoItem);
    if (todoIndex !== -1) {
        localStorageItems.splice(todoIndex, 1);
        localStorage.setItem(`${context}-list`, JSON.stringify(localStorageItems));

    }
    toDoItem.remove();
}