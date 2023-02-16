import { IRepo } from '../crosscutting';
import { Apartamento, Casa } from './entities';

export interface IImovelRepo extends IRepo<Apartamento | Casa> { }
