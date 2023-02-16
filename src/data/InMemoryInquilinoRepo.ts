import { injectable } from 'inversify'
import { Inquilino } from '../business'
import { InMemoryBaseRepo } from './InMemoryBaseRepo'

@injectable()
export class InMemoryInquilinoRepo extends InMemoryBaseRepo<Inquilino> { }
