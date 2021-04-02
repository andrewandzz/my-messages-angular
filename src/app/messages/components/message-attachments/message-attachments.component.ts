import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-attachments',
  templateUrl: './message-attachments.component.html',
  styleUrls: ['./message-attachments.component.css']
})
export class MessageAttachmentsComponent {
  @Input() public pictureName: string;
  @Input() public fileName: string;
  @Output() public onPictureDelete: EventEmitter<any>;
  @Output() public onFileDelete: EventEmitter<any>;

  public constructor() {
    this.pictureName = null;
    this.fileName = null;
    this.onPictureDelete = new EventEmitter<any>();
    this.onFileDelete = new EventEmitter<any>();
  }
}
