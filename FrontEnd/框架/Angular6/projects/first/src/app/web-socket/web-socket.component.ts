import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  ws: WebSocket;
  observableSocket: Observable<any>;

  constructor() {
    this.ws = new WebSocket('ws://localhost:8001');
    this.observableSocket = new Observable<any>(observer => {
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = () => observer.complete();
    });
  }

  ngOnInit() {
    this.observableSocket.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('流已经结束')
  )
    ;
  }

  sendMessage() {
    this.ws.send('客户端：hello ws server');
  }

}
