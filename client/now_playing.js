async function fetchKey() {
    const key = await fetch(SERVER_URL + '/token');
    return await key.json();
}

async function lastPlayed(token) {
    // https://developer.apple.com/documentation/applemusicapi/get_recently_played_tracks
    const headers = new Headers();
    headers.append('Music-User-Token', token.userToken);
    headers.append('Authorization', 'Bearer ' + token.devToken);

    const request = new Request('https://api.music.apple.com/v1/me/recent/played/tracks?types=songs,library-songs&limit=1', {headers});
    const response = await fetch(request);
    return await response.json();
}

async function update() {
    const token = await fetchKey();

    if (token.userToken == undefined) {
        window.location.href = '/login.html';
        return;
    }

    const json = await lastPlayed(token);

    const {name, albumName, artistName, artwork} = json.data[0].attributes;
    const artUrl = artwork.url.replace('{w}', 1000).replace('{h}', 1000);

    document.getElementById("track").innerHTML = name;
    document.getElementById("artist").innerHTML = artistName;
    document.getElementById("album").innerHTML = albumName;
    document.getElementById("count").hidden = true;
    document.getElementById("albumArt").src = artUrl;

    setTimeout(update, 2000);
}

update();
