import {SemesterTranscriptModal} from '../semester-transcript/semester-transcript.modal';

export class CompleteTranscriptModal {
  public creditAttempts: number;
  public creditAcceptedTowardsDegree: number;
  public creditEarned: number;
  public CGPA: number;
  public semestersTranscript: SemesterTranscriptModal[];
  constructor(creditAttempts: number, creditAcceptedTowardsDegree: number, creditEarned: number, CGPA: number,
              semestersTranscript: SemesterTranscriptModal[]) {
    this.creditAttempts = creditAttempts;
    this.creditAcceptedTowardsDegree = creditAcceptedTowardsDegree;
    this.creditEarned = creditEarned;
    this.CGPA = CGPA;
    this.semestersTranscript = semestersTranscript;
  }
}
