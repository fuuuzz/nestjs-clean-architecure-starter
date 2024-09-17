import dataSource from 'src/infrastructure/persistence/typeorm.config';

export const cleanupDb = async (): Promise<void> => {
  const appDataSource = await dataSource.initialize();
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.manager.query(`DELETE FROM album`);
  await appDataSource.destroy();
};

export const populateDb = async (): Promise<void> => {
  const appDataSource = await dataSource.initialize();
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.manager.query(`
    INSERT INTO album (id, title) VALUES
      ('af402450-ca1a-4e41-ae34-c80b1a85c933', 'Absolution'),
      ('ed6ef473-5fb3-4060-b4ae-18a3f9c7e393', 'Origin of symmetry')
    `);
  await appDataSource.destroy();
};
