'use strict';

angular
  .module('softvApp')
  .controller('ReporteGeneralCtrl', function (ComisionFactory, atencionFactory, ngNotify) {
    var vm = this;
    vm.tituloSelect = 'Selecciona el distribuidor';
    GetDistribuidores();
    GetGrupoVentas();
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
    vm.Reporte = 'C';
    vm.bloqueo = bloqueo;
    bloqueo();
    vm.Selectplazas = false;
    vm.Selectvendedores = false;
    vm.Selectpaquetes = false;
    vm.Selectdistribuidores = true;
    vm.pdistribuidores = true;
    vm.pfiltros = false;
    vm.IniciarSeleccion = IniciarSeleccion;
    vm.GetReporte=GetReporte;

    function GetReporte() {

      if (vm.objvendedores.selectedItems.length > 0) {} else {
        ngNotify.set('Selecciona al menos un usuario/vendedor', 'warn');
        return;
      }

    }

    function IniciarSeleccion() {


      if (vm.Reporte == 'S') {
        var cuantos = 0;
        vm.Estatus.forEach(function (item) {
          cuantos += (item.checked == true) ? 1 : 0;
        });
        if (cuantos == 0) {
          ngNotify.set('Selecciona al menos un status', 'warn');
          return;
        }
      }
      vm.pdistribuidores = false;
      vm.pfiltros = true;

    }

    function bloqueo() {

      if (vm.Reporte == 'C') {
        vm.pgrupos = false;
        vm.pservicios = true;
        vm.pstatus = true;
        vm.pfecha = false;
      }
      if (vm.Reporte == 'S') {
        vm.pgrupos = false;
        vm.pservicios = false;
        vm.pstatus = false;
        vm.pfecha = false;
      }
      if (vm.Reporte == 'V') {
        vm.pgrupos = false;
        vm.pservicios = false;
        vm.pstatus = true;
        vm.pfecha = false;
      }

    }



    function GetServicios() {
      atencionFactory.getServicios().then(function (data) {
        vm.servicios = data.GetMuestraTipSerPrincipalListResult;
        vm.servicio = vm.servicios[1];
      });
    }

    vm.Estatus = [{
        'clave': 'C',
        'Nombre': 'Contratado',
        'checked': false
      },
      {
        'clave': 'S',
        'Nombre': 'Suspendidos',
        'checked': false
      },

      {
        'clave': 'T',
        'Nombre': 'Temporales',
        'checked': false
      },
      {
        'clave': 'I',
        'Nombre': 'Instalado',
        'checked': false
      },
      {
        'clave': 'D',
        'Nombre': 'Desconectado',
        'checked': false
      },
      {
        'clave': 'B',
        'Nombre': 'Baja',
        'checked': false
      },
      {
        'clave': 'F',
        'Nombre': 'Fuera de servicio',
        'checked': false
      }
    ];


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

    function GetPaquetes() {
      if (vm.objvendedores.selectedItems.length > 0) {
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
      } else {
        ngNotify.set('Selecciona al menos un distribuidor', 'warn');
      }
    }



    function GetVendedores() {

      if (vm.objPlaza.selectedItems.length > 0) {
        vm.Selectvendedores = true;
        vm.Selectplazas = false;
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
      } else {
        ngNotify.set('Selecciona al menos una plaza', 'warn');
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

    function GetGrupoVentas() {
      var obj = {
        'Clv_Grupo': 0,
        'Op': 4
      }
      ComisionFactory.GetConGrupoVentasWeb(obj)
        .then(function (data) {
          vm.grupos = data.GetConGrupoVentasWebResult
        });
    }

  });
