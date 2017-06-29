'use strict';
angular
  .module('softvApp')
  .controller('EncuestaEditaCtrl', function ($state, $uibModal, $rootScope, ngNotify, $stateParams, encuestasFactory) {

    function initialData() {
      vm.IdEncuesta = $stateParams.id;
      encuestasFactory.GetEncuestasList().then(function (data) {
        vm.Encuestas = data.GetEncuestasListResult;
        for (var a = 0; a < vm.Encuestas.length; a++) {
          if (vm.Encuestas[a].IdEncuesta == vm.IdEncuesta) {
            vm.Encuesta = vm.Encuestas[a];
            vm.NombreEnc = vm.Encuesta.TituloEncuesta;
            vm.DescripcionEnc = vm.Encuesta.Descripcion;
            encuestasFactory.GetPreguntasList().then(function (response) {
              vm.Preguntas = response.GetPreguntasListResult;
              Comparar(vm.IdEncuesta, vm.Preguntas);
            });
          }
        }
      });
    }

    function Comparar(IdEncuesta, Preguntas) {
      vm.obj = {};
      vm.obj.items = [];
      vm.obj.selectedItems = [];
      console.log(Preguntas);
      console.log(IdEncuesta);
      encuestasFactory.GetMuestraPreguntas_EncuestasList(IdEncuesta).then(function (data) {
        vm.Preguntasencuesta = data.GetMuestraPreguntas_EncuestasListResult;
        for (var i = 0; i < Preguntas.length; i++) {
          if (Agregado(Preguntas[i].IdPregunta, vm.Preguntasencuesta) == true) {
            vm.obj.selectedItems.push(Preguntas[i]);
          } else {
            vm.obj.items.push(Preguntas[i]);
          }
        }
      });
    }

    function Agregado(IdPregunta, Preguntasencuesta) {

      var count = 0;
      for (var a = 0; a < Preguntasencuesta.length; a++) {
        if (Preguntasencuesta[a].IdPregunta == IdPregunta) {
          count = count + 1;
        }
      }

      return (count > 0) ? true : false;

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

    function AgregarEncuesta() {

      if (vm.obj.selectedItems.length > 0) {
        var preguntas = [];
        for (var a = 0; a < vm.obj.selectedItems.length; a++) {
          var pregunta = {
            'IdPregunta': vm.obj.selectedItems[a].IdPregunta
          };
          preguntas.push(pregunta);
        }
        encuestasFactory.GetAddEncuesta(vm.IdEncuesta, vm.NombreEnc, vm.DescripcionEnc, preguntas, 2).then(function (data) {
          $state.go('home.encuestas.encuesta');
          ngNotify.set('La encuesta se editó correctamente', 'success');
        });
      } else {

        ngNotify.set('La encuesta necesita tener preguntas', 'info');
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
    vm.Titulo = 'Editar Encuesta';
    vm.transfer = transfer;
    vm.AgregarEncuesta = AgregarEncuesta;
    initialData();
    vm.respuestas = respuestas;
  });
