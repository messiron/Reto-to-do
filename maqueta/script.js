const todoList = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo')

let tareas = []
function eliminar(index)
{
  const tareasFiltradas = tareas.filter((_, i) => i !== index)

  tareas = [...tareasFiltradas]
  render()
}

function render() {
  while (todoList.children.length > 0)
  {
    todoList.lastChild.remove()
  }

  tareas.forEach((e, i) => {
    const taskElement = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');

    taskElement.appendChild(checkbox);

    taskElement.appendChild(document.createTextNode(e));

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

    buttonBorrar.addEventListener('click', () => {
      // alert('eliminar ' + i)
      eliminar(i)
    })

    buttonEdit.appendChild(iconEdit);
    taskElement.appendChild(buttonEdit);
    buttonBorrar.appendChild(iconBorrar);
    taskElement.appendChild(buttonBorrar);
  })
}

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && event.target.value.length > 0) {
    const taskText = event.target.value;
    tareas.push(taskText)
    render()
    event.target.value = '';
    console.log(tareas)
  }
});