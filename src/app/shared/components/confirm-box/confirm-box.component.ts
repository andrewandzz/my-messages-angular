import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent {
  @Output() public onConfirm: EventEmitter<any>;
  @Output() public onCancel: EventEmitter<any>;
  public isVisible: boolean;
  public text: string;

  public constructor() {
    this.onConfirm = new EventEmitter<any>();
    this.onCancel = new EventEmitter<any>();
    this.isVisible = false;
    this.text = null;
  }

  public show(text: string): void {
    this.text = text;
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
    this.text = null;
  }
}
