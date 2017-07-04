(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ordenEjecutadaCtrl', ordenEjecutadaCtrl);

  ordenEjecutadaCtrl.inject = ['$state', 'ngNotify', '$stateParams', '$uibModal', 'DescargarMaterialFactory', 'ordenesFactory', '$rootScope', '$filter'];

  function ordenEjecutadaCtrl($state, ngNotify, $stateParams, $uibModal, ordenesFactory, $rootScope, $filter, DescargarMaterialFactory) {
    var vm = this;
    vm.showDatosCliente = true;
    vm.buscarContrato = buscarContrato;
    vm.fechaEjecucion = new Date();
    vm.observaciones = '';
    vm.detalleTrabajo = detalleTrabajo;
    vm.Guardar = Guardar;
    vm.clv_tecnico = 0;
    vm.titulo = 'Ejecución de Orden'
    vm.claveOrden = $stateParams.claveOr;
    vm.block = true;
    vm.blockSolicitud = true;
    vm.MuestraAgenda = MuestraAgenda;
    vm.blockVista1 = true;
    vm.blockVista2 = true;
    vm.blockEjecucionReal = true;
    vm.blockEjecutada = false;
    vm.blockPendiente = true;
    vm.blockVista = false;
    vm.blockTecnico = false;
    vm.fechas = fechas;
    vm.ValidarDescargaMaterialOrden = ValidarDescargaMaterialOrden;
    vm.soyEjecucion = true;
    vm.Eliminar = Eliminar;
    vm.idBitacora = 0;
    vm.idTecnicoBitacora = 0;
    init(vm.claveOrden);


    function Bloqueo() {
      if (vm.status == 'E') {
        vm.blockEjecucion = false;
        vm.blockVista1 = true;
        vm.blockVista2 = true;

      } else if (vm.status == 'V') {

        vm.blockEjecucion = true;

        if (vm.Visita1 == null) {
          vm.blockVista1 = false;
          vm.blockVista2 = true;
        } else {
          vm.blockVista1 = true;
          vm.blockVista2 = false;
        }

      }


    }


    function init(orden) {
      ordenesFactory.ConsultaOrdSer(orden).then(function (data) {

        vm.datosOrden = data.GetDeepConsultaOrdSerResult;

        vm.clv_orden = data.GetDeepConsultaOrdSerResult.Clv_Orden;
        vm.contrato = data.GetDeepConsultaOrdSerResult.ContratoCom;
        //vm.status = data.GetDeepConsultaOrdSerResult.STATUS;
        vm.Clv_TipSer = data.GetDeepConsultaOrdSerResult.Clv_TipSer;
        vm.Fec_Sol = vm.datosOrden.Fec_Sol;
        vm.observaciones = vm.datosOrden.Obs;
        ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
          vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
        });
        buscarContrato(vm.contrato);
        vm.status = 'E'
        FechasOrden();
        Bloqueo();
        DescargarMaterialFactory.GetchecaBitacoraTecnico(vm.clv_orden, 'O').then(function (data) {
          if (data.GetchecaBitacoraTecnicoResult != null) {
            vm.idBitacora = data.GetchecaBitacoraTecnicoResult.idBitacora;
            vm.idTecnicoBitacora = data.GetchecaBitacoraTecnicoResult.clvTecnico;
          }
          ordenesFactory.MuestraRelOrdenesTecnicos(orden).then(function (data) {
            vm.tecnico = data.GetMuestraRelOrdenesTecnicosListResult;
            if (vm.idTecnicoBitacora > 0) {
              for (var a = 0; a < vm.tecnico.length; a++) {
                if (vm.tecnico[a].CLV_TECNICO == vm.idTecnicoBitacora) {
                  vm.selectedTecnico = vm.tecnico[a];
                  vm.blockTecnico = true;
                }
              }
            }
          });
        });

      });



    }




    function ValidarDescargaMaterialOrden() {
      if (vm.selectedTecnico != undefined) {
        DescargaMaterialOrden();
      } else {
        ngNotify.set('Selecciona un técnico y/o Ingresa una fecha de ejecución.', 'error');
      }
    }

    function DescargaMaterialOrden() {
      var options = {};
      options.ClvOrden = vm.clv_orden;
      options.SctTecnico = vm.selectedTecnico;
      options.Tipo_Descargar = "O";

      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
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

    function buscarContrato(event) {
      if (vm.contrato == null || vm.contrato == '' || vm.contrato == undefined) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }
      if (!vm.contrato.includes('-')) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }

      ordenesFactory.getContratoReal(vm.contrato).then(function (data) {
        vm.contratoBueno = data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno;
        datosContrato(data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno);
      });
    }

    $rootScope.$on('cliente_select', function (e, contrato) {
      vm.contrato = contrato.CONTRATO;
      vm.contratoBueno = contrato.ContratoBueno;
      datosContrato(contrato.ContratoBueno);
    });


    $rootScope.$on('detalle_orden', function (e, detalle) {
      vm.clv_detalle = detalle;
    });

    $rootScope.$on('actualiza_tablaServicios', function () {
      actualizarTablaServicios();
    });

    function actualizarTablaServicios() {
      ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
        vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
      });
    }

    function datosContrato(contrato) {
      ordenesFactory.serviciosCliente(contrato).then(function (data) {
        vm.servicios = data.GetDameSerDelCliFacListResult;
      });
      ordenesFactory.buscarCliPorContrato(contrato).then(function (data) {
        vm.datosCli = data.GetDeepBUSCLIPORCONTRATO_OrdSerResult;
      });
    }

    function detalleTrabajo(trabajo, x) {

      if (trabajo != null) {
        if (vm.selectedTecnico == undefined) {
          ngNotify.set('Selecciona un técnico.', 'warn');
        }
        var items = {};
        items.contrato = vm.contratoBueno;
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

          ordenesFactory.consultaCambioDomicilio(vm.clv_detalle, vm.clv_orden, vm.contratoBueno).then(function (data) {
            var items = {
              clv_detalle_orden: vm.clv_detalle,
              clv_orden: vm.clv_orden,
              contrato: vm.contratoBueno,
              isUpdate: (data.GetDeepCAMDOResult == null) ? false : true,
              datosCamdo: data.GetDeepCAMDOResult
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
          x.Descripcion.toLowerCase().includes('riapar') ||
          x.Descripcion.toLowerCase().includes('iantx') ||
          x.Descripcion.toLowerCase().includes('iradi') ||
          x.Descripcion.toLowerCase().includes('irout') ||
          x.Descripcion.toLowerCase().includes('icabm') ||
          x.Descripcion.toLowerCase().includes('ecabl') ||
          x.Descripcion.toLowerCase().includes('econt') ||
          x.Descripcion.toLowerCase().includes('rante') ||
          x.Descripcion.toLowerCase().includes('relnb') ||
          x.Descripcion.toLowerCase().includes('rcabl') ||
          x.Descripcion.toLowerCase().includes('rcont') ||
          x.Descripcion.toLowerCase().includes('rapar') ||
          x.Descripcion.toLowerCase().includes('rantx') ||
          x.Descripcion.toLowerCase().includes('retca') ||
          x.Descripcion.toLowerCase().includes('rradi') ||
          x.Descripcion.toLowerCase().includes('rrout')
        ) {
          vm.NOM = x.Descripcion.split(' ');
          var items_ = {
            'Op': 'M',
            'Trabajo': vm.NOM[0],
            'Contrato': vm.contratoBueno,
            'ClvTecnico': vm.selectedTecnico.CLV_TECNICO,
            'Clave': x.Clave,
            'ClvOrden': x.Clv_Orden
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
          x.Descripcion.toLowerCase().includes('ccabm') ||
          x.Descripcion.toLowerCase().includes('cantx')
        ) {
          vm.NOM = x.Descripcion.split(' ');
          var items_ = {
            'Op': 'M',
            'Trabajo': vm.NOM[0],
            'Contrato': vm.contratoBueno,
            'ClvTecnico': vm.selectedTecnico.CLV_TECNICO,
            'Clave': x.Clave,
            'ClvOrden': x.Clv_Orden
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
        }
      }
    }

    function fechas() {
      FechasOrden();
      Bloqueo();
    }

    function toDate(dateStr) {
      var parts = dateStr.split("/");
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }


    function ValidaFecha(fechaIngresada, fechasolicitud) {

      var _fechaHoy = new Date();
      var _fechaIngresada = toDate(fechaIngresada);
      var _fechasolicitud = toDate(fechasolicitud);
      if ((_fechaIngresada > _fechasolicitud && _fechaIngresada < _fechaHoy) ||
        _fechasolicitud.toDateString() === _fechaIngresada.toDateString()) {
        return true;
      } else {
        return false;
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

    function FechasOrden() {

      vm.Fec_Eje = (vm.datosOrden.Fec_Eje == '' || vm.datosOrden.Fec_Eje === '01/01/1900') ? '' : vm.datosOrden.Fec_Eje;
      vm.Visita1 = (vm.datosOrden.Visita1 == '' || vm.datosOrden.Visita1 === '01/01/1900') ? '' : vm.datosOrden.Visita1;
      vm.Visita2 = (vm.datosOrden.Visita2 == '' || vm.datosOrden.Visita2 === '01/01/1900') ? '' : vm.datosOrden.Visita2;
    }


    function Guardar() {
      if (vm.status == 'E') {
        if (ValidaFecha(vm.Fec_Eje, vm.Fec_Sol) == false) {
          ngNotify.set('La fecha de ejecución no puede ser menor a la fecha de solicitud ni mayor a la fecha actual', 'warn');
          return;
        }
      } else if (vm.status == 'V') {
        if (vm.Visita1 != null && vm.Visita1 != undefined && (vm.Visita2 == undefined || vm.Visita2 == null)) {
          if (ValidaFecha(vm.Visita1, vm.Fec_Sol) == false) {
            ngNotify.set('La fecha de visita1 no puede ser menor a la fecha de solicitud ni mayor a la fecha actual', 'warn');
            return;
          }
          if (vm.Visita1 != null && vm.Visita1 != undefined && (vm.Visita2 != undefined || vm.Visita2 != null)) {
            if (ValidaFecha(vm.Visita2, vm.Fec_Sol) == false) {
              ngNotify.set('La fecha de visita 2 no puede ser menor a la fecha de solicitud ni mayor a la fecha actual', 'warn');
              return;
            }
          }
        }
      }
      EjecutaOrden();
    }




    function GuardaDetalle() {

      ordenesFactory.GetValidaOrdSerManuales(vm.clv_orden).then(function (response) {
        ordenesFactory.AddNueRelOrdenUsuario(vm.clv_orden).then(function (data) {
          var obj = {
            'ClvOrden': vm.clv_orden,
            'ClvTipSer': vm.Clv_TipSer,
            'Contrato': vm.contratoBueno,
            'FecSol': vm.Fec_Sol,
            'FecEje': (vm.Fec_Eje == null || vm.Fec_Eje == undefined) ? '' : vm.Fec_Eje,
            'Visita1': (vm.Visita1 == null || vm.Visita1 == undefined) ? '' : vm.Visita1,
            'Visita2': (vm.Visita2 == null || vm.Visita2 == undefined) ? '' : vm.Visita2,
            'Status': vm.status,
            'ClvTecnico': vm.selectedTecnico.CLV_TECNICO,
            'Impresa': 1,
            'ClvFactura': 0,
            'Obs': vm.observaciones,
            'ListadeArticulos': ''
          };
          ordenesFactory.MODORDSER(obj).then(function (response) {
            if (response.GetDeepMODORDSERResult.Msj != null) {
              ngNotify.set(response.GetDeepMODORDSERResult.Msj, 'error');
            } else {

              ordenesFactory.PreejecutaOrden(vm.clv_orden).then(function (details) {
                ordenesFactory.GetDeepSP_GuardaOrdSerAparatos(vm.clv_orden).then(function (result) {
                  var descripcion = 'Se generó la';
                  ordenesFactory.AddSP_LLena_Bitacora_Ordenes(descripcion, vm.clv_orden).then(function (data) {
                    ordenesFactory.Imprime_Orden(vm.clv_orden).then(function (data) {
                      if (data.GetDeepImprime_OrdenResult.Imprime == 1) {
                        ngNotify.set('La orden es de proceso automático por lo cual no se imprimió', 'error');
                      } else {
                        $state.go('home.procesos.ordenes')
                        ngNotify.set('La orden se ha ejecutado correctamente', 'success');
                      }
                    })
                  });
                });
              });
            }
          });
        });
      });
    }

    function ImprimeOrden(clv_orden) {

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/modalReporteOrdSer.html',
        controller: 'modalReporteOrdeSerCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'lg',
        resolve: {
          clv_orden: function () {
            return clv_orden;
          }
        }
      });
    }


    function Eliminar() {


      ordenesFactory.Getsp_validaEliminarOrden().then(function (data) {
        if (data.Getsp_validaEliminarOrdenserResult.Activo == 1) {

          ordenesFactory.AddGuardaMovSist(vm.clv_orden).then(function (data) {
            ordenesFactory.DeleteOrdSer(vm.clv_orden).then(function (data) {

              ordenesFactory.AddMovSist(vm.contratoBueno, 'Se eliminó orden de servicio', 'FrmOrdenes', vm.clv_orden).then(function (response) {
                $state.go('home.procesos.ordenes');
                ngNotify.set('La orden se elimino correctamente', 'success');
              });

            });


          });

        } else {
          ngNotify.set('No tiene permisos para eliminar la orden', 'error');
        }

      });


    }





    function EjecutaOrden() {
      if (vm.status == 'P') {
        ngNotify.set('Marque la opcion ejecutada o visita   para continuar', 'error');
        return;
      }

      ordenesFactory.GetSP_ValidaGuardaOrdSerAparatos(vm.clv_orden, 'M', vm.status, 0, vm.selectedTecnico.CLV_TECNICO).then(function (data) {
        if (data.GetSP_ValidaGuardaOrdSerAparatosResult != '') {
          ngNotify.set(data.GetSP_ValidaGuardaOrdSerAparatosResult, 'warn');
          return;
        } else {

          ordenesFactory.GetValida_DetOrden(vm.clv_orden).then(function (response) {

            if (response.GetValida_DetOrdenResult.Validacion == 0) {
              ngNotify.set('Se requiere tener datos en el detalle de la orden', 'error');
              return;
            } else {

              ordenesFactory.GetCheca_si_tiene_camdo(vm.clv_orden).then(function (camdo) {
                if (camdo.GetCheca_si_tiene_camdoResult.Error > 0) {
                  ngNotify.set('Se requiere que capture el nuevo domicilio', 'error');
                } else {
                  ordenesFactory.GetChecaMotivoCanServ(vm.clv_orden).then(function (result) {
                    if (result.GetChecaMotivoCanServResult.Res == 1) {
                      var ClvOrden = vm.clv_orden;
                      var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/procesos/modalMotivoCancelacion.html',
                        controller: 'modalMotivoCanCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        class: 'modal-backdrop fade',
                        size: 'md',
                        resolve: {
                          ClvOrden: function () {
                            return ClvOrden;
                          }
                        }
                      });
                    } else {
                      GuardaDetalle();
                    }
                  });
                }
              });

            }


          });
        }

      });

    }

  }
})();
