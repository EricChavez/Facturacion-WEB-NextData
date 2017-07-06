'use strict';

function reporteFacDolaresCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
  this.$onInit = function () {

  }

  function Aceptar() {
    alert('busca');
    var fecha = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
    console.log(fecha);
    ContratoMaestroFactory.ResumenFacturasDolares(fecha).then(function (data) {
      vm.Registros = data.GetResumenFacturasDolaresListResult;
    })
  }




  var vm = this;
  vm.Aceptar = Aceptar;

}
angular.module('softvApp').controller('reporteFacDolaresCtrl', reporteFacDolaresCtrl);
