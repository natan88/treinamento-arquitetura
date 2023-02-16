import { Entity } from '../../crosscutting'
import { Imovel } from './Imovel'
import { LocacaoStatus } from './LocacaoStatus'
import { Inquilino } from './Pessoa'

export class Locacao extends Entity<number> {
  private imovel: Imovel
  private inquilino: Inquilino
  private valorMensal: number
  status: LocacaoStatus

  private constructor(imovel: Imovel, inquilino: Inquilino, valorMensal: number) {
    super()
    this.imovel = imovel
    this.inquilino = inquilino
    this.valorMensal = valorMensal
    this.status = LocacaoStatus.REGULAR
  }

  static async cria(
    imovel: Imovel,
    inquilino: Inquilino,
    valorMensal: number
  ): Promise<Locacao> {
    if (!inquilino.podeAlugar()) throw new Error('O inquilo não está apto')
    if (!imovel.disponivelParaLocacao()) throw new Error('O imóvel está alugado')
    imovel.setAlugado()
    return new Locacao(imovel, inquilino, valorMensal)
  }

  async finalizarAluguel(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  receberAluguel(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async registrarAtrasoNoPagamento(mensalidadeEmAtraso: Date): Promise<void> {
    await this.inquilino.bloqueia()
  }

  async cancelarAluguel(): Promise<void> {
    throw new Error('Method not implemented')
  }

}
