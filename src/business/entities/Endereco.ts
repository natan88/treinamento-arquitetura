export class Endereco {
  constructor(
    readonly rua: string,
    readonly numero: number | null,
    readonly cep: string,
    readonly uf: Uf,
    readonly cidade: string,
    readonly bairro: string
  ) { }
}

export enum Uf {
  AC = 'Acre',
  AL = 'Alagoas',
  PR = 'Paraná',
  AP = 'Amapá',
  AM = 'Amazonas',
  BA = 'Bahia',
  CE = 'Ceará',
  ES = 'Espírito Santo',
  GO = 'Goiás',
  MA = 'Maranhão',
  MT = 'Mato Grosso',
  MS = 'Mato Grosso do Sul',
  MG = 'Minas Gerais',
  PA = 'Pará',
  PB = 'Paraíba',
  PE = 'Pernambuco',
  PI = 'Piauí',
  RJ = 'Rio de Janeiro',
  RN = 'Rio Grande do Norte',
  RS = 'Rio Grande do Sul',
  RO = 'Rondônia',
  RR = 'Roraima',
  SC = 'Santa Catarina',
  SP = 'São Paulo',
  SE = 'Sergipe',
  TO = 'Tocantins',
  DF = 'Distrito Federal'
}
