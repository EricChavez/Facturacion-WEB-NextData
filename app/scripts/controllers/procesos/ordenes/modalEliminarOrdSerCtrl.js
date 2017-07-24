'use strict';

angular
    .module('softvApp')
    .controller('modalEliminarOrdSerCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $state, options, ordenesFactory){

        function ok(){
            ordenesFactory.AddGuardaMovSist(vm.clv_orden).then(function (data) {
                ordenesFactory.DeleteOrdSer(vm.clv_orden).then(function (data) {
                    ordenesFactory.AddMovSist(vm.contratoBueno, 'Se eliminó orden de servicio', 'FrmOrdenes', vm.clv_orden).then(function (response) {
                        $state.go('home.procesos.ordenes');
                        ngNotify.set('Se eliminó la orden de servicio #' + vm.clv_orden + ' correctamente', 'success');
                        cancel();
                    });
                });
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;

        vm.clv_orden = options.clv_orden;
        vm.contratoBueno = options.contratoBueno;

        vm.ok = ok;
        vm.cancel = cancel;
    });