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
            },
            {
                name: 'home.comisiones.reportegeneral',
                data: {
                    pageTitle: 'SOFTV | REPORTE GENERAL',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/comision/reportegeneral',
                templateUrl: 'views/comisiones/ReporteGeneral.html',
                controller: 'ReporteGeneralCtrl',
                controllerAs: '$ctrl'
            },
            {
                name: 'home.comisiones.resumensucursal',
                data: {
                    pageTitle: 'SOFTV | RESUMEN SUCURSAL',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/comision/resumensucursal',
                templateUrl: 'views/comisiones/ResumenSucursal.html',
                controller: 'ResumenSucursalCtrl',
                controllerAs: '$ctrl'
            },
             {
                name: 'home.comisiones.resumenvendedores',
                data: {
                    pageTitle: 'SOFTV | RESUMEN VENDEDORES',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/comision/resumenvendedores',
                templateUrl: 'views/comisiones/ResumenVendedores.html',
                controller: 'ResumenVendedoresCtrl',
                controllerAs: '$ctrl'
            },
             {
                name: 'home.comisiones.graficas',
                data: {
                    pageTitle: 'SOFTV | GRAFICAS',
                    permissions: {
                        options: {
                            reload: false
                        }
                    }
                },
                url: '/comision/graficas',
                templateUrl: 'views/comisiones/Graficas.html',
                controller: 'GraficasCtrl',
                controllerAs: '$ctrl'
            }
        ];
        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    });