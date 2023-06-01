
import {FetchConf} from '../../../BackConfig';
  
export const CreateCpe = async (data) => { 
    let content = await FetchConf('cpe/createcpe','POST',data); 
    return content;
}
 
export const getSerie = async (data) => { 
    let content = await FetchConf('cpe/getserie','POST',data); 
    return content.content;
}

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