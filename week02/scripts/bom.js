// Declare variables to hold references to the input, button, and list elements
const input = document.getElementById('favchap');
const addButton = document.getElementById('addButton');
const list = document.getElementById('list');
const clearButton = document.getElementById('clearAll');
const sortButton = document.getElementById('sortList');
const counter = document.getElementById('counter');

// Load saved chapters from Local Storage when the page loads
window.addEventListener('load', function () {
    const savedChapters = JSON.parse(localStorage.getItem('chapters')) || [];
    savedChapters.forEach(chapterObj => addChapterToList(chapterObj.chapter, chapterObj.read));
    updateCounter();
    input.focus();
});

// Enable/disable Add button based on input value
input.addEventListener('input', function () {
    addButton.disabled = input.value.trim() === '';
});

// Add chapter to the list when Add button is clicked
addButton.addEventListener('click', function () {
    if (input.value.trim() !== '') {
        // Prevent duplicate entries
        const existingChapters = Array.from(list.children).map(item => item.querySelector('span').textContent.trim());
        if (existingChapters.includes(input.value.trim())) {
            alert('This chapter is already in your list.');
            input.focus();
            return;
        }

        // Add the new chapter
        addChapterToList(input.value, false);
        
        // Save to Local Storage
        saveChapters();

        // Clear the input value and update counter
        input.value = '';
        addButton.disabled = true;
    }
    input.focus();
});

// Add an event listener to the Clear All button
clearButton.addEventListener('click', function () {
    if (confirm('Are you sure you want to clear all chapters?')) {
        list.innerHTML = '';
        localStorage.removeItem('chapters');
        updateCounter();
    }
    input.focus();
});

// Add an event listener to the Sort button
sortButton.addEventListener('click', function () {
    let listItems = Array.from(list.children);
    listItems.sort((a, b) => a.querySelector('span').textContent.localeCompare(b.querySelector('span').textContent));
    list.innerHTML = '';
    listItems.forEach(item => list.appendChild(item));
    saveChapters();
});

// Handle adding chapter to the list
function addChapterToList(chapter, read = false) {
    if (list.children.length >= 10) {
        alert('You can only add up to 10 chapters.');
        return;
    }

    const listItem = document.createElement('li');
    const chapterText = document.createElement('span');
    chapterText.textContent = chapter;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.ariaLabel = 'Mark chapter as read';
    checkbox.checked = read; // Set the checkbox status based on the saved data

    const deleteButton = document.createElement('button');
    deleteButton.ariaLabel = 'Delete chapter';
    deleteButton.textContent = '❌';

    // Add event listener to delete button to remove chapter
    deleteButton.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this chapter?')) {
            list.removeChild(listItem);
            saveChapters();
            updateCounter();
        }
    });

    // Add event listener to checkbox to mark chapter as read
    checkbox.addEventListener('change', function () {
        listItem.classList.toggle('read', checkbox.checked);
        saveChapters(); // Update the saved data to reflect the change
    });

    // Append elements to list item
    listItem.appendChild(checkbox);
    listItem.appendChild(chapterText);
    listItem.appendChild(deleteButton);

    // Set the read class if the chapter is marked as read
    if (read) {
        listItem.classList.add('read');
    }

    // Append list item to list
    list.appendChild(listItem);
    updateCounter();
}

// Update the chapter counter display
function updateCounter() {
    counter.textContent = `${list.children.length}/10 Chapters Added`;
}

// Save chapters to Local Storage
function saveChapters() {
    const chaptersArray = Array.from(list.children).map(item => {
        return {
            chapter: item.querySelector('span').textContent.trim(),
            read: item.querySelector('input[type="checkbox"]').checked
        };
    });
    localStorage.setItem('chapters', JSON.stringify(chaptersArray));
}

// Add support for pressing Enter key to add chapter
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !addButton.disabled) {
        addButton.click();
    }
});
