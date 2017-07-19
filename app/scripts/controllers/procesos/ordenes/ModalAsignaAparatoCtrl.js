(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalAsignaAparatoCtrl', ModalAsignaAparatoCtrl);

  ModalAsignaAparatoCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope', 'ngNotify'];

  function ModalAsignaAparatoCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope, ngNotify, $localStorage) {
    var vm = this;
    vm.cancel = cancel;
    vm.guardar = guardar;
    vm.cambio = false;
    vm.Detalle=items.Detalle;
    console.log(items);
    this.$onInit = function () {

      var Parametros = {
        'Op': items.Op,
        'Trabajo': items.Trabajo,
        'Contrato': items.Contrato,
        'ClvTecnico': items.ClvTecnico,
        'Clave': items.Clave,
        'ClvOrden':items.ClvOrden
      };
      console.log(Parametros);
      ordenesFactory.MUESTRAAPARATOS_DISCPONIBLES(Parametros).then(function (resp) {
        console.log(resp);
        vm.aparatos = resp.GetMUESTRAAPARATOS_DISCPONIBLESListResult;
        vm.aparato=vm.aparatos[0];
        var Parametros2 = {
          'Op': items.Op,
          'Trabajo': items.Trabajo,
          'Contrato': items.Contrato,
          'ClvTecnico': 0,
          'Clave': items.Clave,
          'ClvOrden':items.ClvOrden
        };
        console.log(Parametros2);

        ordenesFactory.MUESTRAAPARATOS_DISCPONIBLES(Parametros2).then(function (result) {
          console.log(result);
          vm.aparatos2 = result.GetMUESTRAAPARATOS_DISCPONIBLESListResult;
          vm.aparato2=vm.aparatos2[0];
          vm.label1='Aparatos por asignar';
          vm.label3='Seleccione el Aparato:'
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
        'Op':  items.Op,
        'Status': 'I'
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
