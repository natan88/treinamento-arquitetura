import { injectable } from 'inversify'
import { Entidade } from '../../crosscutting'
import { Endereco } from './Endereco'
import { Imovel } from './Imovel'

export class Pessoa extends Entidade<number> {
  protected nome: string
  protected cpf: string
  protected endereco: Endereco

  constructor(params: { nome: string, cpf: string, endereco: Endereco }) {
    super()
    const { nome, cpf, endereco } = params
    this.nome = nome
    this.cpf = cpf
    this.endereco = endereco
  }
}

export class Inquilino extends Pessoa {
  private bloqueado: boolean
  private imoveisAlugados: Imovel[]
  private limiteAlugueis: number

  constructor(params: { nome: string, cpf: string, endereco: Endereco, limiteAlugueis: number }) {
    const { limiteAlugueis, ...data } = params
    super(data)
    this.bloqueado = false
    this.imoveisAlugados = []
    this.limiteAlugueis = limiteAlugueis
  }

  bloqueiaInquilino(): void {
    this.bloqueado = true
  }

  estaBloqueado(): boolean {
    return this.bloqueado
  }

  getImoveisAlugados(): Imovel[] {
    return this.imoveisAlugados
  }

  addImovelAlugado(imovel: Imovel) {
    this.imoveisAlugados.push(imovel)
  }

  podeAlugar(): boolean {
    if (this.bloqueado) return false
    return this.limiteAlugueis >= this.imoveisAlugados.length
  }

  async bloqueia(): Promise<void> {
    this.bloqueado = true
  }

  desbloqueia(): void {
    this.bloqueado = false
  }
}
