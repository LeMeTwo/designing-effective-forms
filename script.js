let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');
const countryCodeSelect = document.getElementById('countryCode');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data
            .map(country => country.name.common)
            .sort((a, b) => a.localeCompare(b));

        countryInput.innerHTML = '<option value="">Wybierz kraj</option>' + 
            countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            countryInput.value = country; // Ustawiamy kraj
            getCountryCode(country);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            return response.json();
        })
        .then(data => {
            const root = data[0].idd.root || '';
            const suffix = data[0].idd.suffixes ? data[0].idd.suffixes[0] : '';
            const fullCode = root + suffix;

            for (let i = 0; i < countryCodeSelect.options.length; i++) {
                if (countryCodeSelect.options[i].value === fullCode) {
                    countryCodeSelect.selectedIndex = i;
                    break;
                }
            }
        })
        .catch(error => {
            console.error('Wystąpił błąd:', error);
        });
}

// Obsługa skrótów klawiaturowych
document.addEventListener('keydown', (e) => {
    // Alt + S - Submit form
    if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        myForm.requestSubmit();
    }

    // Alt + F - Skocz do imienia (start formularza)
    if (e.altKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        document.getElementById('firstName').focus();
    }
});

(() => {
    document.addEventListener('click', handleClick);
    fetchAndFillCountries();
    getCountryByIP(); // <- AUTOMATYCZNE UZUPEŁNIANIE
})();
