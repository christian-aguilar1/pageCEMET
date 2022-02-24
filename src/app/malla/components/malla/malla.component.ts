import { Component, OnInit } from '@angular/core';

import { RealtimeService } from 'src/app/core/services/db/realtime/realtime.service';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.scss']
})
export class MallaComponent implements OnInit {

  arrayRamosDB: any;
  carreraCivilDB: any;
  carreraCivil2021DB: any;
  carreraEjecucionDB: any;
  ramosMallaCarreraConNombre: Array<string> = [];
  arrayRamosMallaCarrera: any = [];
  cantRamosPorSemestre: Array<number> = [];
  years: Array<number> = [];

  constructor(private realtimeService: RealtimeService) { }

  ngOnInit(): void {
    this.realtimeService.getDB("ramos").then((snapshot) => {
      this.arrayRamosDB = snapshot.val();
      // console.log(this.ramos)
    })
    this.realtimeService.getDB("carreras").then((snapshot) => {
      this.carreraCivilDB = snapshot.val().civil;
      this.carreraCivil2021DB = snapshot.val().civil2021;
      this.carreraEjecucionDB = snapshot.val().ejecu;
      this.getSubjectPerSemesters(this.carreraCivil2021DB.ramosPorSemestre);
      this.fillArrayDB(this.carreraCivilDB.ramos);
      this.fillArrayOfArraysSubjectsCareer();
    })
  }

  changeRamosCarrera(carrera: string) {
    if (carrera === "civil") {
      this.fillArrayDB(this.carreraCivilDB.ramos)
      this.getSubjectPerSemesters(this.carreraCivilDB.ramosPorSemestre);
      this.fillArrayOfArraysSubjectsCareer();
    } else if (carrera == "civil2021") {
      this.fillArrayDB(this.carreraCivil2021DB.ramos)
      this.getSubjectPerSemesters(this.carreraCivil2021DB.ramosPorSemestre);
      this.fillArrayOfArraysSubjectsCareer();
    } else if (carrera == "ejecucion") {
      this.fillArrayDB(this.carreraEjecucionDB.ramos)
      this.getSubjectPerSemesters(this.carreraEjecucionDB.ramosPorSemestre);
      this.fillArrayOfArraysSubjectsCareer();
    }
  }

  fillArrayDB (ramosMallaCarrera: { [s: string]: unknown; } | ArrayLike<unknown>) {
    this.ramosMallaCarreraConNombre = [];
    Object.values(ramosMallaCarrera).forEach((value) => {
      if (this.arrayRamosDB.hasOwnProperty(value)) {
        this.ramosMallaCarreraConNombre.push(this.arrayRamosDB[`${value}`].nombre);
      } else {
        this.ramosMallaCarreraConNombre.push("No info");
      }
    })
  }

  getSubjectPerSemesters (cant: { [s: string]: unknown; } | ArrayLike<unknown>) {
    this.cantRamosPorSemestre = [];
    this.years = [];
    let count = 0;
    let year = 1;
    Object.values(cant).forEach((value: any) => {
      count++;
      if (typeof value === 'number') {
        this.cantRamosPorSemestre.push(value);
        if (count % 2) {
          this.years.push(year);
          year++;
        }
      }
    })
  }

  fillArrayOfArraysSubjectsCareer () {
    this.arrayRamosMallaCarrera = [];
    let ramos = 0;
    let cant = 0;
    for (let cantRamos of this.cantRamosPorSemestre) {
      let arrayTemp: Array<string> = [];
      cant += cantRamos;
      for (ramos; ramos < cant; ramos++) {
        arrayTemp.push(this.ramosMallaCarreraConNombre[ramos])
      }
      this.arrayRamosMallaCarrera.push(arrayTemp);
      arrayTemp = []
    }
  }

}
