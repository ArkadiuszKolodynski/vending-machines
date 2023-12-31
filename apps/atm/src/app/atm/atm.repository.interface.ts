import { Atm } from './atm';

export interface AtmRepository {
  findOne(id: string): Atm | null | Promise<Atm | null>;
  save(atm: Atm): void | Promise<void>;
}

export const AtmRepository = Symbol('AtmRepository');
