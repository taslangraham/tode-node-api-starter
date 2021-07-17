import { BaseEntity } from '@mikro-orm/core';
import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { BigIntType } from '@mikro-orm/core/types';

@Entity()
export class User extends BaseEntity<User, '_id', unknown> {
  /**
   * Getter For Primary Key'id'
   */
  public get _id() {
    return this.id;
  }

  @Index()
  @Property()
  public email!: string;

  @Property()
  public password!: string;

  @Property()
  public firstName!: string;

  @Property()
  public lastName!: string;

  @Property({ columnType: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  public createdAt!: Date;

  @Property({ nullable: true, columnType: 'timestamp' })
  public deletedAt!: Date;

  @Property({ onUpdate: () => new Date(), columnType: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  public updatedAt!: Date;

  @Index()
  @PrimaryKey({ index: true, type: BigIntType })
  private id!: number;
}
