import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.css']
})

export class ViewappointmentComponent implements OnInit {

  appointments?: Appointment[];
  currentAppointment: Appointment = {};
  currentIndex = -1;
  name = '';

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const hasReloaded = sessionStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
    }  
    this.retrieveAppointments();
    
  }

  retrieveAppointments(): void {
    this.appointmentService.getAll()
      .subscribe({
        next: (data) => {
          this.appointments = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveAppointments();
    this.currentAppointment = {};
    this.currentIndex = -1;
  }

  setActiveAppointment(appointment: Appointment, index: number): void {
    this.currentAppointment = appointment;
    this.currentIndex = index;
  }

  removeAllAppointments(): void {
    this.appointmentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentAppointment = {};
    this.currentIndex = -1;

    this.appointmentService.findByName(this.name)
      .subscribe({
        next: (data: Appointment[] | undefined) => {
          this.appointments = data;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }
}
