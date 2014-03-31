/**
 * Created by kevin on 3/31/2014.
 */

App.populator('viewer', function (page, data) {

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

  page.querySelector('#share').addEventListener('click', function () {
    var image = data.images ? data.images[data.index] : data.image;
    if (kik.send) {
      kik.send({
        title: 'Earth Porn',
        text: 'Like Youve Never seen her before',
        pic: image, // optional
        big: true, // optional
        noForward: true, // optional
        data: { some: 'json' }         // optional
      });
    }
  });
});
