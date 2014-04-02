(function (App) {
  if (kik.browser) {
    kik.browser.statusBar(true)
  }
  if (kik.message) {
    App.load('viewer', {
      message: true,
      image: kik.message.image,
      images: [kik.message.image],
      index: 0
    })
  } else {
      App.load('home');
  }
})(App);