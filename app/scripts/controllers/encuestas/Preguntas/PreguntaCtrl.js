'use strict';
angular
  .module('softvApp')
  .controller('PreguntaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory) {

    function initialData() {
      encuestasFactory.GetPreguntasList().then(function (data) {
        vm.Preguntas = data.GetPreguntasListResult;
      });
    }


    function Detalle(object) {
  var options=object.IdPregunta;
      vm.animationsEnabled = true;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/encuestas/ModalDetallePregunta.html',
        controller: 'ModalDetallePreguntaCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'sm',
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }

    var vm = this;
    initialData();
	vm.Detalle=Detalle;
  });
