// import { AlbumInterface } from 'src/domain/album/album.interface';
import { AlbumInterface } from 'src/domain/album/album.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity implements AlbumInterface {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ type: 'varchar', nullable: false })
  public title: string;

  @Column({ type: 'date' })
  public releaseDate: Date;

  constructor(title: string, releaseDate: Date, id?: string) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.id = id;
  }
}
