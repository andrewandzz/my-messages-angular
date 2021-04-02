import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewMessage } from '../../interfaces/new-message.interface';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  @Output() public onSendButtonClick: EventEmitter<NewMessage>;
  @Output() public onChooseStickerClick: EventEmitter<any>;
  public isVisible: boolean;
  public form: FormGroup;
  public picture: File;
  public file: File;

  public constructor() {
    this.onSendButtonClick = new EventEmitter<NewMessage>();
    this.onChooseStickerClick = new EventEmitter<any>();
    this.isVisible = true;

    this.form = new FormGroup({
      text: new FormControl(''),
      picture: new FormControl(null),
      file: new FormControl(null)
    });

    this.picture = null;
    this.file = null;
  }

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
    this.reset();
  }

  public handlePictureSelect(input: HTMLInputElement): void {
    this.picture = input.files[0];
  }

  public handleFileSelect(input: HTMLInputElement): void {
    this.file = input.files[0];
  }

  public deletePicture(input: HTMLInputElement): void {
    input.value = '';
    this.picture = null;
  }

  public deleteFile(input: HTMLInputElement): void {
    input.value = '';
    this.file = null;
  }

  public handleChooseStickerClick(): void {
    this.onChooseStickerClick.emit();
  }

  public handleSendButtonClick(): void {
    if (!this.isFormValid()) {
      return;
    }

    const newMessage = {
      text: this.form.value.text,
      picture: this.picture,
      file: this.file,
      stickerId: null
    } as NewMessage;

    this.onSendButtonClick.emit(newMessage);

    this.reset();
  }

  public reset(): void {
    this.form.reset({
      text: ''
    });

    this.picture = null;
    this.file = null;
  }

  private isFormValid(): boolean {
    return (this.form.value.text.trim() !== '') ||
      (this.picture !== null) ||
      (this.file !== null);
  }
}
