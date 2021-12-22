document.addEventListener('musickitloaded', loaded)

async function login() {
    const token = await MusicKit.getInstance().authorize()

    // push the token to the server
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const method = 'POST';
    const body = JSON.stringify({token})
 
    await fetch(SERVER_URL + '/token', { method, headers, body })  

    window.location.href = '/now_playing.html'
}

// poll for token
async function checkLogin() {
    const key = await fetch(SERVER_URL + '/token');
    const { userToken, _ } = await key.json();

    if (userToken == undefined) { 
        setTimeout(checkLogin, 1000);
        return false;
    }

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

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${hostUrl}&size=500x500`;
    document.getElementById("qr-code").src = qrUrl;
    document.getElementById("login").addEventListener("click", login);

    checkLogin();
}
