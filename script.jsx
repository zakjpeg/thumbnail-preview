const imageInput = document.getElementById('ffile');
const preview = document.getElementById('fimagepreview');
const previewA = document.getElementById('fimagepreviewA');
const previewB = document.getElementById('fimagepreviewB');

const dynamicthumbnail = document.getElementById('dynamic__thumbnail');
const body = document.getElementsByClassName('body');
var placeFirstFlag = 0;
var BTestFlag = 0;

// Function that updates your preview to reflect image input
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader;

    reader.onload = function(e) {
        preview.src = e.target.result;
        previewA.src = e.target.result;
        dynamicthumbnail.src = e.target.result;
    }



    reader.readAsDataURL(file);
    randomizeDivs();

    const size__warning__notification = document.getElementById("size__warning__notification");
    const fsize = Math.round((file.size / 1024));
    if (fsize > 2048) {
        size__warning__notification.style.opacity = 1;
        warningTimeout = setTimeout(function(){
            size__warning__notification.style.opacity = 0;
            
        }, 3000);
    }

})

preview.addEventListener('click', function() {
    imageInput.click();
})

// Function that updates preview B to reflect image input
const ImageInputB = document.getElementById('ffileB');

ImageInputB.addEventListener('change', function(event) {
    // Create a variable 'file' to store the value of your uploaded file
    const file = event.target.files[0];
    const reader = new FileReader;

    reader.onload = function(e) {
        previewB.src = e.target.result;
        thumbnailB.src = e.target.result;
    }
    // Reads your upload as data URL into the previews above
    reader.readAsDataURL(file);
    randomizeDivs();

    const size__warning__notification = document.getElementById("size__warning__notification");
    const fsize = Math.round((file.size / 1024));
    if (fsize > 2048) {
        size__warning__notification.style.opacity = 1;
        warningTimeout = setTimeout(function(){
            size__warning__notification.style.opacity = 0;
            
        }, 3000);
    }

    if (BTestFlag !== 1) {
        userB.textContent = 'Random Duck';
        viewCountB.textContent = '473k views • 2 hours ago';
        pfpB.src = "default profile pic.jpg";
        titleB.textContent = 'B Test Video';
    }

    BTestFlag = 1;
})

previewB.addEventListener('click', function(){
    ImageInputB.click();
})


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
    var j = boxesArray.findIndex(box => box.id === 'dynamic__videoB');

    if (i !== -1) {
        [boxesArray[0], boxesArray[i]] = [boxesArray[i], boxesArray[0]] ;
    }

    if ((BTestFlag == 1)&&(j !== -1)) {
        [boxesArray[1], boxesArray[j]] = [boxesArray[j], boxesArray[1]];
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
        var j = boxesArray.findIndex(box => box.id === 'dynamic__videoB');
        if (i !== 0) {
            [boxesArray[0], boxesArray[i]] = [boxesArray[i], boxesArray[0]] ;
        }
        if ((BTestFlag)&&(j!==1)) {
            [boxesArray[1], boxesArray[j]] = [boxesArray[j], boxesArray[1]] ;
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







const textForm = document.getElementById('inputForm');
const userInput = document.getElementById('ftitle');
const resultDiv = document.getElementById('dynamic__title');
const resultDivA = document.getElementById('dynamic__titleA');

textForm.addEventListener('submit', function(event) {
    // We must prevent the page from refreshing upon submit
    event.preventDefault();

    const inputValue = userInput.value;
    // We can replace our Dynamic Title's text content with the value entered into the textbox upon submission.

    resultDiv.textContent = inputValue;
    resultDivA.textContent = resultDiv.textContent;


})

// 'Duplicate' set of variables and function to support the A/B Test Functionality
const dynamicTitleB = document.getElementById('dynamic__titleB');
const inputFormB = document.getElementById('inputFormB');
const thumbnailB = document.getElementById('thumbnailB');
const pfpB = document.getElementById('pfpB');
const titleB = document.getElementById('titleB');
const userB = document.getElementById('userB');
const viewCountB = document.getElementById('viewCountB');
inputFormB.addEventListener('submit', function(event) {
    // We must prevent the page from refreshing upon submit
    event.preventDefault();
    // We can replace our Dynamic Title's text content with the value entered into the textbox upon submission.
    dynamicTitleB.textContent = document.getElementById('ftitleB').value;
    // We will also update the info in the actual preview box
    titleB.textContent = document.getElementById('ftitleB').value;
    userB.textContent = 'Random Duck';
    viewCountB.textContent = '473k views • 2 hours ago'

    // Set B-Test Flag to 1 in order to update rules for 'place first' function (Among other reasons).
    BTestFlag = 1;

    if (BTestFlag && placeFirstFlag) {
        btnPlaceFirst.click();
        btnPlaceFirst.click();
    }

    abTestOverlay.classList.toggle("unfocus");
    abTestPopup.classList.toggle("unfocus");



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
/*
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
*/

// const dropZone = document.getElementById("drop__zone");

// dropZone.addEventListener('dragenter', (event) => {
//     abTestOverlay.style.opacity = 0.6;
// })

// dropZone.addEventListener('dragleave', (event)=> {
//     abTestOverlay.style.opacity = 0;
// })

// dropZone.addEventListener('drop', (event)=> {
//     abTestOverlay.style.opacity = 0;
// })





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

const btnAbTest = document.getElementById("btn__ab__test");
const abTestOverlay = document.getElementById("ab__test__overlay");
const abTestPopup = document.getElementById("popup__ab__test");
btnAbTest.addEventListener('click', function() {
    /*document.body.classList.toggle('unfocus');*/
    /*This will make the overlay opaque and disable clicks below it*/ 
    abTestOverlay.classList.toggle("unfocus");
    abTestPopup.classList.toggle("unfocus");
    
})

abTestOverlay.addEventListener('click', function() {
    abTestOverlay.classList.toggle("unfocus");
    abTestPopup.classList.toggle("unfocus");
    if (BTestFlag && placeFirstFlag) {
        btnPlaceFirst.click();
        btnPlaceFirst.click();
    }
})

// Function to copy title text
var btnCopyTitle = document.getElementById("btn__copy__title");
var btnCopyTitleB = document.getElementById("btn__copy__titleB")
var copyText = document.getElementById("ftitle");
var copyTextB = document.getElementById("ftitleB");

btnCopyTitle.addEventListener('click', function() {

    copyText.select();
    copyText.setSelectionRange(0, 99999); //for mobile

    navigator.clipboard.writeText(copyText.value);
    window.getSelection().removeAllRanges();

})

btnCopyTitleB.addEventListener('click', function() {

    copyTextB.select();
    copyTextB.setSelectionRange(0,99999); // for mobile

    navigator.clipboard.writeText(copyTextB.value);
        window.getSelection().removeAllRanges();
})


// Call "randomize divs" on page load to shuffle video order frequently
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


