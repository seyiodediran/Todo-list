// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


//Functions

const addTodo = (event) => {
    // prevent form from submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;

    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value)


    //check button
    const complete = document.createElement('button');
    complete.innerHTML = '<i class ="fa fa-check"></i>';
    complete.classList.add('complete-btn');
    todoDiv.appendChild(complete);

    //delete button
    const _delete = document.createElement('button');
    _delete.innerHTML = '<i class ="fa fa-trash"></i>';
    _delete.classList.add('delete-btn');
    todoDiv.appendChild(_delete);

    //append div to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}


const deleteCheck = (e) => {
    // console.log(e.target)

    const item = e.target;

    //delete todo

    if (item.classList[0] === "delete-btn") {

        const todo = item.parentElement;

        //animation
        todo.classList.add("fall");

        //remove item from local storage
        removeLocalTodos(todo);

        //remove on transition end
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    }

    //check mark
    if (item.classList[0] === "complete-btn") {

        const todo = item.parentElement;

        todo.classList.toggle("completed");
    }
}


const filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
            default:
                // todo.style.display= "flex";
                break;
        }
    })
    console.log(todos);
}


const saveLocalTodos = (todo) => {
    //check if there are already things in the file

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


const getTodos = () => {
    //check if there are already things in the file

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;

        newTodo.classList.add("todo-item");

        todoDiv.appendChild(newTodo);
        //check button
        const complete = document.createElement('button');
        complete.innerHTML = '<i class ="fa fa-check"></i>';
        complete.classList.add('complete-btn');
        todoDiv.appendChild(complete);

        //delete button
        const _delete = document.createElement('button');
        _delete.innerHTML = '<i class ="fa fa-trash"></i>';
        _delete.classList.add('delete-btn');
        todoDiv.appendChild(_delete);

        //append div to list
        todoList.appendChild(todoDiv);
    })
}

const removeLocalTodos = (todo) => {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// EventListener
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);