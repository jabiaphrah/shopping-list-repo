// Initialize an array to hold the shopping list items
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// DOM Elements
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const shoppingListContainer = document.getElementById('shopping-list');

// Function to render the shopping list
function renderList() {
  shoppingListContainer.innerHTML = ''; // Clear the list before re-rendering

  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${item.purchased ? 'purchased' : ''}">${item.name}</span>
      <button onclick="togglePurchased(${index})">Mark Purchased</button>
      <button onclick="deleteItem(${index})">Delete</button>
    `;
    shoppingListContainer.appendChild(li);
  });

  // Save the updated list to localStorage
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to add a new item
function addItem() {
  const itemName = itemInput.value.trim();
  if (itemName) {
    shoppingList.push({ name: itemName, purchased: false }); // Default to not purchased
    itemInput.value = ''; // Clear the input field
    renderList();
  }
}

// Function to toggle the purchased status
function togglePurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased; // Toggle the status
  renderList(); // Re-render the list to reflect the changes
}

// Function to delete an item
function deleteItem(index) {
  shoppingList.splice(index, 1); // Remove the item at the specified index
  renderList();
}

// Function to clear the entire list
function clearList() {
  shoppingList = [];
  renderList();
}

// Event Listeners
addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);

// Initial Render
renderList();
