(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('modalMotivoCanCtrl', modalMotivoCanCtrl);

  modalMotivoCanCtrl.inject = ['$uibModalInstance', '$uibModal', 'ordenesFactory', 'ngNotify', '$rootScope', 'ClvOrden'];

  function modalMotivoCanCtrl($uibModalInstance, $uibModal, ordenesFactory, ngNotify, $rootScope, ClvOrden) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.Titulo = 'Motivo de la cancelación';

    this.$onInit = function () {
     alert('modal');

     ordenesFactory.GetConMotCanList().then(function (data) {
      console.log(data);
     });
      
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {

      $uibModalInstance.dismiss('cancel');
      $rootScope.$emit('ChecaMotivoCancelacion', cliente);
    }
  }
})();
