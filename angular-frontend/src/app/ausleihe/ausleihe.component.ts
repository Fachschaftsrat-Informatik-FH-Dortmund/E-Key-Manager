import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-ausleihe',
  templateUrl: './ausleihe.component.html',
  styleUrl: './ausleihe.component.css',
})
export class AusleiheComponent {
  model = new Student(72, '', '', '');

  studentsubmitted = false;

  onSubmit() {

    this.studentsubmitted = true;
  }
}
