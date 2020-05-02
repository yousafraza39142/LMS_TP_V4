/*export interface ComplaintModel {
  regNo: string;
  studentName: string;
  contactNo: string;
  email: string;
  complaintRelatedTo: string;
  complaintDetails: string;
  complaintDocument: string;
  revealIdentity: boolean;
  termAndConditionAgreement: boolean;
}*/
export class ComplaintModel {
  constructor(public regNo: string,
              public studentName: string,
              public contactNo: string,
              public email: string,
              public complaintRelatedTo: string,
              public complaintDetails: string,
              public complaintDocument: string,
              public revealIdentity: boolean,
              public termAndConditionAgreement: boolean) {
  }
}
