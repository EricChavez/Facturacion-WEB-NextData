    'use strict';
    angular
    	.module('softvApp')
    	.controller('ModalDescargaMaterialCtrl', function($uibModalInstance, $uibModal, options, DescargarMaterialFactory, $rootScope, ngNotify, $localStorage, $state) {

    		function initialData(objDesMat) {

				if(objDesMat.Tipo_Descargar == "O"){

					DescargarMaterialFactory.GetSoftv_DimeSiTieneBitacora(objDesMat.ClvOrden, objDesMat.Tipo_Descargar).then(function(data){
						vm.No_Bitacora = data.GetSoftv_DimeSiTieneBitacoraResult.NoBitacora;

						DescargarMaterialFactory.GetMuestra_Detalle_Bitacora(objDesMat.SctTecnico.CLV_TECNICO, vm.IAlma).then(function(data){
							vm.Material = data.GetMuestra_Detalle_Bitacora_2ListResult;
							
							DescargarMaterialFactory.GetSoftv_GetDescargaMaterialEstaPagado(objDesMat.ClvOrden, objDesMat.Tipo_Descargar).then(function(data){
								vm.pagado = data.GetSoftv_GetDescargaMaterialEstaPagadoResult.Pagado

							});

						});

					});

					

				}else if(objDesMat.Tipo_Descargar == "Q"){

					console.log("Es una reporte");

				}

    		}

			function BuscarNombreArticulo(){

				if(vm.SlctMaterial.catTipoArticuloClave > 0){
					DescargarMaterialFactory.GetMuestra_Descripcion_Articulo_2List(options.SctTecnico.CLV_TECNICO, vm.SlctMaterial.catTipoArticuloClave, vm.IAlma).then(function(data){
						vm.DescripcionArticulo = data.GetMuestra_Descripcion_Articulo_2ListResult;
					});

				}else{
					console.log("No");
				}
				

			}

			function AgregarArticulo(){
				if(vm.SlctArticulo != undefined && vm.SlctArticulo.IdArticulo > 0){
					DescargarMaterialFactory.GetSoftv_ExistenciasTecnico(vm.SlctArticulo.IdArticulo, options.SctTecnico.CLV_TECNICO, vm.IAlma).then(function(data){
						vm.Existe = data.GetSoftv_ExistenciasTecnicoResult.Existe;

						if(vm.CantidadDescarga != undefined && vm.CantidadDescarga > 0){
							if(vm.CantidadDescarga <= vm.SlctArticulo.Cantidad){
								
								var ObjDescargaMat = {};
								ObjDescargaMat.IdTecnico = options.SctTecnico.CLV_TECNICO;
								ObjDescargaMat.ClvOrden = options.ClvOrden;
								ObjDescargaMat.IdAlmacen = vm.IAlma;
								ObjDescargaMat.Accion = "Agregar";
								ObjDescargaMat.IdBitacora = vm.No_Bitacora;
								ObjDescargaMat.TipoDescarga = 	options.Tipo_Descargar;

								var Articulos = {};
								Articulos.NoArticulo = vm.SlctArticulo.IdArticulo;
								Articulos.Cantidad = vm.CantidadDescarga;
								Articulos.EsCable = false;
								Articulos.MetrajeInicio = 0;
								Articulos.MetrajeFin = 0;
								Articulos.MetrajeInicioExt = 0;
								Articulos.MetrajeFinExt = 0;

								DescargarMaterialFactory.GetDescargaMaterialArt(ObjDescargaMat, Articulos).then(function(data){
									console.log(data);
								});

							}else{
								ngNotify.set('No tiene material suficiente, solo cuenta con: ' + vm.SlctArticulo.Cantidad + ' pzs.', 'error');
							}
						}else{
							ngNotify.set('Ingresa la cantidad del artículo.', 'error');
						}

					});
				}else{
					ngNotify.set('Selecciona un artículo.', 'error');
				}
				
			}

    		function ok() {

    		}



    		function cancel() {
    			$uibModalInstance.dismiss('cancel');
    		}




    		var vm = this;
    		vm.cancel = cancel;
    		vm.ok = ok;
			vm.BuscarNombreArticulo = BuscarNombreArticulo;
			vm.AgregarArticulo = AgregarArticulo;

			vm.IAlma = 0;

			//vm.Tipo = options.Tipo_Descargar;
    		initialData(options);

			
    	});
