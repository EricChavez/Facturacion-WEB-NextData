'use strict';
angular
  .module('softvApp')
  .controller('OrdenDetalleCtrl', function ($rootScope, $uibModal, ngNotify, $localStorage, $state, $stateParams, ordenesFactory) {
    this.$onInit = function () {
      vm.clv_orden = $stateParams.id;
      ordenesFactory.ConsultaOrdSer(vm.clv_orden).then(function (data) {
        console.log(data);
        var conceptos = data.GetDeepConsultaOrdSerResult;

        vm.Clv_Orden = conceptos.Clv_Orden;
        vm.Clv_TipSer = conceptos.Clv_TipSer;
        vm.Contrato = conceptos.Contrato;
        vm.ContratoCom = conceptos.ContratoCom;
        vm.Fec_Eje = conceptos.Fec_Eje;
        vm.Fec_Sol = conceptos.Fec_Sol;
        vm.FechaEjecucionReal=conceptos.FechaEjecucionReal;
        vm.NoBitacora = conceptos.NoBitacora;
        vm.NombreTecnico = conceptos.NombreTecnico;
        vm.Obs = conceptos.Obs;
        vm.Clv_status = conceptos.STATUS;
        vm.Visita1 = conceptos.Visita1;
        vm.Visita2 = conceptos.Visita2;
        vm.Ejecuto = conceptos.UserEjecuto;
        vm.Genero = conceptos.UserGenero;
        vm.Clv_Tecnico = conceptos.Clv_Tecnico;
        vm.detalleTrabajo=detalleTrabajo;

        for (var t = 0; t < vm.Status.length; t++) {
          if (vm.Status[t].Clave == vm.Clv_status) {
            vm.Estatus = vm.Status[t];
          }
        }

        for (var s = 0; s < vm.TipSer.length; s++) {
          if (vm.TipSer[s].Clave == vm.Clv_TipSer) {
            vm.Tip_Ser = vm.TipSer[s];
          }
        }

        if (vm.Clv_TipSer == '1') {
          vm.ClvTipSer1 = true;
        } else if (vm.Clv_TipSer == '2') {
          vm.ClvTipSer2 = true;
        }

        ordenesFactory.getContratoReal(vm.ContratoCom).then(function (data) {
          var conceptos_Contrato = data.GetuspBuscaContratoSeparado2ListResult[0];
          //console.log(conceptos_Contrato);

          ordenesFactory.buscarCliPorContrato(conceptos_Contrato.ContratoBueno).then(function (data) {
            vm.datosCli = data.GetDeepBUSCLIPORCONTRATO_OrdSerResult;
            console.log(vm.datosCli);
          });

          ordenesFactory.serviciosCliente(conceptos_Contrato.ContratoBueno).then(function (data) {
            vm.servicios = data.GetDameSerDelCliFacListResult;
          });

        });

      });

      ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
        console.log(data);
        vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
      });



    }

    function DescargaMaterialOrden() {
     
      var options = {};
      options.ClvOrden = vm.Clv_Orden;
      options.SctTecnico = vm.Clv_Tecnico;
      options.Tipo_Descargar = "O";
      options.Detalle = true;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalDescargaMaterial.html',
        controller: 'ModalDescargaMaterialCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }


    function detalleTrabajo(trabajo, x) { 

      if(vm.Clv_status=='E'){

        
      var items = {};
      vm.clv_detalle=x.Clave;
      items.contrato = vm.Contrato;
      if (x.Descripcion.toLowerCase().includes('ipaqu') ||
        x.Descripcion.toLowerCase().includes('bpaqu') ||
        x.Descripcion.toLowerCase().includes('dpaqu') ||
        x.Descripcion.toLowerCase().includes('rpaqu') ||
        x.Descripcion.toLowerCase().includes('ipaqut') ||
        x.Descripcion.toLowerCase().includes('bpaqt') ||
        x.Descripcion.toLowerCase().includes('dpaqt') ||
        x.Descripcion.toLowerCase().includes('rpaqt') ||
        x.Descripcion.toLowerCase().includes('bpaad') ||
        x.Descripcion.toLowerCase().includes('bsedi')) {
        items.clv_detalle_orden = x.Clave;
        items.clv_orden = x.Clv_Orden;
        items.descripcion = x.Descripcion.toLowerCase();
        items.servicio = vm.Clv_TipSer; 
        items.Detalle = true; 
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/procesos/bajaServicios.html',
          controller: 'BajaServiciosCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          size: 'md',
          resolve: {
            items: function () {
              return items;
            }
          }
        });
      } else if (
        x.Descripcion.toLowerCase().includes('camdo') ||
        x.Descripcion.toLowerCase().includes('cadig') ||
        x.Descripcion.toLowerCase().includes('canet')
      ) {

        ordenesFactory.consultaCambioDomicilio(vm.clv_detalle, x.Clv_Orden, vm.Contrato).then(function (data) {
          var items = {
            clv_detalle_orden: vm.clv_detalle,
            clv_orden: vm.Clv_Orden,
            contrato: vm.Contrato,
            isUpdate: (data.GetDeepCAMDOResult == null) ? false : true,
            datosCamdo: data.GetDeepCAMDOResult,
            Detalle:true
          };
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/facturacion/modalCambioDomicilio.html',
            controller: 'CambioDomicilioOrdenesCtrl',
            controllerAs: 'ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            resolve: {
              items: function () {
                return items;
              }
            }
          });
        });
      } else if (
        x.Descripcion.toLowerCase().includes('iante') ||
        x.Descripcion.toLowerCase().includes('inlnb') ||
        x.Descripcion.toLowerCase().includes('iapar') ||

        x.Descripcion.toLowerCase().includes('iantx') ||
        x.Descripcion.toLowerCase().includes('inups') ||
        x.Descripcion.toLowerCase().includes('itrip') ||
        x.Descripcion.toLowerCase().includes('iradi') ||
        x.Descripcion.toLowerCase().includes('irout') ||
        x.Descripcion.toLowerCase().includes('icabm') ||
        x.Descripcion.toLowerCase().includes('ecabl') ||
        x.Descripcion.toLowerCase().includes('econt')

      ) {

        vm.NOM = x.Descripcion.split(' ');
        var items_ = {
          'Op': 'M',
          'Trabajo': vm.NOM[0],
          'Contrato': vm.Contrato,
          'ClvTecnico': vm.Clv_Tecnico,
          'Clave': x.Clave,
          'ClvOrden': x.Clv_Orden,
          'Detalle':true
        };
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/procesos/ModalAsignaAparato.html',
          controller: 'ModalAsignaAparatoCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          size: 'md',
          resolve: {
            items: function () {
              return items_;
            }
          }
        });
      } else if (

        x.Descripcion.toLowerCase().includes('rante') ||
        x.Descripcion.toLowerCase().includes('relnb') ||
        x.Descripcion.toLowerCase().includes('rcabl') ||
        x.Descripcion.toLowerCase().includes('rcont') ||
        x.Descripcion.toLowerCase().includes('rapar') ||
        x.Descripcion.toLowerCase().includes('rantx') ||
        x.Descripcion.toLowerCase().includes('riapar') ||
        x.Descripcion.toLowerCase().includes('retca') ||
        x.Descripcion.toLowerCase().includes('rradi') ||
        x.Descripcion.toLowerCase().includes('rrout')
      ) {

        vm.TrabajoRetiro = true;

      } else if (
        x.Descripcion.toLowerCase().includes('ccabm') ||
        x.Descripcion.toLowerCase().includes('cantx')
      ) {
        vm.NOM = x.Descripcion.split(' ');
        var items_ = {
          'Op': 'M',
          'Trabajo': vm.NOM[0],
          'Contrato': vm.Contrato,
          'ClvTecnico': vm.Clv_Tecnico,
          'Clave': x.Clave,
          'ClvOrden': x.Clv_Orden,
          'Detalle':true
        };

        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/procesos/ModalAsignaAparato.html',
          controller: 'ModalCambioAparatoCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          size: 'md',
          resolve: {
            items: function () {
              return items_;
            }
          }
        });
      } else {
        console.log('este trabajo no esta implementado');
      }
      }

    }


    function MuestraAgenda() {
      var options = {};
      options.clv_queja_orden = vm.clv_orden;
      options.opcion = 1;

      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalAgendaQueja.html',
        controller: 'ModalAgendaQuejaCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'sm',
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }

    var vm = this;
    vm.titulo = 'Detalle Orden #' + $stateParams.id;
    vm.DescargaMaterialOrden = DescargaMaterialOrden;
    vm.MuestraAgenda = MuestraAgenda;
    vm.Status = [{
        'Clave': 'P',
        'Nombre': 'Pendiente'
      },
      {
        'Clave': 'V',
        'Nombre': 'Con Visita'
      },
      {
        'Clave': 'E',
        'Nombre': 'Ejecutada'
      }
    ];

    vm.TipSer = [{
        'Clave': '1',
        'Nombre': 'Es Hotel'
      },
      {
        'Clave': '2',
        'Nombre': 'Solo Internet'
      }
    ];
  });
