import { Container } from 'inversify'
import { InMemoryImovelRepo, InMemoryInquilinoRepo, InMemoryLocacaoRepo, InMemoryPessoaRepo } from '../data'
import { IImovelRepo, IInquilinoRepo, ILocacaoRepo, InquilinoService, IPessoaRepo, LocacaoService } from '../business'
import { TYPES } from './Types';
import { PessoaService } from '../business/PessoaService';
import { ImovelService } from '../business/ImovelService';

export class IoC {
  constructor(
    private container: Container = new Container({ skipBaseClassChecks: true, autoBindInjectable: true })
  ) { }

  build(): Container {
    // Repositórios
    this.container.bind<ILocacaoRepo>(TYPES.LocacaoRepo).to(InMemoryLocacaoRepo).inSingletonScope()
    this.container.bind<IImovelRepo>(TYPES.ImovelRepo).to(InMemoryImovelRepo).inSingletonScope()
    this.container.bind<IInquilinoRepo>(TYPES.InquilinoRepo).to(InMemoryInquilinoRepo).inSingletonScope()
    this.container.bind<IPessoaRepo>(TYPES.PessoaRepo).to(InMemoryPessoaRepo).inSingletonScope()

    // Serviços
    this.container.bind(TYPES.PessoaService).to(PessoaService)
    this.container.bind(TYPES.InquilinoService).to(InquilinoService)
    this.container.bind(TYPES.LocacaoService).to(LocacaoService)
    this.container.bind(TYPES.ImovelService).to(ImovelService)

    return this.container
  }

}
