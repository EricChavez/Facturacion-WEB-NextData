'use strict';
angular
  .module('softvApp')
  .controller('ModalDetallePreguntaCtrl', function ($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, options, encuestasFactory) {

    function initialData() {
      encuestasFactory.MuestraRespuestas_Encuestas(options).then(function (data) {
        vm.Respuestas=data.GetMuestraRespuestas_EncuestasListResult
      });
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
