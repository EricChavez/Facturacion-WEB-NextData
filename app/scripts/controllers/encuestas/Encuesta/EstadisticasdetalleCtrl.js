'use strict';
angular
  .module('softvApp')
  .controller('EstadisticasdetalleCtrl', function ($uibModal, $rootScope,$stateParams ,ngNotify, encuestasFactory) {

    function initialData() {

      vm.IdEncuesta = $stateParams.id;

      vm.myChartObject.type = "PieChart";
      vm.onions = [{
          v: "Onions"
        },
        {
          v: 3
        },
      ];

      vm.myChartObject.data = {
        "cols": [{
            id: "t",
            label: "Topping",
            type: "string"
          },
          {
            id: "s",
            label: "Slices",
            type: "number"
          }
        ],
        "rows": [{
            c: [{
                v: "Mushrooms"
              },
              {
                v: 3
              },
            ]
          },
          {
            c: vm.onions
          },
          {
            c: [{
                v: "Olives"
              },
              {
                v: 31
              }
            ]
          },
          {
            c: [{
                v: "Zucchini"
              },
              {
                v: 1
              },
            ]
          },
          {
            c: [{
                v: "Pepperoni"
              },
              {
                v: 2
              },
            ]
          }
        ]
      };

      vm.myChartObject.options = {
        'title': 'How Much Pizza I Ate Last Night'
      };

    }


    function printDiv(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=300,height=300');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();

    }


    var vm = this;
    vm.myChartObject = {};
    initialData();
    
    vm.printDiv = printDiv;


  });
