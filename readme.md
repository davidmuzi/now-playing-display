# Now Playing: Apple Music Edition

A now playing screen to display content from Apple Music. The idea, inspiration (and css 😬) comes from [Jason Tate's project](https://chorus.fm/news/now-playing-my-raspberry-pi-weekend-project/), but built for Apple Music.

![Feature Image](https://user-images.githubusercontent.com/1058176/146692534-e5515ada-11e2-4a8e-a1f2-3cd069269120.png)

## Requirements

- A device with a web browser, Node and Yarn to be used as the display-device (Raspberry Pi, iPad, ...)
- A device that can authenticate to Apple Music (can use a different device if display-device doesnt have keyboard)
- An Apple Developer account to generate an Apple Music developer token

## Setup

1. Clone this repo, `cd` into its directory, and download its depedencies with
`yarn install`

2. Generate an Apple Music developer token using Apple's [instructions](https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens), and enter it in an `.env` file at the root folder. Also add the host domain and port (if same device you can use `localhost`) which webpack will use to inject into the client.

```
DEV_TOKEN=YOUR_DEV_TOKEN_HERE
HOST_DOMAIN=YOUR_DEVICE_DOMAIN
HOST_PORT=3000
```

3. Build the client code
`yarn build`

4. Run the app
`yarn start`

## Running it

You can run this app on the device you want to display the now playing content using `http://your-domain:3000/login.html`. 
Click the Login button to authenticate to Apple Music, or scan the QR code on another device with keyboard entry.
Once authenticated, the user token will be persisted on the host device and used to query Apple Music's API for last played metadata.

If you need to logout, load `http://your-domain:3000/logout` in your browser.

## Acknowledgements
- [raspberry-pi-now-playing](https://github.com/jasontate/raspberry-pi-now-playing)
- [apple-musickit-example](https://github.com/KoleMyers/apple-musickit-example)


