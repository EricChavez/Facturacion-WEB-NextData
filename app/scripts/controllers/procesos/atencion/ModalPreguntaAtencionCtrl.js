'use strict';
angular
  .module('softvApp')
  .controller('ModalPreguntaAtencionCtrl', function ($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, detalle, quejasFactory) {
    this.$onInit = function () {
      if (detalle.Modulo == 'Atencion') {
        vm.Titulo = 'Atencion telefónica';
        vm.Pregunta = '¿Deseas generar la atención telefónica #' + detalle.Clv + ' ahora?';
        vm.btnok = 'Aceptar';
        vm.btncancel = 'Descartar';
      } else if (detalle.Modulo == 'Ordenes') {
        vm.Titulo = 'Orden de servicio';
        vm.Pregunta = '¿Deseas generar la orden de servicio #' + detalle.Clv + ' ahora?';
        vm.btnok = 'Aceptar';
        vm.btncancel = 'Descartar';

      }
    }

    function ok() {
      if (detalle.Modulo == 'Atencion') {
        $uibModalInstance.dismiss('cancel');
        $rootScope.$emit('generarAtencion');
      } else if (detalle.Modulo == 'Ordenes') {
        $uibModalInstance.dismiss('cancel');
        $rootScope.$emit('generarOrden');
      }
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
      if (detalle.Modulo == 'Atencion' && detalle.Op == 1) {
        $rootScope.$emit('verDetalle');
      } else if (detalle.Modulo == 'Atencion' && detalle.Op == 2) {
        $rootScope.$emit('verContratos');
      } else if (detalle.Modulo == 'Ordenes' && detalle.Op == 1) {
        $rootScope.$emit('verDetalle');
      } else if (detalle.Modulo == 'Ordenes' && detalle.Op == 2) {
        $rootScope.$emit('verContratos');
      }
    }

    var vm = this;
    vm.Titulo = '';
    vm.Pregunta = '';
    vm.cancel = cancel;
    vm.ok = ok;

  });
