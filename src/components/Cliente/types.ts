import { Email } from './../../models/cliente/Email';
import { Telefone } from './../../models/cliente/Telefone';
import { Cliente } from './../../models/cliente/Cliente';
// Component

// these are all the optional props
export interface IDefaultProps {
  width: number;
  height: number;
}

// these are all the required props
export interface IProps {
}

export interface IState {
  cliente: Cliente;
  telefone: Telefone;
  email: Email;
  clientes: Array<Cliente>;
}

export interface IContext {
  // this might not be needed if the component doesn't consume the context
}