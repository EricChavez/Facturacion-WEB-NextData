'use strict';

angular
  .module('softvApp')
  .controller('ResumenVendedoresCtrl', function (ComisionFactory) {
    var vm = this;
    vm.tituloSelect = 'Selecciona el distribuidor';
    GetDistribuidores();
    vm.transferAll = transferAll;
    vm.removeAll = removeAll;
    vm.Getplazas = Getplazas;
    vm.transfer = transfer;
    vm.objDistribuidores = {};
    vm.objDistribuidores.items = [];
    vm.objDistribuidores.selectedItems = [];
    vm.objPlaza = {};
    vm.objPlaza.items = [];
    vm.objPlaza.selectedItems = [];
    vm.Selectplazas = false;
    vm.Selectdistribuidores = true;
    vm.GetReporte = GetReporte;
    vm.GetRangos = GetRangos;
    vm.pFechas = false;
    vm.getReporte = getReporte;

    function getReporte() {

    }

    function GetRangos() {
      vm.pFechas = true;
    }

    function GetReporte() {

      if (vm.objvendedores.selectedItems.length > 0) {} else {
        ngNotify.set('Selecciona al menos un usuario/vendedor', 'warn');
        return;
      }

    }

    function GetDistribuidores() {
      ComisionFactory.GetMuestra_PlazasPorUsuarioList().then(function (data) {
        console.log(data);
        vm.objDistribuidores.items = data.GetMuestra_PlazasPorUsuarioListResult;
      });
    }

    function Getplazas() {
      if (vm.objDistribuidores.selectedItems.length > 0) {
        vm.Selectplazas = true;
        vm.Selectdistribuidores = false;
        var dist = [];
        vm.objDistribuidores.selectedItems
          .forEach(function (item) {
            dist.push({
              'Clv_Plaza': item.Clv_Plaza
            })
          });
        ComisionFactory.GetPlaza_ReportesVentasXmlList(dist)
          .then(function (data) {
            console.log(data);
            vm.objPlaza.items = data.GetPlaza_ReportesVentasXmlListResult;
          });
      } else {
        ngNotify.set('Selecciona al menos un distribuidor', 'warn');
      }
    }

    function transferAll(from, to) {
      from.forEach(function (item, index) {
        to.push(item);
      })
      from.splice(0, from.length)
    }

    function removeAll(from, to) {
      from.forEach(function (item, index) {
        to.push(item);
      })
      from.splice(0, from.length)
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
