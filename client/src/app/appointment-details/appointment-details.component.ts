import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentAppointment: Appointment = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    comments: ''
  };
  message = '';

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getAppointment(this.route.snapshot.params['id']);
    }
  }

  getAppointment(id: string): void {
    this.appointmentService.get(id).subscribe({
      next: (data) => {
        this.currentAppointment = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateAppointment(): void {
    this.message = '';

    this.appointmentService.update(this.currentAppointment.id, this.currentAppointment).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This appointment was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  deleteAppointment(): void {
    this.appointmentService.delete(this.currentAppointment.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/appointments']);
      },
      error: (e) => console.error(e)
    });
  }
}
