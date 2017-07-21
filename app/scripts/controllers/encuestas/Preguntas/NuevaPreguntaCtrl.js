'use strict';
angular
  .module('softvApp')
  .controller('NuevaPreguntaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory, $state) {

    function initialData() {
      encuestasFactory.GetResOpcMultsList().then(function (data) {
        console.log(data);
        vm.Respuestas_ = data.GetResOpcMultsListResult;
      });
    }

    function cambioTipo() {
      if (vm.TipoPregunta == 1 || vm.TipoPregunta == 2) {
        vm.opcionMultiple = false;
      } else {
        vm.opcionMultiple = true;
      }
    }

    function AgregaRespuesta() {
      console.log(vm.selectedResp);
      if (vm.selectedResp != undefined) {

        if (vm.selectedResp.originalObject.Id_ResOpcMult != undefined) {

          if (ExisteRespuesta(vm.selectedResp.originalObject.Id_ResOpcMult) == false) {
            var object = {
              'Id_ResOpcMult': vm.selectedResp.originalObject.Id_ResOpcMult,
              'ResOpcMult': vm.selectedResp.originalObject.ResOpcMult
            }
            vm.Respuestas.push(object);
          } else {
            ngNotify.set('Esta respuesta ya fue ingresada', 'warn');
          }
        } else {

          var object = {
            'Id_ResOpcMult': 0,
            'ResOpcMult': vm.selectedResp.originalObject
          }
        vm.Respuestas.push(object);
        }
      }
    }

    function Elimina(index) {
      vm.Respuestas.splice(index, 1);
    }

    function ExisteRespuesta(Id_ResOpcMult) {
      var count = 0;
      for (var a = 0; a < vm.Respuestas.length; a++) {
        if (vm.Respuestas[a].Id_ResOpcMult == Id_ResOpcMult) {
          count = count + 1;
        }
      }
      return (count > 0) ? true : false;
    }

    function AgregarPregunta() {
      if (vm.TipoPregunta == 3) {
        console.log("Opciones");
        if (vm.Respuestas != undefined && vm.Respuestas.length > 1) {
          encuestasFactory.GetAddPregunta(vm.Npregunta, vm.TipoPregunta, vm.Respuestas).then(function (resp) {
            ngNotify.set('La pregunta se ha guardado correctamente', 'success');
            $state.go('home.encuestas.preguntas');
          });
        } else {
          ngNotify.set('Ingresa las respuestas para tu pregunta ', 'warn');
        }
      } else {
        encuestasFactory.GetAddPregunta(vm.Npregunta, vm.TipoPregunta, vm.Respuestas).then(function (resp) {
          ngNotify.set('La pregunta se ha guardado correctamente', 'success');
          $state.go('home.encuestas.preguntas');
        });
      }
    }

    var vm = this;
    initialData();
    vm.cambioTipo = cambioTipo;
    vm.AgregarPregunta = AgregarPregunta;
    vm.opcionMultiple = false;
    vm.AgregaRespuesta = AgregaRespuesta;
    vm.Elimina = Elimina;
    vm.Respuestas = [];



  });
