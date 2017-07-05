'use strict';
angular
  .module('softvApp')
  .controller('AplicacontratosCtrl', function ($uibModal, $rootScope, $stateParams, ngNotify, encuestasFactory) {

    function initialData() {
      vm.IdProceso = $stateParams.id;
      encuestasFactory.GetUniversoEncuestaAplicarList(vm.IdProceso).then(function (data) {
        vm.Contratos = data.GetUniversoEncuestaAplicarListResult;
        
        encuestasFactory.GetDeepProcesosEncuestas(vm.IdProceso).then(function (data) {
          console.log(data);
          vm.proceso = data.GetDeepProcesosEncuestasResult;
          vm.IdEncuesta = data.GetDeepProcesosEncuestasResult.IdEncuesta;
         
        });

      });
    }

    function Encuesta_(cliente) {
      vm.cliente = cliente;
      vm.contrato = cliente.Contrato;
      encuestasFactory.GetRelPreguntaEncuesta(vm.IdEncuesta).then(function (data) {
        vm.Encuesta = data.GetEncuestaDetalleResult;
       
        vm.PanelContratos = false;
      });
    }

    function Guardar() {
      var respuestas = [];
      vm.Encuesta.LstPregunta.forEach(function (pregunta) {
        if (pregunta.IdTipoPregunta == 1) {
          var obj = {
            'IdPregunta': pregunta.IdPregunta,
            'Id_ResOpcMult': null,
            'RespAbi': pregunta.Respuesta,
            'RespCerrada': null
          };
          respuestas.push(obj);
        } else if (pregunta.IdTipoPregunta == 2) {

          var resp = (pregunta.Respuesta == 'S') ? 1 : 0;
          var obj = {
            'IdPregunta': pregunta.IdPregunta,
            'Id_ResOpcMult': null,
            'RespAbi': null,
            'RespCerrada': resp
          };
          respuestas.push(obj);
        } else {
          var obj = {
            'IdPregunta': pregunta.IdPregunta,
            'Id_ResOpcMult': parseInt(pregunta.Respuesta),
            'RespAbi': null,
            'RespCerrada': null
          };
          respuestas.push(obj);

        }

      });

      
   
      encuestasFactory.GetRelEncuestaCli(vm.IdProceso, vm.IdEncuesta, vm.contrato, respuestas).then(function (data) {
        vm.PanelContratos = true;

        encuestasFactory.GetUniversoEncuestaAplicarList(vm.IdProceso).then(function (data) {
          vm.Contratos = data.GetUniversoEncuestaAplicarListResult;
         
          encuestasFactory.GetDeepProcesosEncuestas(vm.IdProceso).then(function (data) {
            vm.proceso = data.GetDeepProcesosEncuestasResult;
            vm.IdEncuesta = data.GetDeepProcesosEncuestasResult.IdEncuesta;
            ngNotify.set('La encuesta se ha aplicado correctamente', 'success');
          });

        });


      });
    }

function CancelaProceso(){
 vm.PanelContratos = true;
}


    var vm = this;
    initialData();
    vm.Encuesta_ = Encuesta_;
    vm.PanelContratos = true;
    vm.Guardar = Guardar;
    vm.CancelaProceso=CancelaProceso;
  });
