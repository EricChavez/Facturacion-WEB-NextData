'use strict';
angular
  .module('softvApp')
  .controller('EstadisticasdetalleCtrl', EstadisticasdetalleCtrl);
EstadisticasdetalleCtrl.$inject = ['$uibModal', '$rootScope', '$stateParams', 'ngNotify', 'encuestasFactory'];

function EstadisticasdetalleCtrl($uibModal, $rootScope, $stateParams, ngNotify, encuestasFactory) {
  function initialData() {
    vm.Idproceso = $stateParams.id;
    graficar();
  }
   function graficar() {
    encuestasFactory.GetGraficasPreguntasList(vm.Idproceso).then(function (data) {
      vm.Preguntas = data.GetGraficasPreguntasListResult.preguntas;
      console.log(vm.Preguntas);

      console.log(vm.Preguntas);
      vm.Preguntas.forEach(function (pregunta) {
        console.log(pregunta);
        var cols = [{
            id: 't',
            label: 'Topping',
            type: 'string'
          },
          {
            id: 's',
            label: 'clientes',
            type: 'number'
          }
        ];

        console.log(cols);
        var options = {
          'title': pregunta.Pregunta,
          'forceRedrawNow': true
        };

        console.log(options);
        var respuestas = [];

        pregunta.ResOpcMult.forEach(function (respuesta) {

          var res = {
            c: [{
                v: respuesta.ResOpcMult
              },
              {
                v: respuesta.cantidad
              },
            ]
          };
          respuestas.push(res);

        });

        console.log(respuestas);

        var data = {
          'cols': cols,
          'rows': respuestas,


        };
        pregunta.data = data;
        pregunta.type = vm.TipoGrafica;
        pregunta.options = options;
      });

      console.log(vm.Preguntas);
    });
  }



  function ObtenPreguntas() {
    vm.resultados.forEach(function (pregunta) {


    });
  }

  function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank', 'width=600,height=600');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();

  }

  function cambioGrafico() {
    graficar();
  }


  var vm = this;
  //vm.myChartObject = {};
  vm.TipoGrafica = 'PieChart';
  initialData();
  vm.printDiv = printDiv;
  vm.Charts = [];
  vm.cambioGrafico = cambioGrafico;
}
