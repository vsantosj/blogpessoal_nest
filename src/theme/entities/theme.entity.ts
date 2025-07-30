import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "../../posts/entities/posts.entity";


@Entity({ name: "tb_themes" })
export class Theme {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    theme: string;

    //lado 1, um tema terá muitas classes associadas
    @OneToMany(() => Posts, (posts) => posts.theme)
    //por que o tema pode ter uma ou mais postagem asociadas
    posts: Posts[]

}