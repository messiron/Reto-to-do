let tareas = JSON.parse(localStorage.getItem('tareas'))??[]

if (tareas.length > 0)
{
  createTask()
}

function edit(index, nuevoTitulo)
{
  tareas.forEach((e, i) => {
    if (i == index) 
    {
      e.titulo = nuevoTitulo
    }
  })

  localStorage.setItem('tareas', JSON.stringify(tareas))
}

function borrar(index)
{
  const tareasFiltradas = tareas.filter((_, i) => index !== i)

  tareas = [...tareasFiltradas]

  localStorage.setItem('tareas', JSON.stringify(tareas))
}

function createTask() {
  const todoList = document.querySelector('.todo-list');

  while (todoList.children.length > 0)
  {
    todoList.lastChild.remove()
  }

  tareas.forEach((e, i) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');

    const prioridadDiv = document.createElement('div')
    const categoriaDiv = document.createElement('div')

    prioridadDiv.textContent = 'Prioridad'
    categoriaDiv.textContent = 'Categoria'

    const selectPrioridad = document.createElement('select')
    const selectCategoria = document.createElement('select')

    for (let i = 1; i<=3; i++)
    {
      const optionP = document.createElement('option')
      const optionC = document.createElement('option')

      if (i === 1) 
      {
        optionP.textContent = 'Alta'
        optionC.textContent = 'Casa'

        optionP.value = 'Alta'
        optionC.value = 'Casa'
      }
      else if (i === 2) 
      {
        optionP.textContent = 'Media'
        optionC.textContent = 'Trabajo'

        optionP.value = 'Media'
        optionC.value = 'Trabajo'
      }
      else 
      {
        optionP.textContent = 'Bajo'
        optionC.textContent = 'Emprendimiento'

        optionP.value = 'Bajo'
        optionC.value = 'Emprendimiento'
      }

      selectPrioridad.appendChild(optionP)
      selectCategoria.appendChild(optionC)
    }

    selectPrioridad.addEventListener('change', () => {
      e.prioridad = selectPrioridad.value
      localStorage.setItem('tareas', JSON.stringify(tareas))
    })

    selectCategoria.addEventListener('change', () => {
      e.categoria = selectCategoria.value
      localStorage.setItem('tareas', JSON.stringify(tareas))
    })

    prioridadDiv.appendChild(selectPrioridad)
    categoriaDiv.appendChild(selectCategoria)

    if (!e.prioridad && !e.categoria)
    {
      e.prioridad = selectPrioridad.value
      e.categoria = selectCategoria.value
    }
    else 
    {
      selectPrioridad.value = e.prioridad
      selectCategoria.value = e.categoria
    }

    const taskTextElement = document.createElement('span');
    taskTextElement.innerText = e.titulo;
    taskTextElement.classList.add('task-text');
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskTextElement);

    todoList.appendChild(taskElement);

    const buttonEdit = createButton('edit.svg', 'icon-edit', 'button-edit');
    const buttonDelete = createButton('close.svg', 'icon-borrar', 'button-borrar');

    buttonDelete.addEventListener('click', () => {
      todoList.removeChild(taskElement);
      borrar(i)
    });

    buttonEdit.addEventListener('click', () => {
      const textElement = taskElement.querySelector('.task-text');
      textElement.contentEditable = true;
      textElement.focus();
    });

    taskTextElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const textElement = event.target;
        textElement.blur(); ''
        edit(i, taskTextElement.textContent)
      }
    });
    taskElement.appendChild(buttonEdit);
    taskElement.appendChild(buttonDelete);

    taskElement.appendChild(prioridadDiv)
    taskElement.appendChild(categoriaDiv)
  })
}

function createButton(iconSrc, iconClass, buttonClass) {
  const button = document.createElement('button');
  const icon = document.createElement('img');
  icon.classList.add(iconClass);
  button.classList.add(buttonClass);
  icon.setAttribute('src', iconSrc);
  button.appendChild(icon);
  return button;
}

document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && event.target.value.length > 0) {
    const taskText = event.target.value;

    tareas.push({
      titulo: taskText
    })

    createTask();
    event.target.value = '';

    localStorage.setItem('tareas', JSON.stringify(tareas))
  }
});

