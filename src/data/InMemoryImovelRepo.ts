import { injectable } from 'inversify'
import { Apartamento, Casa } from '../business'
import { InMemoryBaseRepo } from './InMemoryBaseRepo'

@injectable()
export class InMemoryImovelRepo extends InMemoryBaseRepo<Apartamento | Casa> { }
