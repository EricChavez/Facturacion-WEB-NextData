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
    vm.claveOrden = $stateParams.id;
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
    vm.SoyRetiro = false;
    vm.Cancelar = Cancelar;
    init(vm.claveOrden);


    function Cancelar() {
      ordenesFactory.Getsp_BorraArticulosAsignados(vm.claveOrden).then(function (data) {
        $state.go('home.procesos.ordenes');
      });


    }


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





    function DimeSitengoRetiro() {

      // 1.-si tengo retiro pero no se ha recibido ninguno
      // 2.- si tengo retiro y ya se recibio almenos un articulo
      //3.-No tengo retiro


      var recibidos = 0;
      var cuantosRetiro = 0;
      vm.trabajosTabla.forEach(function (row) {
        if (row.Descripcion.toLowerCase().includes('rante') ||
          row.Descripcion.toLowerCase().includes('relnb') ||
          row.Descripcion.toLowerCase().includes('rcabl') ||
          row.Descripcion.toLowerCase().includes('rcont') ||
          row.Descripcion.toLowerCase().includes('rapar') ||
          row.Descripcion.toLowerCase().includes('rantx') ||
          row.Descripcion.toLowerCase().includes('riapar') ||
          row.Descripcion.toLowerCase().includes('retca') ||
          row.Descripcion.toLowerCase().includes('rradi') ||
          row.Descripcion.toLowerCase().includes('rrout')) {
          cuantosRetiro = cuantosRetiro + 1;
          if (row.recibi == true) {
            recibidos = recibidos + 1;
          }
        }
      });

      if (cuantosRetiro > 0) {
        vm.SoyRetiro = true;
        return (recibidos == 0) ? 1 : 2
      } else {
        return 3;
      }

    }


    function init(orden) {



      ordenesFactory.ConsultaOrdSer(orden).then(function (data) {
        vm.clv_orden = data.GetDeepConsultaOrdSerResult.Clv_Orden;
        vm.datosOrden = data.GetDeepConsultaOrdSerResult;
        vm.contrato = data.GetDeepConsultaOrdSerResult.ContratoCom;
        vm.Clv_TipSer = data.GetDeepConsultaOrdSerResult.Clv_TipSer;

        var verificastatus = data.GetDeepConsultaOrdSerResult.STATUS;
        if (verificastatus == 'E') {
          $state.go('home.procesos.ordenes');
        }


        vm.Fec_Sol = vm.datosOrden.Fec_Sol;
        vm.observaciones = vm.datosOrden.Obs;
        ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
          vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
          vm.trabajosTabla.forEach(function (row) {
            row.recibi = false;

          });
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
      options.Detalle = false;

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

      if (vm.selectedTecnico == undefined) {
        ngNotify.set('Selecciona a un técnico.', 'warn');
        return;
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
        items.Detalle = false;
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

        ordenesFactory.consultaCambioDomicilio(x.Clave, vm.clv_orden, vm.contratoBueno).then(function (data) {
          console.log(data);
          var items = {
            clv_detalle_orden: x.Clave,
            clv_orden: vm.clv_orden,
            contrato: vm.contratoBueno,
            isUpdate: (data.GetDeepCAMDOResult == null) ? false : true,
            datosCamdo: data.GetDeepCAMDOResult,
            Detalle: true
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
          'Contrato': vm.contratoBueno,
          'ClvTecnico': vm.selectedTecnico.CLV_TECNICO,
          'Clave': x.Clave,
          'ClvOrden': x.Clv_Orden,
          'Detalle': false
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
      } else {
        console.log('este trabajo no esta implementado');
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



    function Guardar(redirect) {
      if (vm.status == 'E') {
        if (ValidaFecha(vm.Fec_Eje, vm.Fec_Sol) == false) {
          ngNotify.set('La fecha de ejecución no puede ser menor a la fecha de solicitud ni mayor a la fecha actual', 'warn');
          return;
        }
      } else if (vm.status == 'V') {
        if (vm.Visita1 != null && vm.Visita1 != undefined && (vm.Visita2 == undefined || vm.Visita2 == null)) {
          if (ValidaFecha(vm.Visita1, vm.Fec_Sol) == false) {
            ngNotify.set('La fecha de visita 1 no puede ser menor a la fecha de solicitud ni mayor a la fecha actual', 'warn');
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
      console.log(DimeSitengoRetiro());
      if (DimeSitengoRetiro() == 1) {
        ngNotify.set('Necesita recibir al menos un artículo para generar la orden ', 'warn');
        return;
      }
      if (DimeSitengoRetiro() == 2) {
        var ApaNoEntregados = [];
        vm.trabajosTabla.forEach(function (row) {
      if (row.Descripcion.toLowerCase().includes('rante') ||
          row.Descripcion.toLowerCase().includes('relnb') ||
          row.Descripcion.toLowerCase().includes('rcabl') ||
          row.Descripcion.toLowerCase().includes('rcont') ||
          row.Descripcion.toLowerCase().includes('rapar') ||
          row.Descripcion.toLowerCase().includes('rantx') ||
          row.Descripcion.toLowerCase().includes('riapar') ||
          row.Descripcion.toLowerCase().includes('retca') ||
          row.Descripcion.toLowerCase().includes('rradi') ||
          row.Descripcion.toLowerCase().includes('rrout')) {         
          if (row.recibi == false) {
            ApaNoEntregados.push(row);
          }
        }          
        });

        ordenesFactory.GetSP_InsertaTbl_NoEntregados(ApaNoEntregados).then(function (response) {
          console.log(response);
        });
      }

      EjecutaOrden(redirect);

    }




    function GuardaDetalle(redirect) {

     
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
                        ngNotify.set('La orden es de proceso automático por lo cual no se imprimió', 'warn');
                        if (redirect) {
                          $state.go('home.procesos.ordenes')
                        }
                      } else {
                        if (redirect) {
                          $state.go('home.procesos.ordenes')
                        }
                        ngNotify.set('La orden se ha ejecutado correctamente', 'success');
                      }
                    })
                  });
                });
              });
            }
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
          ModalConfirmDelete(vm.clv_orden, vm.contratoBueno);
        } else {
          ngNotify.set('No tiene permisos para eliminar la orden', 'error');
        }
      });
    }

    function ModalConfirmDelete(clv_orden, contratoBueno){
      var options = {};
      options.clv_orden = clv_orden;
      options.contratoBueno = contratoBueno;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/modalEliminarOrdSer.html',
        controller: 'modalEliminarOrdSerCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'sm',
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }

    function EjecutaOrden(redirect) {
      if (vm.status == 'P') {
        ngNotify.set('Marque la opción ejecutada o visita para continuar', 'error');
        return;
      }

      ordenesFactory.GetSP_ValidaGuardaOrdSerAparatos(vm.clv_orden, 'M', vm.status, 0, vm.selectedTecnico.CLV_TECNICO).then(function (data) {
        if (data.GetSP_ValidaGuardaOrdSerAparatosResult != '') {
          ngNotify.set(data.GetSP_ValidaGuardaOrdSerAparatosResult, 'warn');
          return;
        } else {
       ordenesFactory.GetValidaOrdSerManuales(vm.clv_orden).then(function (response) {
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

                      GuardaDetalle(redirect);
                    }
                  });
                }
              });

            }

          });
          });
        }

      });

    }

  }
})();
