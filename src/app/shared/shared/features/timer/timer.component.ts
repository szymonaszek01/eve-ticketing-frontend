import { Component, Input, SimpleChanges } from '@angular/core';
import { paymentTimeInMillis } from '../../util/util';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

  @Input()
  public createdAt: Date | undefined;

  protected minutesDisplay: string;

  protected secondsDisplay: string;

  private intervalId: any;

  private durationInSeconds: number = paymentTimeInMillis / 1000;

  constructor() {
    this.minutesDisplay = '00';
    this.secondsDisplay = '00';
  }

  ngOnInit(): void {
    this.initializeTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.createdAt && !changes.createdAt.isFirstChange()) {
      this.initializeTimer();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private initializeTimer(): void {
    if (!this.createdAt) {
      return;
    }
    const currentTime = Date.now();
    let remainingTime = this.durationInSeconds - Math.floor((currentTime - this.createdAt.getTime()) / 1000);
    if (remainingTime < 0) {
      remainingTime = 0;
    }
    this.startTimer(remainingTime);
  }

  private startTimer(totalTime: number): void {
    this.updateDisplay(totalTime);
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      totalTime--;
      if (totalTime < 0) {
        clearInterval(this.intervalId);
      } else {
        this.updateDisplay(totalTime);
      }
    }, 1000);
  }

  private updateDisplay(totalSeconds: number): void {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    this.minutesDisplay = this.formatTime(minutes);
    this.secondsDisplay = this.formatTime(seconds);
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
