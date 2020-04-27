
import { MeetingDetailService } from 'src/app/shared/meeting-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: []
})
export class MeetingDetailComponent implements OnInit {

  constructor(private service: MeetingDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    const todaysDate: Date = new Date();
    if (form !== null && form !== undefined) {
      form.form.reset();
      this.service.formData = {
      MeetingId: 0,
      MeetingSubject: '',
      Attendees: '',
      MeetingAgenda: '',
      MeetingDate: todaysDate
      };
    } else {
      this.service.formData = {
        MeetingId: 0,
        MeetingSubject: '',
        Attendees: '',
        MeetingAgenda: '',
        MeetingDate: todaysDate
        };
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.MeetingId === 0) {
      this.insertRecord(form);
    } else { this.updateRecord(form); }
  }

  insertRecord(form: NgForm) {
    this.service.postMeetingDetail(this.service.formData).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Meeting Detail Entered');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putMeetingDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Meeting Detail Updated');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
