'use strict';
angular
  .module('softvApp')
  .controller('AplicaEncuestaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory) {

    function initialData() {
      encuestasFactory.ProcesosEncuestas().then(function (data) {
        vm.Procesos = data.GetProcesosEncuestasListResult;
      });
    }

    function TerminaProceso(id) {
      var options = id;
      vm.animationsEnabled = true;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/encuestas/ModalTerminaProceso.html',
        controller: 'ModalTerminaProcesoCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'md',
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }


    $rootScope.$on('actualizaProcesos', function () {
      encuestasFactory.ProcesosEncuestas().then(function (data) {
        vm.Procesos = data.GetProcesosEncuestasListResult;

      });
    });


    var vm = this;
    initialData();
    vm.TerminaProceso = TerminaProceso;

  });
