import { Component } from '@angular/core';
import { ChatModule, Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { QnaService } from '../services/azure-qna.service';

@Component({
  selector: 'app-qn-a',
  standalone: true,
  imports: [ChatModule],
  templateUrl: './qn-a.component.html',
  styleUrl: './qn-a.component.scss'
})

export class QnAComponent {
  posts: Object;

  constructor(private qnaService: QnaService){}
  
  public bot: User = { id: 0 };
  public user: User = { id: 1 };

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

    this.qnaService.sendQuestion(e.message.text!).subscribe(
      (response) => { this.posts = response; },
      (error) => { console.log(error); });
    
    this.messages = [...this.messages, e.message];
  }


}

/**
 * curl -X POST "url" -H 
 * "Ocp-Apim-Subscription-Key: d81d422388e54ee1a763a36fd8643965"
 *  -H "Content-Type: application/json" -d 
 * "{\"top\":3,
 * \"question\":\"YOUR_QUESTION_HERE\",
 * \"includeUnstructuredSources\":true,
 * \"confidenceScoreThreshold\":\"YOUR_SCORE_THRESHOLD_HERE\",
 * \"answerSpanRequest\"
 * :{\"enable\":true,
 * \"topAnswersWithSpan\":1,
 * \"confidenceScoreThreshold\":\"YOUR_SCORE_THRESHOLD_HERE\"},
 * \"filters\":{\"metadataFilter\":
 * {\"logicalOperation\":\"YOUR_LOGICAL_OPERATION_HERE\",
 * \"metadata\":[{\"key\":\"YOUR_ADDITIONAL_PROP_KEY_HERE\",\"value\":\"YOUR_ADDITIONAL_PROP_VALUE_HERE\"}]}}}"
 */