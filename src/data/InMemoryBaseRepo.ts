import { Entity, filterRepoParam, IRepo } from '../crosscutting';

export abstract class InMemoryBaseRepo<T extends Entity> implements IRepo<T> {
  private itens: Array<T> = new Array<T>()
  private proximoId: number

  constructor() {
    this.proximoId = 1
  }

  async insert(item: T): Promise<T> {
    item.id = this.proximoId
    this.proximoId++
    this.itens.push(item)
    return item
  }

  async update(item: T): Promise<T | null> {
    const removido = this.delete(item.id)
    if (!removido) return null
    this.itens.push(item)
    return item
  }

  async delete(item: T): Promise<boolean> {
    const index = this.itens.findIndex(el => el.id === item.id)
    if (index === -1) return false
    this.itens.slice(index, 1)
    return true
  }

  async findById(id: number): Promise<T | null> {
    const item = this.itens.find((item) => item.id === id)
    return item || null
  }

  async find(filtro: filterRepoParam[], skip: number, limit: number): Promise<T[]> {
    const result: T[] = []
    for (const [key, value] of filtro) {
      const itens = this.itens.filter((item: any) => item[key] === value)
      if (itens.length) result.push(...itens)
    }
    return result
  }

}
