
'use strict';

angular
    .module('softvApp')
    .factory('DescargarMaterialFactory', function ($http, $q, globalService, $localStorage){

        var factory = {};
        var paths = {

            GetSoftv_DimeSiTieneBitacora: '/Softv_DimeSiTieneBitacora/GetSoftv_DimeSiTieneBitacora',
            GetMuestra_Detalle_Bitacora: '/Muestra_Detalle_Bitacora_2/GetMuestra_Detalle_Bitacora_2List',
            GetMuestra_Descripcion_Articulo_2List: '/Muestra_Descripcion_Articulo_2/GetMuestra_Descripcion_Articulo_2List',
            GetSoftv_GetDescargaMaterialEstaPagado: '/Softv_GetDescargaMaterialEstaPagado/GetSoftv_GetDescargaMaterialEstaPagado',
            GetSoftv_ExistenciasTecnico: '/Softv_ExistenciasTecnico/GetSoftv_ExistenciasTecnico',
            GetDescargaMaterialArt: '/TblDescargaMaterial/GetDescargaMaterialArt',
            GetAddDescargaMaterialArt: '/TblDescargaMaterial/GetAddDescargaMaterialArt'

        };

        factory.GetSoftv_DimeSiTieneBitacora = function(ClvOrden, TipoDescarga){

            var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
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

        factory.GetMuestra_Detalle_Bitacora = function(ClvTecnico, IAlma){

            var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
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

        }

        factory.GetMuestra_Descripcion_Articulo_2List = function(ClvTecnico, ClvArticulo, IAlma){

            var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
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

        }

        factory.GetSoftv_GetDescargaMaterialEstaPagado = function(ClvOrden, TipoDescarga){

            var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
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

        }

        factory.GetSoftv_ExistenciasTecnico = function(Iarticulo, ClvTecnico, IAlma){

            var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
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

        }

        factory.GetDescargaMaterialArt = function(ObjDescargaMate, Articulo){

            var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
                'ObjDescargaMat':  {
                    IdTecnico: ObjDescargaMate.IdTecnico,
                    ClvOrden: ObjDescargaMate.ClvOrden,
                    IdAlmacen: ObjDescargaMate.IdAlmacen,
                    Accion: ObjDescargaMate.Accion,
                    IdBitacora: ObjDescargaMate.IdBitacora,
                    TipoDescarga: ObjDescargaMate.TipoDescarga
                },
				'Articulos': {
                    NoArticulo: Articulo.NoArticulo,
                    Cantidad: Articulo.Cantidad,
                    EsCable: Articulo.EsCable,
                    MetrajeInicio: Articulo.MetrajeInicio,
                    MetrajeFin: Articulo.MetrajeFin,
                    MetrajeInicioExt: Articulo.MetrajeInicioExt,
                    MetrajeFinExt: Articulo.MetrajeFinExt
                }
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

            console.log(Parametros);

            $http.post(globalService.getUrl() + paths.GetDescargaMaterialArt, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        }

        factory.GetAddDescargaMaterialArt = function(){

            var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
                'ObjDescargaMat':  {
                    IdTecnico: ObjDescargaMate.IdTecnico,
                    ClvOrden: ObjDescargaMate.ClvOrden,
                    IdAlmacen: ObjDescargaMate.IdAlmacen,
                    Accion: ObjDescargaMate.Accion,
                    IdBitacora: ObjDescargaMate.IdBitacora,
                    TipoDescarga: ObjDescargaMate.TipoDescarga
                },
				'Articulos': {
                    NoArticulo: Articulo.NoArticulo,
                    Cantidad: Articulo.Cantidad,
                    EsCable: Articulo.EsCable,
                    MetrajeInicio: Articulo.MetrajeInicio,
                    MetrajeFin: Articulo.MetrajeFin,
                    MetrajeInicioExt: Articulo.MetrajeInicioExt,
                    MetrajeFinExt: Articulo.MetrajeFinExt
                }
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

            console.log(Parametros);

            $http.post(globalService.getUrl() + paths.GetDescargaMaterialArt, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;

        }

        return factory;

    });