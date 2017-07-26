'use strict';

angular
  .module('softvApp')
  .controller('ReporteGeneralCtrl', function (encuestasFactory) {
    var vm = this;
    vm.tituloSelect = 'Selecciona el distribuidor';
    GetDistribuidores();
    vm.transfer = transfer;
    vm.objDistribuidores = {};
    vm.objDistribuidores.items = [];
    vm.objDistribuidores.selectedItems = [];


    vm.objPlaza = {};
    vm.objPlaza.items = [];
    vm.objPlaza.selectedItems = [];


    vm.Estatus = [{
        'clave': 'C',
        'Nombre': 'Contratado'
      },
      {
        'clave': 'S',
        'Nombre': 'Suspendidos'
      },

      {
        'clave': 'T',
        'Nombre': 'Temporales'
      },
      {
        'clave': 'I',
        'Nombre': 'Instalado'
      },
      {
        'clave': 'D',
        'Nombre': 'Desconectado'
      },
      {
        'clave': 'B',
        'Nombre': 'Baja'
      },
      {
        'clave': 'F',
        'Nombre': 'Fuera de servicio'
      }
    ];


    function GetDistribuidores() {
      encuestasFactory.GetMuestra_DistribuidoresEncList().then(function (data) {
        vm.objDistribuidores.items = data.GetMuestra_DistribuidoresEncListResult;
      });
    }


    function transfer(from, to, index) {
      if (index >= 0) {
        to.push(from[index]);
        from.splice(index, 1);
      } else {
        for (var i = 0; i < from.length; i++) {
          to.push(from[i]);
        }
        from.length = 0;
      }
    }

  });
