(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalCambioAparatoCtrl', ModalCambioAparatoCtrl);

  ModalCambioAparatoCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope', 'ngNotify'];

  function ModalCambioAparatoCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope, ngNotify, $localStorage) {
    var vm = this;
    vm.cancel = cancel;
    vm.guardar = guardar;
    vm.cambio = true;
    vm.Detalle = items.Detalle

    this.$onInit = function () {
      var Parametros = {
        'Op': items.Op,
        'Trabajo': items.Trabajo,
        'Contrato': items.Contrato,
        'ClvTecnico': items.ClvTecnico,
        'Clave': items.Clave,
        'ClvOrden': items.ClvOrden
      };
      console.log(Parametros);
      ordenesFactory.MUESTRAAPARATOS_DISCPONIBLES(Parametros).then(function (resp) {
        console.log(resp);
        vm.aparatos = resp.GetMUESTRAAPARATOS_DISCPONIBLESListResult;
        vm.aparato = vm.aparatos[0];
        var Parametros2 = {
          'Op': items.Op,
          'Trabajo': items.Trabajo,
          'Contrato': items.Contrato,
          'ClvTecnico': 0,
          'Clave': items.Clave,
          'ClvOrden': items.ClvOrden
        };
        console.log(Parametros2);

        ordenesFactory.MUESTRAAPARATOS_DISCPONIBLES(Parametros2).then(function (result) {
          console.log(result);
          vm.aparatos2 = result.GetMUESTRAAPARATOS_DISCPONIBLESListResult;
          console.log(vm.aparatos2);
          vm.aparato2 = vm.aparatos2[0];
          ordenesFactory.SP_StatusAparatos().then(function (data) {
            console.log(data);

            vm.listastatus = data.GetSP_StatusAparatosResult;

            if (items.Trabajo == 'CANTX') {
              vm.label1 = 'Antena asignada Actualmente';
              vm.label2 = 'Seleccione el status de la antena';
              vm.label3 = 'Seleccione la antena a instalar';
            } else if (items.Trabajo == 'CCABM') {
              vm.label1 = 'Aparato asignado Actualmente';
              vm.label2 = 'Seleccione el status del aparato';
              vm.label3 = 'Seleccione el aparato a instalar';
            } else {

            }

          });
        });



      });
    }





    function guardar() {

      var obj = {
        'Clave': items.Clave,
        'Trabajo': items.Trabajo,
        'ClvOrden': items.ClvOrden,
        'ContratoNet': vm.aparato2.ContratoAnt,
        'ClvAparato': vm.aparato.ContratoAnt,
        'Op': items.Op,
        'Status': vm.status.Clv_StatusCableModem
      }

      ordenesFactory.AddSP_GuardaIAPARATOS(obj).then(function (data) {
        $rootScope.$emit('actualiza_tablaServicios');
        $uibModalInstance.dismiss('cancel');
      });


    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
