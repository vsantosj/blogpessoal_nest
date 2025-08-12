import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Posts } from "../../posts/entities/posts.entity"
import { ApiProperty } from "@nestjs/swagger"


@Entity({name: "tb_users"})
export class User {

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty() 
    name: string

    @IsEmail()
    @Column({length: 100, nullable: false })
    @ApiProperty({example: 'email@email.com.br'}) 
    user: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "MinhaSenhaF0rte!"}) 
    password: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    photoUrl: string

    @ApiProperty() 
    @OneToMany(() => Posts, (posts) => posts.user)
    post: Posts[]

}
