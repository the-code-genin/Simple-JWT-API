// @ts-nocheck
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import MomentDateString from "../lib/decorators/moment-date-string";

@Entity()
export default abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @MomentDateString
    @CreateDateColumn()
    created_at: String;

    @MomentDateString
    @UpdateDateColumn()
    updated_at: String;
}