'use strict';
angular
  .module('softvApp')
  .controller('AplicacontratosCtrl', function ($uibModal, $rootScope, $stateParams, ngNotify, encuestasFactory) {

    function initialData() {
      vm.IdProceso = $stateParams.id;
      encuestasFactory.GetUniversoEncuestaAplicarList(vm.IdProceso).then(function (data) {
        vm.Contratos = data.GetUniversoEncuestaAplicarListResult;
        encuestasFactory.GetDeepProcesosEncuestas(vm.IdProceso).then(function (data) {
          console.log(data);
        });

      });
    }

    function Encuesta() {
      encuestasFactory.GetRelPreguntaEncuesta(vm.IdEncuesta).then(function (data) {
        vm.Encuesta = data.GetEncuestaDetalleResult;
        console.log(vm.Encuesta);
        vm.PanelContratos = false;
      });
    }

    function Guardar() {
      console.log(vm.Encuesta);
    }



    var vm = this;
    initialData();
    vm.Encuesta = Encuesta;
    vm.PanelContratos = true;
    vm.Guardar = Guardar;
  });
