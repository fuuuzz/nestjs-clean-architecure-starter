// import { AlbumInterface } from 'src/domain/album/album.interface';
import { AlbumInterface } from 'src/domain/album/album.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity implements AlbumInterface {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ type: 'varchar', nullable: false })
  public title: string;

  constructor(title: string, id?: string) {
    this.title = title;
    this.id = id;
  }
}
