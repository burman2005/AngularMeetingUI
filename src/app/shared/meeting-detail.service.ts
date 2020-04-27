import { MeetingDetail } from './meeting-detail.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingDetailService {
  formData: MeetingDetail;
  readonly rootURL = 'http://localhost:44000/api';
  list: MeetingDetail[];

  constructor(private http: HttpClient) { }

  postMeetingDetail(meetingData: MeetingDetail): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(meetingData);
    return this.http.post<MeetingDetail>(this.rootURL + '/Meetings', body, {'headers':headers})
      .pipe(
          catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  }
  putMeetingDetail() {
    return this.http.put(this.rootURL + '/Meetings/' + this.formData.MeetingId, this.formData);
  }
  deleteMeetingDetail(id) {
    return this.http.delete(this.rootURL + '/Meetings/' + id);
  }

  refreshList() {
    this.http.get(this.rootURL + '/Meetings')
     .toPromise()
     .then(res => this.list = res as MeetingDetail[]);
  }

}
