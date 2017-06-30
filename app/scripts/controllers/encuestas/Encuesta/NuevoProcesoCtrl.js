'use strict';
angular
  .module('softvApp')
  .controller('NuevoProcesoCtrl', function ($uibModal, $rootScope, ngNotify, encuestasFactory) {

    function initialData() {
      

    } 

    function CambioBusqueda(){
       if(vm.TipoBusqueda=='R'){
         vm.MuestraStatus=false;
          vm.MuestraFecha=true;
       }
       else{    


          vm.MuestraStatus=true;
        vm.MuestraFecha=false;
       }
    }

 
    var vm = this;
       vm.Estatus=[
      {'clave':'C','Nombre':'Contratado'},
      {'clave':'S','Nombre':'Suspendidos'},
      {'clave':'B','Nombre':'Cancelados'},
      {'clave':'T','Nombre':'Temporales'},
      {'clave':'I','Nombre':'Instalado'},
      {'clave':'D','Nombre':'Desconectado'},
      {'clave':'F','Nombre':'Fuera de servicio'}
    ];
    vm.CambioBusqueda=CambioBusqueda;
    vm.TipoBusqueda='S';
     CambioBusqueda();
    initialData();
  });
