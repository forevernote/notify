angular.module('FeatureController', [])

.controller('MapController', function($scope, $timeout) {
  $scope.show = false;

  $scope.$on('MAPBUTTONCLICKED', function(event, data) {

    $scope.show = true;


    angular.extend($scope, {
      center: {
        lat: 47.6234626,
        lng: -122.3358329,
        zoom: 13
      }
    });
    $scope.marker = null;

    if (data.location) {
      var mainMarker = {
        lat: data.location.coords.lat + 0,
        lng: data.location.coords.lng + 0,
        focus: true,
        zoom: 10,
        message: data.title,
        draggable: false
      };
      angular.extend($scope, {
        center: {
          lat: data.location.coords.lat + 0,
          lng: data.location.coords.lng + 0,
          zoom: 13
        },
        markers: {
          mainMarker: angular.copy(mainMarker)
        }
      })
    }
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