//Seletores 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Eventos
todoButton.addEventListener('click', addTodo);

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