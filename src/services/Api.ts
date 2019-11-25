
const API_BASE_PATH = 'http://localhost:8080/';

async function apiGET(endPoint: string, body?: any) {
   try {
      return await apiREQUEST(endPoint, 'GET', body);
   } catch (error) {
      throw error;
   }
}

async function apiPOST(endPoint: string, body?: any) {
   try {
      return await apiREQUEST(endPoint, 'POST', body);
   } catch (error) {
      throw error;
   }
}

async function apiDELETE(endPoint: string, body?: any) {
   try {
      return await apiREQUEST(endPoint, 'DELETE', body);
   } catch (error) {
      throw error;
   }
}

function apiREQUEST(endPoint: string, method: string, body?: any): Promise<any> {

   return new Promise((accept, reject) => {
      const url = `${API_BASE_PATH}${endPoint}`;
      //console.log(`API - Start requesting to ${url}`);

      const requestInit: RequestInit = {
         method: method,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }
      };

      if (body) {
         requestInit.body = JSON.stringify(body);
         // console.log(`API - Body ${requestInit.body}`);
      }

      return fetch(url, requestInit)
         .then(response => {
            console.log(`API - response`, response);
            if (response.status != 200) {
               alert('Ocorreu um erro');
            } else {

               return response.json();
            }
         })
         .then(json => {
            console.log(`API - JSON ${JSON.stringify(json, null, 2)}`);
            if (json.erro) {
               reject(json);
            } else {
               accept(json);
            }
         });
   });
}


export default {
   GET: apiGET,
   POST: apiPOST,
   DELETE: apiDELETE,
   REQUEST: apiREQUEST
}