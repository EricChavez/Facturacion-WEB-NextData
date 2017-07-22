(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('OrdenesServicioCtrl', OrdenesServicioCtrl);

  OrdenesServicioCtrl.inject = ['$state', 'ngNotify', '$location', 'ordenesFactory', '$uibModal'];

  function OrdenesServicioCtrl($state, ngNotify, $location, ordenesFactory, $uibModal) {
    var vm = this;
    vm.showdatosPlaza = false;
    vm.cambioPlaza = cambioPlaza;
    vm.cambioReporte = cambioReporte;
    vm.buscarOrden = buscarOrden;
    vm.status = 0;
    vm.sinRegistros = false;
    vm.conRegistros = true;
    vm.buscarNombres = buscarNombres;
    vm.buscarColonia = buscarColonia;
    vm.buscarSetup = buscarSetup;
    vm.buscarStatus = buscarStatus;
    vm.DetalleOrden = DetalleOrden;
    vm.ejecuta = ejecuta;


    function ejecuta(Clv_Orden) {

      ordenesFactory.GetValidarNuevo(Clv_Orden).then(function (response) {
        if (response.GetValidarNuevoResult.Valor == 1) {
          ngNotify.set('La orden no se puede ejecutar de forma manual ya que este tipo de orden de servicio al cliente se procesa de forma automática');
        } else {
          $state.go('home.procesos.ordenEjecutada', {
            'id': Clv_Orden
          })
        }

      });

    }

    this.$onInit = function () {
      ordenesFactory.getPlazas().then(function (data) {
        data.GetMuestra_Compania_RelUsuarioListResult.unshift({
          'razon_social': '----------------',
          'id_compania': 0
        });
        vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
        vm.selectedPlaza = vm.plazas[1];
      });
      ordenesFactory.getUsuarios().then(function (data) {
        vm.usuarios = data.GetMUESTRAUSUARIOSListResult;
        vm.selectedUsuario = vm.usuarios[0];

      });
      var obj = {
        op: 6,
        orden: 0,
        contrato: '',
        nombre: '',
        paterno: '',
        materno: '',
        calle: '',
        numero: '',
        colonia: 0,
        compania: 0,
        setupbox: '',
        status: '',
        auto: 0
      };
      ordenesFactory.buscarOrdenes(obj).then(function (data) {
        vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
      });
    }

    function DetalleOrden(obj) {
      AbrirOrden(obj.Clv_Orden);
    }

    function AbrirOrden(Clave_Orden) {
      var options = {};
      options.Clave_Orden = Clave_Orden;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalDetalleOrden.html',
        controller: 'ModalDetalleOrdenCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: true,
        size: 'lg',
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }

    function cambioPlaza() {
      if (vm.selectedPlaza.id_compania > 0) {
        ordenesFactory.getColonias(vm.selectedPlaza.id_compania).then(function (data) {
          vm.colonias = data.GetuspConsultaColoniasListResult;
          vm.selectedColonia = vm.colonias[0];
        });
      }
    }

    function cambioReporte(x) {
      if (x == 1) {
        vm.contrato = 0;
        vm.op = 33;
      } else {
        vm.orden = 0;
        vm.op = 30;
      }
    }

    function buscarOrden() {

      if (vm.auto == undefined || vm.auto == 0) {
        vm.auto = 0;
      } else {
        vm.auto = 1;
        vm.auto = true;
      }
      if (vm.contrato == '' && vm.orden == '') {
        ngNotify.set('Introduce un número de contrato ó un número de orden.', 'warn');
      } else if (!(/^\d{1,9}-\d{1,9}$/.test(vm.contrato)) && vm.contrato != undefined && vm.contrato != '') {
        ngNotify.set('El número de contrato está formado por 2 grupos de números con un guion intermedio p.e. (1234-1)', 'primary');
      } else {
        var obj = {
          op: vm.op,
          orden: (vm.orden == undefined) ? 0 : vm.orden,
          contrato: (vm.contrato == undefined) ? 0 : vm.contrato,
          nombre: '',
          paterno: '',
          materno: '',
          calle: '',
          numero: '',
          colonia: 0,
          compania: (vm.selectedPlaza.id_compania == undefined) ? 0 : vm.selectedPlaza.id_compania,
          setupbox: '',
          // clvUsuario:vm.selectedUsuario.Clave,
          status: '',
          auto: vm.auto
        };
        ordenesFactory.buscarOrdenes(obj).then(function (data) {
          vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
          if (vm.ordenes.length == 0) {
            vm.sinRegistros = true;
            vm.conRegistros = false;
          } else {
            vm.sinRegistros = false;
            vm.conRegistros = true;
          }
        });
      }
      vm.contrato = "";
      vm.orden = "";

    }

    function buscarColonia() {
      if (vm.auto == undefined) {
        vm.auto = 0;
      } else {
        vm.auto = 1;
      }

      if (vm.selectedPlaza.id_compania == 0) {
        ngNotify.set('Selecciona una plaza válida.', 'warn');
      } else if (vm.calle == '' && vm.numero == '' && vm.selectedColonia.clvColonia == 0) {
        ngNotify.set('Introduce un domicilio válido.', 'warn');
      } else if (vm.calle == undefined && vm.numero == undefined && vm.selectedColonia.clvColonia == 0) {
        ngNotify.set('Introduce un domicilio válido.', 'warn');
      } else {
        var obj = {
          op: 32,
          orden: 0,
          contrato: '',
          nombre: '',
          paterno: '',
          materno: '',
          calle: vm.calle,
          numero: vm.numero,
          colonia: vm.selectedColonia.clvColonia,
          compania: vm.selectedPlaza.id_compania,
          setupbox: '',
          status: '',
          auto: vm.auto
        };
        ordenesFactory.buscarOrdenes(obj).then(function (data) {
          vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
          if (vm.ordenes.length == 0) {
            vm.sinRegistros = true;
            vm.conRegistros = false;
          } else {
            vm.sinRegistros = false;
            vm.conRegistros = true;
          }
        });
      }
      vm.calle = "";
      vm.numero = "";
      vm.selectedColonia.clvColonia = vm.selectedColonia.clvColonia[0];
    }

    function buscarNombres() {
      if (vm.auto == undefined) {
        vm.auto = 0;
      } else {
        vm.auto = 1;
      }
      if (vm.nombre == '' && vm.paterno == '' && vm.materno == '') {
        ngNotify.set('Introduce un nombre válido.', 'warn');
      } else if (vm.nombre == undefined && vm.paterno == undefined && vm.materno == undefined) {
        ngNotify.set('Introduce un nombre válido.', 'warn');
      } else {
        var obj = {
          op: 31,
          orden: 0,
          contrato: '',
          nombre: vm.nombre,
          paterno: vm.paterno,
          materno: vm.materno,
          calle: '',
          numero: '',
          colonia: 0,
          compania: (vm.selectedPlaza.id_compania == 0) ? vm.selectedPlaza.id_compania : 0,
          setupbox: '',
          // clvUsuario:vm.selectedUsuario.Clave,
          status: '',
          auto: vm.auto
        };
        ordenesFactory.buscarOrdenes(obj).then(function (data) {
          vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
          if (vm.ordenes.length == 0) {
            vm.sinRegistros = true;
            vm.conRegistros = false;
          } else {
            vm.sinRegistros = false;
            vm.conRegistros = true;
          }
        });
      }
      vm.nombre = "";
      vm.paterno = "";
      vm.materno = "";
    }

    function buscarSetup() {
      if (vm.auto == undefined) {
        vm.auto = 0;
      } else {
        vm.auto = 1;
      }

      if (vm.selectedPlaza.id_compania == 0) {
        ngNotify.set('Selecciona una plaza válida.', 'warn');
      } else if (vm.setupbox == "" || vm.setupbox == undefined) {
        ngNotify.set('Introduce un Setup Box válido.', 'warn');
      } else {
        var obj = {
          op: 5,
          orden: 0,
          contrato: '',
          nombre: '',
          paterno: '',
          materno: '',
          calle: '',
          numero: '',
          colonia: 0,
          compania: vm.selectedPlaza.id_compania,
          setupbox: vm.setupbox,
          status: '',
          auto: vm.auto
        };
        ordenesFactory.buscarOrdenes(obj).then(function (data) {
          vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
          if (vm.ordenes.length == 0) {
            vm.sinRegistros = true;
            vm.conRegistros = false;
          } else {
            vm.sinRegistros = false;
            vm.conRegistros = true;
          }
        });
      }
      vm.setupbox = "";
    }

    function buscarStatus() {
      if (vm.auto == undefined || vm.auto == 0) {
        var Bauto = 0;
      } else {
        var Bauto = 1;
      }

      if (vm.status == 1) {
        vm.stat = 'P';
      } else if (vm.status == 2) {
        vm.stat = 'E';
      } else if (vm.status == 3) {
        vm.stat = 'V';
      }


      var obj = {
        op: 399,
        orden: 0,
        contrato: '',
        nombre: '',
        paterno: '',
        materno: '',
        calle: '',
        numero: '',
        colonia: 0,
        compania: vm.selectedPlaza.id_compania,
        setupbox: '',
        status: vm.stat,
        auto: Bauto
      };
      console.log(obj);
      ordenesFactory.buscarOrdenes(obj).then(function (data) {
        vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
        if (vm.ordenes.length == 0) {
          vm.sinRegistros = true;
          vm.conRegistros = false;
        } else {
          vm.sinRegistros = false;
          vm.conRegistros = true;
        }
      });

    }
  }
})();
