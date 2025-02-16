const submitBtn = document.getElementById("submitBtn");
const inputArea = document.getElementById("input");
const itemArea = document.getElementById("second-area");
submitBtn.addEventListener("click", addItem);
let localStorageItems;

function saveList(todoText) {
    localStorageItems.push(todoText.textContent);
    localStorage.setItem("todo-list", JSON.stringify(localStorageItems));
    // console.log(JSON.parse(localStorage.getItem("todo-list")));
}

// function editList() {

// }



function loadList() {
    localStorageItems = JSON.parse(localStorage.getItem("todo-list") || "[]");
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
            console.log(element);
            todoText.textContent = element;

    
            let checkBox = toDoItem.querySelector(".checkbox");
            let todoItemGroup = toDoItem.querySelector(".todo-item-group");
            let editBtn = todoItemGroup.querySelector(".editImg");
            let crossBtn = todoItemGroup.querySelector(".crossImg");
            let tickBtn = todoItemGroup.querySelector(".tickImg");

            crossBtn.style.display = "none";
            tickBtn.style.display = "none";

            if (toDoItem.textContent.trim() !== "") {


                function handleDel() {
                    deleteToDoText(toDoItem);
                }


                itemArea.appendChild(toDoItem);

                todoText.addEventListener("click", handleDel);
                
                editBtn.addEventListener("click", () => editActive(todoText, toDoItem, crossBtn, tickBtn, editBtn));

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
            }
        });

    }
}

loadList();

function addItem() {

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
            deleteToDoText(toDoItem);
        }


        itemArea.appendChild(toDoItem);

        todoText.addEventListener("click", handleDel);
        
        editBtn.addEventListener("click", () => {
            editActive(todoText, toDoItem, crossBtn, tickBtn, editBtn);
            todoText.removeEventListener("click", handleDel);

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
        saveList(todoText);
        itemArea.innerHTML = "";
        loadList();
    }


    inputArea.value = "";
}












function editActive(todoText, toDoItem, crossBtn, tickBtn, editBtn) {
    todoText.classList.remove("not-editing");
    let currentText = todoText.textContent;
    const handleDel = () => deleteToDoText(toDoItem);

    todoText.contentEditable = "true";
    todoText.focus();
    crossBtn.style.display = "inline";
    tickBtn.style.display = "inline";
    editBtn.style.display = "none";


    tickBtn.addEventListener("click", () => {
        const todoIndex = Array.from(itemArea.children).indexOf(toDoItem);
        if (todoIndex !== -1) {
            localStorageItems[todoIndex] = todoText.textContent;
            localStorage.setItem("todo-list", JSON.stringify(localStorageItems));
        }
            
        tickCross(tickBtn, todoText, crossBtn, editBtn);
        todoText.addEventListener("click", handleDel);
    
    })

    crossBtn.addEventListener("click", () => {
        tickCross(tickBtn, todoText, crossBtn, editBtn);
        todoText.addEventListener("click", handleDel);
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

function deleteToDoText(toDoItem) {
    const todoIndex = Array.from(itemArea.children).indexOf(toDoItem);
    if (todoIndex !== -1) {
        localStorageItems.splice(todoIndex, 1);
        localStorage.setItem("todo-list", JSON.stringify(localStorageItems));

    }
    toDoItem.remove();
}