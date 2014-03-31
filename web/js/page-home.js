App.populator('home', function ($page) {
  var urls = []

  $.getJSON('http://reddit.com/r/EarthPorn/.json?jsonp=?', function (data) {
    $.each(data.data.children, function (i, item) {
      if (i != 0) {
        $('<img/>').attr('class', 'thumbnail').attr('src', item.data.thumbnail).attr('id', 'image-' + (i - 1).toString()).appendTo('#images');
        urls.push(item.data.url);

        var image = ($page).querySelector('#image-' + (i - 1).toString());
        image.addEventListener('click', function () {
          console.log('URL full image is ' + urls[i]);
        })

      }
    });

  });


});
