import { Cliente } from './../models/cliente/Cliente';
import Api from './Api';


export default async function cadastrarClientes(cliente: Cliente): Promise<Cliente> {
   return Api.POST('clientes', cliente)
      .then((json: Cliente) => {
         return json
      });
}
