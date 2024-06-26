import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { QnaService } from '../services/azure-qna.service';
import { environment } from '../../environments/environment';
// import { BotDirective, BotHelperDirective, StyleSetDirective, BotService, ComService, IPayload, DEFAULT_OPTIONS } from '@solutionspme/ngx-microsoft-bot-framework';

@Component({
  selector: 'app-qn-a',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './qn-a.component.html',
  styleUrl: './qn-a.component.scss'
})

// providers: [BotService, ComService, BotDirective, BotHelperDirective, StyleSetDirective],

export class QnAComponent implements OnInit {

  @ViewChild("botWindow", { static: false }) botWindowElement: ElementRef;
  passViewChild: ViewChild;

  /* payload: IPayload = {
    secret: environment.qnaBotKey,
    url: 'https://webchat.botframework.com/api/tokens',
    secretSetting: false
  }; */

  /* stylesetPayload: DEFAULT_OPTIONS = {
    rootHeight: '100%',
    botAvatarInitials: 'BO',
    userAvatarInitials: 'US',
    backgroundColor: '#131313',
    root: {
      ' ::-webkit-scrollbar': {
        width: '5px'
      },
    },
    textContent: {
      fontFamily: '\'Comic Sans MS\', \'Arial\', sans-serif',
      fontWeight: 'bold',
    }
  }; 
  */

  /*styleOptionsPayload: DEFAULT_OPTIONS = {
    rootHeight: '100%',
    botAvatarInitials: 'AC',
    userAvatarInitials: 'US',
    backgroundColor: '#CCC',
  };  */

  // constructor params private comService: ComService, private botDirective: BotDirective

  constructor(private qnaService: QnaService) { }

  public ngOnInit(): void {
    /* this.obtainStylePayload();
    this.obtainLocalToken(); */
  }
  
/* 
  public ngAfterViewInit(): void {
    this.setBotDirective();
  }

  setBotDirective(): void {
    this.passViewChild = this.botWindowElement.nativeElement;
    this.botDirective.botDirective(this.passViewChild);
  }

  obtainLocalToken() {
    this.comService.obtainToken(this.payload);
  }

  obtainStylePayload() {
    this.comService.obtainStylePayload(this.stylesetPayload, this.styleOptionsPayload)
  }
 */
  /* public bot: User = { id: 0 };
  public user: User = { id: 1 };
  public answer: Message;
  ans = {
    author: this.bot,
    text: ""
  };

  public messages: Message[] = [
    {
      author: this.bot,
      text: 'Benvenuto :)',
    },
    {
      author: this.bot,
      text: 'Che cosa ti piacerebbe sapere?'
    },
  ];

  public sendMessage(e: SendMessageEvent): void {
    // invia il messaggio utente al bot e lo aggiunge alla ui
    this.qnaService.sendQuestion(e.message.text!);
    this.messages = [...this.messages, e.message];
    // risposta del bot
  } */
}