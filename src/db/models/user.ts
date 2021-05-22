import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UsersCredential')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    email: string;
    @Column()
    password: string;
}

export { User };
