import { Component, EventEmitter, Output } from '@angular/core';
import { StickerInfo } from '../../interfaces/sticker-info.interface';
import { StickerService } from '../../services/sticker.service';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.css']
})
export class StickersComponent {
  @Output() public onCloseButtonClick: EventEmitter<any>;
  @Output() public onStickerClick: EventEmitter<StickerInfo>;

  public isVisible: boolean;
  public stickersInfo: StickerInfo[];

  private readonly stickerService: StickerService;

  public constructor(stickerService: StickerService) {
    this.stickerService = stickerService;
    this.onStickerClick = new EventEmitter<StickerInfo>();
    this.onCloseButtonClick = new EventEmitter<any>();
    this.stickersInfo = null;
    this.isVisible = false;
  }

  public show(): void {
    this.isVisible = true;

    if (this.stickersInfo === null) {
      this.stickerService.getAll()
        .subscribe(stickersInfo => this.stickersInfo = stickersInfo);
    }
  }

  public hide(): void {
    this.isVisible = false;
  }

  public handleCloseButtonClick(): void {
    this.onCloseButtonClick.emit();
  }

  public handleStickerClick(stickerInfo: StickerInfo): void {
    this.onStickerClick.emit(stickerInfo);
  }
}