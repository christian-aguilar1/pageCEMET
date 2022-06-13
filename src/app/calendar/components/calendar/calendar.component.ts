import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  public user: boolean = false;
  events = [] as any;
  dateEvents: Array<string> = [];
  dateDayNumberEvents: Array<number> = [];
  monthEvents: Array<number> = [];
  showEvents: boolean = false;
  eventsToShow = [] as any;
  public idDocs = [] as any;
  images: Array<any> = [];

  week = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'SeptIembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  monthSelect: any;
  dateSelect: any;
  dateValue: any;

  collection$!: Subscription;
  image$!: Subscription;
  user$!: Subscription;

  constructor(
    private title: Title,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.title.setTitle('Calendario - CEMET');
  }

  ngOnInit(): void {
    this.hasUser();
    this.collection$ = this.firestoreService.getCollections('events').subscribe((snapshot) => {
      this.events = [];
      snapshot.forEach((doc) => {
        let data: any = doc.data();
        let re = /-/g;
        let date = data.date.replace(re, '/');
        re = /\/0/g;
        date = date.replace(re, '/');
        let numberVar = date.substring(date.length - 2, date.length);
        if (!isNaN(numberVar)) {
          this.dateDayNumberEvents.push(parseInt(numberVar));
        }
        this.monthEvents.push(parseInt(date.substring(date.length - 4, date.length - 3)));
        this.dateEvents.push(date);
        this.events.push(doc.data());
        this.idDocs.push(doc.id);
        if (data.image !== '') {
          const fileRef = this.storage.ref(data.image);
          const imageRef = fileRef.getDownloadURL();
          this.image$ = imageRef.subscribe((url) => {
            this.images.push(url);
          });
        }
      });
    });
    let dateToday = new Date();
    let month = dateToday.getMonth() + 1;
    let year = dateToday.getFullYear();
    this.getDaysFromDate(month, year);
  }

  ngOnDestroy(): void {
    if (this.collection$) this.collection$.unsubscribe();
    if (this.image$) this.image$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number): void {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

  clickDay(day: { value: any }): void {
    this.eventsToShow = [];
    if (this.dateDayNumberEvents.includes(day?.value)) {
      this.dateDayNumberEvents.forEach((dayNumber, i) => {
        if (this.monthEvents[i] === this.dateSelect.month() + 1) {
          if (dayNumber === day.value) {
            this.eventsToShow.push(this.events[i]);
            this.showEvents = true;
          }
        }
      });
    } else {
      this.showEvents = false;
    }
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);

    this.dateValue = objectDate;
  }

  hasUser() {
    this.user$ = this.authService.hasUser().subscribe((res) => {
      if (res && res.uid) {
        this.user = true;
      }
    });
  }

  deletePosition(event: any) {
    let idDoc = this.idDocs[this.events.indexOf(event)];
    this.firestoreService
      .deleteCollection('events', idDoc)
      .then(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['./calendario']));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
}
