import { Cliente } from './../models/cliente/Cliente';
import Api from './Api';

export default async function listarClientes(): Promise<Array<Cliente>> {
   return Api.GET(`clientes/lista`)
      .then((json: Array<Cliente>) => {
         return json
      });
}
