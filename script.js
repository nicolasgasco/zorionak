const userNames = ["deba", "allende", "adrian", "greta", "andrea", "haizea", "leire", "maialen", "klara", "ainhoa",
                     "dom", "karmen", "itxaso", "nicolas", "mikel",
                    "aitor", "itziar", "jone", "amaia", "colette", "bego"].sort();

const colors = {
    "rosa": {
        mainColor: "#9B51AC",
        darkAccent: "#303030",
        lightAccent: "#B5A7B6",
    },
    "naranja": {
        mainColor: "#FF8E00",
        darkAccent: "#303030",
        lightAccent: "#DFE0DF",
    },
    "verde": {
        mainColor: "#00FF4C",
        darkAccent: "#303030",
        lightAccent: "#A1AF9F",
    },
    "rojo": {
        mainColor: "#E70000",
        darkAccent: "#303030",
        lightAccent: "#BEA6A0",
    },
    "negro": {
        mainColor: "#000000",
        darkAccent: "#677381",
        lightAccent: "#A3CFCD",
    },
    "amarillo": {
        mainColor: "#EEFF2A",
        darkAccent: "#303030",
        lightAccent: "#FAFAF0",
    },

    "azul": {
        mainColor: "#0B8DF2",
        darkAccent: "#303030",
        lightAccent: "#A4ABBD",
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

        textInHeader.innerText = `Zorionak ${chosenUser.charAt(0).toUpperCase() + chosenUser.substring(1)}!`
        document.querySelector("#header-text").style.visibility = "visible";
        document.querySelector("#main-header").style.display = "block";
        document.querySelector("#color-theme-choice").style.display = "block";

        document.querySelector("#div-intro").innerHTML = ``;
    
        document.querySelector("footer").innerHTML += 

            `
            <div id="appearing-gifs">

            <img id="confetti" src="./img/confetti.gif" style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; object-fit: cover; border:none; margin:0; padding:0; overflow:hidden; z-index:99999;">
            </div>
            `
        
        
        setTimeout( function () {
            document.querySelector("#appearing-gifs").innerHTML = ``;
            document.querySelector("#appearing-gifs").remove();

            }
            , 3000)
        
        showPresents();

    }
}


function showPresents() {
    const introDiv = document.querySelector("#div-intro");

    introDiv.innerHTML =
    `
    <p>¿Quieres recibir tus regalos?</p>
    <button id="yes-present">Sí</button>
    <button id="no-present">No</button>
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
    <p>¿Quieres recibir un insulto en inglés?</p>
    <button id="yes-insult">Sí</button>
    <button id="no-insult">No</button>
    <button id="next-present">Siguiente regalo</button>
    `
    document.querySelector("#no-insult").onclick = (function () {
        document.querySelector("#show-content").style.display = "none";
        setTimeout( ( function () {
            window.alert("No seas tan desagradable :(");
        }), 100);
    })
    document.querySelector("#next-present").onclick = whatRMCharacterAreYou;

    document.querySelector("#yes-insult").onclick = (function () {
        let usersWithoutChosenUser = userNames.filter(user => user !== chosenUser);                    
        let randomUser = usersWithoutChosenUser[Math.floor(Math.random() * usersWithoutChosenUser.length)];
        let insultTypes = ["/off/", "/nugget/", "/donut/", "/fewer/", "/cocksplat/", "/king/", "/blackadder/", "/bday/", "/outside/"]
        
        let randomInsultToFetch = insultTypes[Math.floor(Math.random() * insultTypes.length)]

        fetch(`https://www.foaas.com${randomInsultToFetch}${capitalizeName(chosenUser)}/${capitalizeName(randomUser)}`, { headers: {"Accept": "application/json"}}).then( function(response) {
            return response.json();
        }).then( function(data) {
            
            
            document.querySelector("#show-content").innerHTML =
            `
            <cite>${data.message}</cite>
            <p>${data.subtitle}</p>
            <small style="display:block">Si quieres ver más, dale a Sí.</small>
            `

            document.querySelector("#show-content").style.display = "block";

            

        })
    })
}

function whatRMCharacterAreYou() {
    const introDiv = document.querySelector("#div-intro");

    introDiv.innerHTML =
        `
        <p>¿Quieres saber que personaje de Rick & Morty serías?</p>
        <button id="yes-rm">Sí</button>
        <button id="no-rm">No</button>
        <button id="next-present">Siguiente regalo</button>
        `
    document.querySelector("#no-rm").onclick = (function () {
        document.querySelector("#show-content").style.display = "none";

        setTimeout( ( function () {
            window.alert("No entiendo por qué haces así :(");
        }), 100);
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
                <img src=${data.image} alt="Picture of ${data.name}" style="width:90%; border-radius:5px">
                <small style="display:block">Si quieres ver más, dale a Sí.</small>
                `

                document.querySelector("#show-content").style.display = "block";
            })
        })

    })

    document.querySelector("#next-present").onclick = showNASAPictureDay;
    
}

function showNASAPictureDay() {
    const introDiv = document.querySelector("#div-intro");

    introDiv.innerHTML =
        `
        <p>¿Quieres saber qué foto publicó la NASA el día que naciste?</p>
        <button id="yes-nasa">Sí</button>
        <button id="no-nasa">No</button>
        <button id="next-present">¿Siguiente regalo?</button>
        `

    document.querySelector("#no-nasa").onclick = (function () {
        document.querySelector("#show-content").style.display = "none";

        setTimeout( ( function () {
            window.alert("No puedo más :(");
        }), 100);
    })

    document.querySelector("#yes-nasa").onclick = ( function () {
        document.querySelector("#show-content").innerHTML =
        `
        <p>Selecciona tu fecha de nacimiento:</p>
        <input type="date" id="chosen-date" value="1995-07-01" min="1990-01-01" max="2002-12-12"></input>
        
        <div id="pic-of-day"></div>
        `

        document.querySelector("#show-content").style.display = "block";

        let dateSelector = document.querySelector("#chosen-date");

        
        dateSelector.onchange = ( function () {

            if ( dateSelector.value.substring(0,4) >= 1995 && dateSelector.value.substring(5,7) > 6 ) {
    
            const apiWithKey = "https://api.nasa.gov/planetary/apod?api_key=cFHrfctjIdRGLOzxcTPgPPUXBRJg46GpLPnUmrSF"
        
            
        
            fetch(`${apiWithKey}&date=${dateSelector.value}`).then( function (answer) {
                return answer.json();
            }).then( function(data) {
        
                document.querySelector("#pic-of-day").innerHTML =
                        `
                        <br>
                        <p>${data.date.slice(-2)}/${data.date.slice(-5,-3)}/${data.date.slice(0,4)}</p>
                        <h2>${data.title}</h2>
                        <img src="${data.url}" alt="Picture of ${data.title}" style="width: 100%; border-radius:5px">
                        `
            })
    
            } else {
                document.querySelector("#pic-of-day").innerHTML =
                `
                <br>
                <h2>¡Eres tan viej@ que el día que naciste la NASA no había empezado a publicar fotos!</h2>
                <img src="./img/hide_the_pain.png" alt="Close up of old men" style="max-width: 100%; border-radius: 5px">
                `
            }
        })

        document.querySelector("#next-present").onclick = endOfPresents;
    })

function endOfPresents() {
    document.querySelector("#show-content").innerHTML =
        `
        <p>¡Se acabó! Ya no hay más regalos. Ahora vuelve a trabajar.</p>
        `
}
    

}

function capitalizeName(name) {
    let result = name.charAt(0).toUpperCase() + name.substring(1);
    return result;
}


function changeColorTheme() {
    const darkAccentElems = document.querySelectorAll("#div-intro, #show-content, button");
    const lightAccentElems = document.querySelectorAll("#select-user, input, #select-color option");
    const mainColorElems = document.querySelectorAll("#main-header, #select-color, footer");
    const mainColorOutline = document.querySelectorAll("button:hover");

    const whiteText = document.querySelectorAll("h1, #select-color, footer");


    const selectColorForm = document.querySelector("#select-color");

    selectColorForm.onchange = function () {
            console.log("ciao");
            for ( let element of darkAccentElems ) {
                element.style.backgroundColor = colors[selectColorForm.value.toLowerCase()].darkAccent;
                console.log(colors[selectColorForm.value.toLowerCase()].darkAccent)
            }

            for ( let element of lightAccentElems ) {
                element.style.backgroundColor = colors[selectColorForm.value.toLowerCase()].lightAccent;
            }

            for ( let element of mainColorElems ) {
                element.style.backgroundColor = colors[selectColorForm.value.toLowerCase()].mainColor;
            }

            // Colored border must be added extra
            for ( let element of mainColorOutline ) {
                element.style.borderBottom = `4px solid ${colors[selectColorForm.value.toLowerCase()].mainColor}`;
            }


            // For black background, white text is needed
            if ( selectColorForm.value.toLowerCase() === "negro" ) {
                for ( let element of whiteText ) {
                    element.style.color = "white";
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
        <option style="font-size: 0.8rem" value=${colorName}>${colorName.charAt(0).toUpperCase() + colorName.substring(1)}</option>
        `
    }
}
