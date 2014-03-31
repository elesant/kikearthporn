/**
 * Created by kevin on 3/31/2014.
 */

App.populator('viewer', function(page, data){
  console.log(JSON.stringify(data));
  var photoViewer = new PhotoViewer(page, data.images, {
    automaticTitles : false ,
    autoHideTitle   : true ,
    startAt         : (data.index || 0)
  });

  if (data.images) {
    photoViewer.on('flip', function (newIndex) {
      data.index = newIndex;
      App.saveStack();
    });
  }
});
