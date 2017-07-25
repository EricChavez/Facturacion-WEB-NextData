'use strict';

angular
    .module('softvApp')
    .controller('ComisionVendedorCtrl', function (ComisionFactory, atencionFactory, ngNotify, $uibModal, $state) {

        function InitialData(){
            ComisionFactory.GetComisionesVendedoresWebList().then(function(data){
                vm.ComisionVLista = data.GetComisionesVendedoresWebListResult;
                if (vm.ComisionVLista.length == 0) {
				    vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
				    vm.sinRegistros = false;
					vm.conRegistros = true;
				}
            });
            atencionFactory.serviciosNuevo().then(function(data){
                vm.TipoServiciosLista = data.GetMuestraTipSerPrincipal2ListResult;
            });
        }

        function BuscarServicio(){
            ComisionFactory.GetServiciosWebList(vm.TipoServico.Clv_TipSerPrincipal).then(function(data){
                vm.ServiciosLista = data.GetServiciosWebListResult;
            });
        }

        function AgregarComisionVendedor(){
            if(vm.RangoFinal > vm.RangoInicial && vm.RangoInicial > 0 && vm.RangoFinal > 0){
                if(vm.Comision > 0){
                    ComisionFactory.AddComisionesVendedoresWeb(vm.TipoServico.Clv_TipSerPrincipal, vm.Servicio.Clv_Servicio, vm.RangoInicial, vm.RangoFinal, vm.Comision).then(function(data){
                        ngNotify.set('Se ha guardado la comisión con éxito','success');
                        $state.reload('home.comisiones.vendedores');
                    });
                }else{
                     ngNotify.set('Ingresa una comisión válida','warn'); 
                }
            }else{
               ngNotify.set('El rango inicial no puede ser mayor o igual al rango final','warn');
            }
        }

        function ConfirmarEliminar(IdComision){
            var options = {};
            options.IdComision = IdComision;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/comisiones/ModalEliminarComVen.html',
                controller: 'ModalEliminarComVenCtrl',
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

        var vm = this;

        vm.AgregarComisionVendedor = AgregarComisionVendedor;
        vm.BuscarServicio = BuscarServicio;
        vm.ConfirmarEliminar = ConfirmarEliminar;
        
        InitialData();
    });