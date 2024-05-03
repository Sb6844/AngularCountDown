import { Component } from '@angular/core';
import { CountDownService } from '../count-down.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormArray, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { CountDownEvents } from '../../models/CountDownEvents';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, NgIf, NgFor],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {

  countDownEvent: CountDownEvents;
  eventForm: FormGroup;

  constructor(private eventService: CountDownService, private activedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder)
  {
    this.getEvent();
  }


  getEvent() {
    const id = parseInt(this.activedRoute.snapshot.paramMap.get('id')!, 10);
    this.eventService.getEventById(id).subscribe(event => {
      this.countDownEvent = event;
      this.eventForm = this.fb.group({
        title: this.fb.control(event.title, Validators.required),
        description: this.fb.control(event.description, Validators.required),
        startDate: this.fb.control(event.startDate,Validators.required),
        endDate: this.fb.control(event.endDate,Validators.required),
        todos: this.fb.array([])
    })
    this.createFormGroupArray();
    })


  }

  createFormGroupArray() {
    if(this.countDownEvent && this.countDownEvent.eventTodos) {
      this.countDownEvent.eventTodos.forEach(element => {
        const todoForm = this.fb.group({
          action: [element.action, Validators.required],
          id: [element.id, Validators.required],
        });
        this.todos.push(todoForm);
      });
      console.log(this.eventForm);
    }
  }


  deleteLesson(eventIndex: number) {
    this.todos.removeAt(eventIndex);
  }

  get todos() {
    return this.eventForm.controls["todos"] as FormArray;
  }



  onSubmit() {
    var event: CountDownEvents = {
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      startDate: this.eventForm.value.startDate,
      endDate:  this.eventForm.value.endDate,
      id: this.countDownEvent.id,
      eventTodos: this.eventForm.value.todos as { action: string; id: number }[]  || []
     }
    this.eventService.updateEvent(event).subscribe(() => this.router.navigate(['/home']));

  }

}
