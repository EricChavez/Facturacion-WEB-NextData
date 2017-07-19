(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('BajaServiciosCtrl', BajaServiciosCtrl);
  BajaServiciosCtrl.inject = ['$uibModalInstance', 'ordenesFactory', 'items', ' $rootScope'];

  function BajaServiciosCtrl($uibModalInstance, ordenesFactory, items, $rootScope) {
    var vm = this;
    vm.cancel = cancel;
    vm.transfer = transfer;
    vm.Detalle=items.Detalle;
    vm.titulo = '';
    vm.tituloA = '';
    vm.tituloB = '';

    this.$onInit = function () {
      Actualizar_contenido();
    }

    function Actualizar_contenido() {
      var op = 0;
      if (items.descripcion.toLowerCase().includes('ipaqu') || items.descripcion.toLowerCase().includes('ipaqt')) {
        op = 1;
        vm.titulo = 'Instalación de servicios de internet';
        vm.tituloA = 'Servicios de Internet pendientes a Instalar';
        vm.tituloB = 'Instalar estos servicios de internet';
      } else if (items.descripcion.toLowerCase().includes('bpaqu') ||
        items.descripcion.toLowerCase().includes('bpaqt') ||
        items.descripcion.toLowerCase().includes('bpaad') ||
        items.descripcion.toLowerCase().includes('bsedi')) {
        vm.titulo = 'Baja de servicios de internet';
        vm.tituloA = 'Servicios de Internet Activos';
        vm.tituloB = 'Pasar a baja estos servicios de Internet';

        op = 10;
      } else if (items.descripcion.toLowerCase().includes('dpaqu') || items.descripcion.toLowerCase().includes('dpaqt')) {
        vm.titulo = 'Desconexión de servicios de Internet';
        vm.tituloA = 'Servicios de Internet activos';
        vm.tituloB = 'Suspender estos servicios de Internet';
        op = 20;
      } else if (items.descripcion.toLowerCase().includes('rpaqu') || items.descripcion.toLowerCase().includes('rpaqt')) {
        vm.titulo = 'Reconexión de servicios de internet';
        vm.tituloA = 'Servicios de Internet Suspendidos';
        vm.tituloB = 'Activar estos servicios de Internet';
        op = 21;
      } else {}  
      ordenesFactory.getCableModemsCli(items.contrato).then(function (data) {
        vm.cableModems = data.GetMUESTRACABLEMODEMSDELCLI_porOpcionResult;      
        vm.cableModems.forEach(function (item) {
          var modem = {
            contrato: item.CONTRATONET,
            orden: items.clv_orden,
            detalle: items.clv_detalle_orden,
            op: op
          };
          
          ordenesFactory.detalleCableModem(modem)
            .then(function (data) {              
              item.descripcion = data.GetMUESTRACONTNET_PorOpcionResult[0].DESCRIPCION;
              item.unicaNet = data.GetMUESTRACONTNET_PorOpcionResult[0].CLV_UNICANET;
              item.status = data.GetMUESTRACONTNET_PorOpcionResult[0].STATUS;
            });          
        });
      });
      ordenesFactory.GetMUESTRAIPAQU_porSOL(items.clv_detalle_orden, items.clv_orden).then(function (data) {
        vm.cableModems2 = data.GetMUESTRAIPAQU_porSOLResult;
        vm.cableModems2.forEach(function (item) {
          var modem = {
            contrato: item.CONTRATONET,
            orden: items.clv_orden,
            detalle: items.clv_detalle_orden,
            op: op
          };
          
          ordenesFactory.detalleCableModem(modem)
            .then(function (data) {             
              item.descripcion = data.GetMUESTRACONTNET_PorOpcionResult[0].DESCRIPCION;
              item.unicaNet = data.GetMUESTRACONTNET_PorOpcionResult[0].CLV_UNICANET;
              item.status = data.GetMUESTRACONTNET_PorOpcionResult[0].STATUS;
            });
         
        });
      });
    }


    function transfer(element, action) {
     
      var AddIPAQ = false;
      var AddIPAQUD = false;
      if (items.descripcion.toLowerCase().includes('ipaqu') ||
        items.descripcion.toLowerCase().includes('bpaqu') ||
        items.descripcion.toLowerCase().includes('dpaqu') ||
        items.descripcion.toLowerCase().includes('rpaqu') ||
        items.descripcion.toLowerCase().includes('ipaqut') ||
        items.descripcion.toLowerCase().includes('bpaqt') ||
        items.descripcion.toLowerCase().includes('dpaqt') ||
        items.descripcion.toLowerCase().includes('rpaqt') ||
        items.descripcion.toLowerCase().includes('bpaad')) {
        AddIPAQ = true;
      } else {
        AddIPAQUD = true;
      }

      if (items.descripcion.toLowerCase().includes('ipaqu') ||
        items.descripcion.toLowerCase().includes('ipaqut') ||
        items.descripcion.toLowerCase().includes('ipaqud')) {
        vm.status = 'I';
      } else if (items.descripcion.toLowerCase().includes('bpaqu') ||
        items.descripcion.toLowerCase().includes('bpaqt') ||
        items.descripcion.toLowerCase().includes('bpaad') ||
        items.descripcion.toLowerCase().includes('bpaqd')
      ) {
        vm.status = 'B';
      } else if (items.descripcion.toLowerCase().includes('dpaqu') ||
        items.descripcion.toLowerCase().includes('dpaqt') ||
        items.descripcion.toLowerCase().includes('dpaqd')
      ) {
        vm.status = 'S';
      } else if (items.descripcion.toLowerCase().includes('rpaqu') ||
        items.descripcion.toLowerCase().includes('rpaqt') ||
        items.descripcion.toLowerCase().includes('rpaqd')
      ) {
        vm.status = 'I';
      }

      var objaddIpaqu = {
        'objIPAQU': {
          'Clave': items.clv_detalle_orden,
          'Clv_Orden': items.clv_orden,
          'Contratonet': element.CONTRATONET,
          'Clv_UnicaNet': element.unicaNet,
          'Op': 0,
          'Status': vm.status
        }
      }
     

      var objaddIpaqud = {
        'Clave': items.clv_detalle_orden,
        'Clv_Orden': items.clv_orden,
        'Contratonet': element.CONTRATONET,
        'Clv_UnicaNet': element.unicaNet,
        'Op': 0,
        'Status': vm.status
      }


      var Motcan = {
        'Clv_Orden': items.clv_orden,
        'Clv_TipSer': items.servicio.clv_tipser,
        'ContratoNet': element.CONTRATONET,
        'Clv_UnicaNet': element.unicaNet,
        'Op': 0
      };


      var ObjdelIPAQ = {
        'Clave': items.clv_detalle_orden,
        'Clv_Orden': items.clv_orden,
        'Contratonet': element.CONTRATONET,
        'Clv_UnicaNet': element.unicaNet,
        'Op': 0
      };


      if (AddIPAQ == true) {
        
        if (action == 'ADD') {

          ordenesFactory.addIpaqu(objaddIpaqu).then(function (data) {            
            if (vm.status == 'B') {
              ordenesFactory.guardaMotivoCancelacion(Motcan).then(function (data) {               
              });
            }
            Actualizar_contenido();
          });

        } else {


          ordenesFactory.DeleteIPAQU(ObjdelIPAQ).then(function (data) {          
            ordenesFactory.GetBorraMotivoCanServ2(Motcan).then(function (result) {              
              Actualizar_contenido();
            });
          });

        }

      }

      if (AddIPAQUD == true) {
        
        if (action == 'ADD') {
          ordenesFactory.AddIPAQUD(objaddIpaqud).then(function (data) {
            if (vm.status == 'B') {
              ordenesFactory.guardaMotivoCancelacion(Motcan).then(function () {

              });
            }
          });
        } else {
          ordenesFactory.DeleteIPAQUD(ObjdelIPAQ).then(function (data) {            
            ordenesFactory.GetBorraMotivoCanServ2(Motcan).then(function (result) {            
            });
          });
        }
      }
    }
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
