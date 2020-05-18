import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = new FormGroup({
    usuario: new FormControl(),
    password: new FormControl(),
  });

  constructor(private router: Router, private message: MatSnackBar) {}

  ngOnInit() {}

  iniciarSesion() {
    let expresionRegular = /(DEPI+\d+)/i;

    let usuario = this.formulario.get("usuario").value;
    let password = this.formulario.get("password").value;

    if (usuario != null && password != null) {
      if (usuario.match(expresionRegular) && password == 2020) {
        this.router.navigate(["cartera"]);
      } else {
        this.message.open("Credenciales incorrectas", "Aceptar", {
          duration: 1500,
        });
      }
    }
  }
}
