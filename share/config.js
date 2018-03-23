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
                        $scope.$digest();
                    });

                    $ctrl.socket.emit("get");

                }

                this.saveConfig = function() {
                    $ctrl.socket.emit("save", {"name":"configurator.saved","title":"модуль конфигурации","port":3001})                    
                }

            }]
        })


