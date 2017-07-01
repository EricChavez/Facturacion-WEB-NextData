'use strict';
angular
  .module('softvApp')
  .controller('ModalTerminaProcesoCtrl', function ($uibModalInstance,$sce,globalService, $uibModal, $rootScope, ngNotify, $localStorage, $state, options, encuestasFactory) {

    function initialData() {
        vm.IdProceso=options;
    }

    function ok() {
      encuestasFactory.TerminarProceso(vm.IdProceso).then(function(data){
          ngNotify.set('El proceso se ha terminado correctamente','success');
          $rootScope.$emit('actualizaProcesos');
          $uibModalInstance.dismiss('cancel');
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    initialData();
  });