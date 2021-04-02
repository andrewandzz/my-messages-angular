import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../../interfaces/message.interface';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  private static readonly AllowedEditTime = 15; // in minutes

  @Input() public message: Message;
  @Output() public onEditButtonClick: EventEmitter<any>;
  @Output() public onDeleteButtonClick: EventEmitter<any>;
  public isImageDataLoaded: boolean;
  public isStickerDataLoaded: boolean;

  @ViewChild('image') private image: ElementRef;
  @ViewChild('sticker') private sticker: ElementRef;
  private readonly resourceService: ResourceService;

  public get isEditable(): boolean {
    const elapsedMinutes = (Date.now() - this.message.date) / 1000 / 60;
    return elapsedMinutes < MessageComponent.AllowedEditTime;
  }

  public constructor(resourceService: ResourceService) {
    this.onEditButtonClick = new EventEmitter<any>();
    this.onDeleteButtonClick = new EventEmitter<any>();
    this.resourceService = resourceService;
    this.isImageDataLoaded = false;
    this.isStickerDataLoaded = false;
  }

  public ngOnInit(): void {
    if (this.message.picture) {
      this.loadPicture();
    }

    if (this.message.sticker) {
      this.loadSticker();
    }
  }

  public handlePictureClick(): void {
    this.resourceService.downloadPicture(this.message.picture.id, this.message.picture.name);
  }

  public handleFileClick(): void {
    this.resourceService.downloadFile(this.message.file.id, this.message.file.name);
  }

  public handleEditButtonClick(): void {
    if (this.isEditable) {
      this.onEditButtonClick.emit();
    }
  }

  public handleDeleteButtonClick(): void {
    if (this.isEditable) {
      this.onDeleteButtonClick.emit();
    }
  }

  private loadPicture(): void {
    this.resourceService.getPicture(this.message.picture.id, this.message.picture.name)
      .subscribe(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64 = reader.result;
          this.image.nativeElement.src = base64;
          this.isImageDataLoaded = true;
        };
      });
  }

  private loadSticker(): void {
    this.resourceService.getSticker(this.message.sticker.id, this.message.sticker.name)
      .subscribe(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64 = reader.result;
          this.sticker.nativeElement.src = base64;
          this.isStickerDataLoaded = true;
        };
      });
  }
}