import 'reflect-metadata'
import { Casa, Endereco, IImovelRepo, IInquilinoRepo, InquilinoService, LocacaoService, Uf } from './business'
import { ImovelService } from './business/ImovelService'
import { PessoaService } from './business/PessoaService'
import { IoC } from './crosscutting/IoC'
import { filterRepoParam } from './crosscutting/IRepo'
import { TYPES } from './crosscutting/Types'

class Server {
  static async initServer(): Promise<void> {
    const ioc = new IoC().build()

    // Proprietário
    const pessoaService = ioc.get<PessoaService>(TYPES.PessoaService)
    const enderecoProprietario = new Endereco('Rua Floriano Peixoto', 200, '75321-251', Uf.RJ, 'Rio de Janeiro', 'Centro')
    const proprietario = await pessoaService.cria(enderecoProprietario, 'Natan', '15423648798')

    // imóvel
    const imovelService = ioc.get<ImovelService>(TYPES.ImovelService)
    const imovel = await imovelService.criaCasa({
      areaConstruida: 60,
      banheiros: 1,
      dormitorios: 3,
      endereco: enderecoProprietario,
      frente: 10,
      fundos: 20,
      vagasGaragem: 2,
      proprietarioId: proprietario.id
    })

    // Inquilino
    const inquilinoService = ioc.get<InquilinoService>(TYPES.InquilinoService)
    const endreecoInquilino = new Endereco('Av. Presidente x', 1500, '758489-555', Uf.RJ, 'Rio de Janeiro', 'Flamengo')
    const inquilino = await inquilinoService.cria(1, endreecoInquilino, 'Maria fulana', '85741254784')

    // Locação
    const locacaoService = ioc.get<LocacaoService>(TYPES.LocacaoService)
    const locacao = await locacaoService.cria(imovel.id, inquilino.id, 1500)
    // console.log('Locação:\n', locacao)

    const imovelRepo = ioc.get<IImovelRepo>(TYPES.ImovelRepo)
    const imovelLocado = await imovelRepo.findById(imovel.id)
    console.log('Imóvel Locado:', imovelLocado)


    // Teste busca
    // await inquilinoService.cria(2, endreecoInquilino, 'José', '88888888888')
    // const inquilinoRepo = ioc.get<IInquilinoRepo>(TYPES.InquilinoRepo)
    // const inquilinoFilter: filterRepoParam[] = [
    //   ['nome', 'Maria fulana'],
    //   ['cpf', '88888888888']
    // ]
    // const inq = await inquilinoRepo.find(inquilinoFilter, 0, 0)
    // console.log('============== FILTER\n', inq)
  }
}

Server.initServer()
