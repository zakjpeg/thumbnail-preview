const imageInput = document.getElementById('ffile');
const preview = document.getElementById('fimagepreview');
const dynamicthumbnail = document.getElementById('dynamic__thumbnail');
const body = document.getElementsByClassName('body');
var placeFirstFlag = 0;

// Function to place preview first
function placeFirst() {
    if (placeFirstFlag == 0) {
        placeFirstFlag = 1;
    } else {
        placeFirstFlag = 0;
    }
    document.getElementById('btn__place__first').classList.toggle('redmode');
    const boxes = document.querySelectorAll('.vid-list'); // Select all divs with class "box"
    const parent = boxes[0].parentNode; // Get the parent element
    const boxesArray = Array.from(boxes); // Convert NodeList to an array
    var i = boxesArray.findIndex(box => box.id === 'dynamic__video');

    if (i !== -1) {
        [boxesArray[0], boxesArray[i]] = [boxesArray[i], boxesArray[0]] ;
    }

    // Remove all boxes from the parent
    boxesArray.forEach(box => parent.removeChild(box));

    // Append the shuffled boxes back to the parent
    boxesArray.forEach(box => parent.appendChild(box));
}

// Function to randomize the divs
function randomizeDivs() {
    const boxes = document.querySelectorAll('.vid-list'); // Select all divs with class "box"
    const parent = boxes[0].parentNode; // Get the parent element
    const boxesArray = Array.from(boxes); // Convert NodeList to an array

    // Shuffle the array of boxes
    const shuffledBoxes = shuffleArray(boxesArray);

    if (placeFirstFlag == 1) {
        var i = boxesArray.findIndex(box => box.id === 'dynamic__video');

        if (i !== -1) {
            [boxesArray[0], boxesArray[i]] = [boxesArray[i], boxesArray[0]] ;
        }
    }

    // Remove all boxes from the parent
    shuffledBoxes.forEach(box => parent.removeChild(box));

    // Append the shuffled boxes back to the parent
    shuffledBoxes.forEach(box => parent.appendChild(box));
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader;

    reader.onload = function(e) {
        preview.src = e.target.result;
        dynamicthumbnail.src = e.target.result;
    }

    reader.readAsDataURL(file);
    randomizeDivs();
})

preview.addEventListener('click', function() {
    imageInput.click();
})


const textForm = document.getElementById('inputForm');
const userInput = document.getElementById('ftitle');
const resultDiv = document.getElementById('dynamic__title');

textForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputValue = userInput.value;

    resultDiv.textContent = inputValue;

})

var btnSubmit = document.getElementById('btn__submit');

btnSubmit.addEventListener('click', function() {
    document.getElementById("preview__anchor").scrollIntoView({
        behavior: "smooth"
    });
})


// Function to switch to darkmode
const btnToggleMode = document.getElementById("btn__toggle__darkmode");
btnToggleMode.addEventListener('click', function() {
    document.body.classList.toggle('darkmode');
})


// Keyboard Shortcuts ('d' and 's' for darkmode and shuffle)
document.addEventListener('keydown', function(event) {

    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {   
        if (event.key === 's' || event.key === 'S') {
            randomizeDivs();
        }
        if (event.key === 'd' || event.key === 'D') {
            document.body.classList.toggle('darkmode');
        }
    }
})


// Dragover Functions (Drag and Drop) WIP
const overlay = document.getElementById('overlay');

window.addEventListener('dragenter', (event) => {
    event.preventDefault();
    overlay.style.transition = "250ms";
    overlay.style.display = "flex";
});

window.addEventListener('dragleave', (event) => {
    event.preventDefault();
    if (event.clientX === 0 && event.clientY === 0) {
        overlay.style.transition = "250ms";
        overlay.style.display = "none"; // Hide overlay

      }
})

window.addEventListener('drop', (event)=> {
    preventDefault();
    overlay.style.display = "none";
})








// Button to Randomize Divs
const btnRandomize = document.getElementById("btn__randomize__order");
btnRandomize.addEventListener('click', randomizeDivs)

// Button to send preview to first place
const btnPlaceFirst = document.getElementById("btn__place__first");
btnPlaceFirst.addEventListener('click', placeFirst)

// Button to toggle mobile view on desktop
const btnToggleMobile = document.getElementById("btn__toggle__mobile");
btnToggleMobile.addEventListener('click', function() {

    btnToggleMobile.classList.toggle('redmode');

    const listContainer = document.getElementById("list-container");

    listContainer.classList.toggle('mobile');

})

// Function to copy title text
var btnCopyTitle = document.getElementById("btn__copy__title");
var copyText = document.getElementById("ftitle");

btnCopyTitle.addEventListener('click', function() {

    copyText.select();
    copyText.setSelectionRange(0, 99999); //for mobile

    navigator.clipboard.writeText(copyText.value);
    window.getSelection().removeAllRanges();

})


// Call the function on page load
window.onload = function() {
    randomizeDivs();
};



/*
var btnXlnsLink = document.getElementById('btn__xlns__link');
btnXlnsLink.addEventListener('click', function() {
    window.location.href = "https://xlns.media";
})

var btnYTLink = document.getElementById("btn__youtube__link");
btnYTLink.addEventListener('click', function() {
    window.location.href = "https://youtube.com";
})
*/


/*const form = document.getElementById('inputForm');
const iframe = document.querySelector('preview__api__wrapper');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const videoTitle = document.getElementById('ftitle').value;
    const fileInput = document.getElementById('ffile');
    const thumbnail = URL.createObjectURL(fileInput.files[0]);

    const iframeContent = iframe.contentWindow.document;
    const thumbnailElement = iframeContent.queryselector('#dynamic__thumbnail');
    const titleElement = iframeContent.queryselector('#dynamic__title');

    thumbnailElement.src = thumbnail;
    titleElement.textContent = videoTitle;
});*/


