var enLangData;

function updateContent(langData) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');

        if (langData[key] == undefined) {
            element.innerHTML = enLangData[key];
        } else {
            element.innerHTML = langData[key];
        }
    });
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

async function fetchLangData(lang) {
    const response = await fetch("languages/" + lang + ".json");
    return response.json();
}

async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLangData(lang);
    updateContent(langData);
}

function getBrowserLanguage() {
    return window.navigator.language.substring(0, 2);
}

function languageExists(lang) {
    const file = window.location + "languages/" + lang + ".json";

    var http = new XMLHttpRequest();
    http.open('HEAD', file, false);
    http.send();

    return http.status != 404;
}

window.addEventListener('DOMContentLoaded', async () => {
    if (localStorage.getItem('language') != null) {
        userPreferredLanguage = localStorage.getItem('language');
    } else {
        if (languageExists(getBrowserLanguage()))
        {
            userPreferredLanguage = getBrowserLanguage();
        }
        else
        {
            userPreferredLanguage = 'en';
        }
    }
    const langData = await fetchLangData(userPreferredLanguage);
    enLangData = await fetchLangData('en');

    updateContent(langData);
});

window.addEventListener('click', function (event) {
    
    console.log("Se ha clicado.", event.target);
    if (!event.target.matches('.lang-selector')) return;

    console.log("Se ha clicado y llega.");

    event.preventDefault();

    const lang = event.target.getAttribute('data-language');

    setLanguagePreference(lang);
});