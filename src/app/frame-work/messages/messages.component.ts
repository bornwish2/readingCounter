import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserStorageService } from 'src/app/services/browser-storage.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { IColor, IMessage, ITime } from './../../Interfaces/imessage';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewInit {
  message: IMessage = {
    title: '',
    text: '',
    color: '',
    showTime: 0,
    canSave: true
  };
  colors: IColor[] = [];
  times: ITime[] = [];

  testNamesStorage: any;
  allMessages: IMessage[];
  getedDataFromLocalStorage: any;

  constructor(
    private interactionService: InteractionService,
    private router: Router,
    readonly messageService: MessageService,
    private browserStorageService: BrowserStorageService
  ) { }

  ngOnInit(): void {
    this.times = this.messageService.getTimes();
    this.colors = this.messageService.getColors();
    this.getAllPreMessages();
  }

  connectToServerConfig = (name: string, message: IMessage) => {
    console.log(this.message);
  }
  saveNewMessageForm = (name: string, message: IMessage) => {
    if (message.canSave)
      this.browserStorageService.set(name, message);
    else
      this.connectToServerConfig(name, message);
  }
  // for now for get all the browserstorage messages
  getAllPreMessages = () => {
    this.allMessages = this.browserStorageService.getAll();
    console.log(this.allMessages);

  }
  getMessages = (name: string) => {
    this.getedDataFromLocalStorage = this.browserStorageService.get(name);
  }
  removeItem = (localStorageItem: IMessage) => {
    console.log(localStorageItem);
    this.browserStorageService.remove(localStorageItem.title);
  }
  clearAllStorage = () => {
    this.browserStorageService.removeAll();
  }
  copyPreMessageToCurrent = (localStorageItem: IMessage) => {
    this.message.title = localStorageItem.title;
    this.message.color = localStorageItem.color;
    this.message.showTime = localStorageItem.showTime;
    this.message.text = localStorageItem.text;
    this.message.canSave = localStorageItem.canSave;

  }
  ngAfterViewInit(): void {
    this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }

}
