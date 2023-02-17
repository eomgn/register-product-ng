import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const http = 'http://localhost:3000'

interface Produto {
  id: number
  nome: string
  preco: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private httpClient: HttpClient) {}

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    preco: new FormControl(0, [Validators.required,Validators.min(1)]),
  })

  produtos: Produto[] = []

  ngOnInit(): void {
   this.httpClient.get<Produto[]>(`${http}/produtos`)
   .subscribe(dates => {
    this.produtos = dates
   })}

   add() {
    const produtos = this.form.value

    this.httpClient.post<Produto>(`${http}/produtos`, produtos)
    .subscribe(newProduct => {
      this.produtos = [...this.produtos, newProduct]
    })
   }

   delete(produto: Produto) {
    this.httpClient.delete(`${http}/produtos/${produto.id}`)
    .subscribe(() => {
      const index = this.produtos.indexOf(produto)
      this.produtos = [...this.produtos.slice(0, index), ...this.produtos.slice(index + 1)]

      this.produtos.splice(index,1)
    })
   }

   div() {
    return `<div>xd</div>`
   }
}

  
  

