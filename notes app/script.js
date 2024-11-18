const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to display notes from localStorage
function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    notesContainer.innerHTML = ""; // Clear container

    if (savedNotes) {
        // Parse the saved notes and recreate the DOM structure
        const notesArray = JSON.parse(savedNotes);
        notesArray.forEach(noteContent => {
            createNoteElement(noteContent);
        });
    }
}

// Function to update localStorage
function updateStorage() {
    const notesArray = [];
    document.querySelectorAll(".input-box").forEach(note => {
        notesArray.push(note.textContent);
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
}

// Function to create a note element with delete functionality
function createNoteElement(content = "") {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.textContent = content;

    img.src = "delete.jpg";
    img.alt = "Delete";
    img.style.cursor = "pointer"; // Make delete icon clickable

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
}

// Event listener for creating new notes
createBtn.addEventListener("click", () => {
    createNoteElement(); // Create an empty note
    updateStorage(); // Save the new note
});

// Event listener for note interactions
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        // Remove note when delete icon is clicked
        e.target.parentNode.remove();
        updateStorage();
    }
});

// Update storage on editing notes
notesContainer.addEventListener("input", function (e) {
    if (e.target.classList.contains("input-box")) {
        updateStorage();
    }
});

// Prevent default behavior of Enter key
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Initialize notes from storage on page load
showNotes();
