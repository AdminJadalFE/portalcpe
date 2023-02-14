
import {FetchConf} from '../../../../BackConfig';
  
export const CpeServiceGetData = async (data) => { 
    let content = await FetchConf('cpe/getresumen','POST',data); 
    return content.content;
}