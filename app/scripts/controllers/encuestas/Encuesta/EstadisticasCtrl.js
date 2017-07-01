'use strict';
angular
  .module('softvApp')
  .controller('EstadisticasCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory) {

    function initialData() {
      encuestasFactory.ProcesosEncuestas().then(function (data) {
         vm.Procesos= data.GetProcesosEncuestasListResult;
        console.log(data);
      });
    }; 

    var vm = this;   
    initialData();
   
  });
