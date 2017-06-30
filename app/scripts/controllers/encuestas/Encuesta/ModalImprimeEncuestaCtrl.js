'use strict';
angular
  .module('softvApp')
  .controller('ModalImprimeEncuestaCtrl', function ($uibModalInstance,$sce,globalService, $uibModal, $rootScope, ngNotify, $localStorage, $state, options, encuestasFactory) {

    function initialData() {

      encuestasFactory.ImprimeEncuesta(options).then(function (data) {
        vm.url = globalService.getUrlReportes() + '/Reportes/' + data.GetImprimeEncuestaResult;
       console.log(vm.url);
        vm.urlReal = $sce.trustAsResourceUrl(vm.url);
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
