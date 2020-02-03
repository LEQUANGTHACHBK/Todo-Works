const day = document.getElementById('date');
date = new Date();

day.innerHTML = getDayText(date.getDay(),date.getMonth(),date.getDate(),date.getFullYear());

function getDayText(day,month,date,year)
{
    const dayArray = ['Sunday','Monday','Tuesday','Wesnerday','Thursday','Friday','Saturday'];
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return dayArray[day] + ', '+ monthArray[month]+' '+ date +', ' +  year;
}

let todoItems = [];

function addNewTodo(text)
{
    const todo = 
    {
        text : text,
        checked: false,
        id: Date.now(),
    };
    todoItems.push(todo);
    const list = document.querySelector('.js-todo-list');
    list.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `);
}  

function toggleDone(key)
{
    const index = todoItems.findIndex(function(item){return item.id === Number(key)});
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if(todoItems[index].checked)
    {
        item.classList.add('done');
    }else{
        item.classList.remove('done');
    }
}

function deleteTodo(key)
{
    todoItems = todoItems.filter(function(item){return item.id !== Number(key)})
    const item = document.querySelector(`[data-key = '${key}']`);
    item.remove();
    // console.log(todoItems)
    const list = document.querySelector('.js-todo-list');
    if(todoItems.length === 0)
    {
        list.innerHTML = '';
    }
}

const form = document.querySelector('.js-form');
form.addEventListener('submit',event=>{
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const textvalue = input.value.trim();
    if(textvalue !=='')
    {
        addNewTodo(textvalue);
        input.value = '';
        input.focus();
    }
})
const list = document.querySelector('.js-todo-list');
list.addEventListener('click',event=>{
    if(event.target.classList.contains('js-tick'))
    {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if(event.target.classList.contains('js-delete-todo'))
    {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
})