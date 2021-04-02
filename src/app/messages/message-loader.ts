import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Message } from "./interfaces/message.interface";
import { MessageService } from "./services/message.service";

export class MessageLoader {
  // how many messages are loaded per each request
  private static readonly LoadMessagesCount = 5;

  // how far from the page end to start loading new messages
  private static readonly BottomOffset = 100; // in px

  private readonly messages: Message[];
  private readonly messageService: MessageService;
  private _isLoading: boolean;
  private nextId?: number;

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public constructor(messages: Message[], messageService: MessageService) {
    this.messages = messages;
    this.messageService = messageService;
    this._isLoading = false;
    this.nextId = null;

    this.initEventListeners();
    this.loadMessages()
      .subscribe(_ => this.checkLoadMoreMessages());
  }

  private initEventListeners(): void {
    document.addEventListener('scroll', this.checkLoadMoreMessages.bind(this));
    window.addEventListener('resize', this.checkLoadMoreMessages.bind(this));
  }

  private loadMessages(): Observable<any> {
    if (this.isLoading) {
      return of();
    }

    this._isLoading = true;

    return this.messageService.get(MessageLoader.LoadMessagesCount, this.nextId)
      .pipe(
        map(messageData => {
          this.messages.push(...messageData.messages);
          this.nextId = messageData.nextId;
          this._isLoading = false;
        })
      );
  }

  private checkLoadMoreMessages(): void {
    if (this.isScrollNearBottom()) {
      if (this.nextId !== undefined) {
        this.loadMessages().subscribe();
      }
    }
  }

  private isScrollNearBottom(): boolean {
    const html = document.documentElement;
    return (html.clientHeight + html.scrollTop >= html.scrollHeight - MessageLoader.BottomOffset);
  }
}