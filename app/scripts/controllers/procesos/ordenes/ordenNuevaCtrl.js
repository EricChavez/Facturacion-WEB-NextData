(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('OrdenNuevaCtrl', OrdenNuevaCtrl);

  OrdenNuevaCtrl.inject = ['$state', 'ngNotify', '$stateParams', '$uibModal', 'ordenesFactory', '$rootScope', '$filter'];

  function OrdenNuevaCtrl($state, ngNotify, $stateParams, $uibModal, ordenesFactory, $rootScope, $filter) {
    var vm = this;
    vm.showDatosCliente = true;
    vm.agregar = agregar;
    vm.buscarContrato = buscarContrato;
    vm.buscarCliente = buscarCliente;
    vm.status = 'P';
    vm.fecha = new Date();
    vm.titulo = 'Nueva Orden de servicio';
    vm.observaciones = '';
    vm.detalleTrabajo = detalleTrabajo;
    vm.clv_orden = 0;
    vm.clv_tecnico = 0;
    vm.Guardar = Guardar;
    vm.blockTecnico = true;
    vm.blockPendiente = true;
    vm.blockEjecutada = true;
    vm.blockVista = true;
    vm.blockSolicitud = true;
    vm.blockEjecucion = true;
    vm.blockVista1 = true;
    vm.blockVista2 = true;
    vm.blockEjecucionReal = true;
    vm.soyEjecucion = false;
    vm.EliminaQueja = EliminaQueja;
    vm.Cancelar = Cancelar;
    vm.Fec_Sol = $filter('date')(vm.fecha, 'dd/MM/yyyy');

    function Cancelar() {
      $state.go('home.procesos.ordenes');
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

    $rootScope.$on('ChecaMotivoCancelacion', function () {
      GuardaDetalle(true);
    });



    function GuardaDetalle(redirect) {

      ordenesFactory.GetValidaOrdSerManuales(vm.clv_orden).then(function (response) {
        ordenesFactory.AddNueRelOrdenUsuario(vm.clv_orden).then(function (data) {

          var fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
          var obj = {
            'ClvOrden': vm.clv_orden,
            'ClvTipSer': vm.clv_servicio_cliente,
            'Contrato': vm.contratoBueno,
            'FecSol': fecha,
            'FecEje': '',
            'Visita1': '',
            'Visita2': '',
            'Status': 'P',
            'ClvTecnico': 0,
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
                        if(redirect==true){
                         $state.go('home.procesos.ordenes');
                        }
                        
                      } else {
                        $state.go('home.procesos.ordenes');
                        ngNotify.set('Se ha guardado la orden de servicio con éxito');
                        ImprimeOrden(vm.clv_orden);
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


    function EliminaQueja(object) {
      ordenesFactory.DeleteDetOrdSer(object.Clave).then(function (data) {
        actualizarTablaServicios();
        ngNotify.set('Se ha eliminado el servicio correctamente', 'success');
      });
    }




    function Guardar(redirect) {
      // ngNotify.set('No hay conceptos en el detalle de la orden', 'error')
      ordenesFactory.GetDime_Que_servicio_Tiene_cliente(vm.contratoBueno).then(function (response) {
        vm.clv_servicio_cliente = response.GetDime_Que_servicio_Tiene_clienteResult.clv_tipser;
        ordenesFactory.GetuspContratoServList(vm.contratoBueno, vm.clv_servicio_cliente).then(function (data) {
          if (data.GetuspContratoServListResult[0].Pasa == true) {
            var fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
            ordenesFactory.GetValida_DetOrden(vm.clv_orden).then(function (response) {
              if (response.GetValida_DetOrdenResult.Validacion == 0) {
                ngNotify.set('Se requiere tener datos en el detalle de la orden', 'error');
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

                    /*ordenesFactory.AddCambia_Tipo_cablemodem(vm.clv_orden).then(function(result){
                        
                    });*/

                  }
                });
              }

            });


          } else {
            ngNotify.set('El cliente no tiene contratado el servicio, seleccione otro tipo por favor', 'error');
          }

        });
      });


    }



    function agregar() {
      if (vm.contratoBueno == undefined || vm.contratoBueno == '') {
        ngNotify.set('Seleccione un cliente válido.', 'error')
      } else {
        ordenesFactory.GetDime_Que_servicio_Tiene_cliente(vm.contratoBueno).then(function (data) {

          if (data.GetDime_Que_servicio_Tiene_clienteResult == null) {
            ngNotify.set('El cliente no tiene servicios activos para generarle ordenes de servicio', 'warn');
            return;
          }
          var fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
          var orden = {
            contrato: vm.contratoBueno,
            fecha: fecha,
            observaciones: vm.observaciones
          };

          if (vm.clv_orden == 0) {
            ordenesFactory.addOrdenServicio(orden).then(function (data) {
              vm.clv_orden = data.AddOrdSerResult;
              var items = {
                contrato: vm.contratoBueno,
                clv_orden: vm.clv_orden,
                clv_tecnico: vm.clv_tecnico
              };
              var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/procesos/ModalAgregarServicio.html',
                controller: 'ModalAgregarServicioCtrl',
                controllerAs: '$ctrl',
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
          } else {

            var items = {
              contrato: vm.contratoBueno,
              clv_orden: vm.clv_orden,
              clv_tecnico: vm.clv_tecnico
            };


            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/procesos/ModalAgregarServicio.html',
              controller: 'ModalAgregarServicioCtrl',
              controllerAs: '$ctrl',
              backdrop: 'static',
              keyboard: false,
              size: 'md',
              resolve: {
                items: function () {
                  return items;
                }
              }
            });
          }
        });
      }
    }


    function PreguntaAtencion(opcion) {
      var detalle = {};
      detalle.Modulo = 'Ordenes';
      detalle.Clv = vm.clv_orden;
      detalle.Op = opcion;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalPreguntaAtencion.html',
        controller: 'ModalPreguntaAtencionCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'md',
        resolve: {
          detalle: function () {
            return detalle;;
          }
        }
      });
    }


    $rootScope.$on('verDetalle', function () {
      ordenesFactory.Getsp_BorraArticulosAsignados(vm.claveOrden).then(function (data) {
        detalleContrato();
        vm.clv_orden = 0;
        vm.servicios = '';
        vm.datosCli = '';
        vm.trabajosTabla = [];
      });

    });


    $rootScope.$on('verContratos', function () {
      ordenesFactory.Getsp_BorraArticulosAsignados(vm.claveOrden).then(function (data) {
        ModalClientes();
        vm.clv_orden = 0;
        vm.servicios = '';
        vm.datosCli = '';
        vm.trabajosTabla = [];
      });

    });

    $rootScope.$on('generarOrden', function () {
      Guardar(false);

    });

    function detalleContrato() {
      if (vm.contrato == null || vm.contrato == '' || vm.contrato == undefined) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }
      if (!vm.contrato.includes('-')) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }

      ordenesFactory.getContratoReal(vm.contrato).then(function (data) {
        if (data.GetuspBuscaContratoSeparado2ListResult.length > 0) {
          vm.contratoBueno = data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno;
          datosContrato(data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno);
        } else {
          vm.servicios = '';
          vm.datosCli = '';
          new PNotify({
            title: 'Sin Resultados',
            type: 'error',
            text: 'No se encontro resultados con ese contrato.',
            hide: true
          });
          vm.contratoBueno = '';
          vm.clv_orden = '';
        }
      });
    }


    function buscarContrato(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (vm.clv_orden == 0) {
          detalleContrato();
        } else {
          PreguntaAtencion(1);
        }
      }
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
        console.log(vm.datosCli);
      });
    }


    function ModalClientes() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/buscarCliente.html',
        controller: 'BuscarNuevoCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'lg'
      });
    }

    function buscarCliente() {

      if (vm.clv_orden > 0) {
        PreguntaAtencion(2);
      } else {
        ModalClientes();
      }
    }

    function detalleTrabajo(trabajo, x) {
      ordenesFactory.GetDime_Que_servicio_Tiene_cliente(vm.contratoBueno).then(function (response) {
        var items = {};
        items.contrato = vm.contratoBueno;
        vm.clv_servicio_cliente = response.GetDime_Que_servicio_Tiene_clienteResult.clv_tipser;
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
          items.servicio = vm.clv_servicio_cliente;
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

          ordenesFactory.consultaCambioDomicilio(vm.clv_detalle, vm.clv_orden, vm.contratoBueno).then(function (data) {

            var items = {
              clv_detalle_orden: vm.clv_detalle,
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
            'Op': 'N',
            'Trabajo': vm.NOM[0],
            'Contrato': vm.contratoBueno,
            'ClvTecnico': 0,
            'Clave': vm.Clave,
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
        }
      });
    }
  }
})();
