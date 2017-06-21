'use strict';
angular
	.module('softvApp')
	.controller('EncuestaNuevaCtrl', function( $uibModal, $rootScope, ngNotify) {

		function initialData() {
			
		}


        function transfer(from, to, index) {
            if (index >= 0) {
                to.push(from[index]);
                from.splice(index, 1);
            } else {
                for (var i = 0; i < from.length; i++) {
                    to.push(from[i]);
                }
                from.length = 0;
            }
        }

		var vm = this;	
		initialData();
	});
