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
      GetAddComisionesVendedoresWeb: '/ComisionesVendedoresWeb/GetAddComisionesVendedoresWeb'
      GetDeleteComisionesTecnicosWeb:'/ComisionesTecnicosWeb/GetDeleteComisionesTecnicosWeb'
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


    factory.Addcomisiontecnico = function (RangoInicialPuntos,RangoFinalPuntos,Comision) {
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
          'IdComision':IdComision
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
