class MediaObject{
  constructor(){
    return{
      replace: true,
      templateUrl: './partials/mediaobject/mediaobject.html',
      scope:{
        item: '='
      },
      link: function($scope){
      }
    }
  }
}

export = MediaObject;
