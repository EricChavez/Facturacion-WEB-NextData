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
      GetMuestraPreguntas_EncuestasList: '/MuestraPreguntas_Encuestas/GetMuestraPreguntas_EncuestasList',
      MuestraRespuestas_Encuestas: '/MuestraRespuestas_Encuestas/GetMuestraRespuestas_EncuestasList',
      ImprimeEncuesta: '/Encuestas/GetImprimeEncuesta',
      GetRelPreguntaEncuesta: '/Encuestas/GetEncuestaDetalle',
      GetMuestra_DistribuidoresEncList: '/Muestra_DistribuidoresEnc/GetMuestra_DistribuidoresEncList',
      Muestra_PlazaEnc: '/Muestra_PlazaEnc/GetMuestra_PlazaEncList',
      GetTipSerEncList: '/Muestra_PlazaEnc/GetTipSerEncList',
      GetUniversoEncuestaAplicarList: '/UniversoEncuesta/GetUniversoEncuestaAplicarList',
      ProcesosEncuestas: '/ProcesosEncuestas/GetProcesosEncuestasList',
      GetDeepProcesosEncuestas: '/ProcesosEncuestas/GetDeepProcesosEncuestas',
      GetGet_UniversoEncuestaList: '/Get_UniversoEncuesta/GetGet_UniversoEncuestaList',
      GetRelEncuestaCli: '/RelEncuestaClientes/GetRelEncuestaCli',
      TerminarProceso: '/UniversoEncuesta/UpdateUniversoEncuesta',
      GetGraficasPreguntasList: '/GraficasPreguntas/GetGraficasPreguntasList',
      GetResOpcMultsList:'/ResOpcMults/GetResOpcMultsList',
      DeleteEncuestas:'/Encuestas/DeleteEncuestas'
    };
    var factory = {};



     factory.GetResOpcMultsList = function () {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetResOpcMultsList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    


   factory.DeleteEncuestas = function (IdEncuesta) {
      var deferred = $q.defer();

      var Parametros = {
        'IdEncuesta': IdEncuesta        
      };   
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.DeleteEncuestas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetGraficasPreguntasList = function (idproceso) {
      var deferred = $q.defer();

      var Parametros = {
        'IdEncuesta': 0,
        'IdUniverso': idproceso,
        'FechaI': '',
        'FechaF': ''
      };
      console.log(JSON.stringify(Parametros));
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetGraficasPreguntasList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.TerminarProceso = function (idproceso) {
      var deferred = $q.defer();

      var Parametros = {
        'objUniversoEncuesta': {
          'IdProcesoEnc': idproceso
        }

      };
      console.log(JSON.stringify(Parametros));
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.TerminarProceso, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };



    factory.GetRelEncuestaCli = function (idproceso, idencuesta, contrato, respuestas) {
      var deferred = $q.defer();

      var Parametros = {
        'objEncCli': {
          'IdProcesoEnc': idproceso,
          'IdEncuesta': idencuesta,
          'Contrato': contrato
        },
        'LstRelEnProcesos': respuestas
      };
      console.log(JSON.stringify(Parametros));
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetRelEncuestaCli, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetGet_UniversoEncuestaList = function (object) {
      var deferred = $q.defer();

      var Parametros = {
        'IdPlaza': object.IdPlaza,
        'IdTipSer': object.IdTipSer,
        'IdTipBusq': object.IdTipBusq,
        'Desconectado': object.Desconectado,
        'Instalado': object.Instalado,
        'Suspendido': object.Suspendido,
        'Baja':object.Baja,
        'Contratado': object.Contratado,
        'Temporales': object.Temporales,
        'Fuera': object.Fuera,
        'IdTipFecha': object.IdTipFecha,
        'FechaI': object.FechaI,
        'FechaF': object.FechaF,
        'IdUsuario': $localStorage.currentUser.idUsuario,
        'IdEncuesta': object.IdEncuesta,
        'NombreProceso': object.NombreProceso

      };
      console.log(JSON.stringify(Parametros));
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetGet_UniversoEncuestaList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };




    factory.GetDeepProcesosEncuestas = function (idproceso) {
      var deferred = $q.defer();

      var Parametros = {
        'IdProcesoEnc': idproceso
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetDeepProcesosEncuestas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.GetUniversoEncuestaAplicarList = function (idproceso) {
      var deferred = $q.defer();

      var Parametros = {
        'IdProcesoEnc': idproceso
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetUniversoEncuestaAplicarList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };






    factory.ProcesosEncuestas = function () {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.ProcesosEncuestas, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.GetTipSerEncList = function () {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetTipSerEncList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.GetMuestra_DistribuidoresEncList = function () {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMuestra_DistribuidoresEncList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.Muestra_PlazaEnc = function (idcompania) {
      var deferred = $q.defer();

      var Parametros = {
        'Clv_Plaza': idcompania
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.Muestra_PlazaEnc, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };



    factory.GetRelPreguntaEncuesta = function (idencuesta) {
      var deferred = $q.defer();

      var Parametros = {
        'idencuesta': idencuesta
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetRelPreguntaEncuesta, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


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

    factory.GetAddEncuesta = function (IdEncuesta, titulo, descripcion, arraypreguntas, op) {
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
