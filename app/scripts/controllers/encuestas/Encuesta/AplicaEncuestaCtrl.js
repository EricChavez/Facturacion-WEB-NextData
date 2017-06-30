'use strict';
angular
  .module('softvApp')
  .controller('AplicaEncuestaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory) {

    function initialData() {
     

    encuestasFactory.ProcesosEncuestas().then(function(data){
      vm.Procesos=data.GetProcesosEncuestasListResult;
      //vm.Procesos=
    });
    }

    

    var vm = this;
    initialData();
  
  });
