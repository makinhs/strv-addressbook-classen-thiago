import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { config } from '../../config/Config';

@Entity('User')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    email: string;
    @Column()
    password: string;

    @BeforeInsert()
    private async hashPassword() {
        this.password = await argon2.hash(this.password, config.argon);
    }
}

export { User };
