(function (App) {
  if (kik.browser) {
    kik.browser.statusBar(true)
  }
	try {
			App.restore();
		} catch (err) {
			App.load('home');
		}
}) (App);