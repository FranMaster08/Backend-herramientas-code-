import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorias } from './Categorias';

@Index('id_categoria', ['idCategoria'], {})
@Entity('herramientas', { schema: 'herramientasDb' })
export class Herramientas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', length: 255 })
  nombre: string;

  @Column('double', { name: 'peso', precision: 22 })
  peso: number;

  @Column('int', { name: 'id_categoria' })
  idCategoria: number;

  @ManyToOne(() => Categorias, (categorias) => categorias.herramientas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_categoria', referencedColumnName: 'id' }])
  idCategoria2: Categorias;
}
