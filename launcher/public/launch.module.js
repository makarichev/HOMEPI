(function() {

    angular.module("launchModule", [])
        .component("launchComponent", {
            templateUrl: 'launch.component.html'
            , controller: ['$scope', function($scope) {
                var $ctrl = this;
                this.socket = window.io("/manage");
                
                this.$onInit = function() {
                    $ctrl.socket.on('changed', function(data) {
                        $ctrl.units = data
                        $scope.$digest()
                    })
                    $ctrl.socket.on('host', function(data) {
                        $ctrl.host = data;
                        $scope.$digest()
                    })
                    $ctrl.socket.on('error', function(data) {
                        $ctrl.error = data
                        $scope.$digest()
                    })

                    

                }

                this.getUnitRef = function(unit) {
                    return window.location.protocol + '//' +  window.location.hostname + ':' + unit.port + '/config';
                }
                this.install = function(unit) {
                    if (unit.installed) $ctrl.socket.emit("install", unit)
                    else $ctrl.socket.emit("uninstall", unit)
                    
                }

            }]

        })
})()