document.addEventListener('musickitloaded', loaded)

async function login() {
    const token = await MusicKit.getInstance().authorize()

    // push the token to the server
    await fetch(SERVER_URL + '/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    })  

    window.location.href = '/now_playing.html'
}

async function loaded() {
    const key = await fetch(SERVER_URL + '/token');
    const { devToken, hostUrl } = await key.json();

    MusicKit.configure({
        developerToken: devToken,
        app: {
            name: 'Now Playing',
        }
    });

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${hostUrl}&size=500x500`
    document.getElementById("qr-code").src = qrUrl
    document.getElementById("login").addEventListener("click", login)
}
