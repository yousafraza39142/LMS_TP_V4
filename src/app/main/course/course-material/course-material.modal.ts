export class CourseMaterialModal {
  public courseMaterilTitle: string;
  public fileName: string;
  public filePath: string;
  constructor(courseMaterialTitle: string , fileName: string, filePath: string) {
    this.courseMaterilTitle = courseMaterialTitle;
    this.fileName = fileName;
    this.filePath = filePath;
  }
}
