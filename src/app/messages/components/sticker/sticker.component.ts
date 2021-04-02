import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StickerInfo } from '../../interfaces/sticker-info.interface';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit {
  @Input() public stickerInfo: StickerInfo;

  @ViewChild('image') private readonly image: ElementRef;
  private readonly resourceService: ResourceService;

  public constructor(resourceService: ResourceService) {
    this.resourceService = resourceService;
  }

  public ngOnInit(): void {
    this.resourceService.getSticker(this.stickerInfo.id, this.stickerInfo.name)
      .subscribe(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64 = reader.result;
          this.image.nativeElement.src = base64;
        };
      });
  }
}
