import {
  BaseEntity,
  Cascade,
  Collection,
  Embeddable,
  Embedded,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import SlotEntity from './slot.entity';

@Embeddable()
export class MoneyEmbeddable {
  @Property({ type: 'int' })
  oneCentCount!: number;

  @Property({ type: 'int' })
  tenCentCount!: number;

  @Property({ type: 'int' })
  quarterCount!: number;

  @Property({ type: 'int' })
  oneDollarCount!: number;

  @Property({ type: 'int' })
  fiveDollarCount!: number;

  @Property({ type: 'int' })
  twentyDollarCount!: number;
}

@Entity({ tableName: 'snack_machine' })
export default class SnackMachineEntity extends BaseEntity<SnackMachineEntity, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Embedded(() => MoneyEmbeddable)
  money!: MoneyEmbeddable;

  @OneToMany(() => SlotEntity, (slot) => slot.snackMachine, { cascade: [Cascade.ALL], orphanRemoval: true })
  slots = new Collection<SlotEntity>(this);
}
