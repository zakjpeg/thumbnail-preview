const imageInput = document.getElementById('ffile');
const preview = document.getElementById('fimagepreview');
const dynamicthumbnail = document.getElementById('dynamic__thumbnail');
const body = document.getElementsByClassName('body');

// Function to randomize the divs
function randomizeDivs() {
    const boxes = document.querySelectorAll('.vid-list'); // Select all divs with class "box"
    const parent = boxes[0].parentNode; // Get the parent element
    const boxesArray = Array.from(boxes); // Convert NodeList to an array

    // Shuffle the array of boxes
    const shuffledBoxes = shuffleArray(boxesArray);

    // Remove all boxes from the parent
    shuffledBoxes.forEach(box => parent.removeChild(box));

    // Append the shuffled boxes back to the parent
    shuffledBoxes.forEach(box => parent.appendChild(box));
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


document.body.classList.toggle('darkmode');
// Function to switch to darkmode
const btnToggleMode = document.getElementById("btn__toggle__darkmode");
btnToggleMode.addEventListener('click', function() {
    document.body.classList.toggle('darkmode');
})




// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}


// Button to Randomize Divs
const btnRandomize = document.getElementById("btn__randomize__order");
btnRandomize.addEventListener('click', randomizeDivs)

// Function to copy title text
var btnCopyTitle = document.getElementById("btn__copy__title");

btnCopyTitle.addEventListener('click', function() {
    var copyText = document.getElementById("ftitle");

    copyText.select();
    copyText.setSelectionRange(0, 99999); //for mobile

    navigator.clipboard.writeText(copyText.value);
    window.getSelection().removeAllRanges();

})


// Drag and Drop feature

body.addEventListener("dragover", function(e) {
    e.preventDefault();
    dynamicthumbnail.style.display = "none";
})




// Call the function on page load
window.onload = function() {
    randomizeDivs();
};










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


