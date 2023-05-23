
import {FetchGet, FetchConf} from '../../../../BackConfig';
  
export const createReporte = async (data) => {   
    let content = await FetchConf('cpe/createreporte','POST',data); 
    return content;
}
  
export const getReporteData = async (data) => { 

    console.log(data);
    let content = await FetchConf('cpe/getreporte','POST',data); 
    return content.content;
}

 