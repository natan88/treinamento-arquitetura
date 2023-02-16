import { inject, injectable } from 'inversify';
import { TYPES } from '../crosscutting/Types';
import { Endereco, Inquilino } from './entities';
import { IInquilinoRepo } from './IInquilinoRepo';

@injectable()
export class InquilinoService {
  constructor(
    @inject(TYPES.InquilinoRepo) private inquilinoRepo: IInquilinoRepo
  ) { }

  async cria(limiteAlugueis: number, endereco: Endereco, nome: string, cpf: string): Promise<Inquilino> {
    const inquilino = new Inquilino({
      nome,
      cpf,
      limiteAlugueis,
      endereco
    })
    return this.inquilinoRepo.insert(inquilino)
  }

  async bloqueia(inquilinoId: number): Promise<void> {
    const inquilino = await this.inquilinoRepo.findById(inquilinoId)
    if (!inquilino) throw new Error('Inquilino não encontrado')
    inquilino.bloqueiaInquilino()
    await this.inquilinoRepo.update(inquilino)
  }

  async desbloqueia(inquilinoId: number): Promise<void> {
    const inquilino = await this.inquilinoRepo.findById(inquilinoId)
    if (!inquilino) throw new Error('Inquilino não encontrado')
    inquilino.desbloqueia()
    await this.inquilinoRepo.update(inquilino)
  }
}
