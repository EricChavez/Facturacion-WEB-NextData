'use strict';
angular
  .module('softvApp')
  .controller('ModalAgendaCtrl', function ($uibModalInstance, $uibModal, options, quejasFactory, atencionFactory, $rootScope, ngNotify, $localStorage, $state) {

    function initialData() {
      atencionFactory.MuestraTecnicosAlmacen(options.Contrato).then(function (data) {
        vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
        atencionFactory.ConsultaTurnos().then(function (data) {
          vm.Turnos = data.GetspConsultaTurnosListResult;
        });
      });

    }

    function toDate(dateStr) {
      var parts = dateStr.split("/");
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    function ok() {
      var _fechaHoy = new Date();
      var d = _fechaHoy.getDate();
      var m = 1 + _fechaHoy.getMonth();
      var y = _fechaHoy.getFullYear();
      var fechaHoy = new Date(m + "/" + d + "/" + y);
      var fechaIngresada = vm.FechaAgenda;

      if (vm.TecnicoAgenda == null || vm.TecnicoAgenda == undefined) {
        ngNotify.set('Selecciona un técnico para continuar', 'error');
        return;
      }
      if (vm.TurnoAgenda == null || vm.TurnoAgenda == undefined) {
        ngNotify.set('Selecciona un turno para continuar', 'error');
        return;
      }
      if (vm.FechaAgenda == null || vm.FechaAgenda == undefined) {
        ngNotify.set('Selecciona una fecha para continuar', 'error');
        return;
      }
      if (fechaIngresada < fechaHoy) {
        ngNotify.set('La fecha que selecciono no debe ser menor a la fecha actual', 'error');
        return;
      }

      var parametrosQUEJA = {
        'Clv_TipSer': options.CLV_TIPSER,
        'Contrato': options.Contrato,
        'Problema': options.Descripcion,
        'Solucion': options.Solucion,
        'Clv_Trabajo': options.Clv_Trabajo,
        'clvPrioridadQueja': options.clvPrioridadQueja,
        'Usuario': $localStorage.currentUser.usuario,
        'IdUsuario': $localStorage.currentUser.idUsuario,
        'Clv_Tecnico': vm.TecnicoAgenda.clv_Tecnico,
        'Turno': vm.TurnoAgenda.ID,
        'COMENTARIO': vm.ComentarioAgenda,
        'clv_llamada': options.clv_llamada,
        'clvProblema': options.clvProblema
      };
      if (options.clv_queja == 0) {
        atencionFactory.AgregaQueja(parametrosQUEJA).then(function (data) {
          vm.clv_queja = data.AddQuejasResult;

          var parametrosLlamada = {
            'clv_llamada': options.clv_llamada,
            'Descripcion': options.Descripcion,
            'Solucion': options.Solucion,
            'Clv_trabajo': options.Clv_Trabajo,
            'clv_queja': vm.clv_queja,
            'CLV_TIPSER': options.CLV_TIPSER,
            'Turno': vm.TurnoAgenda.ID,
            'ClvProblema': options.clvProblema
          };
          atencionFactory.ActualizaLlamada(parametrosLlamada).then(function (data) {

            var Parametrosrel = {
              'clvLlamada': options.clv_llamada,
              'clvQueja': vm.clv_queja,
              'clvProblema': options.clvProblema,
              'opAccion': 2
            };


            $uibModalInstance.dismiss('cancel');
            ngNotify.set('El # de reportes es el: ' + vm.clv_queja + ' y el número de atención telefónica es: ' + options.clv_llamada, {
              position: 'bottom',
              sticky: true
            });
            $state.go('home.procesos.atencion');

          });

        });
      } else {
        ngNotify.set('No se puede realizar una queja, ya que La llamada ya presenta una queja.', 'error');
        singleQueja(options.clv_queja);
      }
    }

    function singleQueja(clave) {
      vm.animationsEnabled = true;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/facturacion/modalSingleQueja.html',
        controller: 'ModalSingleQuejaCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        windowClass: 'app-modal-window',
        resolve: {
          clave: function () {
            return clave;
          }
        }
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    initialData();
  });
/*var iduser = $localStorage.currentUser.idUsuario;
              if (iduser == 53) {
                atencionFactory.ActualizaLlamada(parametrosLlamada).then(function (data) {
                  ngNotify.set('El # de reportes es el: ' + vm.clv_queja + ' y el número de atención telefónica es: ' + options.clv_llamada);
                  $state.go('home.procesos.atencion');
                });
              }*/
