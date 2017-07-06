'use strict';

function reporteContpendientesCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
  this.$onInit = function () {
  
  } 

  function Aceptar() {
     
    var fecha = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
    console.log(fecha);
    ContratoMaestroFactory.GetContratosPorSaldarMaestroList(fecha).then(function (data) {
      vm.Registros=data.GetContratosPorSaldarMaestroListResult;
    })
  }
 
  var vm = this;
vm.Aceptar=Aceptar;
}
angular.module('softvApp').controller('reporteContpendientesCtrl', reporteContpendientesCtrl);
