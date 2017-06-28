'use strict';
angular
	.module('softvApp')
	.controller('EncuestaNuevaCtrl', function( $uibModal, $rootScope, ngNotify,encuestasFactory ) {

		function initialData() {
            vm.obj={};
            vm.obj.items=[];
            vm.obj.selectedItems=[];

              encuestasFactory.GetPreguntasList().then(function(response){
                  console.log(response.GetPreguntasListResult);
                  for(var a=0; a<response.GetPreguntasListResult.length; a++){
                      vm.obj.items.push(response.GetPreguntasListResult[a]);
                  }
                 
        });

        console.log( vm.obj);
			
		}

        function AgregarEncuesta(){


            
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
        vm.obj={};
        vm.transfer=transfer;
        vm.AgregarEncuesta=AgregarEncuesta;
		initialData();
	});
