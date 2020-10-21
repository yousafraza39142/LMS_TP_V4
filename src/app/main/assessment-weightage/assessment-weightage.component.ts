import {Component, OnInit} from '@angular/core';
import {SlideInFromLeft} from "../../transitions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-assessment-weightage',
  templateUrl: './assessment-weightage.component.html',
  styleUrls: ['./assessment-weightage.component.css'],
  animations: [
    SlideInFromLeft()
  ]
})
export class AssessmentWeightageComponent implements OnInit {
  weightageForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.weightageForm = this.fb.group({
      assignment_weightage: ['', Validators.required],
      quiz_weightage: ['', Validators.required],
      project_weightage: ['', Validators.required],
      presentation_weightage: ['', Validators.required],
      course: ['', Validators.required],
      section: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onCreate() {
    if (this.weightageForm.invalid) {
      this.toastr.error('Empty Fields');
    }
    const quiz = this.weightageForm.controls.quiz_weightage.value;
    const assignment = this.weightageForm.controls.assignment_weightage.value;
    const project = this.weightageForm.controls.project_weightage.value;
    const presentation = this.weightageForm.controls.presentation_weightage.value;

    console.log(quiz);
    console.log(assignment);
    console.log(project);
    console.log(presentation);

  }
}
