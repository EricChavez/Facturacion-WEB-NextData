'use strict';
angular
  .module('softvApp')
  .controller('NuevaPreguntaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory, $state) {

    function initialData() {
      encuestasFactory.GetResOpcMultsList().then(function (data) {
        console.log(data);
    vm.Respuestas_=data.GetResOpcMultsListResult;
      });
    }

    function cambioTipo() {
      if (vm.TipoPregunta == 1 || vm.TipoPregunta == 2) {
        vm.opcionMultiple = false;

      } else {
        vm.opcionMultiple = true;
      }

    }

    function AgregaRespuesta() {  

    }

    function Elimina(index) {
      vm.Respuestas.splice(index, 1);
    }



    function AgregarPregunta() {
      if (vm.TipoPregunta == 3) {
        console.log("Opciones");
        if (vm.Respuestas != undefined && vm.Respuestas.length > 1) {
          encuestasFactory.GetAddPregunta(vm.Npregunta, vm.TipoPregunta, vm.Respuestas).then(function (resp) {
            ngNotify.set('La pregunta se ha guardado correctamente', 'success');
            $state.go('home.encuestas.preguntas');
          });
        } else {
          ngNotify.set('Ingresa las opciones', 'warn');
        }
      } else {
        encuestasFactory.GetAddPregunta(vm.Npregunta, vm.TipoPregunta, vm.Respuestas).then(function (resp) {
          ngNotify.set('La pregunta se ha guardado correctamente', 'success');
          $state.go('home.encuestas.preguntas');
        });
      }
    }

    function seleccionaResp(value){     
      vm.RespuestaIngreso=value;
      vm.MuestraOpciones=false;
    }

    

    var vm = this;
    initialData();
    vm.cambioTipo = cambioTipo;
    vm.AgregarPregunta = AgregarPregunta;
    vm.opcionMultiple = false;
    vm.AgregaRespuesta = AgregaRespuesta;
    vm.Elimina = Elimina;    
    vm.Respuestas = [];
    vm.seleccionaResp=seleccionaResp;
    
  
  });
