export class SemesterFeeModal {
  constructor(public challanNo: number, public scholarShip: number, public addmissionFee: number,
              public tutionFee: number, public fine: number, public tax: number, public payableFee: number,
              public dueDate: string, public paidDate: string) {
    this.challanNo = challanNo;
    this.scholarShip = scholarShip;
    this.addmissionFee = addmissionFee;
    this.tutionFee = tutionFee;
    this.fine = fine;
    this.tax = tax;
    this.payableFee = payableFee;
    this.dueDate = dueDate;
    this.paidDate = paidDate;
  }
}
