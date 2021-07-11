import { IsEmail, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @IsOptional()
  @IsEmail()
  @Column()
  email?: string;

  @Column()
  password: string;
}
