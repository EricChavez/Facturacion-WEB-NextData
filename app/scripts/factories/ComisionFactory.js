'use strict';
angular.module('softvApp')
  .factory('ComisionFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetcomisiontecnicoList: '/ComisionesTecnicosWeb/GetComisionesTecnicosWebList',
      Addcomisiontecnico: '/ComisionesTecnicosWeb/AddComisionesTecnicosWeb',
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
