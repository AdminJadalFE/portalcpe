
import {FetchConf, FetchGet} from '../../../BackConfig';
  
export const CreateCpe = async (data) => { 
    data.accion = 'emitir';
    let content = await FetchConf('cpe/createcpe','POST',data);  
    return content;
}

export const PrevisualizeCpe = async (data) => { 
    data.accion = 'test';
    let content = await FetchConf('cpe/createcpe','POST',data);  
    return content;
}
 
export const getSerie = async (data) => { 
    let content = await FetchConf('cpe/getserie','POST',data); 
    return content.content;
} // <--- ENDPOINT PARA SABER SI MI RUC TIENE SERIE

export const CreateSerie = async (data) => { 
    console.log(data);
    let content = await FetchConf('cpe/createserie','POST',data); 

    console.log(content);
    return content.content;
}

export const UpdateSerie = async (data) => { 
    let content = await FetchConf('cpe/updateserie','POST',data); 
    return content.content;
}

export const getUnidad = async () => { 
    let content = await FetchGet('cpe/getunidad'); 
    return content.content;
}

export const getMoneda = async () => { 
    let content = await FetchGet('cpe/getmoneda'); 
    return content.content;
}

export const getTipoDocumentoRelacionado = async () => { 
    let content = await FetchGet('cpe/gettipodocrel'); 
    return content.content;
}

export const getTipoAfectacion = async () => { 
    let content = await FetchGet('cpe/gettipoafectacion'); 
    return content.content;
}

export const getFormaPago = async () => { 
    let content = await FetchGet('cpe/getformapago'); 
    return content.content;
}

export const getTipoNota = async () => { 
    let content = await FetchGet('cpe/gettiponota'); 
    return content.content;
}

export const ConsultaRucDni = async (data) => { 
    data.accion = 'consulta';
    console.log('data',data);
    let content = await FetchConf('cpe/consultarucdni','POST',data);  
    return content;
}