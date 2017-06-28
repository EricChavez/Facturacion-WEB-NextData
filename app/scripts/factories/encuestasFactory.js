'use strict';
angular
  .module('softvApp')
  .factory('encuestasFactory', function ($http, $q, globalService, $localStorage) {
    var paths = {
      GetAddPregunta: '/Preguntas/GetAddPregunta',
      GetEncuestasList: '/Encuestas/GetEncuestasList',
      GetAddEncuesta: '/Encuestas/GetAddEncuesta',
      GetEditEncuesta:'/Encuestas/GetEditEncuesta',
      GetPreguntasList:'/Preguntas/GetPreguntasList'

    };
    var factory = {};


    factory.GetEditEncuesta = function (objEncuesta, arraypreguntas, arrayrespuestas) {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.idUsuario;
      var Parametros = {
        'objEncuesta': objEncuesta,
        'LstPregunta': arraypreguntas,
        'LstRespuestas': arrayrespuestas
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetEditEncuesta, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.GetAddEncuesta = function (objEncuesta, arraypreguntas, arrayrespuestas) {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.idUsuario;
      var Parametros = {
        'objEncuesta': objEncuesta,
        'LstPregunta': arraypreguntas,
        'LstRespuestas': arrayrespuestas
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetAddEncuesta, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.GetAddPregunta = function (pregunta, tipo, arrayOpcMultiple) {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.idUsuario;
      var Parametros = {
        'objPregunta': {
          'Pregunta': pregunta,
          'IdTipoPregunta': tipo
        },
        'ResOpcMult': arrayOpcMultiple
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetAddPregunta, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.GetEncuestasList = function () {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetEncuestasList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    return factory;
  });
