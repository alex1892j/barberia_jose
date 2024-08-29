import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity({
    name: "appointment"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    status: string; // 'active', 'disconnected'

    @ManyToOne(() => User, user => user.appointments)
    user: User;
}
