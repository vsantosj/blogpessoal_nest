import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Theme } from "../../theme/entities/theme.entity";
import { User } from "../../user/entities/user.entities";

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

    @ManyToOne(() => Theme, (theme) => theme.posts, {
        onDelete: "CASCADE"
    })

    @JoinColumn({ name: 'theme_id' })
    theme: Theme

    @ManyToOne(() => User, (user) => user.post, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'user_id' })
    user: User

}
