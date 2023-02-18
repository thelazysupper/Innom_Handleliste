// When clicking on the "New shopping list" button, the overlay will move in
const newItemButton = document.getElementById('primary_button');
const createNewItem = document.getElementById('new_list_overlay');

function newListItem() {
  if (createNewItem.style.display === 'none') {
    createNewItem.style.display = 'block';
  } else {
    createNewItem.style.display = 'none';
  }
}

newItemButton.addEventListener('click', newListItem);