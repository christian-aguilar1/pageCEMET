import { Component, OnInit } from '@angular/core';

import { CarrerasService } from 'src/app/core/services/db/realtime/carreras/carreras.service';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.scss']
})
export class MallaComponent implements OnInit {

  ramos: any;
  ramosMalla: any;
  nombreRamos: Array<string> = [];

  constructor(private carrerasService: CarrerasService) { }

  ngOnInit(): void {
    this.carrerasService.getRamos().then((snapshot) => {
      this.ramos = snapshot.val();
      console.log(this.ramos)
    })
    this.carrerasService.getCareers().then((snapshot) => {
      this.ramosMalla = snapshot.val().civil.ramos;
      Object.values(this.ramosMalla).forEach((value) => {
        // console.log(typeof value, value);
        if (this.ramos.hasOwnProperty(value)) {
          this.nombreRamos.push(this.ramos[`${value}`]);
        } else {
          this.nombreRamos.push("No info");
        }
      })
    })
  }

}
