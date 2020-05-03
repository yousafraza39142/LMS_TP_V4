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
    public year: string;
    public classCode: number;
    public departmentId: number;
    public majorId: number;
    public rn: number;
    public rollNumber: string;
    public dateOfBirth: string;
    public address: string;
    public fId: number;
    public sessionId: number;
    public gender: string;
    public religion: string;
    public MorE: string;
    public degreeNumber: number;
    public degreeRegYear: number;
    public email: string;
    constructor( registrationNo: string, studentName: string, fatherName: string, cnic: string, phoneNumber: number, city: string,
                 cgpa: number, programme: string, term: string, totalEarnCreditHours: number, acceptedCreditHours: number,
                 requestRecivedDate: string, requestStatus: string, password: string,
                 year: string, classCode: number, departmentId: number, majorId: number, rn: number,
                 rollNumber: string, dateOfBirth: string, address: string, fId: number, sessionId: number,
                 gender: string, religion: string, MorE: string, degreeNumber: number, degreeRegYear: number, email: string) {
      this.email = email;
      this.year = year;
      this.classCode = classCode;
      this.departmentId = departmentId;
      this.majorId = majorId;
      this.rn = rn;
      this.rollNumber = rollNumber;
      this.dateOfBirth = dateOfBirth;
      this.address = address;
      this.fId = fId;
      this.sessionId = sessionId;
      this.gender = gender;
      this.religion = religion;
      this.MorE = MorE;
      this.degreeNumber = degreeNumber;
      this.degreeRegYear = degreeRegYear;
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
