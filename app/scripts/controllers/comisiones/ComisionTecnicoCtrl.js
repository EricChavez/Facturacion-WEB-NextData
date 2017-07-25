'use strict';

angular
  .module('softvApp')
  .controller('ComisionTecnicoCtrl', function (ComisionFactory, ngNotify) {
    var vm = this;
    vm.Agregar = Agregar;
    vm.Eliminar = Eliminar;
    init();

    function GetList(){
ComisionFactory.GetcomisiontecnicoList().then(function (data) {
        vm.comisiones = data.GetComisionesTecnicosWebListResult;
        console.log(vm.comisiones);
      })
    }

    function init() {
      GetList();
    }

    function Agregar() {
      ComisionFactory.Addcomisiontecnico(vm.inicio, vm.fin, vm.comision).then(function (data) {
        if (data.AddComisionesTecnicosWebResult == 1) {
          ngNotify.set('Se ha agregado la comisión correctamente', 'success');
        } else {
          ngNotify.set('La comisión con esos rangos ya existe', 'warn');
        }
        GetList();
      })
    }

    function Eliminar(object) {
      ComisionFactory.GetDeleteComisionesTecnicosWeb(object.IdComision).then(function (result) {
        ngNotify.set('Se ha eliminado la comisión correctamente', 'success');
        GetList();
       
      })

    }





  });
