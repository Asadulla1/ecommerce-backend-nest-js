import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ReivewEntity } from 'src/reivews/entities/reivew.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;
  @Column()
  title: string;
  @Column()
  short_description: string;
  @Column()
  long_description: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;
  @Column()
  stock: string;
  @Column()
  images: string;
  @CreateDateColumn()
  created_at: Timestamp;
  @UpdateDateColumn()
  updated_at: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.products)
  addedBy: UserEntity;

  @ManyToOne(() => CategoryEntity, (cat) => cat.products)
  category: CategoryEntity;

  @OneToMany(() => ReivewEntity, (rev) => rev.product)
  reviews: ReivewEntity[];
}
