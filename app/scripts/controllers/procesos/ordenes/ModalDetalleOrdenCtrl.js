'use strict';

angular
  .module('softvApp')
  .controller('ModalDetalleOrdenCtrl', function ($uibModalInstance, $uibModal, options, ordenesFactory, $rootScope, ngNotify, $localStorage) {

    function InitialData() {

      ordenesFactory.ConsultaOrdSer(options.Clave_Orden).then(function (data) {
        console.log(data);
        var conceptos = data.GetDeepConsultaOrdSerResult;

        vm.Clv_Orden = conceptos.Clv_Orden;
        vm.Clv_TipSer = conceptos.Clv_TipSer;
        vm.Contrato = conceptos.Contrato;
        vm.ContratoCom = conceptos.ContratoCom;
        vm.Fec_Eje = conceptos.Fec_Eje;
        vm.Fec_Sol = conceptos.Fec_Sol;
        vm.NoBitacora = conceptos.NoBitacora;
        vm.NombreTecnico = conceptos.NombreTecnico;
        vm.Obs = conceptos.Obs;
        vm.Clv_status = conceptos.STATUS;
        vm.Visita1 = conceptos.Visita1;
        vm.Visita2 = conceptos.Visita2;
        vm.Ejecuto = conceptos.UserEjecuto;
        vm.Genero = conceptos.UserGenero;
        vm.Clv_Tecnico = conceptos.Clv_Tecnico;

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
            //console.log(vm.datosCli);
          });

          ordenesFactory.serviciosCliente(conceptos_Contrato.ContratoBueno).then(function (data) {
            vm.servicios = data.GetDameSerDelCliFacListResult;
          });

        });

      });

      ordenesFactory.consultaTablaServicios(options.Clave_Orden).then(function (data) {
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

    function buscarContrato(event) {
      if (vm.ContratoCom == null || vm.ContratoCom == '' || vm.ContratoCom == undefined) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }
      if (!vm.ContratoCom.includes('-')) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }


    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;

    vm.cancel = cancel;
    vm.Clva_Orden = options.Clave_Orden;

    vm.Status = [{
        'Clave': 'P',
        'Nombre': 'Pendiente'
      },
      {
        'Clave': 'V',
        'Nombre': 'Con visita'
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

    InitialData();
    vm.ClvTipSer = false;
    vm.DescargaMaterialOrden = DescargaMaterialOrden;
  });
