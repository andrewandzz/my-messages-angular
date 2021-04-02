import { FileInfo } from "./file-info.interface";
import { PictureInfo } from "./picture-info.interface";
import { StickerInfo } from "./sticker-info.interface";

export interface Message {
  id: number;
  date: number;
  text: string;
  picture: PictureInfo;
  file: FileInfo;
  sticker: StickerInfo;
}