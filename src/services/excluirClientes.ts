import { Cliente } from './../models/cliente/Cliente';
import Api from './Api';


export default async function excluirClientes(idCliente: string): Promise<any> {
   return Api.DELETE("clientes/" + idCliente, null)
      .then((json: Cliente) => {
         return json
      });
}
