// require('json-editor')



    angular.module('configModule', []) 
        .component('configComponent', {
            templateUrl:'/share/config.component.html',
            controller:["$scope", function($scope) {
                var $ctrl = this;
                this.socket = window.io("/config");
                this.$onInit = function() {
                    

                    $ctrl.socket.on("config", function(config) {
                        $ctrl.config = config;
                        $ctrl.formattedConfig = JSON.stringify(config, null, 4)
                        $scope.$digest();
                    });

                    $ctrl.socket.emit("get");

                }

                this.saveConfig = function() {
                    var config = JSON.parse($ctrl.formattedConfig)
                    
                    $ctrl.socket.emit("save", config)                    
                }

            }]
        })


