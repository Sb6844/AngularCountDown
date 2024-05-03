import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CountDownService } from '../count-down.service';
import { CountDownEvents } from '../../models/CountDownEvents';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-create-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, NgFor],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {
  eventForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    description:this.fb.control('', Validators.required),
    startDate: this.fb.control('',Validators.required),
    endDate:  this.fb.control('',Validators.required),
    todos: this.fb.array([])
  })



  constructor(private countDownService: CountDownService, private router: Router, private fb: FormBuilder) {}

ngOnInit(): void {}


  get todos() {
    return this.eventForm.controls["todos"] as FormArray;
  }


  addTodo() {
    const todoForm = this.fb.group({
      action: ['', Validators.required],
    });
    this.todos.push(todoForm);
  }


  deleteLesson(eventIndex: number) {
    this.todos.removeAt(eventIndex);
  }

  onSubmit() {
    var event: CountDownEvents = {
      title: this.eventForm.value.title!,
      description: this.eventForm.value.description!,
      startDate: new Date(this.eventForm.value.startDate!),
      endDate:  new Date(this.eventForm.value.endDate!),
      eventTodos: this.eventForm.value.todos as { action: string; id: number}[]  || []
    }
    this.countDownService.addEvent(event).subscribe(response => this.router.navigate(['/home']));
  }

}
