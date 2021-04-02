import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditMessage } from '../../interfaces/edit-message.interface';
import { Message } from '../../interfaces/message.interface';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-message-input-edit',
  templateUrl: './message-input-edit.component.html',
  styleUrls: ['./message-input-edit.component.css']
})
export class MessageInputEditComponent implements OnInit {
  @Output() public onCancelButtonClick: EventEmitter<any>;
  @Output() public onSaveButtonClick: EventEmitter<EditMessage>;
  public message: Message;
  public isVisible: boolean;
  public form: FormGroup;
  public picture: File;
  public file: File;

  private readonly resourceService: ResourceService;

  public constructor(resourceService: ResourceService) {
    this.onCancelButtonClick = new EventEmitter<any>();
    this.onSaveButtonClick = new EventEmitter<EditMessage>();
    this.picture = null;
    this.file = null;

    this.resourceService = resourceService;
  }

  public show(message: Message): void {
    this.message = message;
    this.isVisible = true;

    this.loadResources();
    this.initForm();
  }

  public hide(): void {
    this.isVisible = false;
    this.reset();
  }

  public ngOnInit(): void {

  }

  public handlePictureSelect(input: HTMLInputElement) {
    this.picture = input.files[0];
  }

  public handleFileSelect(input: HTMLInputElement) {
    this.file = input.files[0];
  }

  public deletePicture(input: HTMLInputElement): void {
    input.value = '';
    (this.form.controls.picture as FormControl).markAsDirty();
    this.picture = null;
  }

  public deleteFile(input: HTMLInputElement): void {
    input.value = '';
    (this.form.controls.file as FormControl).markAsDirty();
    this.file = null;
  }

  public handleButtonCancelClick(): void {
    this.onCancelButtonClick.emit();
  }

  public handleButtonSaveClick(): void {
    if (this.form.pristine) {
      this.onCancelButtonClick.emit();
      return;
    }

    if (!this.isFormValid()) {
      return;
    }

    const editMessage = {
      id: this.message.id,
      text: this.form.value.text,
      picture: this.picture,
      file: this.file
    } as EditMessage;

    this.onSaveButtonClick.emit(editMessage);
  }

  private loadResources(): void {
    if (this.message.picture) {
      this.resourceService.getPicture(this.message.picture.id, this.message.picture.name)
        .subscribe(picture => this.picture = picture);
    }

    if (this.message.file) {
      this.resourceService.getFile(this.message.file.id, this.message.file.name)
        .subscribe(file => this.file = file);
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      text: new FormControl(this.message.text || ''),
      picture: new FormControl(null),
      file: new FormControl(null)
    });
  }

  private isFormValid(): boolean {
    return (this.form.value.text.trim() !== '') ||
      (this.picture !== null) ||
      (this.file !== null);
  }

  private reset(): void {
    this.message = null;
    this.form = null;
    this.picture = null;
    this.file = null;
  }
}
