import { injectable } from 'inversify'
import { Pessoa } from '../business/entities/Pessoa'
import { InMemoryBaseRepo } from './InMemoryBaseRepo'

@injectable()
export class InMemoryPessoaRepo extends InMemoryBaseRepo<Pessoa>{ }
