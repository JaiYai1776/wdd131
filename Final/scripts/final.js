// Sample resources data
const resources = [
    { id: 1, name: "Duolingo", type: "app", favorite: false },
    { id: 2, name: "Lernu.net", type: "course", favorite: false },
    { id: 3, name: "World Esperanto Congress", type: "event", favorite: false },
    { id: 4, name: "Amikumu", type: "app", favorite: false }
];

// Load user preferences on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserPreferences();
    renderResourceList();
    setupEventListeners();
});

// Render the list of resources
function renderResourceList() {
    const resourceContainer = document.getElementById("resource-list");
    resourceContainer.innerHTML = ""; // Clear existing content

    resources.forEach(resource => {
        // Use template literals to create HTML structure with dynamic button class
        const resourceItem = `
            <div class="resource-item" data-id="${resource.id}">
                <p><strong>${resource.name}</strong> - ${resource.type}</p>
                <button class="favorite-btn ${resource.favorite ? "favorited" : ""}">
                    ${resource.favorite ? "Unfavorite" : "Favorite"}
                </button>
            </div>
        `;
        resourceContainer.innerHTML += resourceItem;
    });
}

// Setup event listeners
function setupEventListeners() {
    const resourceContainer = document.getElementById("resource-list");

    // Add event listener for 'Favorite' button
    resourceContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("favorite-btn")) {
            const resourceId = event.target.closest(".resource-item").dataset.id;
            toggleFavorite(resourceId);
        }
    });
}

// Toggle favorite status
function toggleFavorite(id) {
    const resource = resources.find(res => res.id == id);
    if (resource) {
        resource.favorite = !resource.favorite; // Toggle favorite
        saveUserPreferences();
        renderResourceList(); // Re-render to reflect changes
    }
}

// Save preferences to localStorage
function saveUserPreferences() {
    localStorage.setItem("esperantoResources", JSON.stringify(resources));
}

// Load preferences from localStorage
function loadUserPreferences() {
    const savedResources = JSON.parse(localStorage.getItem("esperantoResources"));
    if (savedResources) {
        // Update resource data with saved preferences
        savedResources.forEach(savedResource => {
            const resource = resources.find(res => res.id === savedResource.id);
            if (resource) {
                resource.favorite = savedResource.favorite;
            }
        });
    }
}
