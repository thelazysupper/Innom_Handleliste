const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");
const saveButton = document.getElementById("saveButton");
const listPanel = document.getElementById("listPanel");
const panel = document.getElementById("panel");

function addItem() {
	const itemName = itemInput.value.trim();

	if (itemName) {
		const item = document.createElement("li");
		const itemNameElem = document.createElement("span");
		itemNameElem.className = "item";
		itemNameElem.innerText = itemName;
		const removeBtn = document.createElement("button");
		removeBtn.innerText = "Remove";
		removeBtn.onclick = function() {
			item.remove();
		};
		item.appendChild(itemNameElem);
		item.appendChild(removeBtn);
		itemList.appendChild(item);
		itemInput.value = "";
	}
}

itemList.addEventListener("click", function(e) {
	if (e.target.tagName === "LI") {
		e.target.classList.toggle("done");
	}
});

function saveList() {
	const items = Array.from(itemList.children).map(function(item) {
		return {
			name: item.querySelector(".item").innerText,
			done: item.classList.contains("done"),
		};
	});
	localStorage.setItem("shoppingList", JSON.stringify(items));
	alert("List saved!");
	addToListPanel();
}

function loadList() {
	const savedList = localStorage.getItem("shoppingList");
	if (savedList) {
		const items = JSON.parse(savedList);
		items.forEach(function(item) {
			const li = document.createElement("li");
			const itemNameElem = document.createElement("span");
			itemNameElem.className = "item";
			itemNameElem.innerText = item.name;
			const removeBtn = document.createElement("button");
			removeBtn.innerText = "Remove";
			removeBtn.onclick = function() {
				li.remove();
			};
			li.appendChild(itemNameElem);
			li.appendChild(removeBtn);
			if (item.done) {
				li.classList.add("done");
			}
			itemList.appendChild(li);
		});
	}
}

function addToListPanel() {
	const savedLists = localStorage.getItem("savedLists");
	let lists = [];
	if (savedLists) {
		lists = JSON.parse(savedLists);
	}
	const items = Array.from(itemList.children).map(function(item) {
		return item.querySelector(".item").innerText;
	});
	const listName = prompt("Enter a name for the list:");
	if (listName) {
		lists.push({name: listName, items: items});
		localStorage.setItem("savedLists", JSON.stringify(lists));
		updateListPanel(lists);
	}
}

function updateListPanel(lists) {
	listPanel.innerHTML = "";
	lists.forEach(function(list) {
		const li = document.createElement("li");
		li.innerText = list.name;
		li.onclick = function() {
			itemList.innerHTML = "";
			list.items.forEach(function(itemName) {
				const item = document.createElement("li");
				const itemNameElem = document.createElement("span");
				itemNameElem.className = "item";
				itemNameElem.innerText = itemName;
				const removeBtn = document.createElement("button");
				removeBtn.innerText = "Remove";
				removeBtn.onclick = function() {
					item.remove();
				};
				item.appendChild(itemNameElem);
				item.appendChild(removeBtn);
				itemList.appendChild(item);
			});
		};
		listPanel.appendChild(li);
	});
	panel.style.display = "block";
}
function saveList() {
	// Get the name of the list from the user
	const listName = prompt("Enter a name for your list:");
	if (!listName) {
		return;
	}

	// Get the items in the current shopping list
	const items = Array.from(itemList.children).map(function(item) {
		return item.querySelector(".item").innerText;
	});

	// Check if the list already exists in local storage
	let lists = JSON.parse(localStorage.getItem("shoppingLists")) || [];
	const existingListIndex = lists.findIndex(function(list) {
		return list.name === listName;
	});

	// If the list exists, update its items
	if (existingListIndex !== -1) {
		lists[existingListIndex].items = items;
	} else {
		// Otherwise, add a new list to local storage
		lists.push({
			name: listName,
			items: items
		});
	}

	// Save the updated lists to local storage
	localStorage.setItem("shoppingLists", JSON.stringify(lists));

	// Show the updated list panel
	updateListPanel(lists);
}
const x = document.getElementById("sidebar");
const sidebarMenu = document.getElementById("hamburger");

function openSidebar() {
    if x.style.display === "none"
    x.style.display = "block";
}   else {
    x.style.display = none;
}