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
            ordenesFactory.GetConMotCanList().then(function (data) {
        vm.motivos = data.GetConMotCanListResult;
      });

    }

    function cancel() {
      
    }

    function ok() {

      ordenesFactory.AddInsertMotCanServ(ClvOrden,vm.motcan.Clv_MOTCAN).then(function(data){
      $uibModalInstance.dismiss('cancel');
      $rootScope.$emit('ChecaMotivoCancelacion');
      });

     
    }
  }
})();
