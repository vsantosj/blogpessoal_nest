import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_posts"})
export class Post{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 1000, nullable: false})
    title: string;

    @Column({length: 1000, nullable: false})
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}