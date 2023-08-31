const todoList = document.querySelectorAll('.todo-list');
const input = document.querySelector('.new-todo')

const tareas = []
// const footer = document.querySelector('.footer');
// const toogle = document.querySelectorAll('.toogle');
// const deleteBtn = document.getElementById('borrarBtn')
// const editBtn = document.querySelectorAll('.editBtn');
// const updateController = document.querySelectorAll('.update-controller');
// const textTarea = document.querySelectorAll('.input-controller textarea')
// const editControllerSelect = document.querySelectorAll('.edit-controller select')[0];
// const priority = document.querySelectorAll('#priority')
// const editControllerSelect1 = document.querySelectorAll('.edit-controller select')[1];
// const category = document.querySelectorAll('#category');
// const saveBtn = document.querySelectorAll('.saveBtn');
// const cancelBtn = document.querySelectorAll('.cancelBtn');
function createTask(taskText) {
  const taskElement = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');

  taskElement.appendChild(checkbox);

  taskElement.appendChild(document.createTextNode(taskText));

  const todoList = document.querySelector('.todo-list');
  todoList.appendChild(taskElement);

  const buttonEdit = document.createElement('button');
  const iconEdit = document.createElement('img');
  iconEdit.classList.add('icon-edit');
  buttonEdit.classList.add('button');
  iconEdit.setAttribute('src', 'pencil-square.svg');

  const buttonBorrar = document.createElement('button');
  const iconBorrar = document.createElement('img');
  iconBorrar.classList.add('icon-borrar');
  buttonBorrar.classList.add('button', 'button-delete');
  iconBorrar.setAttribute('src', 'trash-fill.svg');

  buttonEdit.appendChild(iconEdit);
  taskElement.appendChild(buttonEdit);
  buttonBorrar.appendChild(iconBorrar);
  taskElement.appendChild(buttonBorrar);
}

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && event.target.value.length > 0) {
    const taskText = event.target.value;
    createTask(taskText);
    event.target.value = '';
    tareas.push(taskText)
    console.log(tareas)
  }
});
