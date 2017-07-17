'use strict';

function reporteContSaldadosCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
  this.$onInit = function () {
    vm.Fecha = $filter('date')(new Date(), 'dd-MM-yyyy');

  }

  function Aceptar() {
   
    var fecha = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
    console.log(fecha);
    ContratoMaestroFactory.GetContratosSaldadosMaestroList(fecha).then(function (data) {
      console.log(data);
      vm.Registros = data.GetContratosSaldadosMaestroListResult;
      vm.RegistrosReporte = [];
      vm.Registros.forEach(function (item) {
        var row = {};
        row.FechaFacturacion = item.FechaFacturacion;
        row.Factura = item.Factura;
        row.ContratoMaestro = item.ContratoMaestro;
        row.Contrato = item.Contrato;
        row.Cliente = item.Cliente;
        row.Importe = item.Importe;
        row.FechaPago = item.FechaPago;
        vm.RegistrosReporte.push(row);
      });
    })
  }


function createPdf() {
        var rows = [[0, 0, 0, 0, 0, 0,]];
        var r = 1;
        var c = 0;
        var ro = 0;
        ro = vm.RegistrosReporte.length;
        var cols = 7;
        var columns = ['FECHA FACTURACION','FACTURA', 'CONTRATO MAESTRO', 'CONTRATO INDIVIDUAL','CLIENTE','IMPORTE','FECHA PAGO']
        for (var i = r; i < ro; i++) {
            rows.push([]);
        }
        for (var i = 0; i < ro; i++) {
            rows[i][0] = vm.RegistrosReporte[i].FechaFacturacion;
            rows[i][1] = vm.RegistrosReporte[i].Factura;
            rows[i][2] = vm.RegistrosReporte[i].ContratoMaestro;
            rows[i][3] = vm.RegistrosReporte[i].Contrato;
            rows[i][4] = vm.RegistrosReporte[i].Cliente;
            rows[i][5] = $filter('currency')(vm.RegistrosReporte[i].Importe);
            rows[i][6] = vm.RegistrosReporte[i].FechaPago;
           
        }
        var doc = new jsPDF({
            orientation: 'letter',
            format: 'A4'
        });
        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
            var str = "Page " + data.pageCount;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(9);
            doc.text(doc.internal.pageSize.width - 28, doc.internal.pageSize.height - 8, str);
        };
        // doc.addImage(img, 'jpeg', 5, 5, 40, 15);
        doc.setFontSize(14);
        doc.setFontType("bold");
        var fontSize = doc.internal.getFontSize(); // Get current font size
        var pageWidth = doc.internal.pageSize.width;
        var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
        var x = (pageWidth - txtWidth) / 2;    // Calculate text's x coordinate    
        doc.text(reportHeaderPdf, x, 14);   // Posición text at x,y
        
        doc.setFontSize(11);
        doc.setFontType("normal");
        doc.text(doc.internal.pageSize.width - 45, 20,vm.FechaHOY);
        doc.setPage(1);
        jsPDF.autoTableSetDefaults({
            headerStyles:
            {
                fontSize: 8.2
            },
            bodyStyles: {
                fontSize: 7.4
            }
        });
        doc.autoTable(columns, rows, {
            startY: 27,
            theme: 'plain',
            styles: {
                overflow: 'linebreak',
            },
            columnStyles: {
                21: { columnWidth: 98 },
            },
            margin: { top: 10, right: 10, bottom: 16, left: 10 },
            addPageContent: pageContent
        });
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        doc.save('ContratosSaldados.pdf');
    }



  var vm = this;
  vm.Aceptar = Aceptar;
  var reportHeaderPdf = "CONTRATOS SALDADOS";
  vm.createPdf=createPdf;
vm.FechaHOY = $filter('date')(new Date(), 'dd-MM-yyyy');
}
angular.module('softvApp').controller('reporteContSaldadosCtrl', reporteContSaldadosCtrl);
