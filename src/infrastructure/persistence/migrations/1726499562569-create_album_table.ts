import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAlbumTable1726499562569 implements MigrationInterface {
  name = 'CreateAlbumTable1726499562569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "releaseDate" date NOT NULL, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
