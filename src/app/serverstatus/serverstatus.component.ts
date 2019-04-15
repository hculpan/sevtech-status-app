import { ServerService } from './../server.service';
import { Component, OnInit, NgModule } from '@angular/core';

interface StatusResult {
  Code: Number
  Name: String
}

@Component({
  selector: 'serverstatus',
  templateUrl: './serverstatus.component.html',
  styleUrls: ['./serverstatus.component.css']
})
export class ServerstatusComponent implements OnInit {

  status: String = "checking"
  statusMsg: String = this.getStatusMessage()
  startServer = false
  canReload = false
  isRunning = false

  constructor(private serverService: ServerService) { }

  setStatus( status: String): void {
    this.status = status
    this.statusMsg = this.getStatusMessage()
    this.startServer = (this.status == "stopped")
    this.canReload = (this.status != "checking")
    this.isRunning = (this.status == "running")
  }

  getStatusMessage() : String {
    if (this.status == 'stopped') {
      return "The server is stopped"
    } else if (this.status == 'checking') {
      return "Checking server for status"
    } else if (this.status == 'starting' || this.status == "pending") {
      return "The server is starting"
    } else if (this.status == 'stopping') {
      return "The server is shutting down"
    } else if (this.status == 'running') {
      return "The server is running"
    } else {
      return "The server is in an unknown state (" + this.status + "); check again in a moment."
    }
  }

  async checkStatus() {
    let stat = await this.serverService.getStatus()
    let result: StatusResult = <StatusResult>JSON.parse(stat)
    return result.Name
  }

  ngOnInit() {
    this.checkStatus().then( v => this.setStatus(v))
  }

  reload() {
    this.setStatus('checking')
    this.checkStatus().then( v => this.setStatus(v))
  }

  onClickMe() {
    this.serverService.startServer()
    this.setStatus("starting")
  }
}
