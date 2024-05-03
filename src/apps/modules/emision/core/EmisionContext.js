import { 
  useState, 
  createContext,
  useContext, 
} from 'react'

import moment from 'moment'; 

const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");
const horaActual = moment().format("HH:mm:ss");

const cpeInitialize = {
  fechaCpe:fechaActual,
  horaCpe:horaActual,
  fechaVencimiento:fechaActual,
  moneda: 'PEN',
  tipoAfectacion: '1000',
  formaPago: '01',
  afectacionIgv: true,
  porcentajeIgv: '18.00',
  tipoCpe:''
}

const contingenciaInitialize = {
  indContingencia: false,
  serieContingencia: '',
  correlativoContingencia: '',
  codigoAutorizacion: ''
}

const totalesInitialize = {
  subTotal:0,
  igv:0,
  subTotalGravadas:0,
  total:0,
  montoPalabras: ''
}

const referenciaInitialize = {
  fechaCpeRef:fechaActual,
  tipoNotaCredito:'01'
}

const adicionalesInitialize = {
  observaciones:'',
  libre1:'',
  valor1:'',
  libre2:'',
  valor2:'',
  libre3:'',
  valor3:''
}

const receptorInitialize = {
  vehiculo:'',
  conductorID:'',
  conductorDocumento:'',
  conductorNombre:'',
  conductorCompanyId:'',
}

const transporteInitialize = {
  vehiculoPlaca:'',
  correo:'',
  conductorID:'',
  conductorDocumento:'',
  conductorNombre:'',
  conductorCompanyId:'',
  conductorMtc:'',
  trasladoFecha: fechaActual,
  conductorNombres:'',
  conductorApellidos:'',
  conductorTitle:'',
  conductorLicencia:'',
  vehiculoPlaca:'',
  vehiculoPlacaSecundario:'',

}

const envioInitialize = {
  motivoTraslado:'',
  pesoBrutoTotal:'',
  puntoPartida:'',
  puntoPartidaUbigeo:'',
  modalidadTransporte:'',
  numeroBultos:'',
  puntoLlegada:'',
  puntoLlegadaUbigeo:'',
  pesoUnidad:''
}

const EmisionContext = createContext()

const useEmision = () => {
  return useContext(EmisionContext)
}

const EmisionProvider = ({children}) => {

  const [datosCpe, setDatosCpe] = useState(cpeInitialize);
  const [datosContingencia, setDatosContingencia] = useState(contingenciaInitialize);
  const [datosReceptor, setDatosReceptor] = useState(receptorInitialize);  
  const [datosTransporte, setDatosTransporte] = useState(transporteInitialize);
  const [datosEnvio, setDatosEnvio] = useState(envioInitialize);
  const [datosReferencia, setDatosReferencia] = useState(referenciaInitialize);  
  const [datosItem, setDatosItem] = useState([]);
  const [datosDocRel, setDatosDocRel] = useState([]);
  const [datosFormaPago, setDatosFormaPago] = useState([]);
  const [datosTotales, setDatosTotales] = useState(totalesInitialize);
  const [datosAdicionales, setDatosAdicionales] = useState(adicionalesInitialize);

  const setCpeDatosInicial =  async (tipoCpe, formaPago) => { 
    
    setDatosCpe({ ...datosCpe, tipoCpe, formaPago });   
  }

  const setCpeDatos =  async (campo, valor) => { 
    console.log(campo, valor);
    setDatosCpe({ ...datosCpe, [campo]: valor });  
    console.log(datosCpe);
  }

  const setContingenciaDatos =  async (campo, valor) => { 
    setDatosContingencia({ ...datosContingencia, [campo]: valor });  
  }

  const setReceptorDatos =  async (campo, valor) => { 
    setDatosReceptor({ ...datosReceptor, [campo]: valor });  
  }

  const setTransporteDatos =  async (campo, valor) => { 
    setDatosTransporte({ ...datosTransporte, [campo]: valor });  
  }

  const setEnvioDatos =  async (campo, valor) => { 
    setDatosEnvio({ ...datosEnvio, [campo]: valor });  
  }        

  const setReferenciaDatos =  async (campo, valor) => { 
    setDatosReferencia({ ...datosReferencia, [campo]: valor });  
  }

  const setAdicionalesDatos =  async (campo, valor) => { 
    setDatosAdicionales({ ...datosAdicionales, [campo]: valor });  
  }

  const AddItem =  (item) => {  
      console.log(datosCpe);
      let porcIgv = parseFloat(((datosCpe.afectacionIgv ? datosCpe.porcentajeIgv : 0) / 100).toFixed(2));

      item.igv = (item.venta * porcIgv).toFixed(2);
      let igvunit = (item.precio * porcIgv).toFixed(2); 

      item.totalicbper = (parseFloat(item.cantidad) * parseFloat(item.icbper == undefined ? 0 : item.icbper)).toFixed(2);
      item.total = (parseFloat(item.precio) + parseFloat(igvunit) + parseFloat(item.icbper)).toFixed(2) ;
      
      item.totalimpuestos = (parseFloat(item.igv) + parseFloat(item.totalicbper)).toFixed(2);
      item.icbper = parseFloat(item.icbper).toFixed(2);
      item.venta = parseFloat(item.venta).toFixed(2);
      item.precio = parseFloat(item.precio).toFixed(2);
      setDatosItem([...datosItem, item]) 
  }

  const DeleteItem =  (codigo) => { 
    let datosItemTemp =  datosItem.filter(det => det.codigo !== codigo) 
    setDatosItem(datosItemTemp); 
  }

  const setTotales =  () => {  

    let porcIgv = parseFloat(((datosCpe.afectacionIgv ? datosCpe.porcentajeIgv : 0) / 100).toFixed(2));

    let subtotal = 0;
    let totalicbper = 0;
    datosItem.map((item) => { 
      subtotal += parseFloat(item.venta);
      totalicbper += parseFloat(item.totalicbper == undefined ? 0 : item.totalicbper );
    })

    let igv = (subtotal * porcIgv).toFixed(2);
    let totalimpuestos = (parseFloat(totalicbper) + parseFloat(igv)).toFixed(2);
    let total = (subtotal + parseFloat(igv) + totalicbper).toFixed(2);
    let montotexto = montoEnPalabras(total);

    setDatosTotales({ ...datosTotales, 'subTotal': subtotal.toFixed(2),'igv': igv,'subTotalGravadas': subtotal.toFixed(2),'total': total, 'totalicbper': totalicbper.toFixed(2), 'totalimpuestos': totalimpuestos, 'montoPalabras': montotexto });  

  }

  var montoEnPalabras = (function() {
    function Unidades(num) {

        switch (num) {
            case 1:
                return 'UN';
            case 2:
                return 'DOS';
            case 3:
                return 'TRES';
            case 4:
                return 'CUATRO';
            case 5:
                return 'CINCO';
            case 6:
                return 'SEIS';
            case 7:
                return 'SIETE';
            case 8:
                return 'OCHO';
            case 9:
                return 'NUEVE';
        }

        return '';
    } //Unidades()

    function Decenas(num) {

        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0:
                        return 'DIEZ';
                    case 1:
                        return 'ONCE';
                    case 2:
                        return 'DOCE';
                    case 3:
                        return 'TRECE';
                    case 4:
                        return 'CATORCE';
                    case 5:
                        return 'QUINCE';
                    default:
                        return 'DIECI' + Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0:
                        return 'VEINTE';
                    default:
                        return 'VEINTI' + Unidades(unidad);
                }
            case 3:
                return DecenasY('TREINTA', unidad);
            case 4:
                return DecenasY('CUARENTA', unidad);
            case 5:
                return DecenasY('CINCUENTA', unidad);
            case 6:
                return DecenasY('SESENTA', unidad);
            case 7:
                return DecenasY('SETENTA', unidad);
            case 8:
                return DecenasY('OCHENTA', unidad);
            case 9:
                return DecenasY('NOVENTA', unidad);
            case 0:
                return Unidades(unidad);
        }
    } //Unidades()

    function DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)

        return strSin;
    } //DecenasY()

    function Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + Decenas(decenas);
                return 'CIEN';
            case 2:
                return 'DOSCIENTOS ' + Decenas(decenas);
            case 3:
                return 'TRESCIENTOS ' + Decenas(decenas);
            case 4:
                return 'CUATROCIENTOS ' + Decenas(decenas);
            case 5:
                return 'QUINIENTOS ' + Decenas(decenas);
            case 6:
                return 'SEISCIENTOS ' + Decenas(decenas);
            case 7:
                return 'SETECIENTOS ' + Decenas(decenas);
            case 8:
                return 'OCHOCIENTOS ' + Decenas(decenas);
            case 9:
                return 'NOVECIENTOS ' + Decenas(decenas);
        }

        return Decenas(decenas);
    } //Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    } //Seccion()

    function Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = Centenas(resto);

        if (strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    } //Miles()

    function Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = Seccion(num, divisor, 'UN MILLON ', 'MILLONES ');
        let strMiles = Miles(resto);

        if (strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    } //Millones()

    return function NumeroALetras(num) {
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
            letrasMonedaPlural: 'SOLES',
            letrasMonedaSingular: 'SOL',
            letrasMonedaCentavoPlural: 'CENTIMOS',
            letrasMonedaCentavoSingular: 'CENTIMO'
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + (data.centavos) + '/100';
        };

        if (data.enteros == 0)
            return 'CERO '  + data.letrasCentavos  + ' ' + data.letrasMonedaSingular;
        else
            return Millones(data.enteros)  + ' ' + data.letrasCentavos + ' ' + data.letrasMonedaPlural;
    };

})();


  const CleanItem =  () => { 
    setDatosItem([]);
  }

  const AddFormaPago =  (formaPago) => {  
    setDatosFormaPago([...datosFormaPago, formaPago]) 
  }
  const DeleteFormaPago =  (codigoFormaPago) => { 
  let datosFormaPagoTemp =  datosFormaPago.filter(formapago => formapago.codigocuota !== codigoFormaPago)  
  setDatosFormaPago(datosFormaPagoTemp); 
  } 
  const CleanFormaPago  =  () => { 
  setDatosFormaPago([]);
  }

  const AddDocRel =  (docrel) => {  
    setDatosDocRel([...datosDocRel, docrel]) 
  }
  const DeleteDocRel =  (codigoDocRel) => { 
  let datosDocRelTemp =  datosDocRel.filter(docrel => docrel.codigoDocRel !== codigoDocRel) 
  setDatosDocRel(datosDocRelTemp); 
  } 
  const CleanDocRel  =  () => { 
    setDatosDocRel([]);
  } 

  const CleanDatosCpe =  () => { 
    setDatosCpe(cpeInitialize);
  }

  const CleanDatosContingencia =  () => { 
    setDatosContingencia(contingenciaInitialize);
  }

  const CleanDatosReceptor =  () => { 
    setDatosReceptor(receptorInitialize);
  }

  const CleanDatosTransporte =  () => { 
    setDatosTransporte(transporteInitialize);
  }

  const CleanDatosEnvio =  () => { 
    setDatosEnvio(receptorInitialize);
  }
    
  const CleanDatosReferencia =  () => { 
    setDatosReferencia(referenciaInitialize);
  }

  const CleanDatosAdicionales =  () => { 
    setDatosAdicionales(adicionalesInitialize);
  }

  const CleanDatosTotales =  () => { 
    setDatosTotales(totalesInitialize);
  }


  return (
    <EmisionContext.Provider 
      value={{setCpeDatosInicial, setCpeDatos, CleanDatosCpe, setReceptorDatos, setTransporteDatos, setEnvioDatos, CleanDatosReceptor, CleanDatosTransporte, CleanDatosEnvio, setReferenciaDatos, CleanDatosReferencia, setTotales, CleanDatosTotales, setContingenciaDatos, CleanDatosContingencia, setAdicionalesDatos, CleanDatosAdicionales,
               AddItem, DeleteItem, CleanItem, AddFormaPago, DeleteFormaPago, CleanFormaPago, AddDocRel, DeleteDocRel, CleanDocRel,
              datosCpe, datosReceptor, datosTransporte, datosEnvio,datosItem,datosTotales,datosReferencia, datosAdicionales, datosContingencia, datosDocRel, datosFormaPago }}>
      {children}
    </EmisionContext.Provider>
  )
}

export {EmisionProvider, useEmision}