import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessageInputEditComponent } from './components/message-input-edit/message-input-edit.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './messages.component';
import { MessageService } from './services/message.service';
import { ResourceService } from './services/resource.service';
import { StickerService } from './services/sticker.service';
import { StickerComponent } from './components/sticker/sticker.component';
import { StickersComponent } from './components/stickers/stickers.component';
import { MessageAttachmentsComponent } from './components/message-attachments/message-attachments.component';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageComponent,
    MessageInputComponent,
    MessageInputEditComponent,
    StickersComponent,
    StickerComponent,
    MessageAttachmentsComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    MessageService,
    ResourceService,
    StickerService
  ]
})
export class MessagesModule { }
