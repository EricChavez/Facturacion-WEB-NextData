'use strict';

function reporteContSaldadosCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
  this.$onInit = function () {
    vm.Fecha = $filter('date')(new Date(), 'dd-MM-yyyy');

  }

  function Aceptar() {
      alert('busca');
    var fecha = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
    console.log(fecha);
    ContratoMaestroFactory.GetContratosSaldadosMaestroList(fecha).then(function (data) {
      vm.Registros=data.GetContratosSaldadosMaestroListResult;
    })
  }


  var vm = this;
  vm.Aceptar = Aceptar;

}
angular.module('softvApp').controller('reporteContSaldadosCtrl', reporteContSaldadosCtrl);
