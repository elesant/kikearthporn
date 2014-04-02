App.populator('home', function (page) {
  kik.browser.setOrientationLock('portrait');
  var urls = [];
  var num_images = 40;
  var index = 0;

  var setDivSize = function (index){
    page.querySelector('#main-section').style.height = ((Math.ceil(index/5) * 54)).toString() + 'px';
  };

  getData(num_images, setDivSize);


  function getData(num, callback) {

    $.getJSON('http://reddit.com/r/EarthPorn/.json?jsonp=?&limit='+num, function (data) {
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
      callback(index);
    });
  }


  function renderThumbnail(thumbnail, index) {
    var id = 'image-' + index;
    var lookup = '#'+id;
    $('<div/>', {
      class: 'thumbnail',
      id: id,
      height: "50",
      width: "50"
    }).appendTo('#images');
    $(lookup).css('background-image', 'url(' + thumbnail + ')');
    $(lookup).click(function () {
      App.load('viewer', {
        message: false,
        image: urls[index],
        index: index,
        images: urls
      });
    });
  }


});

