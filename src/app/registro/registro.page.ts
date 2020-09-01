import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CpfValidator } from '../validators/cpf-validator';
import { ComparacaoValidator } from '../validators/comparacao-valitor';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;
  mensagens_validacao = {
    nome: [
      {tipo: 'required', mensagem: 'O campo nome é obrigatório' },
      {tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres!'}
    ],
    cpf: [
      {tipo: 'required', mensagem: 'O campo CPF é obrigatório' },
      {tipo: 'minlength', mensagem: 'O CPF deve ter pelo menos 11 caracteres!'},
      {tipo: 'maxlength', mensagem: 'O CPF deve ter no máximo 14 caracteres!'},
      {tipo: 'invalido', mensagem: 'CPF Inválido'}
    ],
    dataNascimento: [
      {tipo: 'required', mensagem: 'O campo data de nascimento é obrigatório' }
    ],
    genero: [
      {tipo: 'required', mensagem: 'Escolha o gênero.' }
    ],
    celular: [
      {tipo: 'minlength', mensagem: 'O celular deve ter pelo menos 10 caracteres!'},
      {tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 16 caracteres!'}
    ],
    email: [
      {tipo: 'required', mensagem: 'O campo E-mail é obrigatório' },
      {tipo: 'email', mensagem: 'E-mail inválido!'}
    ],
    senha: [
      {tipo: 'required', mensagem: 'É obrigatório confirmar senha'},
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'}
    ],
    confirmaSenha: [
      {tipo: 'required', mensagem: 'É obrigatório confirmar senha'},
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'},
      {tipo: 'comparacao', mensagem: 'Deve ser igual a senha'}
    ],
}

  constructor(private formBuilder: FormBuilder) {
    this.formRegistro = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(11), 
        Validators.maxLength(14),
        CpfValidator.cpfValido
      ])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validators: ComparacaoValidator('senha', 'confirmaSenha')
    });
   }

  ngOnInit() {
  }

}
