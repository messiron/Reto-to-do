// Inicializa la variable 'tareas' a partir de los datos en localStorage o un arreglo vacío si no hay datos.
let tareas = JSON.parse(localStorage.getItem('tareas')) ?? [];

// Si hay tareas almacenadas, muestra la lista de tareas en la página.
if (tareas.length > 0) {
  createTask();
}

// Función para editar el título de una tarea en el arreglo 'tareas' según su índice.
function edit(index, nuevoTitulo) {
  tareas.forEach((e, i) => {
    if (i == index) {
      e.titulo = nuevoTitulo;
    }
  });

  // Actualiza los datos en localStorage con la versión actualizada de 'tareas'.
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para eliminar una tarea del arreglo 'tareas' según su índice.
function borrar(index) {
  // Filtra las tareas para excluir la tarea con el índice especificado.
  const tareasFiltradas = tareas.filter((_, i) => index !== i);

  // Actualiza 'tareas' con el arreglo filtrado.
  tareas = [...tareasFiltradas];

  // Actualiza los datos en localStorage con la versión actualizada de 'tareas'.
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para mostrar las tareas en la página web.
function createTask() {
  const todoList = document.querySelector('.todo-list');

  // Elimina todos los elementos hijos de '.todo-list' para evitar duplicaciones.
  while (todoList.children.length > 0) {
    todoList.lastChild.remove();
  }

  // Recorre todas las tareas en 'tareas' y crea elementos de lista para cada una.
  tareas.forEach((e, i) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');

    const prioridadDiv = document.createElement('div');
    prioridadDiv.classList.add('task-prioridad');
    const categoriaDiv = document.createElement('div');
    categoriaDiv.classList.add('task-categoria');
    prioridadDiv.textContent = 'Prioridad';
    categoriaDiv.textContent = 'Categoria';

    // Crea elementos 'select' para seleccionar prioridad y categoría.
    const selectPrioridad = document.createElement('select');
    const selectCategoria = document.createElement('select');

    // Llena las opciones de prioridad y categoría.
    for (let i = 1; i <= 3; i++) {
      const optionP = document.createElement('option');
      const optionC = document.createElement('option');

      if (i === 1) {
        optionP.textContent = 'Alta';
        optionC.textContent = 'Casa';

        optionP.value = 'Alta';
        optionC.value = 'Casa';
      } else if (i === 2) {
        optionP.textContent = 'Media';
        optionC.textContent = 'Trabajo';

        optionP.value = 'Media';
        optionC.value = 'Trabajo';
      } else {
        optionP.textContent = 'Bajo';
        optionC.textContent = 'Emprendimiento';

        optionP.value = 'Bajo';
        optionC.value = 'Emprendimiento';
      }

      selectPrioridad.appendChild(optionP);
      selectCategoria.appendChild(optionC);
    }

    // Agrega oyentes de eventos para actualizar la prioridad y categoría en 'tareas' y localStorage.
    selectPrioridad.addEventListener('change', () => {
      e.prioridad = selectPrioridad.value;
      localStorage.setItem('tareas', JSON.stringify(tareas));
    });

    selectCategoria.addEventListener('change', () => {
      e.categoria = selectCategoria.value;
      localStorage.setItem('tareas', JSON.stringify(tareas));
    });

    prioridadDiv.appendChild(selectPrioridad);
    categoriaDiv.appendChild(selectCategoria);

    // Establece la prioridad y categoría por defecto o según los valores almacenados en 'tareas'.
    if (!e.prioridad && !e.categoria) {
      e.prioridad = selectPrioridad.value;
      e.categoria = selectCategoria.value;
    } else {
      selectPrioridad.value = e.prioridad;
      selectCategoria.value = e.categoria;
    }

    // Crea un elemento de texto para el título de la tarea.
    const taskTextElement = document.createElement('span');
    taskTextElement.innerText = e.titulo;
    taskTextElement.classList.add('task-text');
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskTextElement);

    // Agrega los botones de edición y eliminación para cada tarea.
    const buttonEdit = createButton('assets/img/pencil-square.svg', 'icon-edit', 'button-edit');
    buttonEdit.classList.add('buton-edit');
    const buttonDelete = createButton('assets/img/trash-fill.svg', 'icon-borrar', 'button-borrar');
    buttonDelete.classList.add('button-delete');
    buttonDelete.addEventListener('click', () => {
      todoList.removeChild(taskElement);
      borrar(i);
    });

    buttonEdit.addEventListener('click', () => {
      const textElement = taskElement.querySelector('.task-text');
      textElement.contentEditable = true;
      textElement.focus();
    });

    // Agrega un oyente de evento para guardar cambios al presionar Enter.
    taskTextElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const textElement = event.target;
        textElement.blur();
        edit(i, taskTextElement.textContent);
      }
    });
    taskElement.appendChild(buttonEdit);
    taskElement.appendChild(buttonDelete);

    taskElement.appendChild(prioridadDiv);
    taskElement.appendChild(categoriaDiv);

    // Agrega la tarea a la lista.
    todoList.appendChild(taskElement);
  });
}

// Función para crear un botón con una imagen (ícono).
function createButton(iconSrc, iconClass, buttonClass) {
  const button = document.createElement('button');
  const icon = document.createElement('img');
  icon.classList.add(iconClass);
  button.classList.add(buttonClass);
  icon.setAttribute('src', iconSrc);
  button.appendChild(icon);
  return button;
}

// Agrega un oyente de evento al campo de entrada de texto para agregar nuevas tareas.
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && event.target.value.length > 0) {
    const taskText = event.target.value;

    // Agrega una nueva tarea al arreglo 'tareas'.
    tareas.push({
      titulo: taskText,
    });

    // Actualiza la vista y el localStorage con la tarea agregada.
    createTask();
    event.target.value = '';

    localStorage.setItem('tareas', JSON.stringify(tareas));
  }
});