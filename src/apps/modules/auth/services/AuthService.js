import {FetchConf} from '../../../BackConfig';

export const login = async (data) => { 
    console.log(data)
    let content = await FetchConf('auth/user/login','POST',data);   
    console.log(content)
    return content;
}

export const updatepassword = async (data) => { 
    let content = await FetchConf('auth/user/updatepwd','POST',data);   
    return content;
}
 
export const getEmisores = async (data) => { 
    let content = await FetchConf('auth/useremisor/getemisorbyuser','POST',data); 
    return content;
}
 
