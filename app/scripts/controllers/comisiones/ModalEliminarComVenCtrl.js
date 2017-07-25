'use strict';

angular
    .module('softvApp')
    .controller('ModalEliminarComVenCtrl', function($uibModalInstance, $uibModal, ngNotify, options, ComisionFactory, $state){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function Eliminar(){
            ComisionFactory.DeleteComisionesVendedoresWeb(vm.IdComision).then(function(){
                ngNotify.set('Se ha eliminado la comisión #' + vm.IdComision + ' con éxito','success');
                $state.reload('home.comisiones.vendedores');
                cancel();
            });
        }

        var vm = this;

        vm.IdComision = options.IdComision;

        vm.cancel = cancel;
        vm.Eliminar = Eliminar;
    });