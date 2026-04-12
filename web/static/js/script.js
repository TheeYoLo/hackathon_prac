document.addEventListener("DOMContentLoaded", () => {
    // --- Elements ---
    const overlay = document.getElementById('noteOverlay');
    const addBtn = document.getElementById('addNoteBtn');
    const closeBtn = document.getElementById('closeBtn');
    const saveModalBtn = document.querySelector('.submit-btn'); // Modal save
    const titleInput = document.querySelector('input[name="title"]');
    const notesList = document.getElementById('notesList');

    // --- Editor Elements ---
    const editorContainer = document.getElementById('editorContainer');
    const noNotePlaceholder = document.getElementById('noNotePlaceholder');
    const activeNoteTitle = document.getElementById('activeNoteTitle');
    const noteTextArea = document.getElementById('noteTextArea');
    const editBtn = document.getElementById('editBtn');
    const saveRightBtn = document.getElementById('saveBtnRight');

    // --- Data Storage (Temporary) ---
    let notesData = {}; // Format: { "id": "text content" }
    let currentNoteId = null;

    // --- Overlay Controls ---
    addBtn.onclick = () => overlay.style.display = 'flex';
    closeBtn.onclick = () => overlay.style.display = 'none';

    // --- Create New Note Logic ---
    saveModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const titleText = titleInput.value.trim();

        if (titleText !== "") {
            const noteId = "note-" + Date.now();
            notesData[noteId] = ""; // Initialize empty content

            // Create Sidebar Element
            const newNote = document.createElement('div');
            newNote.classList.add('note-item');
            newNote.setAttribute('data-id', noteId);
            newNote.innerHTML = `
                <span>${titleText}</span>
                <button class="delete-btn">&times;</button>
            `;

            // Delete Logic
            newNote.querySelector('.delete-btn').onclick = (event) => {
                event.stopPropagation();
                delete notesData[noteId];
                newNote.remove();
                if (currentNoteId === noteId) {
                    editorContainer.style.display = 'none';
                    noNotePlaceholder.style.display = 'flex';
                }
            };

            // Click Sidebar to Open Note
            newNote.onclick = () => {
                currentNoteId = noteId;
                noNotePlaceholder.style.display = 'none';
                editorContainer.style.display = 'block';
                activeNoteTitle.innerText = titleText;
                noteTextArea.value = notesData[noteId];
                
                // Reset to View Mode
                setEditMode(false);
            };

            notesList.appendChild(newNote);
            titleInput.value = "";
            overlay.style.display = 'none';
        }
    });

    // --- Edit / Save Toggle Logic ---
    function setEditMode(isEditing) {
        if (isEditing) {
            noteTextArea.readOnly = false;
            noteTextArea.classList.add('editing');
            noteTextArea.focus();
            editBtn.style.display = 'none';
            saveRightBtn.style.display = 'inline-block';
        } else {
            noteTextArea.readOnly = true;
            noteTextArea.classList.remove('editing');
            editBtn.style.display = 'inline-block';
            saveRightBtn.style.display = 'none';
        }
    }

    editBtn.onclick = () => setEditMode(true);

    saveRightBtn.onclick = () => {
        if (currentNoteId) {
            notesData[currentNoteId] = noteTextArea.value;
            setEditMode(false);
            console.log("Saved content for:", currentNoteId);
        }
    };
});