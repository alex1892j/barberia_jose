import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from './Appointment';
import { Credentials } from './Credential';


@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @OneToOne(() => Credentials, { cascade: true })
    @JoinColumn()
    credentials: Credentials;

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];
}


