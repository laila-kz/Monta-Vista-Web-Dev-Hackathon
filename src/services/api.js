const BASE_URL="http://localhost:3000"; 

async function request(endpoint, method='GET', body=null) {
    try{
        const options ={method, headers:{}};

        if(body){
            options.headers['Content-Type']='application/json';
            options.body=JSON.stringify(body);
        }
        const res= await fetch(`${BASE_URL}/${endpoint}`, options);
        if(!res.ok){
            throw new Error(`API request failed with status ${res.status}`);
        }return await res.json();
    }catch(error){
        console.error("API request error:", error);
        throw error;
    }
}

export const api={
     get: (endpoint) => request(endpoint, "GET"),
  post: (endpoint, body) => request(endpoint, "POST", body),
  patch: (endpoint, body) => request(endpoint, "PATCH", body),
    delete: (endpoint) => request(endpoint, "DELETE"),
};

export default BASE_URL;