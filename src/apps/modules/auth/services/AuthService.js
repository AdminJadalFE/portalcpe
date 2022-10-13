import {FetchConf} from '../../../BackConfig';

export const login = async (data) => { 
    let content = await FetchConf('auth/user/login','POST',data); 
    return content;
}
 
export const getEmisores = async (data) => { 
    let content = await FetchConf('auth/useremisor/getemisorbyuser','POST',data); 
    return content;
}
 
