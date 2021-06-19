import { Migration } from '@mikro-orm/migrations';

export class Migration20210619214307 extends Migration {

  public async up(): Promise<void> {
    this.addSql('create table "example_model" ("id" serial primary key, "title" varchar(255) not null);');
  }

  public async down(): Promise<void> {
    this.addSql('drop table "example_model"');
  }
}
