import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../subscribers.service';
import { SubscriberModel } from '../Models/subscriber.model';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(
    private subscribersService: SubscribersService,
    private fb: FormBuilder,
    private router: Router
  ) { }


  subscribeForm = this.fb.group({
    email: ['']
  });

  addSubscriber(): void {
    this.subscribersService.addNewSubscriber(this.subscribeForm.value).subscribe({
      next: (res) => {
        alert('You have been added to our subscription list');
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        alert('Error encountered adding Subscriber.');
        
      }
    })
  }

  ngOnInit(): void {
  }

}
