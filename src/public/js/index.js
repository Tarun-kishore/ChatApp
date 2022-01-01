console.log("Next");
const progressbar = document.getElementById("progress");
let currentTab = 0;

showTab(currentTab);

function showTab(n) {
    const x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == x.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Join";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        fixStepIndicator(3);
        document.querySelector("form").submit();
        return false;
    }

    fixStepIndicator(currentTab);
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x,
        y,
        i,
        valid = true;
    x = document.getElementsByClassName("tab");

    if(currentTab===1){
        newRoom = x[currentTab].querySelector('input[name="newRoom"]').value;
        oldRoomRadio = x[currentTab].querySelectorAll('input[name="oldRoom"]');

        let oldRoom;
        oldRoomRadio.forEach(radio=>{ if(radio.checked)  oldRoom = radio.value;})

        console.log(oldRoom);
        console.log(newRoom)
        if(oldRoom && newRoom){
            alert('Cannot fill both')
            return false;
        }

        if(!oldRoom && !newRoom){
            alert('Fill at least one')
            return false        }

            return true

    }
        y = x[currentTab].getElementsByTagName('input');
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    progressbar.style.width = n * 33 + "%";
}


const roomList = document.getElementById('list');

fetch('/getRooms', {
    headers: {
        'Content-type': "application/json"
    }
}).then(blob => blob.json())
    .then(data => {
        // console.log(data)
        data.forEach(room => {
            const element = document.createElement('input');
            element.setAttribute('type','radio');
            element.setAttribute('name','oldRoom');
            element.setAttribute('value',room);
            element.setAttribute('id',room);
            const label = document.createElement('label');
            label.setAttribute('for',room);
            label.innerText = room
            const wrapper = document.createElement('div')
            wrapper.appendChild(element)
            wrapper.appendChild(label)
            roomList.appendChild(wrapper)
        });
    })