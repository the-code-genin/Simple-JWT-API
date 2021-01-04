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

    constructor(id: number, created_at: string, updated_at: string) {
        super();
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}