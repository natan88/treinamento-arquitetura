import { IRepo } from '../crosscutting'
import { Pessoa } from './entities'

export interface IPessoaRepo extends IRepo<Pessoa> { }
