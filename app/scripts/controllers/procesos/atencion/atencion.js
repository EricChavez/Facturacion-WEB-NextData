'use strict';
angular
	.module('softvApp')
	.controller('AtencionCtrl', function ($state, ngNotify, atencionFactory, $localStorage, $uibModal) {
		function initialData() {
			atencionFactory.getPlazas().then(function (data) {
				vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
				atencionFactory.getServicios().then(function (data) {
					vm.servicios = data.GetMuestraTipSerPrincipalListResult;
					//vm.selectedServicio = vm.servicios[2];

					atencionFactory.getUsuarios().then(function (data) {
						console.log(data);
						vm.usuarios = data.GetMUESTRAUSUARIOSListResult;

						var obj = {
							servicio: 0,
							reporte: 0,
							contrato: 0,
							nombre: '',
							paterno: '',
							materno: '',
							calle: '',
							numero: '',
							colonia: 0,
							setupbox: '',
							op: 1,
							compania: 0,
							clvUsuario: 0
						};
						atencionFactory.buscarAtencion(obj).then(function (data) {
							vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
							console.log(vm.atenciones);
						});

					});

				});
			});
		}

		function cambioReporte(x) {
			if (x == 1) {
				vm.contrato = '';
				vm.op = 3;
			} else {
				vm.reporte = 0;
				vm.op = 0;
			}
		}

		function cambioServicio() {
			if (vm.selectedServicio == undefined) {
				var tServicio = 0;
			} else {
				var tServicio = vm.selectedServicio.Clv_TipSerPrincipal;
			}
			if (vm.selectedPlaza == undefined) {
				var plaza = 0;
			} else {
				var plaza = vm.selectedPlaza.id_compania;
			}
			var obj = {
				servicio: tServicio,
				reporte: 0,
				contrato: 0,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				op: 4,
				compania: plaza,
				clvUsuario: 0
			};
			atencionFactory.buscarAtencion(obj).then(function (data) {
				console.log(data);
				vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				if (vm.atenciones.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}

				vm.selectedUsuario = false;
			});
		}

		function buscarReporte() {

			if (vm.selectedPlaza == undefined || vm.selectedPlaza == false) {
				ngNotify.set('Selecciona una compañía.', 'warn');
			}else if(vm.selectedServicio == undefined || vm.selectedServicio == false){
				ngNotify.set('Selecciona un tipo de servicio.', 'warn');
			}else if(vm.selectedUsuario == undefined || vm.selectedUsuario == false){
				ngNotify.set('Selecciona un usuario.', 'warn');
			}else{
				console.log("ok");
				var obj = {
					servicio: vm.selectedServicio.Clv_TipSerPrincipal,
					reporte: vm.reporte,
					contrato: 0,
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					op: 9,
					compania: vm.selectedPlaza.id_compania,
					clvUsuario: vm.selectedUsuario.Clave
				};
				console.log(obj);
				atencionFactory.buscarAtencion(obj).then(function (data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
					if (vm.atenciones.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}

		}

		function buscarContrato() {

			if (!(/^\d{1,9}-\d{1,9}$/.test(vm.contrato))) {
				console.log(false);
				ngNotify.set('El número de contrato está formado por 2 grupos de números con un guión intermedio p.e. (1234-1)', 'error');
			} else {
				console.log(true);
				if (vm.selectedServicio == undefined || vm.selectedServicio == false) {
					var servicio = 0;
				} else {
					var servicio = vm.selectedServicio.Clv_TipSerPrincipal;
				}
				if (vm.selectedUsuario == undefined || vm.selectedUsuario == false) {
					var usuario = 0;
				} else {
					var usuario = vm.selectedUsuario.Clave;
				}
				var obj = {
					servicio: servicio,
					reporte: 0,
					contrato: vm.contrato,
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					op: 0,
					compania: 0,
					clvUsuario: usuario
				};
				atencionFactory.buscarAtencion(obj).then(function (data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
					if (vm.atenciones.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}

		}

		function buscarNombres() {
			if (vm.nombre == '' && vm.paterno == '' && vm.materno == '') {
				ngNotify.set('Introduce un nombre válido.', 'error');
			} else if (vm.nombre == undefined && vm.paterno == undefined && vm.materno == undefined) {
				ngNotify.set('Introduce un nombre válido.', 'error');
			} else {
				var obj = {
					servicio: vm.selectedServicio.Clv_TipSerPrincipal,
					reporte: 0,
					contrato: 0,
					nombre: vm.nombre,
					paterno: vm.paterno,
					materno: vm.materno,
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					op: 1,
					compania: vm.selectedPlaza.id_compania,
					clvUsuario: vm.selectedUsuario.Clave
				};
				atencionFactory.buscarAtencion(obj).then(function (data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				});
			}
		}

		function cambioPlaza() {

			if (vm.selectedPlaza == undefined) {
				var plaza = 0;
				vm.colonias = null;
			} else {
				var plaza = vm.selectedPlaza.id_compania
				atencionFactory.getColonias(plaza).then(function (data) {
					vm.colonias = data.GetuspConsultaColoniasListResult;
					vm.selectedColonia = vm.colonias[0];
				});
			}
			var obj = {
				servicio: 0,
				reporte: 0,
				contrato: 0,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				op: 4,
				compania: plaza,
				clvUsuario: 0
			};
			atencionFactory.buscarAtencion(obj).then(function (data) {
				vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				if (vm.atenciones.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}

				vm.selectedServicio = false;
				vm.selectedUsuario = false;
			});
		}

		function buscarColonia() {
			if (vm.selectedColonia == undefined) {
				ngNotify.set('Por favor seleccione una plaza.', 'error');
			} else if (vm.selectedColonia.clvColonia == 0) {
				ngNotify.set('Por favor seleccione una colonia.', 'error');
			} else {
				var obj = {
					servicio: vm.selectedServicio.Clv_TipSerPrincipal,
					reporte: 0,
					contrato: 0,
					nombre: '',
					paterno: '',
					materno: '',
					calle: vm.calle,
					numero: vm.numero,
					colonia: vm.selectedColonia.clvColonia,
					setupbox: '',
					op: 2,
					compania: 0,
					clvUsuario: 0
				};
				atencionFactory.buscarAtencion(obj).then(function (data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				});
			}
		}

		function bucarUsuario() {
			if (vm.selectedUsuario == undefined || vm.selectedUsuario == false) {
				ngNotify.set('Por favor seleccione un usuario.', 'error');
			} else {
				if (vm.selectedServicio == undefined || vm.selectedServicio == false) {
					var tServicio = 0;
				} else {
					var tServicio = vm.selectedServicio.Clv_TipSerPrincipal;
				}
				if (vm.selectedPlaza == undefined) {
					var plaza = 0;
				} else {
					var plaza = vm.selectedPlaza.id_compania;
				}
				console.log("Plaza: " + plaza);
				console.log("Servicio: " + tServicio);
				console.log("Usuario: " + vm.selectedUsuario.Clave);
				var obj = {
					servicio: tServicio,
					reporte: 0,
					contrato: 0,
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					op: 11,
					compania: plaza,
					clvUsuario: vm.selectedUsuario.Clave
				};
				atencionFactory.buscarAtencion(obj).then(function (data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
					if (vm.atenciones.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
		}

		function DetalleLlamada(obj) {
			abrirDetalle(obj.Contrato, obj.llamada, obj.Clv_TipSer);
		}

		function abrirDetalle(contrato, llamada, servicio) {
			var options = {};
			options.contrato = contrato;
			options.llamada = llamada;
			options.servicio = servicio;
			console.log(options);
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalDetalleLlamada.html',
				controller: 'ModalDetalleLlamadaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					options: function () {
						return options;
					}
				}
			});
		}

		function cambiaConReporte() {

			if (vm.selectedUsuario == undefined) {
				var usuario = 0;
			} else {
				var usuario = vm.selectedUsuario.Clave;
			}
			if (vm.selectedPlaza == undefined) {
				var plaza = 0;
			} else {
				var plaza = vm.selectedPlaza.id_compania;
			}

			var op = 0;
			if (vm.conReporte) {
				op = 12;
			} else {
				op = 14;
			}
			var obj = {
				servicio: 0,
				reporte: 0,
				contrato: 0,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				op: op,
				compania: plaza,
				clvUsuario: usuario
			};
			atencionFactory.buscarAtencion(obj).then(function (data) {
				vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				if (vm.atenciones.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
				vm.sinReporte = false;

			});
		}

		function cambiaSinReporte() {

			if (vm.selectedUsuario == undefined) {
				var usuario = 0;
			} else {
				var usuario = vm.selectedUsuario.Clave;
			}
			if (vm.selectedPlaza == undefined) {
				var plaza = 0;
			} else {
				var plaza = vm.selectedPlaza.id_compania;
			}

			var op = 0;
			if (vm.sinReporte) {
				op = 13;
			} else {
				op = 15;
			}
			var obj = {
				servicio: 0,
				reporte: 0,
				contrato: 0,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				op: op,
				compania: plaza,
				clvUsuario: usuario
			};
			atencionFactory.buscarAtencion(obj).then(function (data) {
				vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				if (vm.atenciones.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
				vm.conReporte = false;
			});
		}



		var vm = this;
		vm.cambioReporte = cambioReporte;
		vm.buscarReporte = buscarReporte;
		vm.buscarContrato = buscarContrato
		vm.buscarNombres = buscarNombres;
		vm.cambioPlaza = cambioPlaza;
		vm.buscarColonia = buscarColonia;
		vm.bucarUsuario = bucarUsuario;
		vm.calle = '';
		vm.numero = '';
		vm.atenciones = [];
		vm.DetalleLlamada = DetalleLlamada;
		vm.cambioServicio = cambioServicio;
		vm.cambiaConReporte = cambiaConReporte;
		vm.cambiaSinReporte = cambiaSinReporte;

		initialData();
	});
