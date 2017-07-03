'use strict';
angular
  .module('softvApp')
  .controller('ModalDescargaMaterialCtrl', function ($uibModalInstance, $uibModal, options, DescargarMaterialFactory, $rootScope, ngNotify, $localStorage, $state) {

    function initialData(objDesMat) {

		console.log(objDesMat);
      vm.articulos_ = [];
      DescargarMaterialFactory.GetMuestra_Detalle_Bitacora(objDesMat.SctTecnico.CLV_TECNICO, vm.IAlma).then(function (data) {
        vm.Material = data.GetMuestra_Detalle_Bitacora_2ListResult;

        DescargarMaterialFactory.GetSoftv_GetDescargaMaterialEstaPagado(objDesMat.ClvOrden, objDesMat.Tipo_Descargar).then(function (data) {
          vm.pagado = data.GetSoftv_GetDescargaMaterialEstaPagadoResult.Pagado
          DescargarMaterialFactory.GetSoftv_DimeSiTieneBitacora(objDesMat.ClvOrden, objDesMat.Tipo_Descargar).then(function (data) {
            console.log(data);
            if (data.GetSoftv_DimeSiTieneBitacoraResult == null) {


            } else {

              vm.No_Bitacora = data.GetSoftv_DimeSiTieneBitacoraResult.NoBitacora;

              DescargarMaterialFactory.GetDescargaMaterialArticulosByIdClvOrden(objDesMat.ClvOrden, objDesMat.Tipo_Descargar).then(function (data) {
                console.log(data.GetGetDescargaMaterialArticulosByIdClvOrdenListResult);
                var art = data.GetGetDescargaMaterialArticulosByIdClvOrdenListResult;

                var ObjDescargaMat = {};
                ObjDescargaMat.IdTecnico = options.SctTecnico.CLV_TECNICO;
                ObjDescargaMat.ClvOrden = options.ClvOrden;
                ObjDescargaMat.IdAlmacen = vm.IAlma;
                ObjDescargaMat.Accion = "Agregar";
                ObjDescargaMat.IdBitacora = vm.No_Bitacora;
                ObjDescargaMat.TipoDescarga = options.Tipo_Descargar;

                for (var a = 0; a < art.length; a++) {
                  var Articulos = {};
                  Articulos.NoArticulo = art[a].NOARTICULO;
                  Articulos.Cantidad = art[a].CANTIDADUTILIZADA;
                  Articulos.EsCable = art[a].ESCABLE;
                  Articulos.MetrajeInicio = art[a].METRAJEINICIO;
                  Articulos.MetrajeFin = art[a].METRAJEFIN;
                  Articulos.MetrajeInicioExt = art[a].METRAJEINICIOEXTERIOR;
                  Articulos.MetrajeFinExt = art[a].METRAJEFINEXTERIOR;
                  vm.articulos_.push(Articulos);

                }

                DescargarMaterialFactory.GetDescargaMaterialArt(ObjDescargaMat, vm.articulos_).then(function (data) {
                  //console.log(data.GetDescargaMaterialArtResult[0].NoArticulo);
                  console.log(data);
                  vm.DesMatArt = data.GetDescargaMaterialArtResult;
                })



              });

            }
          });

        });

      });












    }

    function BuscarNombreArticulo() {

      if (vm.SlctMaterial.catTipoArticuloClave > 0) {
        DescargarMaterialFactory.GetMuestra_Descripcion_Articulo_2List(options.SctTecnico.CLV_TECNICO, vm.SlctMaterial.catTipoArticuloClave, vm.IAlma).then(function (data) {
          vm.DescripcionArticulo = data.GetMuestra_Descripcion_Articulo_2ListResult;
          vm.SlctArticulo.IdArticulo = "";
        });

      } else {
        console.log("No");
      }


    }

    function BuscarTipoArticulo() {

      DescargarMaterialFactory.GetSoftv_ObtenTipoMaterial(catUnidadClave, Tipo, Articulo, vm.SlctArticulo.IdArticulo).then(function (data) {
        vm.TipoArticulo = data.GetSoftv_ObtenTipoMaterialResult.Tipo;

        if (vm.TipoArticulo == 'Metros') {
          vm.MostrarCD = false;

          vm.MostrarMII = true;
          vm.MostrarMIE = true;
          vm.MostrarMFI = true;
          vm.MostrarMFE = true;
          vm.MostrarTM = true;
        } else if (vm.TipoArticulo == 'Piezas') {
          vm.MostrarCD = true;

          vm.MostrarMII = false;
          vm.MostrarMIE = false;
          vm.MostrarMFI = false;
          vm.MostrarMFE = false;
          vm.MostrarTM = false;
        }

        CantidadArticulo = 0;

      });
    }

    function AgregarArticulo() {
      if (vm.SlctArticulo != undefined && vm.SlctArticulo.IdArticulo > 0) {
        DescargarMaterialFactory.GetSoftv_ExistenciasTecnico(vm.SlctArticulo.IdArticulo, options.SctTecnico.CLV_TECNICO, vm.IAlma).then(function (data) {
          vm.Existe = data.GetSoftv_ExistenciasTecnicoResult.Existe;


          DescargarMaterialFactory.GetSoftv_ObtenTipoMaterial(catUnidadClave, Tipo, Articulo, vm.SlctArticulo.IdArticulo).then(function (data) {
            vm.TipoArticulo = data.GetSoftv_ObtenTipoMaterialResult.Tipo;
            var vCD = 0;
            var vMII = 0;
            var vMIE = 0;
            var vMFI = 0;
            var vMFE = 0;
            var TArt = false;

            if (vm.TipoArticulo == 'Metros') {

              if (vm.MetrajeII != undefined && vm.MetrajeII > 0 &&
                vm.MetrajeIE != undefined && vm.MetrajeIE > 0 &&
                vm.MetrajeFI != undefined && vm.MetrajeFI > 0 &&
                vm.MetrajeFE != undefined && vm.MetrajeFE > 0) {

                if (vm.MetrajeFI > vm.MetrajeII && vm.MetrajeFE > vm.MetrajeIE) {

                  if (vm.MetrajeIE > vm.MetrajeFI) {

                    vCD = 0;
                    vMII = vm.MetrajeII;
                    vMIE = vm.MetrajeIE;
                    vMFI = vm.MetrajeFI;
                    vMFE = vm.MetrajeFE;
                    CantidadArticulo = (vMFI - vMII) + (vMFE - vMIE);
                    TArt = true;

                  } else {
                    CantidadArticulo = 0;
                    ngNotify.set('No se pueden intercalar los valores del metraje final con el metraje inicial.', 'error');
                  }

                } else {
                  CantidadArticulo = 0;
                  ngNotify.set('El metraje final tiene que ser mayor al de inicio.', 'error');
                }


              } else {
                CantidadArticulo = 0;
                ngNotify.set('Ingresa el metraje del artículo.', 'error');
              }


            } else if (vm.TipoArticulo == 'Piezas') {

              if (vm.CantidadDescarga != undefined && vm.CantidadDescarga > 0) {

                vCD = vm.CantidadDescarga;
                vMII = 0;
                vMIE = 0;
                vMFI = 0;
                vMFE = 0;
                CantidadArticulo = vCD;
                TArt = false;

              } else {
                CantidadArticulo = 0;
                ngNotify.set('Ingresa la cantidad del artículo.', 'error');
              }
            }

            if (CantidadArticulo > 0) {
              if (CantidadArticulo <= vm.SlctArticulo.Cantidad) {

                var ObjDescargaMat = {};
                ObjDescargaMat.IdTecnico = options.SctTecnico.CLV_TECNICO;
                ObjDescargaMat.ClvOrden = options.ClvOrden;
                ObjDescargaMat.IdAlmacen = vm.IAlma;
                ObjDescargaMat.Accion = "Agregar";
                ObjDescargaMat.IdBitacora = vm.No_Bitacora;
                ObjDescargaMat.TipoDescarga = options.Tipo_Descargar;

                var Articulos = {};
                Articulos.NoArticulo = vm.SlctArticulo.IdInventario;
                Articulos.Cantidad = CantidadArticulo;
                Articulos.EsCable = TArt;
                Articulos.MetrajeInicio = vMII;
                Articulos.MetrajeFin = vMFI;
                Articulos.MetrajeInicioExt = vMIE;
                Articulos.MetrajeFinExt = vMFE;
                if (ExisteArticulo(Articulos.NoArticulo) == false) {
                  alert('no esxiste')
                  vm.articulos_.push(Articulos);
                  DescargarMaterialFactory.GetDescargaMaterialArt(ObjDescargaMat, vm.articulos_).then(function (data) {
                    //console.log(data.GetDescargaMaterialArtResult[0].NoArticulo);
                    console.log(data);
                    vm.DesMatArt = data.GetDescargaMaterialArtResult;
                  });

                } else {
                  ngNotify.set('El artículo ya fue agregado', 'warn');
                  return;
                }




              } else {
                ngNotify.set('No tiene material suficiente, solo cuenta con: ' + vm.SlctArticulo.Cantidad + ' pzs.', 'error');
              }
            }

          });

        });
      } else {
        ngNotify.set('Selecciona un artículo.', 'error');
      }

    }

    function ok() {
      if (vm.articulos_.length > 0) {
       var ObjDescargaMat = {};
        ObjDescargaMat.IdTecnico = options.SctTecnico.CLV_TECNICO;
        ObjDescargaMat.ClvOrden = options.ClvOrden;
        ObjDescargaMat.IdAlmacen = vm.IAlma;
        ObjDescargaMat.Accion = "Agregar";
        ObjDescargaMat.IdBitacora = vm.No_Bitacora;
        ObjDescargaMat.TipoDescarga = options.Tipo_Descargar;
        DescargarMaterialFactory.GetAddDescargaMaterialArt(ObjDescargaMat, vm.articulos_).then(function (data) {
          console.log(data);
          DescargarMaterialFactory.GetGRABAtblDescargaMaterialCableIACTV(options.ClvOrden).then(function(data){
          ngNotify.set('La descarga de material se ha guardado correctamente','success');
        });
        
        });
        
        /*DescargarMaterialFactory.GetchecaBitacoraTecnico(options.ClvOrden, options.Tipo_Descargar).then(function(data){
        	console.log(data);
        });*/


      } else {
        ngNotify.set('Necesita agregar un artículo primero.', 'error');
      }

    }

    function EliminarArticulo(clave) {
      for (var i = 0; i < vm.articulos_.length; i++)
        if (vm.articulos_[i].NoArticulo === clave) {
          vm.articulos_.splice(i, 1);
          break;
        }

      var ObjDescargaMat = {};
      ObjDescargaMat.IdTecnico = options.SctTecnico.CLV_TECNICO;
      ObjDescargaMat.ClvOrden = options.ClvOrden;
      ObjDescargaMat.IdAlmacen = vm.IAlma;
      ObjDescargaMat.Accion = "Agregar";
      ObjDescargaMat.IdBitacora = vm.No_Bitacora;
      ObjDescargaMat.TipoDescarga = options.Tipo_Descargar;

      DescargarMaterialFactory.GetDescargaMaterialArt(ObjDescargaMat, vm.articulos_).then(function (data) {
        //console.log(data.GetDescargaMaterialArtResult[0].NoArticulo);
        console.log(data);
        vm.DesMatArt = data.GetDescargaMaterialArtResult;
      });
    }


    function ExisteArticulo(IdInventario) {
      console.log(IdInventario);
      var count = 0;
      for (var a = 0; a < vm.articulos_.length; a++) {
        if (vm.articulos_[a].NoArticulo == IdInventario) {
          count = count + 1;
        }
      }
      console.log(count);
      return (count > 0) ? true : false;

    }



    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }


    var IdArticulo = "";
    var catUnidadClave = 0;
    var Tipo = "";
    var Articulo = "";
    var CantidadArticulo = 0;
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.BuscarNombreArticulo = BuscarNombreArticulo;
    vm.AgregarArticulo = AgregarArticulo;
    vm.BuscarTipoArticulo = BuscarTipoArticulo;
    vm.EliminarArticulo = EliminarArticulo;
    vm.IAlma = 0;
    vm.MostrarCD = true;
    vm.MostrarMII = false;
    vm.MostrarMIE = false;
    vm.MostrarMFI = false;
    vm.MostrarMFE = false;
    vm.MostrarTM = false;
    vm.articulos_ = [];



    //vm.Tipo = options.Tipo_Descargar;
    initialData(options);


  });
