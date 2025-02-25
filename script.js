// Funktion för att skapa stjärnor i bakgrunden
function stars() {
    let count = 50; // Antal stjärnor som ska skapas
    let scene = document.querySelector('.scene'); // Hämtar .scene-elementet där stjärnorna ska finnas
    let i = 0; // Startvärde för loop

    while (i < count) { // Loopa tills vi har skapat 50 stjärnor
        let star = document.createElement('i'); // Skapar ett <i>-element för en stjärna
        let x = Math.floor(Math.random() * window.innerWidth); // Slumpar en horisontell position

        let duration = Math.random() * 1; // Slumpar en animationslängd mellan 0 och 1 sekunder
        let h = Math.random() * 100; // Slumpar en höjdvariation för stjärnan

        star.style.left = x + 'px'; // Sätter stjärnans horisontella position
        star.style.width = '1px'; // Stjärnan får en bredd på 1 pixel
        star.style.height = (100 + h) + 'px'; // Stjärnans höjd blir mellan 100 och 200 pixlar
        star.style.animationDuration = duration + 's'; // Sätter animationshastigheten

        scene.appendChild(star); // Lägger till stjärnan i .scene
        i++; // Ökar räknaren för att skapa nästa stjärna
    }
}

// Funktion för att rensa och återskapa stjärnorna vid fönsterändring
function createStars() {
    document.querySelectorAll('.scene i').forEach(star => star.remove()); // Tar bort gamla stjärnor
    stars(); // Skapar nya stjärnor
}

// Kör createStars-funktionen när fönsterstorleken ändras
window.addEventListener('resize', createStars);

// Skapar stjärnorna direkt när sidan laddas
stars();

// Lyssnar efter musrörelser för att flytta raketen
document.addEventListener('mousemove', function(e) {
    let rocket = document.querySelector('.rocket'); // Hämtar raketen
    rocket.style.left = e.clientX + 'px'; // Sätter raketens horisontella position till musens X-position
    rocket.style.top = e.clientY + 'px'; // Sätter raketens vertikala position till musens Y-position
});

// Lista för att hålla koll på alla stenar
let rocks = [];

// Funktion för att skapa en sten
function createRock() {
    const rock = document.createElement('div'); // Skapar en ny sten (div-element)
    rock.classList.add("rock"); // Lägger till klassen "rock" för att ge stenen stil från CSS
    rock.style.left = `${Math.random() * window.innerWidth}px`; // Slumpar en horisontell position
    rock.style.top = "0px"; // Startar högst upp på skärmen

    document.querySelector('.scene').appendChild(rock); // Lägger till stenen i .scene
    rocks.push(rock); // Lägger till stenen i vår lista med stenar
}

// Funktion för att flytta stenarna och kolla om de krockar med raketen
function moveRocks() {
    const rocket = document.querySelector('.rocket'); // Hämtar raketen

    rocks.forEach((rock, index) => {
        let top = parseInt(rock.style.top); // Hämtar stenens nuvarande position i pixlar
        rock.style.top = `${top + 5}px`; // Flyttar stenen nedåt med 5 pixlar

        // Kollar om stenen träffar raketen
        if (checkCollision(rocket, rock)) {
            alert("Game Over"); // Visar en varning
            location.reload(); // Laddar om sidan för att starta om spelet
        }

        // Om stenen går utanför skärmen tas den bort
        if (top > window.innerHeight) {
            rock.remove(); // Tar bort stenen från DOM
            rocks.splice(index, 1); // Tar bort stenen från vår array
        }

    });

    requestAnimationFrame(moveRocks); // Upprepar funktionen för att uppdatera rörelsen
}

// Funktion för att kolla om raketen och en sten kolliderar
function checkCollision(rocket, rock) {
    let r = rocket.getBoundingClientRect(); // Hämtar raketens position och storlek
    let b = rock.getBoundingClientRect(); // Hämtar stenens position och storlek

    return !(
        r.top > b.bottom ||  // Om raketens topp är under stenens botten → ingen kollision
        r.bottom < b.top ||  // Om raketens botten är ovanför stenens topp → ingen kollision
        r.left > b.right ||  // Om raketens vänstra sida är till höger om stenens högra sida → ingen kollision
        r.right < b.left     // Om raketens högra sida är till vänster om stenens vänstra sida → ingen kollision
    );
}

// Startar spelet
setInterval(createRock, 1000); // Skapar en ny sten varje sekund
moveRocks(); // Startar stenarnas rörelse

