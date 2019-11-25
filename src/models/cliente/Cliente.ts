import { Telefone } from './Telefone';
import { Email } from './Email';
export interface Cliente {
   nome: string;
   cpf: string;
   endereco: {
      cep: string;
      logradouro: string;
      bairro: string;
      cidade: string;
      uf: string;
      complemento?: string;
   }
   telefone: Array<Telefone>
   email: Array<Email>

}