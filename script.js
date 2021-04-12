//Seletores 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('.filter-todo');
//Eventos
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', completeRemove);
filterTodo.addEventListener('click', filter);

//Funções

function addTodo(event) {
    //Tira o evento de envio do formulário.
    event.preventDefault();
    //TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');    
    //Criar Li
    const novoTodo = document.createElement('li');
    novoTodo.innerText = todoInput.value;
    novoTodo.classList.add('todo-item');
    todoDiv.appendChild(novoTodo);
    //ADICIONAR TODO NO ARMAZENAMENTO LOCAL
    saveLocalTodos(todoInput.value);
    //BOTÃO DE CONCLUSÃO
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //BOTÃO DE EXCLUSÃO
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add('remove-btn');
    todoDiv.appendChild(removeButton);
    //Adicionar a lista (UL)
    todoList.appendChild(todoDiv);
    //Limpar Value do Input    
    todoInput.value = '';
}

function completeRemove(e) {
    const item = e.target;
    if(item.classList[0] === 'remove-btn') {
        const todo = item.parentElement;
        //Animação
        todo.classList.add('remove'); 
        removeLocalTodos(todo);       
        todo.addEventListener('transitionend', function(){
            todo.remove();            
        })
    }    

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filter(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "complete":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }       
                break;     
            case "incomplete":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Checar se já tem algo armazenado no Armazenamento Local.
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));    
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Checar se já tem algo armazenado no Armazenamento Local.
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));    
    }    
    todos.forEach(function(todo){
        //TODO DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');    
        //Criar Li
        const novoTodo = document.createElement('li');
        novoTodo.innerText = todo;
        novoTodo.classList.add('todo-item');
        todoDiv.appendChild(novoTodo);        
        //BOTÃO DE CONCLUSÃO
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
        //BOTÃO DE EXCLUSÃO
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.classList.add('remove-btn');
        todoDiv.appendChild(removeButton);
        //Adicionar a lista (UL)
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));    
    }        
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}