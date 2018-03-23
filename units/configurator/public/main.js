(function() {


    angular.module('mainModule', [])
    .component("mainComponent", {
        templateUrl: "main.component.html",
        controller: ["$scope", function($scope) {

            var $ctrl = this;
            var io = window.io();
            this.$onInit = function() {

                io.on('scanresult', function(scanResult) {
                    $ctrl.scanResult = scanResult;
                    $scope.$digest();
                })

                
            }

            this.scan=function() {
                io.emit("scan")
            }


        }]
    })

})()
