'use strict';
angular
  .module('softvApp')
  .controller('QuejaDetalleCtrl', function ($state, ngNotify,DescargarMaterialFactory ,$location, $uibModal, ordenesFactory, $stateParams, atencionFactory, quejasFactory) {

    function InitalData() {
      vm.clv_queja = $stateParams.id;
      vm.contrato = $stateParams.contrato;
      vm.Servicio = $stateParams.servicio;
      quejasFactory.ValidaQueja(vm.clv_queja).then(function (data) {
        if (data.GetDeepValidaQuejaCompaniaAdicResult.Valida == 0) {
          var param = {};
          param.contrato = vm.contrato;
          param.servicio = vm.Servicio;
          param.op = 0;
          atencionFactory.buscarCliente(param).then(function (data) {

            var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
            var contrato = detalle.ContratoBueno;
            vm.GlobalContrato = contrato;
            vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
            vm.Calle = detalle.CALLE;
            vm.Numero = detalle.NUMERO;
            vm.Colonia = detalle.COLONIA;
            vm.Ciudad = detalle.CIUDAD;
            vm.Telefono = 123456;
            atencionFactory.getServiciosCliente(contrato).then(function (data) {
              vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;

              quejasFactory.ConsultaQueja($stateParams.id).then(function (data) {
                
                var detqueja = data.GetQuejasListResult[0];
                console.log(detqueja);
                vm.UsuarioGenero = detqueja.UsuarioGenero;
                vm.UsuarioEjecuto = detqueja.UsuarioEjecuto;
                vm.TecnicoAgenda = detqueja.NombreTecAge;
                vm.TurnoAgenda = detqueja.TurnoAge;
                vm.FechaAgenda = detqueja.FechaAge;
                vm.ComentarioAgenda = detqueja.ComentarioAge;
                vm.DetalleProblema = detqueja.Problema;
                vm.Observaciones = detqueja.Observaciones;
                vm.DetalleSolucion = detqueja.Solucion;
                var fsolicitud = detqueja.Fecha_Soliciutud.split(' ');
                vm.FechaSolicitud = fsolicitud[0];
                var hora = getTime(detqueja.Fecha_Soliciutud);
                vm.HoraSolicitud = hora;

                if (detqueja.Fecha_Ejecucion != null) {
                  var fejecucion = detqueja.Fecha_Ejecucion.split(' ');
                  vm.FechaEjecucion = fejecucion[0];
                  var horaEjecucion = getTime(detqueja.Fecha_Ejecucion);
                  vm.HoraEjecucion = horaEjecucion;
                }


                if (detqueja.FechaProceso != null) {
                  var fproceso = detqueja.FechaProceso.split(' ');
                  vm.FechaProceso = fproceso[0];
                  vm.HoraProceso = getTime(detqueja.FechaProceso);
                }

                if (detqueja.Visita1 != null) {
                  var fvisita1 = detqueja.Visita1.split(' ');
                  vm.Fechavisita1 = fvisita1[0];
                  vm.Horavisita1 = getTime(detqueja.Visita1);
                }

                if (detqueja.Visita2 != null) {
                  var fvisita2 = detqueja.Visita2.split(' ');
                  vm.Fechavisita2 = fvisita2[0];
                  vm.Horavisita2 = getTime(detqueja.Visita2);
                }

                if (detqueja.Visita3 != null) {
                  var fvisita3 = detqueja.Visita3.split(' ');
                  vm.Fechavisita3 = fvisita3[0];
                  vm.Horavisita3 = getTime(detqueja.Visita3);
                }

                if (detqueja.EjecucuionReal != null) {
                  var fEjecucuionReal = detqueja.EjecucuionReal.split(' ');
                  vm.FechaEjecucuionReal = fEjecucuionReal[0];
                  vm.HoraEjecucuionReal = getTime(detqueja.EjecucuionReal);
                }

                vm.Departamento = detqueja.Clasificacion;
                vm.Clv_trabajo = detqueja.Clv_Trabajo;
                vm.Clv_prioridad = detqueja.clvPrioridadQueja;
                vm.Clv_problema = detqueja.clvProblema;
                vm.ProblemaReal = detqueja.Solucion;
                vm.Visita = detqueja.Visita;
                vm.Clv_status = detqueja.Status;
                vm.Estatus = 'E';
                
               DescargarMaterialFactory.GetchecaBitacoraTecnico(vm.clv_queja,'Q').then(function(data){
                if(data.GetchecaBitacoraTecnicoResult!=null){
                  vm.idBitacora=data.GetchecaBitacoraTecnicoResult.idBitacora;
                  vm.idTecnicoBitacora=data.GetchecaBitacoraTecnicoResult.clvTecnico;
                }
                quejasFactory.ObtenTecnicos(vm.GlobalContrato).then(function (data) {
                  vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
                  if (detqueja.Clave_Tecnico != null || vm.idTecnicoBitacora>0) {
                    for (var a = 0; a < vm.Tecnicos.length; a++) {
                      if (vm.Tecnicos[a].clv_Tecnico == vm.idTecnicoBitacora || detqueja.Clave_Tecnico ==vm.Tecnicos[a].clv_Tecnico) {
                        vm.Tecnico = vm.Tecnicos[a];
                        vm.BlockTecnico=true;
                      }
                    }
                  }
                });                 
               });

                atencionFactory.MuestraTrabajos(vm.Servicio).then(function (data) {
                  vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
                  for (var a = 0; a < vm.Trabajos.length; a++) {
                    if (vm.Trabajos[a].CLV_TRABAJO == vm.Clv_trabajo) {
                      vm.Trabajo = vm.Trabajos[a];
                    }
                  }
                });

                quejasFactory.ObtenPrioridad().then(function (data) {
                  vm.Prioridades = data.GetSoftv_GetPrioridadQuejaListResult;
                  for (var a = 0; a < vm.Prioridades.length; a++) {
                    if (vm.Prioridades[a].clvPrioridadQueja == vm.Clv_prioridad) {
                      vm.Prioridad = vm.Prioridades[a];
                    }
                  }
                });
                atencionFactory.getServicios().then(function (data) {
                  vm.Servicios = data.GetMuestraTipSerPrincipalListResult;
                  for (var a = 0; a < vm.Servicios.length; a++) {
                    if (vm.Servicios[a].Clv_TipSerPrincipal == vm.Servicio) {
                      vm.Servicio = vm.Servicios[a];
                    }
                  }
                });

                ordenesFactory.serviciosCliente(vm.GlobalContrato).then(function (data) {
                  vm.servicioscli = data.GetDameSerDelCliFacListResult;
                });

                atencionFactory.GetClasificacionProblemas().then(function (data) {
                  vm.Problemas = data.GetuspConsultaTblClasificacionProblemasListResult;
                  for (var a = 0; a < vm.Problemas.length; a++) {
                    if (vm.Problemas[a].clvProblema == vm.Clv_problema) {
                      vm.Problema = vm.Problemas[a];
                    }
                  }
                });

              });
            });
          });
        } else {
          $state.go('home.procesos.reportes');
          ngNotify.set('El Reporte pertenece a un contrato de plazas adicionales al usuario, no puede ejecutarla', 'error');
        }
      });
    }

    function dateParse(date) {
      var realdate = date.split(" ")
      var strDate = realdate[0];
      var dateParts = strDate.split("/");
      var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
      if (dateParts[0].length == 1) {
        var dia = '0' + ateParts[0];
      }
    }

    function getTime(date) {
      var fejecucion = date.split(' ');
      if (fejecucion.length == 3) {
        return fejecucion[2];
      } else if (fejecucion.length == 4) {
        var hora = fejecucion[3].split(':');
        if (hora[0].length == 1) {
          return '0' + fejecucion[3];
        } else {
          return fejecucion[3];
        }

      }
    }

    function toDate(dateStr) {
      var parts = dateStr.split("/");
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    function ValidaFecha(fechaIngresada, fechasolicitud) {
      var _fechaHoy = new Date();
      var _fechaIngresada = toDate(fechaIngresada);
      var _fechasolicitud = toDate(fechasolicitud);     

      if ((_fechaIngresada > _fechasolicitud && _fechaIngresada < _fechaHoy) || _fechasolicitud.toDateString() === _fechaIngresada.toDateString()) {
      return true;
      } else {        
        return false;
      }

    }

    function MuestraAgenda() {
      var options = {};
      options.TecnicoAgenda = vm.TecnicoAgenda;
      options.TurnoAgenda = vm.TurnoAgenda;
      options.FechaAgenda = vm.FechaAgenda;
      options.ComentarioAgenda = vm.ComentarioAgenda;
      options.opcion = 2;
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
        
    function DescargaMaterial() {   

      if (vm.Tecnico== null) ngNotify.set('Seleccione un técnico para continuar','warn');
      var Tecnico={};
      Tecnico.CLV_TECNICO =vm.Tecnico.clv_Tecnico;
      Tecnico.Nombre=vm.Tecnico.Nombre;
      var options = {};
      options.Detalle = true;
      options.ClvOrden = vm.clv_queja;
      options.ClvBitacora=vm.idBitacora;
      options.SctTecnico = Tecnico;
      options.Tipo_Descargar = "Q";

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
          options: function() {
           	return options;
          }
        }
      });
    }    
    var vm = this;
   
    InitalData();
    vm.Titulo = 'Detalle Reporte';
    vm.ShowEje = false;
    vm.ShowDet = true;
    vm.BloqElemnt = true;
    vm.FEjecucion = true;
    vm.FVisita1 = true;
    vm.FVisita2 = true;
    vm.FVisita3 = true;
    vm.FProceso = true;
    vm.BlockTecnico = true;
    vm.DescargaMaterial = DescargaMaterial;
    vm.MuestraAgenda = MuestraAgenda;
    vm.Iprioridad = true;
    vm.IDetProblema = true;
    vm.IClasproblema = true;
    vm.Iprobreal = true;
    vm.Iobser = true;
    vm.IEstatus = true;
    vm.idBitacora=0;
    vm.idTecnicoBitacora=0;

  });