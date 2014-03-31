App.populator('home', function (page) {
  var urls = [];

  getData();

  function getData() {
    var index = 0;
    $.getJSON('http://reddit.com/r/EarthPorn/.json?jsonp=?&limit=20', function (data) {
      // First items returned in data isn't useful
      for (var i = 1; i < data.data.children.length; i++) {
        var item = data.data.children[i];
        var image = item.data.url;
        var thumbnail = item.data.thumbnail;
        if (thumbnail.indexOf('.jpg') != -1) {
          if (image.indexOf('.jpg') != -1) {
            renderThumbnail(thumbnail, index);
            urls.push(image);
            index++;
          } else if (image.indexOf('imgur') != -1) {
            renderThumbnail(thumbnail, index);
            urls.push(image.replace('imgur', 'i.imgur') + '.jpg');
            index++;
          }
        }
      }
    });
  }


  function renderThumbnail(thumbnail, index) {
    $('<img/>').attr('class', 'thumbnail').attr('src', thumbnail).attr('id', 'image-' + index).appendTo('#images');
    $('#image-' + index).click(function () {
      App.load('viewer', {
        image: urls[index],
        index: index,
        images: urls
      });
    });
  }


});

