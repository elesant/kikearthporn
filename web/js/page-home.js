App.populator('home', function (page) {
  var urls = [];
  var index = 0;

  $.getJSON('http://reddit.com/r/EarthPorn/.json?jsonp=?', function (data) {
    $.each(data.data.children, function (i, item) {
      var image = item.data.url;
      var thumbnail = item.data.thumbnail;
      if ((i != 0 || (image.indexOf('imgur') == -1 || image.indexOf('.jpg') == -1)) && (image.indexOf("comment") == -1)) {
        $('<img/>').attr('class', 'thumbnail').attr('src', thumbnail).attr('id', 'image-' + index).appendTo('#images');
        if (image.indexOf('imgur') == -1) {
          urls.push(image);
          index++;
          console.log('Pushing: ' + item.data.url + ' onto urls');
        } else {
          var newurl = image.replace('imgur', 'i.imgur') + '.jpg';
          urls.push(newurl);
          index++;
          console.log('Pushing: ' + newurl + ' onto urls');
        }

        var imageSelector = (page).querySelector('#image-' + (i - 1).toString());
        imageSelector.addEventListener('click', function () {
          console.log('URL full image is ' + urls[i]);
          App.load('viewer', {
            image: urls[index],
            index: index,
            images: urls
          });
        })

      }
    });

  });


});
