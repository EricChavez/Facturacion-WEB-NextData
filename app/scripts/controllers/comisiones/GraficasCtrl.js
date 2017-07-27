'use strict';

angular
    .module('softvApp')
    .controller('GraficasCtrl', function (ComisionFactory,atencionFactory,ngNotify ) {
        var vm = this;        
    vm.tituloSelect = 'Selecciona el distribuidor';
    GetDistribuidores();   
    GetServicios();
    vm.transferAll = transferAll;
    vm.removeAll = removeAll;
    vm.Getplazas = Getplazas;
    vm.GetVendedores = GetVendedores;
    vm.GetPaquetes = GetPaquetes;
    vm.transfer = transfer;
    vm.objDistribuidores = {};
    vm.objDistribuidores.items = [];
    vm.objDistribuidores.selectedItems = [];
    vm.objPlaza = {};
    vm.objPlaza.items = [];
    vm.objPlaza.selectedItems = [];
    vm.objvendedores = {};
    vm.objvendedores.items = [];
    vm.objvendedores.selectedItems = [];
    vm.objpaquetes = {};
    vm.objpaquetes.items = [];
    vm.objpaquetes.selectedItems = [];  

    vm.objsucursales = {};
    vm.objsucursales.items = [];
    vm.objsucursales.selectedItems = []; 

    vm.Selectplazas = false;
    vm.Selectvendedores = false;
    vm.Selectpaquetes = false;
    vm.Selectdistribuidores = true;
    vm.pdistribuidores = true;
    vm.pfiltros = false;
    vm.IniciarSeleccion = IniciarSeleccion;
    vm.GetReporte=GetReporte;
    vm.GetSucursales=GetSucursales;
    


    function GetSucursales(){

        vm.Selectsucursales = true;
        vm.Selectplazas = false;
        var plazas = [];
        vm.objPlaza.selectedItems
          .forEach(function (item) {
            plazas.push({
              'id_compania': item.id_compania
            })
          });

        ComisionFactory.GetSucursales_ReportesVentasXmlList(plazas)
        .then(function(data){
         vm.objsucursales.items= data.GetSucursales_ReportesVentasXmlListResult;
        });
    }

    function GetReporte() {

     
    }

    function IniciarSeleccion() {     
      vm.pdistribuidores = false;
      vm.pfiltros = true;
    }

    function GetServicios() {
      atencionFactory.getServicios().then(function (data) {
        vm.servicios = data.GetMuestraTipSerPrincipalListResult;
        vm.servicio = vm.servicios[1];
      });
    }

    function GetDistribuidores() {
      ComisionFactory.GetMuestra_PlazasPorUsuarioList().then(function (data) {
        console.log(data);
        vm.objDistribuidores.items = data.GetMuestra_PlazasPorUsuarioListResult;
      });
    }

    function Getplazas() {
      
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
      
    }

    function GetPaquetes() {
     
        vm.Selectpaquetes = true;
        vm.Selectvendedores = false;
        console.log(vm.servicio);
        var servicios = [];
        if (vm.servicio.Clv_TipSerPrincipal > 0) {
          var obj = {
            'Clv_TipSer': vm.servicio.Clv_TipSerPrincipal
          }
          servicios.push(obj);
        } else {
          vm.servicios.forEach(function (item) {
            var obj = {
              'Clv_TipSer': item.Clv_TipSerPrincipal
            }
            servicios.push(obj);
          });
        }
        ComisionFactory.GetPaquetesRepVentasXmlList(servicios)
          .then(function (data) {
            console.log(data);
            vm.objpaquetes.items = data.GetPaquetesRepVentasXmlListResult;
          });
     
    }

    function GetVendedores() {
      
        vm.Selectvendedores = true;
        vm.Selectplazas = false;
        vm.Selectsucursales = false;
        var dist = [];
        vm.objDistribuidores.selectedItems
          .forEach(function (item) {
            dist.push({
              'Clv_Plaza': item.Clv_Plaza
            })
          });
        ComisionFactory.GetVendores_ReportesVentasXmlList(dist)
          .then(function (data) {
            console.log(data);
            vm.objvendedores.items = data.GetVendores_ReportesVentasXmlListResult;
            //vm.objPlaza.items=data.GetPlaza_ReportesVentasXmlListResult;
          });
      
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