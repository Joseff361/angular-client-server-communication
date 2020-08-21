import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: { //ensure that this animation happends when route changes occur
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
      flyInOut(), expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string;
  baseURL: string;

  constructor(
    private leaderService: LeaderService
  ) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders,
    errmess => this.errMess = <any>errmess);

    this.baseURL = baseURL;
  }

}
