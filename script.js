const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

// Passing Joke to VoiceRSS API
// FUTURE: save API key in proxy server
function tellMe(joke) {
    VoiceRSS.speech({
        key: '8679f57a0f594ad580540cdaf5b13e7b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    try {
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Toggle Button
        button.disabled = true;
        // Text to Speech
        tellMe(joke);
    } catch (error) {
        console.log('Whoops!', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', () => {
    button.disabled = false;
});