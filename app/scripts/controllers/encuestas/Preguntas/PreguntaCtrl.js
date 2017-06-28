'use strict';
angular
	.module('softvApp')
	.controller('PreguntaCtrl', function( $uibModal, $rootScope, ngNotify,encuestasFactory) {

		function initialData() {
			encuestasFactory.GetPreguntasList().then(function(data){
              vm.Preguntas=data.GetPreguntasListResult;
			});
		}

		var vm = this;	
		initialData();
	});
