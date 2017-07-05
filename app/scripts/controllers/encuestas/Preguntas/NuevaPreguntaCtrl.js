'use strict';
angular
  .module('softvApp')
  .controller('NuevaPreguntaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory,$state) {

    function initialData() {

    }

    function cambioTipo() {
      if (vm.TipoPregunta == 1 || vm.TipoPregunta == 2) {
        vm.opcionMultiple = false;

      } else {
        vm.opcionMultiple = true;
      }

    }

    function AgregaRespuesta() {
      var respuesta = {};
      respuesta.ResOpcMult = "";
      vm.Respuestas.push(respuesta);
    }

	function Elimina(index){
		vm.Respuestas.splice(index, 1);
	}



    function AgregarPregunta() {
     if(vm.TipoPregunta == 3){
        console.log("Opciones");
          if(vm.Respuestas != undefined && vm.Respuestas.length > 1){
            encuestasFactory.GetAddPregunta(vm.Npregunta,vm.TipoPregunta,vm.Respuestas).then(function(resp){
              ngNotify.set('La pregunta se ha guardado correctamente','success');
		          $state.go('home.encuestas.preguntas');
		        });
          }else{
            ngNotify.set('Ingresa las opciones','warn');
          }
     }else{
        encuestasFactory.GetAddPregunta(vm.Npregunta,vm.TipoPregunta,vm.Respuestas).then(function(resp){
          ngNotify.set('La pregunta se ha guardado correctamente','success');
		      $state.go('home.encuestas.preguntas');
		    });
     }
    }

    var vm = this;
    initialData();
    vm.cambioTipo = cambioTipo;
    vm.AgregarPregunta = AgregarPregunta;
    vm.opcionMultiple = false;
    vm.AgregaRespuesta = AgregaRespuesta;
	vm.Elimina=Elimina;
    vm.Respuestas = [];
  });
