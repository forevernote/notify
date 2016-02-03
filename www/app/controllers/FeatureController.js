angular.module('FeatureController', [])

.controller('MapController', function($scope) {
  $scope.marker = null;
  $scope.$on('NEWEVENTLOADED', function(event, data) {
    var mainMarker = {
          lat: data.location.coords.lat + 0,
          lng: data.location.coords.lng + 0,
          focus: true,
          message: data.title,
          draggable: false
      };
    angular.extend($scope, {
      london: {
          lat: 51.505,
          lng: -0.09,
          zoom: 8
      },
      markers: {
        mainMarker: angular.copy(mainMarker)
      }
    })
  })

})

.controller('PostMapController', function($scope, Broadcast) {
  $scope.show = true;

  $scope.$on('leafletDirectiveMap.new-post-map.click', function(event, args) {

    // Get clikc event
    var clickEvent = args.leafletEvent;

    // Create new object from click event params
    $scope.clickLatLng = {
      lat: clickEvent.latlng.lat,
      lng: clickEvent.latlng.lng,
    };
    console.log($scope.clickLatLng);

    Broadcast.emit('LocationAdded', $scope.clickLatLng);

  })
})
