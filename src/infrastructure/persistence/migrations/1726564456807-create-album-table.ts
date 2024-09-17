import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAlbumTable1726564456807 implements MigrationInterface {
  name = 'CreateAlbumTable1726564456807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
