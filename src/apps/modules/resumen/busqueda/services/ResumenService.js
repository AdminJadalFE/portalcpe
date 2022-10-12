const API_SERVER_JADALSYSTEM = 'http://k8s-default-jadalfet-cf91b6022a-2120898865.us-east-1.elb.amazonaws.com/api/cpe/'

export const CpeServiceGetData = async (data) => { 
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type':'application/json'}
        } 
        const response = await fetch(API_SERVER_JADALSYSTEM + 'getresumen', config);  
        const content = await response.json();  
        return content.content;  
}
 