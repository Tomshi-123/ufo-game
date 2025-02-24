function stars() {
    let count = 50; // Antal stjärnor som ska skapas
    let scene = document.querySelector('.scene'); // Hämtar elementet med klassen "scene"
    let i = 0; // Initialiserar en räknare för loopen

    while (i < count) { // Loopar tills vi har skapat det angivna antalet stjärnor
        let star = document.createElement('i'); // Skapar ett nytt <i>-element som representerar en stjärna
        let x = Math.floor(Math.random() * window.innerWidth); // Slumpar en horisontell position för stjärnan inom fönstrets bredd

        let duration = Math.random() * 1; // Slumpar en animationslängd mellan 0 och 1 sekunder
        let h = Math.random() * 100; // Slumpar en höjdvariation för stjärnan

        star.style.left = x + 'px'; // Sätter stjärnans position i sidled
        star.style.width = 1 + 'px'; // Sätter stjärnans bredd till 1 pixel
        star.style.height = 100 + h + 'px'; // Sätter stjärnans höjd till ett värde mellan 100 och 200 pixlar
        star.style.animationDuration = duration + 's'; // Sätter hur lång tid animationen ska ta

        scene.appendChild(star); // Lägger till stjärnan i .scene-elementet så att den syns på sidan
        i++; // Ökar räknaren för att skapa nästa stjärna
    }
}

function createStars() {
    document.querySelectorAll('.scene i').forEach(star => star.remove()); // Rensa gamla stjärnor
    stars(); // Skapa nya stjärnor
}

window.addEventListener('resize', createStars); // Lyssna på fönsterstorleksändringar 

stars(); // Anropar funktionen för att generera stjärnorna när sidan laddas

document.addEventListener('mousemove', function(e) {
    let rocket = document.querySelector('.rocket');
    rocket.style.left = e.offsetX + 'px';
    rocket.style.top = e.offsetY + 'px';
}); // Tog bort felaktig `});` som orsakade syntaxfelet

