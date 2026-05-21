import "reflect-metadata";
import "dotenv/config";

import { DataSource } from "typeorm";

import { createTypeOrmDataSourceOptions } from "./typeorm.options";

const AppDataSource = new DataSource(createTypeOrmDataSourceOptions());

export default AppDataSource;
