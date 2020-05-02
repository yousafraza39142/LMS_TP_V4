export class StudentInformationModel {
    public registrationNo: string;
    public studentName: string;
    public fatherName: string;
    public cnic: string;
    public phoneNumber: number;
    public city: string;
    public cgpa: number;
    public programme: string;
    public term: string;
    public totalEarnCreditHours: number;
    public acceptedCreditHours: number;
    public requestRecivedDate: string;
    public requestStatus: string;
    public password: string;
    constructor( registrationNo: string, studentName: string, fatherName: string, cnic: string, phoneNumber: number, city: string,
                 cgpa: number, programme: string, term: string, totalEarnCreditHours: number, acceptedCreditHours: number,
                 requestRecivedDate: string, requestStatus: string, password: string) {
      this.registrationNo = registrationNo;
      this.studentName = studentName;
      this.fatherName = fatherName;
      this.cnic = cnic;
      this.phoneNumber = phoneNumber;
      this.city = city;
      this.cgpa = cgpa;
      this.programme = programme;
      this.term = term;
      this.totalEarnCreditHours = totalEarnCreditHours;
      this.acceptedCreditHours = acceptedCreditHours;
      this.requestRecivedDate = requestRecivedDate;
      this.requestStatus = requestStatus;
      this.password = password;
    }
}
