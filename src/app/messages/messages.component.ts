import { Component, ViewChild } from '@angular/core';
import { EditMessage } from './interfaces/edit-message.interface';
import { StickerInfo } from './interfaces/sticker-info.interface';
import { Message } from './interfaces/message.interface';
import { NewMessage } from './interfaces/new-message.interface';
import { MessageService } from './services/message.service';
import { ConfirmBoxComponent } from '../shared/components/confirm-box/confirm-box.component';
import { MessageInputEditComponent } from './components/message-input-edit/message-input-edit.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { StickersComponent } from './components/stickers/stickers.component';
import { MessageLoader } from './message-loader';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public readonly messageLoader: MessageLoader;
  public readonly messages: Message[];
  public deletingMessage: Message;

  @ViewChild(MessageInputComponent)
  private messageInputComponent: MessageInputComponent;
  @ViewChild(MessageInputEditComponent)
  private messageInputEditComponent: MessageInputEditComponent;
  @ViewChild(ConfirmBoxComponent)
  private confirmBoxComponent: ConfirmBoxComponent;
  @ViewChild(StickersComponent)
  private stickersComponent: StickersComponent;

  private readonly messageService: MessageService;

  public constructor(messageService: MessageService) {
    this.messageService = messageService;
    this.messages = [];
    this.messageLoader = new MessageLoader(this.messages, messageService);
    this.deletingMessage = null;
  }

  public addMessage(newMessage: NewMessage) {
    this.messageService.add(newMessage)
      .subscribe(message => this.messages.unshift(message));
  }

  public handleCancelButtonClick(): void {
    this.messageInputComponent.show();
    this.messageInputEditComponent.hide();
  }

  public handleSaveButtonClick(message: EditMessage): void {
    this.messageService.edit(message)
      .subscribe(updatedMessage => {
        const editedMessageIndex = this.messages.findIndex(m => m.id === updatedMessage.id);
        this.messages[editedMessageIndex] = updatedMessage;
        this.messageInputComponent.show();
        this.messageInputEditComponent.hide();
      });
  }

  public handleEditButtonClick(message: Message): void {
    this.messageInputComponent.hide();
    this.messageInputEditComponent.show(message);
  }

  public handleDeleteButtonClick(message: Message): void {
    this.confirmBoxComponent.show('Are you sure you want to delete this message? This action cannot be undone.');
    this.deletingMessage = message;
  }

  public proceedDeletingMessage(): void {
    this.messageService.remove(this.deletingMessage.id)
      .subscribe(_ => {
        const removeMessageIndex = this.messages.findIndex(m => m.id === this.deletingMessage.id);
        this.messages.splice(removeMessageIndex, 1);
        this.confirmBoxComponent.hide();
      });
  }

  public closeConfirmBox(): void {
    this.confirmBoxComponent.hide();
  }

  public handleChooseStickerClick(): void {
    this.stickersComponent.show();
    this.messageInputComponent.reset();
    this.messageInputComponent.hide();
  }

  public handleStickerClick(stickerInfo: StickerInfo): void {
    this.stickersComponent.hide();
    this.messageInputComponent.show();

    const newMessage = {
      text: '',
      stickerId: stickerInfo.id
    } as NewMessage;

    this.messageService.add(newMessage)
      .subscribe(message => {
        this.messages.unshift(message)
      });
  }

  public handleCloseStickersButtonClick(): void {
    this.stickersComponent.hide();
    this.messageInputComponent.show();
  }
}
