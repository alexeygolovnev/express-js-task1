import { dataSource } from '@configs/database';
import { seedClasses } from './data';

async function run () {
  try {
    await dataSource.initialize();
  } catch (error) {
    console.log('Database initialization error', error);
  }

  seedClasses.forEach(async (SeedClass) => {
    const seedInstance = new SeedClass();

    await seedInstance.run(dataSource);
  });

  console.log('Seeds inserted');
}

run();
