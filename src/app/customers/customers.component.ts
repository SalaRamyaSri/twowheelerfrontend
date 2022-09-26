import { Component, OnInit } from '@angular/core';
import { Variant } from '../interfaces/variant';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: Variant[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
