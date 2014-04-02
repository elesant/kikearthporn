/**
 * Created by kevin on 3/31/2014.
 */

App.populator('viewer', function (page, data) {
  kik.browser.setOrientationLock('free');

  if(data.message){
    page.querySelector('#back').addEventListener('click', function () {
      App.load('home');
    });
  } else {
    page.querySelector('#back').addEventListener('click', function () {
      App.back();
      setTimeout(kik.browser.setOrientationLock('portrait'),1000);
    });
  }

  var photoViewer = new PhotoViewer(page, data.images, {
    automaticTitles: false,
    autoHideTitle: true,
    startAt: (data.index || 0)
  });

  if (data.images) {
    photoViewer.on('flip', function (newIndex) {
      data.index = newIndex;
      App.saveStack();
    });
  }

  new Clickable(page.querySelector('#save'));
  page.querySelector('#save').addEventListener('click', function() {
    var image = data.images ? data.images[data.index] : data.image;
    kik.photo.saveToGallery(image, function (status) {
      if (status) {
        console.log()
      } else {
        // save failed
      }
    });
  });

  new Clickable(page.querySelector('#share'));
  page.querySelector('#share').addEventListener('click', function () {
    var image = data.images ? data.images[data.index] : data.image;
    if (kik.send) {
      kik.send({
        title: 'Earth Porn',
        pic: image,
        big: false,
        data: { image: image }
      });
    }
  });
});
