const form = document.querySelector('form');
const input = document.querySelector('#new-item');
const taskList = document.querySelector('#item-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = input.value;
  if (task !== '') {
    addTask(task);
  }
});

function addTask(task) {
  const li = document.createElement('li');
  li.id = 'list-Item';
  li.textContent = task;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(li);
  });
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit-btn';
  editButton.addEventListener('click', () => {
    editTask(li, editButton);
  });
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  taskList.appendChild(li);
  input.value = '';
}

function editTask(li, editButton) {
  const task = li.firstChild.textContent;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = task;
  editInput.className = 'edit-input';
  li.replaceChild(editInput, li.firstChild);
  editButton.textContent = 'Save';
  editButton.className = 'save-btn';
  editButton.removeEventListener('click', editTask);
  editButton.addEventListener('click', () => {
    saveTask(li, editInput, editButton);
  });
}

function saveTask(li, editInput, editButton) {
    const task = editInput.value;
    if (task !== '') {
      li.firstChild.textContent = task;
      li.removeChild(editInput);
      editButton.textContent = 'Edit';
      editButton.className = 'edit-btn';
      editButton.removeEventListener('click', saveTask);
      editButton.addEventListener('click', () => {
        editTask(li, editButton);
      });
    } else {
      alert('Task cannot be empty.');
    }
  }

  const titleContainer = document.getElementById('title-container');
  const title = document.getElementById('list-title');
  const editInput = document.createElement('input');
  editInput.id = 'edit-title-input';
  editInput.type = 'text';
  
  const editButton = document.getElementById('submit_button');
  editButton.addEventListener('click', () => {
    if (editInput.style.display === 'none') {
      editInput.value = title.textContent;
      title.textContent = '';
      title.appendChild(editInput);
      editInput.style.display = 'inline';
      editButton.textContent = 'Lagre';
    } else {
      title.textContent = editInput.value;
      editInput.style.display = 'none';
      editButton.textContent = 'Endre tittel';
      editButton.innerHTML = '<img src="./assets/edit_icon_blue">'
    }
  });
  
  

