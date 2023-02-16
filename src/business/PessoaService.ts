import { inject, injectable } from 'inversify';
import { TYPES } from '../crosscutting/Types';
import { Endereco, Pessoa } from './entities';
import { IPessoaRepo } from './IPessoaRepo';

@injectable()
export class PessoaService {
  constructor(
    @inject(TYPES.PessoaRepo) private pessoaRepo: IPessoaRepo
  ) { }

  async cria(endereco: Endereco, nome: string, cpf: string): Promise<Pessoa> {
    const proprietario = new Pessoa({
      nome,
      cpf,
      endereco
    })
    return this.pessoaRepo.insert(proprietario)
  }
}
