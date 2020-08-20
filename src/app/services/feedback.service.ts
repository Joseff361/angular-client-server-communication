import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  submitFeedback(feedback: Feedback){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' //The information will be suplied in the body
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback' , feedback , httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
