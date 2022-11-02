import { DataSource } from 'typeorm';

export default abstract class BaseSeed {
  async run (dataSource: DataSource): Promise<void> {};
}
