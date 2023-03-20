

// Provjeri da li korisnik ima pristup internetu
if (navigator.onLine) {
    // Korisnik ima pristup internetu, osvježi informacije
    navigator.serviceWorker.register("/sw.js").then(function(registration) {
        console.log("Service worker registered successfully");
    }).catch(function(error) {
        console.error("Error registering service worker:", error);
    });
} else {
    // Korisnik nema pristup internetu, koristi postojeće informacije
    console.log("Korisnik nema pristup internetu, koristi postojeće informacije.");
}

// Prikaži promociju za instaliranje PWA-a ako je dostupna
let deferredPrompt;
const installPrompt = document.getElementById('install-prompt');
const installButton = document.getElementById('install-button');
const dismissButton = document.getElementById('dismiss-button');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.style.display = 'block';
});

installButton.addEventListener('click', () => {
    installPrompt.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});

dismissButton.addEventListener('click', () => {
    installPrompt.style.display = 'none';
    deferredPrompt = null;
});





let tagStart = false;
let info = document.getElementById("info");

// Fetch the data from the JSON file
fetch('ramadan.json')
.then(response => response.json())
.then(data => {
    // Get today's date
    const today = new Date();
    const startRamadan = new Date(2023, 2, 21);
    const todayString = `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}.`;

    const daniUSedmici = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];

    let showDate = document.querySelector(".prayer-times");

    // funkcija koja formatira datum u obliku dd.MM.yyyy i dodaje ime dana u sedmici
    function formatirajDatum(datum) {
        const dan = datum.getDate().toString().padStart(2, '0');
        const mjesec = (datum.getMonth() + 1).toString().padStart(2, '0');
        const godina = datum.getFullYear().toString();
        const danUSedmici = daniUSedmici[datum.getDay()];
        return `${danUSedmici} - ${dan}.${mjesec}.${godina}. `;
    }

    const ostaloJoš = startRamadan.getTime() - today.getTime();
    const daysLeft = Math.ceil(ostaloJoš / (1000 * 3600 * 24));

    if (today < startRamadan){
        info.innerHTML = `Ramazan još nije počeo </br> ostalo je još <b>${daysLeft}</b>. dana </br> <p>Ramazan počinje: <b>22.03.2023.</b> poslije Akšam namaza</p>`;
        showDate.style.display = "none";
    }else{

    }
    // Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowString = `${tomorrow.getDate()}.${tomorrow.getMonth()+1}.${tomorrow.getFullYear()}.`;

    // Display the Sehur for tomorrow and Iftar for today
    document.getElementById('today').innerText = formatirajDatum(today);
    document.getElementById('sehur-tomorrow').innerText = data[tomorrowString].sehur;
    document.getElementById('iftar-today').innerText = data[todayString].iftar;
})
.catch(error => console.error(error));
