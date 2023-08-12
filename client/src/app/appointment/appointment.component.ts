import { Component, OnInit  } from '@angular/core';

import { StorageService } from 'src/app/_services/storage.service';

import { Appointment } from 'src/app/models/appointment.model';

import { AppointmentService } from 'src/app/services/appointment.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {



  appointments?: Appointment[];

  currentAppointment: Appointment = {};

  currentIndex = -1;

  name = '';



  private roles: string[] = [];

  isLoggedIn = false;

  showAdminBoard = false;

  showModeratorBoard = false;

  username?: string;



  appointment = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    comments: '',
  };



  constructor(private appointmentService: AppointmentService, private storageService: StorageService,private http: HttpClient,) { }

  onSubmit() {
    this.http.post('http://localhost:8080/api/appointments', this.appointment).subscribe((data) => {
      console.log('Appointment saved:', data);
    });

    const hasReloaded = sessionStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
    }  
  }

  ngOnInit(): void {

    this.retrieveAppointments();

    this.isLoggedIn = this.storageService.isLoggedIn();



    if (this.isLoggedIn) {

      const user = this.storageService.getUser();

      this.roles = user.roles;



      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    }

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



  setActiveProduct(appointment: Appointment, index: number): void {

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
