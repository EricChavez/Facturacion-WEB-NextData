'use strict';
angular
    .module('softvApp')
    .config(function ($stateProvider) {
        var states = [
            {
                name: 'home.comisiones',
                abstract: true,
                template: '<div ui-view></div>'
            }, {
                name: 'home.comisiones.vendedores',
                data: {
                    pageTitle: 'SOFTV | COMISIÓN VENDEDOR',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/comision/vendedores',
                templateUrl: 'views/comisiones/ComisionVendedor.html',
                controller: 'ComisionVendedorCtrl',
                controllerAs: '$ctrl'
            },{
                name: 'home.comisiones.tecnicos',
                data: {
                    pageTitle: 'SOFTV | COMISIÓN TECNICOS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/comision/tecnicos',
                templateUrl: 'views/comisiones/ComisionTecnico.html',
                controller: 'ComisionTecnicoCtrl',
                controllerAs: '$ctrl'
            }
        ];
        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    });