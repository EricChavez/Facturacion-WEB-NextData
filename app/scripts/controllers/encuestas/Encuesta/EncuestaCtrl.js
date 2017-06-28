'use strict';
angular
  .module('softvApp')
  .controller('EncuestaCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory) {

    function initialData() {
      encuestasFactory.GetEncuestasList().then(function (data) {
        vm.Encuestas = data.GetEncuestasListResult;
      

      });
    }

    var vm = this;
    initialData();
  });
