// Initialize cat's stats
let catData = {
  hunger: 50,
  happiness: 50,
  health: 50,
  tasksCompleted: 0
};

// Function to fetch and update the cat's data from the JSON file
async function fetchCatData() {
  const response = await fetch('cat.json');
  if (response.ok) {
    catData = await response.json();
    updateCatStats();
  }
}

// Update the displayed stats
function updateCatStats() {
  document.getElementById('hunger-value').textContent = catData.hunger;
  document.getElementById('happiness-value').textContent = catData.happiness;
  document.getElementById('health-value').textContent = catData.health;
}

// Handle task completion (feeding, etc.)
function completeTask() {
  catData.hunger = Math.max(catData.hunger - 10, 0);  // Feeding reduces hunger
  catData.happiness = Math.min(catData.happiness + 5, 100);  // Happiness increases
  catData.tasksCompleted++;

  updateCatStats();
  saveCatData();
}

// Save the updated cat data to the cat.json file
async function saveCatData() {
  const response = await fetch('cat.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catData)
  });

  if (response.ok) {
    console.log('Cat data updated!');
  } else {
    console.error('Failed to update cat data');
  }
}

// Initialize
fetchCatData();
