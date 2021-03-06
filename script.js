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
    "amarillo": {
        mainColor: "#EEFF2A",
        darkAccent: "#484838",
        lightAccent: "#ADAC9A",
    },
};


createColorList();
changeColorTheme();

createUsernameList();
celebrateUser()
let chosenUser;



function celebrateUser() {
    const textInHeader = document.querySelector("#happybd-h1");
    const selectUserForm = document.querySelector("#select-user");

    selectUserForm.onchange = function () {
        chosenUser = selectUserForm.value;

        textInHeader.innerText = `Zorionak ${chosenUser.charAt(0).toUpperCase() + chosenUser.substring(1)}!!!`
        document.querySelector("#header-text").style.display = "flex";

        document.querySelector("#div-intro").innerHTML = ``;
    

        document.querySelector("#show-content").innerHTML += 

            `<img id="confetti" src="./img/confetti.gif" style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; object-fit: fill; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
            <img src="./img/happybd.gif" style="position:fixed; top:10%; left:35%; border:none; margin:0; padding:0; overflow:hidden; z-index:999;">
            `
        
        setTimeout( function () {
            document.querySelector("#show-content").innerHTML = ``;
            }
            , 100)
        
        showPresents();

    }
}


function showPresents() {
    const introDiv = document.querySelector("#div-intro");

    introDiv.innerHTML =
    `
    <p>Quieres recibir tus regalos?</p>
    <button id="yes-present">Si</p>
    <button id="no-present">No</p>
    `

    document.querySelector("#no-present").onclick = (function () {
        window.alert("Eres una persona horrible :(");
    })
    document.querySelector("#yes-present").onclick = receiveRandomInsult;
}


function receiveRandomInsult() {
    const introDiv = document.querySelector("#div-intro");

    introDiv.innerHTML =
    `
    <p>Quieres recibir un insulto en ingles?</p>
    <button id="yes-insult">Si</p>
    <button id="no-insult">No</p>
    <br>
    <button id="following-present">Siguiente regalo</p>
    `
    document.querySelector("#no-insult").onclick = (function () {
        window.alert("Eres una persona horrible :(");
    })
    document.querySelector("#following-present").onclick = whatRMCharacterAreYou;

    document.querySelector("#yes-insult").onclick = (function () {
        fetch("https://www.foaas.com/operations").then( function(response) {
            return response.json();
        }).then( function(data) {
            let usersWithoutChosenUser = userNames.filter(user => user !== chosenUser)

            data = data.filter(insult => insult.url.slice(-11) === ":name/:from");
                    
            let randomUser = usersWithoutChosenUser[Math.floor(Math.random() * usersWithoutChosenUser.length)]
            let randomInsultToFetch = data[Math.floor(Math.random() * data.length)]

            let urlRandomInsult = randomInsultToFetch.url.replace(":name", capitalizeName(chosenUser)).replace(":from", capitalizeName(randomUser));

            fetch(`https://www.foaas.com${urlRandomInsult}`, { headers: {"Accept": "application/json"}}).then( function(response) {
                return response.json();
            }).then( function(data) {
                
                document.querySelector("#show-content").innerHTML =
                `
                <q>${data.message}</q>
                <p>${data.subtitle}</p>
                `
                


            })
        })
    })
}

function whatRMCharacterAreYou() {
    const introDiv = document.querySelector("#div-intro");

    introDiv.innerHTML =
        `
        <p>Quieres saber que personaje de Rick and Morty serias?</p>
        <button id="yes-rm">Si</p>
        <button id="no-rm">No</p>
        <br>
        <button id="ciao">Siguiente regalo</p>
        `
    document.querySelector("#no-rm").onclick = (function () {
        window.alert("Eres una persona horrible :(");
    })

    document.querySelector("#yes-rm").onclick = (function () {
        fetch("https://rickandmortyapi.com/api/character/").then( function (response) {
            return response.json();
        }).then( function (data) {
            let randomCharacterIndex = Math.floor(Math.random() * data.info.count)

            fetch(`https://rickandmortyapi.com/api/character/${randomCharacterIndex}`).then( function (response) {
                return response.json();
            }).then( function (data) {

                document.querySelector("#show-content").innerHTML =
                `
                <h2>${data.name}</h2>
                <img src=${data.image} alt="Picture of ${data.name}" style="width:95%">
                `
            })
        })

    })

}

function capitalizeName(name) {
    let result = name.charAt(0).toUpperCase() + name.substring(1);
    return result;
}


function changeColorTheme() {
    const darkAccentElems = document.querySelectorAll("#div-intro, #show-content");
    const lightAccentElems = document.querySelectorAll("body, #select-user, #select-color");
    const mainColorElems = document.querySelectorAll("#main-header");

    const whiteText = document.querySelectorAll("#happybd-h1, #color-theme-choice");


    const selectColorForm = document.querySelector("#select-color");

    selectColorForm.onchange = function () {
            for ( let element of darkAccentElems ) {
                element.style.backgroundColor = colors[selectColorForm.value.toLowerCase()].darkAccent;
            }

            for ( let element of lightAccentElems ) {
                element.style.backgroundColor = colors[selectColorForm.value.toLowerCase()].lightAccent;
            }

            for ( let element of mainColorElems ) {
                element.style.backgroundColor = colors[selectColorForm.value.toLowerCase()].mainColor;
            }

            // For black background, white text is needed
            if ( selectColorForm.value.toLowerCase() === "negro" ) {
                for ( let element of whiteText ) {
                    element.style.color = colors[selectColorForm.value.toLowerCase()].lightAccent;
                }
            } else {
                for ( let element of whiteText ) {
                    element.style.color = colors[selectColorForm.value.toLowerCase()].darkAccent;
                }
            }

        };

}


function createUsernameList() {
    const selectUserForm = document.querySelector("#select-user");


    for ( let userName of userNames ) {
        selectUserForm.innerHTML +=
            `
            <option value=${userName}>${userName.charAt(0).toUpperCase()}${userName.substring(1)}</option>
            `
    }
}


function createColorList(){
    const selectColorForm = document.querySelector("#select-color");

    const arrayColors = Object.keys(colors).sort();

    for ( let colorName of arrayColors ) {
        selectColorForm.innerHTML +=
        `
        <option value=${colorName}>${colorName.charAt(0).toUpperCase() + colorName.substring(1)}</option>
        `
    }
}
