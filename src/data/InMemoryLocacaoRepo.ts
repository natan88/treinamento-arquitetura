import { injectable } from 'inversify'
import { Locacao } from '../business'
import { InMemoryBaseRepo } from './InMemoryBaseRepo'

@injectable()
export class InMemoryLocacaoRepo extends InMemoryBaseRepo<Locacao> { }
