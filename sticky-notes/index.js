const addButton = document.getElementById("addButton");

addButton.addEventListener("click", AddNewNote)

let activeNote;
let activeTextArea;
let activeTopBar;
let zIndex = 0;
let noteCount = 1;

function ResizeTextArea(){
    // Re-size the textarea
        activeTextArea.style.height = 
            (activeNote.getBoundingClientRect().height - 
            activeTopBar.getBoundingClientRect().height)+"px";
}

function AddNewNote() {
    // Make note div
    let note = document.createElement("div");
    note.style.cursor = "text";
    note.id = "note";

    let topBar = document.createElement("div");
    topBar.innerText = "Note"+noteCount;
    noteCount += 1;
    topBar.id = "topBar";
    topBar.style.cursor = "move";
    note.append(topBar);

    let textArea = document.createElement("textArea");
    textArea.wrap = "hard";
    textArea.id = "textArea";
    note.append(textArea);

    // Right-bottom resizing corner div
    let cornerD = document.createElement("div");
    cornerD.style.position = "absolute";
    cornerD.style.bottom = "0px";
    cornerD.style.right = "0px";
    cornerD.style.width = "10px";
    cornerD.style.height = "10px";
    cornerD.style.cursor = "se-resize";
    note.append(cornerD);

    // Add note
    document.querySelector("body").append(note);
    // set note to front
    note.style.zIndex = zIndex;
    zIndex += 1;

    activeNote = note;
    activeTextArea = textArea;
    activeTopBar = topBar;
    ResizeTextArea();

    // Events
    topBar.addEventListener("mousedown", function(event){
        activeTopBar = topBar;
        activeNote = note;
        DragNotePressed(event);
    });
    cornerD.addEventListener("mousedown", function(event){
        activeTextArea = textArea;
        activeNote = note;
        activeTopBar = topBar;
    
        ResizeNotePressed(event);
    })
    note.addEventListener("mousedown", function(){
        console.log("note clicked")
        activeNote = note;
        activeTopBar = topBar;

        // set active note to top on click
        note.style.zIndex = zIndex;
        zIndex += 1;
    
        textArea.click();
    })
}

//
// Note resizing
let resizeNotePressed;
let notePosition = {x:0, y:0};
let noteSize = {x:0, y:0};

document.addEventListener("mousemove", ResizeNote);
document.addEventListener("mouseup", resizeNoteReleased);
function ResizeNotePressed(event){
    resizeNotePressed = true;
    const rect = activeNote.getBoundingClientRect();
    notePosition.x = rect.x;
    notePosition.y = rect.y;
    noteSize.x = event.target.width; // 10
    noteSize.y = activeNote.height; // 5 
}
function ResizeNote(event){
    if (resizeNotePressed){
        activeNote.style.width = Math.abs(event.clientX - notePosition.x)+"px";
        activeNote.style.height = Math.abs(event.clientY - notePosition.y)+"px";
        console.log("resizing, ", notePosition.y);

        ResizeTextArea();
    }
}

function resizeNoteReleased(event){
    resizeNotePressed = false;
    dragNotePressed = false;
}



//
// Note dragging
document.addEventListener("mousemove", DragNote);
let dragNotePressed;
let dragMousePosition = {x:0, y:0};

function DragNotePressed(event){
    dragNotePressed = true;
    // Get relative position of mouse
    let rect = event.target.getBoundingClientRect();
    dragMousePosition.x = event.clientX - rect.left;
    dragMousePosition.y = event.clientY - rect.top;
}

function DragNote(event){
    if (dragNotePressed){
        console.log("dragging note")
        activeNote.style.left = (event.clientX - dragMousePosition.x)+"px";
        activeNote.style.top = (event.clientY - dragMousePosition.y)+"px";
    }
}

function DragNoteReleased(event){
    dragNotePressed = false;
    console.log("note released")
}