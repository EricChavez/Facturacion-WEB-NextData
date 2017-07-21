'use strict';
angular
  .module('softvApp')
  .controller('NuevoProcesoCtrl', function ($uibModal, $rootScope,$filter ,ngNotify, encuestasFactory, $state) {

    function initialData() {

      encuestasFactory.GetMuestra_DistribuidoresEncList().then(function (data) {
        vm.Distribuidores = data.GetMuestra_DistribuidoresEncListResult;
        encuestasFactory.GetEncuestasList().then(function (response) {
          vm.Encuestas = response.GetEncuestasListResult;
          encuestasFactory.GetTipSerEncList().then(function (data) {
            vm.Servicios = data.GetTipSerEncListResult;
          });
        });

      });




    }

    function cambioDistribuidor() {
      var id = vm.Distribuidor.Clv_Plaza;
      encuestasFactory.Muestra_PlazaEnc(id).then(function (data) {
        vm.Plazas = data.GetMuestra_PlazaEncListResult;
      });
    }

    function CambioBusqueda() {
      if (vm.TipoBusqueda == 2) {
        vm.MuestraStatus = false;
        vm.MuestraFecha = true;
      } else {


        vm.MuestraStatus = true;
        vm.MuestraFecha = false;
      }
    }



    function AgregarProceso() {

      if (vm.TipoBusqueda == '1') {
        var cestatus = [];
        vm.Estatus.forEach(function (index) {
          if (index.checked == true) {
            cestatus.push(index.clave);
          }
        });

        var Parametros = {
          'IdPlaza': vm.Plaza.id_compania,
          'IdTipSer': vm.Servicio.Clv_TipSer,
          'IdTipBusq': vm.TipoBusqueda,
          'Desconectado': (cestatus.indexOf('D') !== -1) ? 'D' : '',
          'Instalado': (cestatus.indexOf('I') !== -1) ? 'I' : '',
          'Suspendido': (cestatus.indexOf('S') !== -1) ? 'S' : '',
          'Contratado': (cestatus.indexOf('C') !== -1) ? 'C' : '',
          'Temporales': (cestatus.indexOf('T') !== -1) ? 'T' : '',
          'Baja': (cestatus.indexOf('B') !== -1) ? 'B' : '',
          'Fuera': (cestatus.indexOf('F') !== -1) ? 'F' : '',
          'IdTipFecha': 0,
          'FechaI': '',
          'FechaF': '',
          'IdEncuesta': vm.Encuesta.IdEncuesta,
          'NombreProceso': vm.NombreProceso
        };
         
        encuestasFactory.GetGet_UniversoEncuestaList(Parametros).then(function (data) {
        if (data.GetGet_UniversoEncuestaListResult[0].IdProcesoEnc==0){
          $state.go('home.encuestas.aplicar');
          ngNotify.set('El proceso no se ha registrado debido a que no existen clientes que pueden ser encuestados con las características definidas.', 'warn');

        }else{
          $state.go('home.encuestas.aplicar');
          ngNotify.set('El proceso se ha guardado correctamente.', 'success');
        }
          
        })

      } else {
        var fechainicio = $filter('date')(vm.FechaInicio, 'dd/MM/yyyy');
        var fechafin = $filter('date')(vm.FechaFin, 'dd/MM/yyyy');

        var Parametros = {
          'IdPlaza': vm.Plaza.id_compania,
          'IdTipSer': vm.Servicio.Clv_TipSer,
          'IdTipBusq': vm.TipoBusqueda,
          'Desconectado': '',
          'Instalado': '',
          'Suspendido': '',
          'Contratado': '',
          'Temporales': '',
          'Fuera': '',
          'IdTipFecha': vm.EstatusFecha,
          'FechaI': fechainicio,
          'FechaF': fechafin,
          'IdEncuesta': vm.Encuesta.IdEncuesta,
          'NombreProceso': vm.NombreProceso
        };
      
       
        encuestasFactory.GetGet_UniversoEncuestaList(Parametros).then(function (data) {
          $state.go('home.encuestas.aplicar');
          ngNotify.set('El proceso se ha guardado correctamente.', 'success');
        })

      }

    }


    var vm = this;
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

    vm.TipoFecha = [{
        'clave': 1,
        'Nombre': 'Fecha de contratacion'
      },
      {
        'clave': 2,
        'Nombre': 'Fecha de instalación'
      },
      {
        'clave': 3,
        'Nombre': 'Fecha de cancelación'
      }
    ];
    vm.CambioBusqueda = CambioBusqueda;
    vm.TipoBusqueda = '1';
    vm.EstatusFecha = '1';
    vm.cambioDistribuidor = cambioDistribuidor;
    vm.AgregarProceso = AgregarProceso;
    CambioBusqueda();
    initialData();
  });
