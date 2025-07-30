import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Theme } from "../../theme/entities/theme.entity";

@Entity({ name: "tb_posts" })
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    title: string;

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

        //Relaciona a classe Theme com a atual, criando um objeto theme dentro dela. Quando o tema for deletado, seus posts também serão removidos (onDelete: 'CASCADE').
        //Criar objeto na classe theme
        @ManyToOne( () => Theme, (theme) => theme.posts, {
        onDelete: "CASCADE"
    })
    
    @JoinColumn({name: 'theme_id'})
    theme: Theme

}