import { inject, injectable } from 'inversify';
import { TYPES } from '../crosscutting/Types';
import { Locacao } from './entities';
import { IImovelRepo } from './IImovelRepo';
import { IInquilinoRepo } from './IInquilinoRepo';
import { ILocacaoRepo } from './ILocacaoRepo';

@injectable()
export class LocacaoService {
  constructor(
    @inject(TYPES.LocacaoRepo) private locacaoRepo: ILocacaoRepo,
    @inject(TYPES.ImovelRepo) private imovelRepo: IImovelRepo,
    @inject(TYPES.InquilinoRepo) private inquilinoRepo: IInquilinoRepo
  ) { }

  async cria(imovelId: number, inquilinoId: number, valor: number): Promise<Locacao> {
    const imovel = await this.imovelRepo.findById(imovelId)
    if (!imovel) throw new Error('Imóvel não cadastrado')
    const inquilino = await this.inquilinoRepo.findById(inquilinoId)
    if (!inquilino) throw new Error('Inquilino não cadastrado')
    const locacao = await Locacao.cria(imovel, inquilino, valor)
    inquilino.addImovelAlugado(imovel)
    return this.locacaoRepo.insert(locacao)
  }

  async receberAluguel(locacaoId: number) {
    const locacao = await this.locacaoRepo.findById(locacaoId)
    if (!locacao) throw new Error('Locação não encontrada')
    locacao.receberAluguel()
    await this.locacaoRepo.update(locacao)
  }
}
