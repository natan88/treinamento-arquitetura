import { Entity } from '../../crosscutting';
import { Endereco } from './Endereco';
import { Pessoa } from './Pessoa';

export abstract class Imovel extends Entity<number> {
  endereco: Endereco
  proprietario: Pessoa
  alugado: boolean

  constructor(endereco: Endereco, proprietario: Pessoa) {
    super()
    this.endereco = endereco
    this.proprietario = proprietario
    this.alugado = false
  }

  disponivelParaLocacao(): boolean {
    return !this.alugado
  }

  getEndereco(): Endereco {
    return this.endereco
  }

  getProprietario(): Pessoa {
    return this.proprietario
  }

  setAlugado() {
    this.alugado = true
  }

  public abstract getAreaTotal(): number
}

export class Apartamento extends Imovel {
  dormitorios: number
  banheiros: number
  vagasGaragem: number
  areaPrivativa: number
  areaTotal: number

  constructor(params: apartamentoParams & { proprietario: Pessoa }) {
    const { endereco, proprietario, dormitorios, banheiros, vagasGaragem, areaPrivativa, areaTotal } = params
    super(endereco, proprietario)
    this.dormitorios = dormitorios
    this.banheiros = banheiros
    this.vagasGaragem = vagasGaragem
    this.areaPrivativa = areaPrivativa
    this.areaTotal = areaTotal
  }

  public getAreaTotal(): number {
    return this.areaTotal
  }
}

export class Casa extends Imovel {
  dormitorios: number
  banheiros: number
  vagasGaragem: number
  frente: number
  fundos: number
  areaConstruida: number

  constructor(params: casaParams & { proprietario: Pessoa }) {
    const { endereco, proprietario, dormitorios, banheiros, vagasGaragem, frente, fundos, areaConstruida } = params
    super(endereco, proprietario)
    this.dormitorios = dormitorios
    this.banheiros = banheiros
    this.vagasGaragem = vagasGaragem
    this.frente = frente
    this.fundos = fundos
    this.areaConstruida = areaConstruida
  }

  public getAreaTotal(): number {
    return this.frente * this.fundos
  }

  getAreaConstruida(): number {
    return this.areaConstruida
  }
}

export type imovelParams = {
  endereco: Endereco,
  dormitorios: number,
  banheiros: number,
  vagasGaragem: number
}

export type apartamentoParams = imovelParams & {
  proprietario: Pessoa
  areaPrivativa: number
  areaTotal: number
}

export type casaParams = imovelParams & {
  // proprietario: Pessoa,
  frente: number
  fundos: number
  areaConstruida: number
}
