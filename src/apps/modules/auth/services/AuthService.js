import {FetchGet, FetchConf} from '../../../BackConfig';

export const login = async (data) => { 
    let content = await FetchConf('auth/user/login','POST',data);
    console.log(content)
    return content;
}
 
export const getEmisores = async (data) => { 
    let content = await FetchConf('auth/useremisor/getemisorbyuser','POST',data);
    console.log(content)
    return content;
}
 
