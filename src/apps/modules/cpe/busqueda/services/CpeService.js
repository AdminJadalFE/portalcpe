const API_SERVER_JADALSYSTEM = 'http://k8s-default-jadalfet-cf91b6022a-2120898865.us-east-1.elb.amazonaws.com/api/cpe/'

export const getTipoCPE = async () => { 
    const response = await fetch(API_SERVER_JADALSYSTEM + `tipocpe`);
    const content = await response.json();     
    if (content.status === false){
        console.log('Ocurrió un error al obtener los datos del servidor')
    }else{
        return content.content;
    } 
} 

export const getEstados = async () => {  
    const response = await fetch(API_SERVER_JADALSYSTEM + `estadocpe`);
    const content = await response.json();     
    if (content.status === false){
        console.log('Ocurrió un error al obtener los datos del servidor')
    }else{
        return content.content;
    } 
}
 
export const getSedes = async (data) => { 
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }
    const response = await fetch(API_SERVER_JADALSYSTEM + 'sedes', config); 
    const content = await response.json();   
    return content.content;  
}

export const getDataResumen = async (data) => { 
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }
    const response = await fetch(API_SERVER_JADALSYSTEM + 'getdataresumen', config); 
    const content = await response.json();   
    return content.content;  
}

export const getDataTotalEmision = async (data) => { 
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }
    const response = await fetch(API_SERVER_JADALSYSTEM + 'gettotalemision', config); 
    const content = await response.json();   
    return content.content;  
}

export const getDataTotalEstados = async (data) => { 
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }
    const response = await fetch(API_SERVER_JADALSYSTEM + 'gettotalestados', config); 
    const content = await response.json();   
    return content.content;  
}

export const getDataEstadoTipoCpe = async (data) => { 
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }
    const response = await fetch(API_SERVER_JADALSYSTEM + 'getestadotipocpe', config); 
    const content = await response.json();   
    return content.content;  
}

export const CpeServiceGetData = async (data) => { 
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type':'application/json'}
        } 
        
        const response = await fetch(API_SERVER_JADALSYSTEM + 'getcpe', config);   
        const content = await response.json();   
        return content.content;  
}

export const SendEmail = async (data) => { 
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    } 
    
    const response = await fetch(API_SERVER_JADALSYSTEM + 'sendemail', config);   
    const content = await response.json();   
    return content.content;  
}

 