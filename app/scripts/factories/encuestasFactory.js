'use strict';
angular
  .module('softvApp')
  .factory('encuestasFactory', function ($http, $q, globalService, $localStorage) {
    var paths = {
      GetAddPregunta: '/Preguntas/GetAddPregunta',
      GetEncuestasList: '/Encuestas/GetEncuestasList',
      GetAddEncuesta: '/Encuestas/GetAddEncuesta',
      GetEditEncuesta: '/Encuestas/GetEditEncuesta',
      GetPreguntasList: '/Preguntas/GetPreguntasList',
      GetMuestraPreguntas_EncuestasList:'/MuestraPreguntas_Encuestas/GetMuestraPreguntas_EncuestasList',
      MuestraRespuestas_Encuestas:'/MuestraRespuestas_Encuestas/GetMuestraRespuestas_EncuestasList',
      ImprimeEncuesta: '/Encuestas/GetImprimeEncuesta'
    };
    var factory = {};
   

    factory.ImprimeEncuesta = function (idencuesta) {
      var deferred = $q.defer();

      var Parametros = {
        'idencuesta': idencuesta        
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ImprimeEncuesta, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };





    factory.GetPreguntasList = function () {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetPreguntasList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




 factory.MuestraRespuestas_Encuestas = function (IdPregunta) {
      var deferred = $q.defer();

      var Parametros = {
        'IdPregunta': IdPregunta        
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraRespuestas_Encuestas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




 factory.GetMuestraPreguntas_EncuestasList = function (IdEncuesta) {
      var deferred = $q.defer();

      var Parametros = {
        'IdEncuesta': IdEncuesta        
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetMuestraPreguntas_EncuestasList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.GetEditEncuesta = function (objEncuesta, arraypreguntas, arrayrespuestas) {
      var deferred = $q.defer();

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

    factory.GetAddEncuesta = function (IdEncuesta,titulo, descripcion, arraypreguntas,op) {
      var deferred = $q.defer();

      var Parametros = {
        'objEncuesta': {
          'IdEncuesta': IdEncuesta,
          'TituloEncuesta': titulo,
          'Descripcion': descripcion,
          'FechaCreacion': '',
          'IdUsuario': $localStorage.currentUser.IdUsuario,
          'Activa': 1,
          'Op': op
        },
        'LstPregunta': arraypreguntas
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
