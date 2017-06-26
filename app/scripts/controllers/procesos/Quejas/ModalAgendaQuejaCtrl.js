'use strict';
angular
	.module('softvApp')
	.controller('ModalAgendaQuejaCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, options) {

		function initialData() {	 
	
		}
		function ok() {
	       $uibModalInstance.dismiss('cancel');
		}	

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}		
		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;	
		initialData();
	});