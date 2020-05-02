export class AnnouncementModal {
  public announcementTitle: string;
  public announcementDescription: string;
  public announcementDate: string;
  constructor(announcementTitle: string, announcementDescription: string, announcementDate: string) {
    this.announcementTitle = announcementTitle;
    this.announcementDescription = announcementDescription;
    this.announcementDate = announcementDate;
  }
}
