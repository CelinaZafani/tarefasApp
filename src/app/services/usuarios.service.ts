import { Injectable } from '@angular/core';
import { ArmazenamentoService } from './armazenamento.service';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public listarUsuarios=[];

  constructor(private armazenamentoService: ArmazenamentoService) { }
  
  public async buscarTodos(){
    this.listarUsuarios = await this.armazenamentoService.pegarDados('usuarios');

    if(this.listarUsuarios){
      this.listarUsuarios = [];
    }
  }

  public async salvar(usuario: Usuario){
    await this.buscarTodos();

    if(!usuario) {
      return false;
    }

    if(!this.listarUsuarios){
      this.listarUsuarios = [];
    }

    this.listarUsuarios.push(usuario);

    return await this.armazenamentoService.salvarDados('usuarios', this.listarUsuarios);
  }

  public async login(email: string, senha: string) {
    let usuario: Usuario;

    await this.buscarTodos();

    const listaTemporaria = this.listarUsuarios.filter(usuarioArmazenado => {
      return (usuarioArmazenado.email == email && usuarioArmazenado.senha == senha);
    }); // retorna um array mas é necessário um objeto

    if (listaTemporaria.length > 0) {
      usuario = listaTemporaria.reduce(item => item);// reduce vai reduzir um array a um único objeto, retornando um objeto
    }

    return usuario;
  }

  public salvarUsuarioLogado(usuario: Usuario) {
    delete usuario.senha;
    this.armazenamentoService.salvarDados('usuarioLogado', usuario);
  }

  public async buscarUsuarioLogado() {
    return await this.armazenamentoService.pegarDados('usuarioLogado');
  }

  public async removerUsuarioLogado(){
    return await this.armazenamentoService.removerDados('usuarioLogado');
  }
}
