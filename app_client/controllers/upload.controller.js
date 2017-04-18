(function() {
    angular
        .module('TuneBox')
        .controller('uploadCtrl', uploadCtrl);

    uploadCtrl.$inject = ['$scope', 'Upload', '$timeout'];

    function uploadCtrl($scope, Upload, $timeout) {
        $scope.upload = function (dataUrl, name) {
            //console.log(name);
            //console.log(dataUrl);
            $scope.room.thumbnail = dataUrl;
            
            Upload.upload({
                url: 'api/uploads',
                data: {
                    file: Upload.dataUrltoBlob(dataUrl, name)
                },
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) $scope.errorMsg = response.status 
                    + ': ' + response.data;
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    };
})();