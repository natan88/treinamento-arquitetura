import { inject, injectable } from 'inversify'
import { TYPES } from '../crosscutting/Types'
import { Apartamento, apartamentoParams, Casa, casaParams } from './entities'
import { IImovelRepo } from './IImovelRepo'
import { IPessoaRepo } from './IPessoaRepo'

@injectable()
export class ImovelService {
  constructor(
    @inject(TYPES.ImovelRepo) private imovelRepo: IImovelRepo,
    @inject(TYPES.PessoaRepo) private pessoaRepo: IPessoaRepo
  ) { }

  async criaApartamento(params: apartamentoParams & { proprietarioId: string }): Promise<Apartamento> {
    const { proprietarioId, ...data } = params
    const proprietario = await this.pessoaRepo.findById(proprietarioId)
    if (!proprietario) throw new Error('Proprietário não cadastrado')
    const apartamento = new Apartamento({ ...data, proprietario })
    return this.imovelRepo.insert(apartamento) as unknown as Apartamento
  }

  async criaCasa(params: casaParams & { proprietarioId: number }): Promise<Casa> {
    const { proprietarioId, ...data } = params
    const proprietario = await this.pessoaRepo.findById(proprietarioId)
    if (!proprietario) throw new Error('Proprietário não cadastrado')
    const casa = new Casa({ ...data, proprietario })
    return this.imovelRepo.insert(casa) as unknown as Casa
  }
}
