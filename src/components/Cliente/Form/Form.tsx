import React from "react";
import { IProps, IState } from "../types";
import { cpfMask } from "../../../utils/masks/mascaraCpf";
import { TipoTelefone } from "../../../enums/TipoTelefone";
import listarClientes from "../../../services/listarClientes";
import { Cliente } from "../../../models/cliente/Cliente";
import cadastrarClientes from "../../../services/cadastrarClientes";
import Button from 'react-bootstrap/Button'
import excluirClientes from "../../../services/excluirClientes";
import { Telefone } from "../../../models/cliente/Telefone";
import { Email } from "../../../models/cliente/Email";
import  "../../Login/style/Login.css";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export class Form extends React.Component<IProps, IState> {
   initialState = {
      cliente: {
         nome: '',
         cpf: '',
         email: [],
         endereco: {
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: ''
         },
         telefone: []
      },
      telefone: {
         tipo: TipoTelefone.CELULAR,
         numero: 0
      },
      email: {
         endereco: ''
      },
      clientes: []
   };


   constructor(props: IProps) {
      super(props);
      this.handleChangeNome = this.handleChangeNome.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmitExclusaoCliente = this.handleSubmitExclusaoCliente.bind(this);
      this.handleSubmitEditarCliente = this.handleSubmitEditarCliente.bind(this);
      this.handleCpf = this.handleCpf.bind(this);
      this.renderTableTelefones = this.renderTableTelefones.bind(this);
      this.renderTableEmails = this.renderTableEmails.bind(this);
      this.renderTableClientes = this.renderTableClientes.bind(this);
      this.handleFormReset = this.handleFormReset.bind(this);
      this.adicionarTelefone = this.adicionarTelefone.bind(this);
      this.adicionarEmail = this.adicionarEmail.bind(this);
   }

   state: IState = this.initialState;

   renderTableClientes() {
      return this.state.clientes.map((cliente, index) => {
         const { nome, cpf, email, endereco, telefone } = cliente
         return (
            <tr>
               <td>{nome}</td>
               <td>{cpf}</td>
               <td>{endereco.cep}</td>
               <td>{endereco.logradouro}</td>
               <td>{endereco.bairro}</td>
               <td>{endereco.cidade}</td>
               <td>{endereco.uf}</td>
               <td>{endereco.complemento}</td>
               <td>
                  {email.map((e) => {
                     return (<tr>{e.endereco}</tr>);
                  })}
               </td>
               <td>
                  {telefone.map((t) => {
                     return (<tr>{`${t.tipo} - ${t.numero}`}</tr>);
                  })}
               </td>

               <td>
                  <div className="column">
                     <Button variant="primary" onClick={() => {
                           this.handleSubmitExclusaoCliente((cliente as any).id);
                        }}>Excluir
                     </Button>
                     <Button variant="primary" onClick={() => {
                           this.handleSubmitEditarCliente(cliente);
                        }}>Editar
                     </Button>
                   </div>
               </td>
            </tr>
         )
      })
   }

   renderTableEmails() {
      return this.state.cliente.email.map((email, index) => {
         const { endereco } = email
         return (
            <tr>
               <td>{endereco}</td>
            </tr>
         )
      })
   }

   renderTableTelefones() {
      return this.state.cliente.telefone.map((telefone, index) => {
         const { tipo, numero } = telefone
         return (
            <tr>
               <td>{tipo}</td>
               <td>{numero}</td>
            </tr>
         )
      })
   }

   handleChangeNome(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
         cliente: {
            ...this.state.cliente,
            nome: event.target.value
         }
      });
   }

   adicionarEmail() {
      let listaEmails: Array<Email> = this.state.cliente.email;
      listaEmails.push(this.state.email);
      this.setState({
         cliente: {
            ...this.state.cliente,
            email: listaEmails
         },
         email: {
            endereco: ''
         }
      });


   }

   adicionarTelefone() {
      let listaTelefones: Array<Telefone> = this.state.cliente.telefone;
      listaTelefones.push(this.state.telefone);
      this.setState({
         cliente: {
            ...this.state.cliente,
            telefone: listaTelefones
         },
         telefone: {
            numero: 0,
            tipo: TipoTelefone.CELULAR
         }
      });


   }

   handleCpf(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
         cliente: {
            ...this.state.cliente,
            cpf: cpfMask(event.target.value)
         }
      })
   }

   handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      cadastrarClientes(this.state.cliente)
         .then((cliente: Cliente) => {
            alert("Cliente " + cliente.nome + " cadastrado com sucesso !!")
            this.handleFormReset();
         });
      event.preventDefault();
   }

   handleSubmitExclusaoCliente(idCliente: string) {
      excluirClientes(idCliente)
         .then(() => {
            alert("Cliente " + idCliente + " excluido com sucesso !!");
            this.handleFormReset();
         })
         .catch(() => {
            alert("Ocorreu um erro !!");
         })
   }

   handleSubmitEditarCliente(cliente: Cliente) {
      this.setState({
         cliente: cliente
      });
   }

   handleFormReset() {
      let listaDeClientes: Array<Cliente> = [];
      let init: IState;

      listarClientes()
         .then((lista: Array<Cliente>) => {
            listaDeClientes = lista;
         })
         .then(() => {
            init = {
               ...this.initialState,
               clientes: listaDeClientes,
               cliente: {
                  ...this.state.cliente,
                  email: [],
                  telefone: []
               }
            };
         })
         .then(() => {
            this.setState(() => init);
         });
   }

   componentDidMount() {
      listarClientes()
         .then((lista: Array<Cliente>) => {
            this.setState({
               clientes: lista
            });
         })
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit} onReset={this.handleFormReset} style={{margin: 0 , maxWidth: 320}}>
            <FormGroup >
              <FormLabel>Email</FormLabel>
              <FormControl

                  required={true} maxLength={100} minLength={3} type="text" value={this.state.cliente.nome}
                  onChange={this.handleChangeNome}
               />
            </FormGroup>

            <div>
            <FormGroup>
              <FormLabel>CPF:</FormLabel>
              <FormControl
                  required={true} type="number" maxLength={14} value={this.state.cliente.cpf} onChange={this.handleCpf}
               />
            </FormGroup>
            </div>

            <div>
               <fieldset title="Endereço">
                  <div>
                     <div>
                        <FormGroup>
                           <FormLabel>CEP:</FormLabel>
                           <FormControl
                                 required={true} type="text" value={this.state.cliente.endereco.cep} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              this.setState({
                                 cliente: {
                                    ...this.state.cliente,
                                    endereco: {
                                       ...this.state.cliente.endereco,
                                       cep: event.target.value
                                    }
                                 }
                              });
                           }}
                              />
                        </FormGroup>
                     </div>
                     <div>
                        <FormGroup>
                           <FormLabel>LOGRADOURO:</FormLabel>
                           <FormControl required={true} type="text" value={this.state.cliente.endereco.logradouro} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              this.setState({
                                 cliente: {
                                    ...this.state.cliente,
                                    endereco: {
                                       ...this.state.cliente.endereco,
                                       logradouro: event.target.value
                                    }
                                 }
                              });
                           }}
                              />
                        </FormGroup>
                     </div>

                     <div>
                        <FormGroup>
                           <FormLabel>BAIRRO:</FormLabel>
                           <FormControl required={true} type="text" value={this.state.cliente.endereco.bairro} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              this.setState({
                                 cliente: {
                                    ...this.state.cliente,
                                    endereco: {
                                       ...this.state.cliente.endereco,
                                       bairro: event.target.value
                                    }
                                 }
                              });
                           }}
                              />
                        </FormGroup>
                     </div>

                     <div>
                        <FormGroup>
                           <FormLabel>BAIRRO:</FormLabel>
                           <FormControl required={true} type="text" value={this.state.cliente.endereco.cidade} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              this.setState({
                                 cliente: {
                                    ...this.state.cliente,
                                    endereco: {
                                       ...this.state.cliente.endereco,
                                       cidade: event.target.value
                                    }
                                 }
                              });
                           }}
                              />
                        </FormGroup>
                     </div>

                     <div>
                        <FormGroup>
                           <FormLabel>UF:</FormLabel>
                           <FormControl required={true} type="text" value={this.state.cliente.endereco.uf} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              this.setState({
                                 cliente: {
                                    ...this.state.cliente,
                                    endereco: {
                                       ...this.state.cliente.endereco,
                                       uf: event.target.value
                                    }
                                 }
                              });
                           }}
                              />
                        </FormGroup>
                     </div>

                     <div>
                        <FormGroup>
                           <FormLabel>COMPLEMENTO:</FormLabel>
                           <FormControl required={true} type="text" value={this.state.cliente.endereco.complemento} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              this.setState({
                                 cliente: {
                                    ...this.state.cliente,
                                    endereco: {
                                       ...this.state.cliente.endereco,
                                       complemento: event.target.value
                                    }
                                 }
                              });
                           }}
                              />
                        </FormGroup>
                     </div>
                  </div>
               </fieldset>
            </div>

            <div>
               <fieldset title="Telefone">
                     <legend>TELEFONE</legend>
                     {



                        /*onChange={(event) => {
                           this.setState({
                              cliente: {
                                 ...this.state.cliente,
                                 endereco: {
                                    ...this.state.cliente.endereco,
                                    complemento: event.target.value
                                 }
                              }
                           });
                        }}
                        
                        
                         <select value={this.state.telefone.tipo}>
                                    {Object.keys(TipoTelefone).map((key: string) => (
                        <option key={key} value={key}>
                           {(TipoTelefone as any)[key].name}
                        </option>
                     ))}
                     </select> */}

                     <select defaultValue="CELULAR" value={this.state.telefone.tipo} onChange={(event) => {
                        this.setState({
                           ...this.state,
                           telefone: {
                              ...this.state.telefone,
                              tipo: event.target.value as any
                           }
                        })
                     }}>
                        <option value="RESIDENCIAL">RESIDENCIAL</option>
                        <option value="COMERCIAL">COMERCIAL</option>
                        <option value="CELULAR">CELULAR</option>
                     </select>

                     <div>

                     <FormGroup>
                           <FormLabel>NÚMERO:</FormLabel>
                           <FormControl type="number" value={this.state.telefone.numero as any} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              this.setState({
                                 ...this.state,
                                 telefone: {
                                    ...this.state.telefone,
                                    numero: Number.parseInt(event.target.value)
                                 }
                              });
                           }}
                              />
                      </FormGroup>
                     </div>
                     

                     <Button variant="success" size="sm" onClick={() => this.adicionarTelefone()}>
                        Adicionar Telefone
                     </Button>
                  <div>
                     <table id='telefones'>
                        <tbody>
                           {this.renderTableTelefones()}
                        </tbody>
                     </table>
                  </div>
               </fieldset>
            </div>

            <div>
               <fieldset name="Email">
                  <div>
                     <legend>EMAIL</legend>
                     <FormGroup>
                           <FormControl type="text" value={this.state.email.endereco} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                           ...this.state,
                           email: {
                              ...this.state.email,
                              endereco: event.target.value
                           }
                        });
                     }}
                              />
                      </FormGroup>

                     <Button variant="success" size="sm" onClick={() => this.adicionarEmail()}>
                        Adicionar Email
                     </Button>
                  </div>
                  <div>
                     <table id='emails'>
                        <tbody>
                           {this.renderTableEmails()}
                        </tbody>
                     </table>
                  </div>
               </fieldset>
            </div>
            
            <br />
            <br />
            <br />
            <br />
            <Button variant="success" type="submit">
               Gravar
            </Button>
            
            
            <fieldset>
               <label>Listagem de Clientes</label>
               <div>
                  <table id='clientes'>
                     <tbody>
                        <tr>
                           <th>NOME</th>
                           <th>CPF</th>
                           <th>CEP</th>
                           <th>LOGRADOURO</th>
                           <th>BAIRRO</th>
                           <th>CIDADE</th>
                           <th>UF</th>
                           <th>COMPLEMENTO</th>
                           <th>EMAIL(s)</th>
                           <th>TELEFONE(s)</th>
                           <th>AÇÕES</th>
                        </tr>
                        {this.renderTableClientes()}
                     </tbody>
                  </table>
               </div>
            </fieldset>
         </form>
      );
   }
}