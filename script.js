const userNames = ["nerea", "ainhoa", "dom", "karmen", "itxaso", "nicolas", "mikel",
                    "aitor"].sort();

const colors = {
    "rosa": {
        mainColor: "#9B51AC",
        darkAccent: "#4F4350",
        lightAccent: "#B5A7B6",
    },
    "naranja": {
        mainColor: "#FF8E00",
        darkAccent: "#524439",
        lightAccent: "#BAA89B",
    },
    "verde": {
        mainColor: "#00FF4C",
        darkAccent: "#3E4A3D",
        lightAccent: "#A1AF9F",
    },
    "rojo": {
        mainColor: "#FF0000",
        darkAccent: "#56423D",
        lightAccent: "#BEA6A0",
    },
    "negro": {
        mainColor: "#000000",
        darkAccent: "#677381",
        lightAccent: "#A3CFCD",
    },
};

// Create username list
const selectUserForm = document.querySelector("#select-user");


for ( let userName of userNames ) {
    selectUserForm.innerHTML +=
        `
        <option value=${userName}>${userName.charAt(0).toUpperCase()}${userName.substring(1)}</option>
        `
}


// Celebrate user
const confirmUserButton = document.querySelector("#confirm-user");
console.log(confirmUserButton)
const textInHeader = document.querySelector("#header-text");

confirmUserButton.onclick = function () {
    const chosenUser = selectUserForm.value;

    textInHeader.innerHTML =
    `
    <h1>Zorionak ${chosenUser.charAt(0).toUpperCase() + chosenUser.substring(1)}!!!</h1>

    `
};




// Create color list
const selectColorForm = document.querySelector("#select-color");

const arrayColors = Object.keys(colors).sort();

for ( let colorName of arrayColors ) {
    selectColorForm.innerHTML +=
    `
    <option value=${colorName}>${colorName.charAt(0).toUpperCase() + colorName.substring(1)}</option>
    `
}

// Change colors
const mainAccentColor = document.querySelectorAll("header, #div-intro, #show-content")
const confirmColorButton = document.querySelector("#confirm-color");

confirmColorButton.onclick = function () {
        for ( let element of mainAccentColor ) {
            element.style.backgroundColor = colors[selectColorForm.value.toLowerCase()].darkAccent;
        }
    };



