import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { absolution, originOfSymmetry } from 'test/mocks/album';
import { DataSource, QueryRunner } from 'typeorm';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

let appDataSource: DataSource;
let queryRunner: QueryRunner;

global.beforeAll(async () => {
  const dataSource: DataSource = new DataSource({
    type: 'postgres',
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  });

  console.log({
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
  });

  try {
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
  } catch (e) {
    console.log(e);
  }
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
        host: POSTGRES_HOST,
        port: +POSTGRES_PORT,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
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
