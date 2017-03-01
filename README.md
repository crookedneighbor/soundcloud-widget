Soundcloud Widget
===

[![Greenkeeper badge](https://badges.greenkeeper.io/crookedneighbor/soundcloud-widget.svg)](https://greenkeeper.io/)

This is a commonjs wrapper around the [Soundcloud Widget](https://developers.soundcloud.com/docs/api/html5-widget) [JavaScript file](https://w.soundcloud.com/player/api.js) allowing you to require it in your Browserify/Webpack projects.

For some examples, [go here](https://crookedneighbor.github.io/soundcloud-widget).

## Usage

### Initialization

```js
var SoundcloudWidget = require('soundcloud-widget')
var iframe = 'id-of-soundcloud-iframe-on-page' // can also pass in an iframe node
var widget = new SoundcloudWidget(iframe)
```

### Methods

#### `#on`

A wrapper around the API's `bind` method. `bind` is also exposed if you prefer.

```js
widget.on(SoundcloudWidget.events.PLAY, function () {
  // code to run when player starts to play
})

widget.on === widget.bind // true
```

See [Events section](#events) for details.

#### `#removeListener`

A wrapper around the API's `unbind` method. `unbind` is also exposed if you prefer.

```js
widget.on(SoundcloudWidget.events.PLAY, function () {
  // code to run when player starts to play
})

widget.on(SoundcloudWidget.events.PLAY, function () {
  // more code
})

widget.removeListener(SoundcloudWidget.events.PLAY) // the previous two listeners will no longer run

widget.removeListener === widget.unbind // true
```

#### `#load`

A wrapper around the API's `load` method. Instead of passing a callback parameter in the options hash, the function returns a promise. Use that to determine when the song has been loaded.

```js
widget.load('some soundcloud url')
widget.load('some soundcloud url').then(function () {
  // sound has been loaded
})

var options = { // default values displayed
  auto_play: false,
  buying: true,
  liking: true,
  download: true,
  sharing: true,
  show_artwork: true,
  show_comments: true,
  show_playcount: true,
  show_user: true,
  start_track: 0 // for playlists
}

widget.load('some soundcloud url', options)
widget.load('some soundcloud url', options).then(function () {
  // sound has been loaded
})
```

If your code style prefers camel case parameters, you can pass in camel case versions of the snake case parameters instead.

```js
var options = {
  autoPlay: false,
  showArtwork: true,
  showComments: true,
  showPlaycount: true,
  showUser: true,
  startTrack: 0
}

widget.load('some soundcloud url', options)
```

#### All [other methods](https://developers.soundcloud.com/docs/api/html5-widget#methods)

The rest of the methods behave the same as the documentation describes.

### Getters

The [getters in the widget API](https://developers.soundcloud.com/docs/api/html5-widget#getters) take callbacks. All the same methods are provided here, but they are promises instead.

```js
widget.getVolume().then(function (volume) {
  // update ui with volume param
})

widget.getCurrentSound().then(function (soundObject) {
  // update ui with soundObject
})
```


### Events

All the [widget's events](https://developers.soundcloud.com/docs/api/html5-widget#events) are stored on `SoundcloudWidget.events`.
