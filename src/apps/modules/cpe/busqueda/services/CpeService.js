
import {FetchGet, FetchConf} from '../../../../BackConfig';


export const getTipoCPE = async () => {
    let content = await FetchGet(`cpe/tipocpe`); 
    if (content.status === false){
        console.log('Ocurrió un error al obtener los datos del servidor')
    }else{
        return content.content;
    } 
}

export const getEstados = async () => {
    let content = await FetchGet(`cpe/estadocpe`); 
    if (content.status === false){
        console.log('Ocurrió un error al obtener los datos del servidor')
    }else{
        return content.content;
    } 
}
 
export const getSedes = async (data) => { 
    let content = await FetchConf('cpe/sedes','POST',data); 
    return content.content;
}

export const getDataResumen = async (data) => { 
    let content = await FetchConf('cpe/getdataresumen','POST',data); 
    return content.content;
}

export const getDataTotalEmision = async (data) => { 
    let content = await FetchConf('cpe/gettotalemision','POST',data); 
    return content.content;
}

export const getDataTotalEstados = async (data) => { 
    let content = await FetchConf('cpe/gettotalestados','POST',data); 
    return content.content;
}
 
export const getDataEstadoTipoCpe = async (data) => { 
    let content = await FetchConf('cpe/getestadotipocpe','POST',data); 
    return content.content;
}
 
export const CpeServiceGetData = async (data) => {  
 
    let content = await FetchConf('cpe/getcpe','POST',data); 
    return content.content;
}

export const GetCpeResume = async (data) => {  
    let content = await FetchConf('cpe/getresumencpe','POST',data); 
    return content.content;
}
 
export const SendEmail = async (data) => { 
    let content = await FetchConf('cpe/sendemail','POST',data); 
    return content.content;
}
 

export const ResendCpe = async (data) => { 
    let content = await FetchConf('cpe/resendcpe','POST',data); 
    return content;
}

export const GetEventos = async (data) => { 
    let content = await FetchConf('cpe/getevent','POST',data); 
    return content;
}