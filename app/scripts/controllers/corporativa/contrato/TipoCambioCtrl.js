'use strict';

function TipoCambioCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
  this.$onInit = function () {
    ContratoMaestroFactory.GetTipoDeCambioList().then(function (data) {
      console.log(data);
      vm.Historial=data.GetTipoDeCambioListResult;
    });
  }

  function Aceptar() {
    ContratoMaestroFactory.AddTipoDeCambio(vm.TipoCambio).then(function (data) {
      ngNotify.set('El tipo de cambio se ha guardado correctamente','success');
    });

  }


  var vm = this;
  vm.Aceptar = Aceptar;

}
angular.module('softvApp').controller('TipoCambioCtrl', TipoCambioCtrl);
