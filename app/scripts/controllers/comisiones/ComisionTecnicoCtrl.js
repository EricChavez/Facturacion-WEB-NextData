'use strict';

angular
  .module('softvApp')
  .controller('ComisionTecnicoCtrl', function (ComisionFactory) {
    var vm = this;

    function init(){
ComisionFactory.GetcomisiontecnicoList().then(function (data) {
        console.log(data);
      })
    }

    function Agregar() {
      ComisionFactory.Addcomisiontecnico(vm.inicio,vm.fin,vm.comision).then(function (data) {
        console.log(data);
      })
    }
    vm.Agregar = Agregar;

  });
