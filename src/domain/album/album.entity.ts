export class Album {
  private _id: string;
  private _title: string;
  private _releaseDate: Date;

  constructor(title: string, releaseDate: Date) {
    this._title = title;
    this._releaseDate = releaseDate;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get releaseDate(): Date {
    return this._releaseDate;
  }

  set releaseDate(releaseDate: Date) {
    this._releaseDate = releaseDate;
  }
}
