import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum UserType {
  STUDENT = "student",
  TEACHER = "teacher",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "date" })
  birthDate: string; // string or Date depending on use

  @Column({
    type: "enum",
    enum: UserType,
  })
  type: UserType;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
