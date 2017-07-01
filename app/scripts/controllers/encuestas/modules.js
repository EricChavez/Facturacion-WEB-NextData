'use strict';
angular.module('softvApp').config(EncuestaConf);

function EncuestaConf($stateProvider) {
  var states = [{
      name: 'home.encuestas',
      abstract: true,
      template: '<div ui-view></div>'
    },
    {
      name: 'home.encuestas.encuesta',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/encuestaL',
      templateUrl: 'views/encuestas/encuesta.html',
      controller: 'EncuestaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.encuestanueva',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/encuestanueva',
      templateUrl: 'views/encuestas/encuestaNueva.html',
      controller: 'EncuestaNuevaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.encuestaedita',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaUpdate'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/editaencuesta/:id',
      templateUrl: 'views/encuestas/encuestaNueva.html',
      controller: 'EncuestaEditaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.preguntas',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['preguntasSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/preguntas',
      templateUrl: 'views/encuestas/pregunta.html',
      controller: 'PreguntaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.nuevapregunta',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['preguntasSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/nuevapregunta',
      templateUrl: 'views/encuestas/nuevaPregunta.html',
      controller: 'NuevaPreguntaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.respuestas',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['respuestasSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/respuestas',
      templateUrl: 'views/encuestas/respuesta.html',
      controller: 'PreguntaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.aplicar',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/aplicar/:id',
      templateUrl: 'views/encuestas/AplicaEncuesta.html',
      controller: 'AplicaEncuestaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.nuevoproceso',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/nuevoproceso',
      templateUrl: 'views/encuestas/NuevoProceso.html',
      controller: 'NuevoProcesoCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.aplicacontratos',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/aplicacontratos/:id',
      templateUrl: 'views/encuestas/Aplicacontratos.html',
      controller: 'AplicacontratosCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.encuestas.estadisticas',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/estadisticas',
      templateUrl: 'views/encuestas/Estadisticas.html',
      controller: 'EstadisticasCtrl',
      controllerAs: '$ctrl'
    },
     {
      name: 'home.encuestas.estadisticasdetalle',
      data: {
        pageTitle: 'SAC | Encuesta',
        permissions: {
          only: ['encuestaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/encuestas/estadisticas/:id',
      templateUrl: 'views/encuestas/Estadisticasdetalle.html',
      controller: 'EstadisticasdetalleCtrl',
      controllerAs: '$ctrl'
    }
    





  ];
  states.forEach(function (state) {
    $stateProvider.state(state);
  });
}
