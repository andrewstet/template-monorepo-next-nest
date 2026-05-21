import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ExampleItem } from "./example-item.entity";

@Entity({ name: "User" })
@Index("User_email_key", ["email"], { unique: true })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp", precision: 3 })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", precision: 3 })
  updatedAt!: Date;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "text" })
  passwordHash!: string;

  @OneToMany(() => ExampleItem, (item) => item.user)
  items!: ExampleItem[];
}
