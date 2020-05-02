export class BookModal {
  public title: string;
  public auther: string;
  public edition: number;
  constructor(title: string, auther: string, edition: number) {
    this.title = title;
    this.auther = auther;
    this.edition = edition;
  }
}
