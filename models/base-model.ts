// @ts-nocheck
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

export default abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created_at: String;

    @UpdateDateColumn()
    updated_at: String;
}