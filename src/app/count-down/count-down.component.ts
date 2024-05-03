import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInWeeks } from 'date-fns';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { DatePipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-count-down',
  standalone: true,
  imports: [MatProgressBarModule, MatCardModule, DatePipe, NgIf],
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.css'
})
export class CountDownComponent implements OnInit {


  @Input() title: string = '';
  @Input() description: string = '';
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  totalInWeeks: number = 0;
  remainingTimeInWeeks: number = 0;
  remainingTimeInDays: number = 0;
  remainingTimeInHours: number = 0;
  percentageLeft = 0;


  viewCounter = signal(0);

  conditionalCount = computed(() => {
    if (this.viewCounter() > 0) {
      return `The count is ${this.viewCounter()}.`;
    } else {
      return 'Nothing to see here!';
    }
  });
  ngOnInit(): void {
    this.calculateDateDuration();
  }


  calculateDateDuration = () => {
    this.totalInWeeks = differenceInWeeks(this.endDate,  this.startDate);

    this.remainingTimeInWeeks = differenceInWeeks(this.endDate, new Date());
    const currentDuration = differenceInWeeks(new Date(), this.startDate);

    this.remainingTimeInDays = differenceInDays(this.endDate, new Date());
    this.remainingTimeInHours = differenceInHours(this.endDate, new Date());

    this.percentageLeft = this.remainingTimeInWeeks ? this.calculatePercentageLeft(this.totalInWeeks, currentDuration) : 100;
  }

  calculatePercentageLeft(duractionInWeeks: number, remainingWeeks: number) {
    return (remainingWeeks/duractionInWeeks) * 100;
  }

  viewCalculator()
  {
    // this is to set the value
    //this.viewCounter.set(3);

    // this is to update from the previous
    this.viewCounter.update(x => x + 1);
  }
  settozero()
  {
    // this is to set the value
    this.viewCounter.set(0);
  }
}
