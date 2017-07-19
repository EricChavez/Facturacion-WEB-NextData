
'use strict';

angular
    .module('softvApp')
    .factory('DescargarMaterialFactory', function ($http, $q, globalService, $localStorage) {

        var factory = {};
        var paths = {

            GetSoftv_DimeSiTieneBitacora: '/Softv_DimeSiTieneBitacora/GetSoftv_DimeSiTieneBitacora',
            GetMuestra_Detalle_Bitacora: '/Muestra_Detalle_Bitacora_2/GetMuestra_Detalle_Bitacora_2List',
            GetMuestra_Descripcion_Articulo_2List: '/Muestra_Descripcion_Articulo_2/GetMuestra_Descripcion_Articulo_2List',
            GetSoftv_GetDescargaMaterialEstaPagado: '/Softv_GetDescargaMaterialEstaPagado/GetSoftv_GetDescargaMaterialEstaPagado',
            GetSoftv_ExistenciasTecnico: '/Softv_ExistenciasTecnico/GetSoftv_ExistenciasTecnico',
            GetDescargaMaterialArt: '/TblDescargaMaterial/GetDescargaMaterialArt',
            GetAddDescargaMaterialArt: '/TblDescargaMaterial/GetAddDescargaMaterialArt',
            GetSoftv_ObtenTipoMaterial: '/OrdSer/GetSoftv_ObtenTipoMaterial',
            GetGRABAtblDescargaMaterialCableIACTV: '/Softv_DimeSiTieneBitacora/GetGRABAtblDescargaMaterialCableIACTV',
            GetchecaBitacoraTecnico: '/Softv_DimeSiTieneBitacora/GetchecaBitacoraTecnico',
            GetDescargaMaterialArticulosByIdClvOrden: '/GetDescargaMaterialArticulosByIdClvOrden/GetGetDescargaMaterialArticulosByIdClvOrdenList'

        };





        factory.GetDescargaMaterialArticulosByIdClvOrden = function (ClvOrdSer, TipoDescarga) {

            var deferred = $q.defer();           
            var Parametros = {
                'ClvOrdSer': ClvOrdSer,
                'TipoDescarga': TipoDescarga
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetDescargaMaterialArticulosByIdClvOrden, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };



        factory.GetSoftv_DimeSiTieneBitacora = function (ClvOrden, TipoDescarga) {
            var deferred = $q.defer();           
            var Parametros = {
                'ClvOrdSer': ClvOrden,
                'TipoDescarga': TipoDescarga
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.GetSoftv_DimeSiTieneBitacora, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetMuestra_Detalle_Bitacora = function (ClvTecnico, IAlma) {

            var deferred = $q.defer();            
            var Parametros = {
                'ClvTecnico': ClvTecnico,
                'IdAlmacen': IAlma
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetMuestra_Detalle_Bitacora, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetMuestra_Descripcion_Articulo_2List = function (ClvTecnico, ClvArticulo, IAlma) {

            var deferred = $q.defer();
           
            var Parametros = {
                'ClvTecnico': ClvTecnico,
                'ClvTipo': ClvArticulo,
                'IdAlmacen': IAlma
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetMuestra_Descripcion_Articulo_2List, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetSoftv_GetDescargaMaterialEstaPagado = function (ClvOrden, TipoDescarga) {

            var deferred = $q.defer();
           
            var Parametros = {
                'ClvOrdSer': ClvOrden,
                'TipoDescarga': TipoDescarga
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetSoftv_GetDescargaMaterialEstaPagado, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetSoftv_ExistenciasTecnico = function (Iarticulo, ClvTecnico, IAlma) {

            var deferred = $q.defer();
           
            var Parametros = {
                'ClvArticulo': Iarticulo,
                'ClvTecnico': ClvTecnico,
                'IdAlmacen': IAlma
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetSoftv_ExistenciasTecnico, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetDescargaMaterialArt = function (ObjDescargaMate, arrayArticulos) {

            var deferred = $q.defer();
          
            var Parametros = {
                'ObjDescargaMat': {
                    IdTecnico: ObjDescargaMate.IdTecnico,
                    ClvOrden: ObjDescargaMate.ClvOrden,
                    IdAlmacen: ObjDescargaMate.IdAlmacen,
                    Accion: ObjDescargaMate.Accion,
                    IdBitacora: ObjDescargaMate.IdBitacora,
                    TipoDescarga: ObjDescargaMate.TipoDescarga
                },
                'Articulos': arrayArticulos
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetDescargaMaterialArt, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetAddDescargaMaterialArt = function (ObjDescargaMate, arrayArticulo) {

            var deferred = $q.defer();
            
            var Parametros = {
                'ObjDescargaMat': {
                    IdTecnico: ObjDescargaMate.IdTecnico,
                    ClvOrden: ObjDescargaMate.ClvOrden,
                    IdAlmacen: ObjDescargaMate.IdAlmacen,
                    Accion: ObjDescargaMate.Accion,
                    IdBitacora: ObjDescargaMate.IdBitacora,
                    TipoDescarga: ObjDescargaMate.TipoDescarga
                },
                'Articulos': arrayArticulo
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetAddDescargaMaterialArt, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetSoftv_ObtenTipoMaterial = function (catUnidadClave, Tipo, Articulo, IdArticulo) {

            var deferred = $q.defer();           
            var Parametros = {
                Softv_ObtenTipoMaterialEntity: {
                    'catUnidadClave': catUnidadClave,
                    'Tipo': Tipo,
                    'Articulo': Articulo,
                    'IdArticulo': IdArticulo
                }
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };

            $http.post(globalService.getUrl() + paths.GetSoftv_ObtenTipoMaterial, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetGRABAtblDescargaMaterialCableIACTV = function (ClvOrdSer) {

            var deferred = $q.defer();
            
            var Parametros = {
                'ClvOrdSer': ClvOrdSer
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.GetGRABAtblDescargaMaterialCableIACTV, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        factory.GetchecaBitacoraTecnico = function (ClvOrdSer, TipoDescarga) {

            var deferred = $q.defer();
           
            var Parametros = {
                'ClvOrdSer': ClvOrdSer,
                'TipoDescarga': TipoDescarga
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.GetchecaBitacoraTecnico, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        };

        return factory;

    });