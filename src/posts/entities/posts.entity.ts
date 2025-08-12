import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Theme } from "../../theme/entities/theme.entity";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_posts" })
export class Posts {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    content: string;

    @ApiProperty()
    @CreateDateColumn()
    created_at: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updated_at: Date;

    @ApiProperty({ type: () => Theme })
    @ManyToOne(() => Theme, (theme) => theme.posts, {
        onDelete: "CASCADE"
    })

    @JoinColumn({ name: 'theme_id' })
    theme: Theme

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.post, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'user_id' })
    user: User

}
