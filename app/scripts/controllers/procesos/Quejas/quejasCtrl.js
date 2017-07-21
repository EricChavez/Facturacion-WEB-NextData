'use strict';
angular
	.module('softvApp')
	.controller('quejasCtrl', function ($state, ngNotify, $location, $uibModal, quejasFactory) {

		function InitalData() {

			quejasFactory.MuestraPlazas().then(function (data) {
				vm.Plazas = data.GetMuestra_Compania_RelUsuarioListResult;

				quejasFactory.ObtenServicios().then(function (data) {
					vm.Servicios = data.GetMuestraTipSerPrincipalListResult;
					vm.Servicio = vm.Servicios[0];
					vm.Plaza = vm.Plazas[0];
					vm.Status = vm.LosStatus[0];
					quejasFactory.ObtenColonias(vm.Plazas[0].id_compania).then(function (data) {
						vm.Colonias = data.GetuspConsultaColoniasListResult;
						
						var Parametros = {
							'Clv_TipSer': 0,
							'Clv_Queja': 0,
							'Contrato': '',
							'NOMBRE': '',
							'AP': '',
							'AM': '',
							'CALLE': '',
							'NUMERO': '',
							'SetupBox': '',
							'Status': '',
							'Op': 1,
							'ClvColonia': 0,
							'IdCompania': vm.Plaza.id_compania,
							'ClvUsuario': 0,
							'SoloNivel2': 0,
							'NoTicket': 0
						};
						quejasFactory.ObtenLista(Parametros).then(function (data) {;
							vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
							if (vm.ListaQuejas.length == 0) {
								vm.sinRegistros = true;
								vm.conRegistros = false;
							} else {
								vm.sinRegistros = false;
								vm.conRegistros = true;
							}
						});
					});
				});
			});
		}

		function ObtenQuejas(object) {
			vm.ListaQuejas = [];
			var Parametros = {
				'Clv_TipSer': object.Clv_TipSer,
				'Clv_Queja': object.Clv_Queja,
				'Contrato': object.Contrato,
				'NOMBRE': object.NOMBRE,
				'AP': object.AP,
				'AM': object.AM,
				'CALLE': object.CALLE,
				'NUMERO': object.NUMERO,
				'SetupBox': object.SetupBox,
				'Status': object.Status,
				'Op': object.Op,
				'ClvColonia': object.ClvColonia,
				'IdCompania': object.IdCompania,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': object.NoTicket
			};

		}
		function BuscaReporte() {
			if (vm.Servicio == null) {
				ngNotify.set('Por favor seleccione un tipo de servicio.', 'warn');
			} else if (vm.Reporte == null || !(/^\d{1,9}/.test(vm.Reporte))) {
				ngNotify.set('Ingresa un número de reporte válido.', 'warn');
				vm.Reporte = '';
			} else {
				var Parametros = {
					'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
					'Clv_Queja': vm.Reporte,
					'Contrato': '',
					'NOMBRE': '',
					'AP': '',
					'AM': '',
					'CALLE': '',
					'NUMERO': '',
					'SetupBox': '',
					'Status': '',
					'Op': 3,
					'ClvColonia': 0,
					'IdCompania': 0,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': 0
				};
				quejasFactory.ObtenLista(Parametros).then(function (data) {
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
					if (vm.ListaQuejas.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
			vm.Reporte = "";
		}

		function BuscaContrato() {
			if (vm.Servicio == null || vm.Plaza == null) {
				ngNotify.set('Por favor seleccione una compañía y un tipo de servicio.', 'warn');
			} else if (!(/^\d{1,9}-\d{1,9}$/.test(vm.Contrato))) {
				ngNotify.set('El número de contrato está formado por 2 grupos de números con un guion intermedio p.e. (1234-1)', 'primary');
			} else {
				var Parametros = {
					'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
					'Clv_Queja': 0,
					'Contrato': vm.Contrato,
					'NOMBRE': '',
					'AP': '',
					'AM': '',
					'CALLE': '',
					'NUMERO': '',
					'SetupBox': '',
					'Status': '',
					'Op': 0,
					'ClvColonia': 0,
					'IdCompania': vm.Plaza.id_compania,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': 0
				};
				quejasFactory.ObtenLista(Parametros).then(function (data) {
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
					if (vm.ListaQuejas.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
			vm.Contrato = "";
		}

		function BuscaporNombre() {
			if (vm.Nombre == undefined || vm.Nombre == "") {
				var NombreB = "";
			} else if (!(/^[A-Za-z\s\xF1\xD1]+$/.test(vm.Nombre))) {
				var NombreB = "";
			} else {
				var NombreB = vm.Nombre;
			}
			if (vm.APaterno == undefined || vm.APaterno == "") {
				var APaternoB = "";
			} else if (!(/^[A-Za-z\s\xF1\xD1]+$/.test(vm.APaterno))) {
				var APaternoB = "";
			} else {
				var APaternoB = vm.APaterno;
			}
			if (vm.AMaterno == undefined || vm.AMaterno == "") {
				var AmaternoB = "";
			} else if (!(/^[A-Za-z\s\xF1\xD1]+$/.test(vm.AMaterno))) {
				var AmaternoB = "";
			} else {
				var AmaternoB = vm.AMaterno;
			}
			if (vm.Servicio == undefined) {
				ngNotify.set('Por favor seleccione un tipo de servicio.', 'warn');
			} else if (NombreB == "" && APaternoB == "" && AmaternoB == "") {
				ngNotify.set('Introduce un nombre válido.', 'warn');
			} else {
				var Parametros = {
					'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
					'Clv_Queja': 0,
					'Contrato': 0,
					'NOMBRE': NombreB,
					'AP': APaternoB,
					'AM': AmaternoB,
					'CALLE': '',
					'NUMERO': '',
					'SetupBox': '',
					'Status': '',
					'Op': 1,
					'ClvColonia': 0,
					'IdCompania': 0,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': 0
				};
				quejasFactory.ObtenLista(Parametros).then(function (data) {
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
					if (vm.ListaQuejas.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
			vm.Nombre = "";
			vm.APaterno = "";
			vm.AMaterno = "";
		}

		function BuscaporDireccion() {

			if(!(/^\d{1,9}/.test(vm.Numero))){
				var Num = "";
				vm.Numero = Num;
			}else{
				var Num = vm.Numero;
			}

			if (vm.Colonia == null) {
				ngNotify.set('Por favor seleccione una compañía y una colonia.', 'warn');
				vm.Numero = "";
			} else if (vm.Colonia.clvColonia == null || vm.Colonia.clvColonia == 0) {
				ngNotify.set('Por favor seleccione una compañía y una colonia.', 'warn');
				vm.Numero = "";
			} else {
				var Parametros = {
					'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
					'Clv_Queja': 0,
					'Contrato': 0,
					'NOMBRE': '',
					'AP': '',
					'AM': '',
					'CALLE': vm.Calle,
					'NUMERO': Num,
					'SetupBox': '',
					'Status': '',
					'Op': 2,
					'ClvColonia': vm.Colonia.clvColonia,
					'IdCompania': 0,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': 0
				};
				quejasFactory.ObtenLista(Parametros).then(function (data) {
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
					if (vm.ListaQuejas.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
			vm.Calle = "";
			vm.Numero = "";
			vm.Colonia.clvColonia = vm.Colonia.clvColonia[0];
		}

		function CambioPlaza(x) {
			quejasFactory.ObtenColonias(x.id_compania).then(function (data) {
				vm.Colonias = data.GetuspConsultaColoniasListResult;
				
				var Parametros = {
					'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
					'Clv_Queja': 0,
					'Contrato': 0,
					'NOMBRE': '',
					'AP': '',
					'AM': '',
					'CALLE': '',
					'NUMERO': '',
					'SetupBox': '',
					'Status': vm.Status.Clave,
					'Op': 199,
					'ClvColonia': 0,
					'IdCompania': x.id_compania,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': 0
				};
				quejasFactory.ObtenLista(Parametros).then(function (data) {
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
					if (vm.ListaQuejas.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			});
		}

		function CambioServicio(x) {
			var Parametros = {
				'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
				'Clv_Queja': 0,
				'Contrato': 0,
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': vm.Status.Clave,
				'Op': 4,
				'ClvColonia': 0,
				'IdCompania': vm.Plaza.id_compania,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function (data) {
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
				if (vm.ListaQuejas.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
			});
		}

		function CambioStatus() {

			var Parametros = {
				'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
				'Clv_Queja': 0,
				'Contrato': '',
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': vm.Status.Clave,
				'Op': 199,
				'ClvColonia': 0,
				'IdCompania': vm.Plaza.id_compania,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function (data) {
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
				if (vm.ListaQuejas.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
			});

		}

		function CambioNivel() {
			var Parametros = {
				'Clv_TipSer': 0,
				'Clv_Queja': 0,
				'Contrato': '',
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': '',
				'Op': 1,
				'ClvColonia': 0,
				'IdCompania': 0,
				'ClvUsuario': 0,
				'SoloNivel2': vm.Nivel2.isChecked,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function (data) {
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});
		}

		function BuscaporSTB() {
			if (vm.STB == null || vm.STB == "") {
				ngNotify.set('Ingresa una Serie de STB válida.', 'warn');
			} else {
				var Parametros = {
					'Clv_TipSer': 0,
					'Clv_Queja': 0,
					'Contrato': 0,
					'NOMBRE': '',
					'AP': '',
					'AM': '',
					'CALLE': '',
					'NUMERO': '',
					'SetupBox': vm.STB,
					'Status': '',
					'Op': 6,
					'ClvColonia': 0,
					'IdCompania': 0,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': 0
				};
				quejasFactory.ObtenLista(Parametros).then(function (data) {
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
					if (vm.ListaQuejas.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
				vm.STB = "";
			}
		}

		function BuscaporTicket() {

			if (vm.Ticket == null || vm.Ticket == "") {
				ngNotify.set('Ingresa un número de ticket válido.', 'warn');
			} else {
				var Parametros = {
					'Clv_TipSer': 0,
					'Clv_Queja': 0,
					'Contrato': 0,
					'NOMBRE': '',
					'AP': '',
					'AM': '',
					'CALLE': '',
					'NUMERO': '',
					'SetupBox': '',
					'Status': '',
					'Op': 7,
					'ClvColonia': 0,
					'IdCompania': 0,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': vm.Ticket
				};
				quejasFactory.ObtenLista(Parametros).then(function (data) {
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
					if (vm.ListaQuejas.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
			vm.Ticket = "";
		}

		function abrirBonificacion(object) {
			var detalle = {};
			detalle.Block = false;
			alert(object.Clv_Queja);
			detalle.Queja = object.Clv_Queja;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalBonificacion.html',
				controller: 'ModalBonificacionCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					detalle: function () {
						return detalle;
					}
				}
			});
		}

		function abrirDetalleQueja(details) {
			var detalle = {};
			detalle.Clv_Queja = details.Clv_Queja;
			detalle.Clv_TipSer = details.Clv_TipSer;
			detalle.Contrato = details.Contrato;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalConsultaQueja.html',
				controller: 'ModalConsultaQuejaCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					detalle: function () {
						return detalle;
					}
				}
			});
		}

		function EjecutaQueja(id, contrato, servicio) {

			$state.go('home.procesos.ejecutaqueja', {
				'id': id,
				'contrato': contrato,
				'servicio': servicio
			});
		}

		function EliminaQueja(details) {
			var detalle = {};
			detalle.Clv_Queja = details.Clv_Queja;
			detalle.Clv_TipSer = details.Clv_TipSer;
			detalle.Contrato = details.Contrato;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalEliminaQueja.html',
				controller: 'ModalEliminaQuejaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					detalle: function () {
						return detalle;
					}
				}
			});
		}
		var vm = this;
		InitalData();

		vm.Titulo = 'Reportes área técnica'
		vm.BuscaReporte = BuscaReporte;
		vm.BuscaContrato = BuscaContrato;
		vm.BuscaporNombre = BuscaporNombre;
		vm.BuscaporDireccion = BuscaporDireccion;
		vm.CambioPlaza = CambioPlaza;
		vm.CambioServicio = CambioServicio;
		vm.CambioStatus = CambioStatus;
		vm.CambioNivel = CambioNivel;
		vm.BuscaporSTB = BuscaporSTB;
		vm.BuscaporTicket = BuscaporTicket;
		vm.abrirBonificacion = abrirBonificacion;
		vm.abrirDetalleQueja = abrirDetalleQueja;
		vm.EjecutaQueja = EjecutaQueja;
		vm.EliminaQueja = EliminaQueja;
		vm.LosStatus = [{
			'Clave': 'P',
			'Nombre': 'Pendiente'
		},
		{
			'Clave': 'V',
			'Nombre': 'Con Visita'
		},
		{
			'Clave': 'E',
			'Nombre': 'Ejecutadas'
		},
		{
			'Clave': 'S',
			'Nombre': 'En Proceso'
		}
		];

	});
