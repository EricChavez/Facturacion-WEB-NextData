'use strict';
angular
  .module('softvApp')
  .controller('EncuestaNuevaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory,$state) {

    function initialData() {
      vm.obj = {};
      vm.obj.items = [];
      vm.obj.selectedItems = [];

      encuestasFactory.GetPreguntasList().then(function (response) {
        console.log(response.GetPreguntasListResult);
        for (var a = 0; a < response.GetPreguntasListResult.length; a++) {
          vm.obj.items.push(response.GetPreguntasListResult[a]);
        }

      });

      console.log(vm.obj);

    }

    function AgregarEncuesta() {

      if (vm.obj.selectedItems.length > 0) {
        var preguntas = [];
        for (var a = 0; a < vm.obj.selectedItems.length; a++) {
          var pregunta = {
            'IdPregunta': vm.obj.selectedItems[a].IdPregunta
          };
          preguntas.push(pregunta);
        }
        encuestasFactory.GetAddEncuesta(0, vm.NombreEnc, vm.DescripcionEnc, preguntas, 1).then(function (data) {
          $state.go('home.encuestas.encuesta');
          ngNotify.set('La encuesta se guardo correctamente', 'success');

        });
      } else {

        ngNotify.set('La encuesta necesita tener preguntas', 'info');
      }

    }


    function transfer(from, to, index) {
      if (index >= 0) {
        to.push(from[index]);
        from.splice(index, 1);
      } else {
        for (var i = 0; i < from.length; i++) {
          to.push(from[i]);
        }
        from.length = 0;
      }
    }

    function respuestas(IdPregunta) {
      var options = IdPregunta;
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
    vm.obj = {};
    vm.transfer = transfer;
    vm.Titulo = 'Nueva Encuesta';
    vm.AgregarEncuesta = AgregarEncuesta;
    vm.respuestas = respuestas;
    initialData();
  });
