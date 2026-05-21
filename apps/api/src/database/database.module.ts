import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { createTypeOrmModuleOptions } from "./typeorm.options";

@Module({
  imports: [TypeOrmModule.forRoot(createTypeOrmModuleOptions())],
})
export class DatabaseModule {}
