import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  statusUrl = "https://hp4e7w0nfb.execute-api.us-east-1.amazonaws.com/prod/status"

  startServerUrl = "https://hp4e7w0nfb.execute-api.us-east-1.amazonaws.com/prod/start"

  constructor(private httpClient : HttpClient) { }

  public getStatus(): Promise<string> {
    return this.httpClient.get<string>(this.statusUrl).toPromise()
  }

  public startServer(): Promise<string> {
    return this.httpClient.get<string>(this.startServerUrl).toPromise()
  }
}
