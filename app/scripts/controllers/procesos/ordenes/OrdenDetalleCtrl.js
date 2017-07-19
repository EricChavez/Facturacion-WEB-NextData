'use strict';
angular
  .module('softvApp')
  .controller('OrdenDetalleCtrl', function ($rootScope, ngNotify, $localStorage, $state, $stateParams,ordenesFactory) {
    this.$onInit = function () {
      vm.clv_orden=$stateParams.id;
      ordenesFactory.ConsultaOrdSer(vm.clv_orden).then(function(data){
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
                vm.Ejecuto=conceptos.UserEjecuto;
                vm.Genero=conceptos.UserGenero;

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
                }else if (vm.Clv_TipSer == '2') {
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
    var vm = this;
    vm.titulo='Detalle Orden #'+$stateParams.id;
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
        }];

        vm.TipSer = [{
            'Clave': '1',
            'Nombre': 'Es Hotel'
        },
        {
            'Clave': '2',
            'Nombre': 'Solo Internet'
        }];
  });
