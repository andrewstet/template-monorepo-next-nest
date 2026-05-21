import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity({ name: "ExampleItem" })
@Index("ExampleItem_userId_idx", ["userId"])
export class ExampleItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp", precision: 3 })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", precision: 3 })
  updatedAt!: Date;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "text" })
  name!: string;

  @ManyToOne(() => User, (user) => user.items, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "userId",
    referencedColumnName: "id",
    foreignKeyConstraintName: "ExampleItem_userId_fkey",
  })
  user!: User;
}
