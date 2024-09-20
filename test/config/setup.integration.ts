import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { absolution, originOfSymmetry } from 'test/mocks/album';
import { DataSource, QueryRunner } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE_TEST } =
  process.env;

let appDataSource: DataSource;
let queryRunner: QueryRunner;

global.beforeAll(async () => {
  const dataSource: DataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE_TEST,
  });

  appDataSource = await dataSource.initialize();
  queryRunner = appDataSource.createQueryRunner();
  await queryRunner.manager.query(
    `
        INSERT INTO album (id, title) VALUES
          ($1, $2),
          ($3, $4)
        `,
    [
      absolution.id,
      absolution.title,
      originOfSymmetry.id,
      originOfSymmetry.title,
    ],
  );
});

global.afterAll(async () => {
  await queryRunner.manager.query(`DELETE FROM album`);
  await appDataSource.destroy();
  await global.app?.close();
});

global.setAppModule = async (
  entity,
  useCase,
  repository,
  repositoryInterface: string,
  controller,
) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: DB_HOST,
        port: +DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE_TEST,
        entities: [entity],
      }),
      TypeOrmModule.forFeature([entity]),
      AppModule,
    ],
    providers: [
      useCase,
      { provide: repositoryInterface, useClass: repository },
    ],
    controllers: [controller],
  }).compile();

  global.app = module.createNestApplication();
  global.app.init();
};
