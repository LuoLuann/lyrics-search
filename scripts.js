function findLyrics(artist, song) {
    // fetch eh uma promise interna do js
    // que foi feita para trazer conteudo de um
    // determinada URI
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}

const form = document.querySelector('#lyrics_form');

form.addEventListener('submit', e => {
    e.preventDefault();
    doSubmit();
})

function doSubmit() {
    const lyrics_el = document.querySelector("#lyrics");
    const artist = document.querySelector("#artist").value;
    const song = document.querySelector("#song").value;
    console.log(artist, song)
    console.log(lyrics_el)
    lyrics_el.innerHTML = '<div class="spinner-grow" role="status"><span class="sr-only">Carregando...</span></div>'

    findLyrics(artist, song)
        .then(response => response.json())
        .then(data => {
            console.log("data: ", data)
            if(data.lyrics) {
                lyrics_el.innerHTML = data.lyrics;
            } else {
                lyrics_el.innerHTML = data.error;
            }
        })
        .catch(err => {
            lyrics_el.innerHTML = `Oops! ${err}`;
        })
}
