
import {FetchGet, FetchConf} from '../../../../BackConfig';
  
export const CpeServiceGetData = async (data) => { 
    let content = await FetchConf('cpe/getresumen','POST',data);
    console.log(content)
    return content.content;
}