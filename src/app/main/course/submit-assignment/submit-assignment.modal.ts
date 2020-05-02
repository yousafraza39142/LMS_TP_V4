export class SubmitAssignmentModal {
  public assignmentName: string;
  public dueDate: string;
  public assignmentMaterial: string;
  public submission: string;
  constructor(assignmentName: string, dueDate: string, assignmentMaterial: string) {
    this.assignmentName = assignmentName;
    this.dueDate = dueDate;
    this.assignmentMaterial = assignmentMaterial;
  }
}
