'use strict';
angular.module('softvApp')
  .factory('ComisionFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetcomisiontecnicoList: '/ComisionesTecnicosWeb/GetComisionesTecnicosWebList',
      Addcomisiontecnico: '/ComisionesTecnicosWeb/AddComisionesTecnicosWeb',
      GetComisionesVendedoresWebList: '/ComisionesVendedoresWeb/GetComisionesVendedoresWebList',
      AddComisionesVendedoresWeb: '/ComisionesVendedoresWeb/AddComisionesVendedoresWeb',
      GetServiciosWebList: '/ServiciosWeb/GetServiciosWebList',
      DeleteComisionesVendedoresWeb: '/ComisionesVendedoresWeb/DeleteComisionesVendedoresWeb',
      GetAddComisionesVendedoresWeb: '/ComisionesVendedoresWeb/GetAddComisionesVendedoresWeb',
      GetDeleteComisionesTecnicosWeb: '/ComisionesTecnicosWeb/GetDeleteComisionesTecnicosWeb',
      GetMuestra_PlazasPorUsuarioList: '/Muestra_PlazasPorUsuario/GetMuestra_PlazasPorUsuarioList',
      GetPlaza_ReportesVentasXmlList: '/Plaza_ReportesVentas/GetPlaza_ReportesVentasXmlList',
      GetVendores_ReportesVentasXmlList: '/Vendores_ReportesVentas/GetVendores_ReportesVentasXmlList',
      GetPaquetesRepVentasXmlList: '/ServiciosWeb/GetPaquetesRepVentasXmlList',
      GetConGrupoVentasWeb:'/VendedoresL/GetConGrupoVentasWeb',
      GetSucursales_ReportesVentasXmlList:'/Sucursales_ReportesVentas/GetSucursales_ReportesVentasXmlList'
    };
     


     factory.GetSucursales_ReportesVentasXmlList = function (plazas) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'obj': {},
        'LstPlaza': plazas
      };

      $http.post(globalService.getUrl() + paths.GetSucursales_ReportesVentasXmlList, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetConGrupoVentasWeb = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
       var parametros = {
        'obj': {
          'Clv_Grupo':obj.Clv_Grupo,
          'clv_usuario':$localStorage.currentUser.idUsuario,
          'Op':obj.Op
        }        
      };

       $http.post(globalService.getUrl() + paths.GetConGrupoVentasWeb, JSON.stringify(parametros), config)
       .then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetPaquetesRepVentasXmlList = function (servicios) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Obj': {},
        'LstTipSer': servicios
      };

      $http.post(globalService.getUrl() + paths.GetPaquetesRepVentasXmlList, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetVendores_ReportesVentasXmlList = function (distribuidores) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Obj': {},
        'LstDis': distribuidores
      };

      $http.post(globalService.getUrl() + paths.GetVendores_ReportesVentasXmlList, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };







    factory.GetPlaza_ReportesVentasXmlList = function (distribuidores) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'objPlaza': {},
        'LstDis': distribuidores
      };

      $http.post(globalService.getUrl() + paths.GetPlaza_ReportesVentasXmlList, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetcomisiontecnicoList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.GetcomisiontecnicoList, config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetMuestra_PlazasPorUsuarioList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Usuario': $localStorage.currentUser.idUsuario
      };

      $http.post(globalService.getUrl() + paths.GetMuestra_PlazasPorUsuarioList, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };






    factory.Addcomisiontecnico = function (RangoInicialPuntos, RangoFinalPuntos, Comision) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'objComisionesTecnicosWeb': {
          'RangoInicialPuntos': RangoInicialPuntos,
          'RangoFinalPuntos': RangoFinalPuntos,
          'Comision': Comision

        }

      };

      $http.post(globalService.getUrl() + paths.Addcomisiontecnico, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetComisionesVendedoresWebList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetComisionesVendedoresWebList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetServiciosWebList = function (ClvTipSer) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ClvTipSer': ClvTipSer
      };
      $http.post(globalService.getUrl() + paths.GetServiciosWebList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });
      return deferred.promise;
    };

    factory.AddComisionesVendedoresWeb = function (Clv_Tipservicios, Clv_Servicio, RangoInicial, RangoFinal, Comsion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'objComisionesVendedoresWeb': {
          'Clv_Tipservicios': Clv_Tipservicios,
          'Clv_Servicio': Clv_Servicio,
          'RangoInicial': RangoInicial,
          'RangoFinal': RangoFinal,
          'Comsion': Comsion
        }
      };
      $http.post(globalService.getUrl() + paths.AddComisionesVendedoresWeb, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteComisionesVendedoresWeb = function (IdComision) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'IdComision': IdComision
      };
      console.log(parametros);
      $http.post(globalService.getUrl() + paths.DeleteComisionesVendedoresWeb, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetAddComisionesVendedoresWeb = function (Clv_Tipservicios, Clv_Servicio, RangoInicial, RangoFinal, Comsion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Tipservicios': Clv_Tipservicios,
        'Clv_Servicio': Clv_Servicio,
        'RangoInicial': RangoInicial,
        'RangoFinal': RangoFinal,
        'Comsion': Comsion
      };
      $http.post(globalService.getUrl() + paths.GetAddComisionesVendedoresWeb, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetDeleteComisionesTecnicosWeb = function (IdComision) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'objComisionesTecnicosWeb': {
          'RangoInicialPuntos': 0,
          'RangoFinalPuntos': 0,
          'Comision': 0,
          'IdComision': IdComision
        }

      };

      $http.post(globalService.getUrl() + paths.GetDeleteComisionesTecnicosWeb, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };
    return factory;


  });
