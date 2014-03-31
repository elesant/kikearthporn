App.populator('home', function (page) {
  var urls = [];

  getData();

  function getData() {
    var index = 0;
    $.getJSON('http://reddit.com/r/EarthPorn/.json?jsonp=?', function (data) {
      // First items returned in data isn't useful
      var r = $.Deferred();
      for (var i = 1; i < data.data.children.length; i++) {
        var item = data.data.children[i];
        var image = item.data.url;
        var thumbnail = item.data.thumbnail;

        if (image.indexOf('.jpg') != -1) {
          renderThumbnail(thumbnail, index);
          urls.push(image);
          console.log('Pushed: ' + image + ' onto urls');
          index++;
        } else if (image.indexOf('imgur') != -1) {
          renderThumbnail(thumbnail, index);
          urls.push(image.replace('imgur','i.imgur') + '.jpg');
          console.log('Pushed: ' + image.replace('imgur','i.imgur') + '.jpg' + ' onto urls');
          index++;
        }
      }
      return r.done(addSelectors());
    });
  }


  function renderThumbnail(thumbnail, index){
    $('<img/>').attr('class', 'thumbnail').attr('src', thumbnail).attr('id', 'image-' + index).appendTo('#images');
  }


  function addSelectors() {
    for (var i = 0; i < urls.length; i++) {
      var imageSelector = (page).querySelector('#image-' + i);
      imageSelector.addEventListener('click', function () {
        console.log('URL full image is ' + urls[i]);
        App.load('viewer', {
          image: urls[i],
          index: i,
          images: urls
        });
      })
    }
  }


});

