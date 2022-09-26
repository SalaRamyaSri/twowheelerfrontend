import { Injectable } from "@angular/core";

export interface Menu{
 state:string;
 name:string;
 icon:string;
 role:string;
}

const MENU_IEMS = [
    {state:'dashboard', name:'Dashboard', icon:'dashboard', role:''},
    // {state:'category', name:'Manage Category', icon:'category', role:'admin'},
    {state:'company', name:'Companies', icon:'category', role:''},
    {state:'variant', name:'Variants', icon:'add_business', role:''},
    // {state:'bike', name:'Bikes', icon:'electric_bike', role:''},
    // {state:'dashboard', name:'Variants', icon:'add_business', role:''},
    
    //###############################################################
  
    // {state:'customer', name:'Customers', icon:'person_add_alt_1', role:''},
    // {state:'booking', name:'Bookings', icon:'collections_bookmark', role:''},
    // {state:'feedback', name:'Feedback', icon:'feedback', role:''},
    // {state:'report', name:'Report', icon:'report', role:''},
];

@Injectable()
export class MenuItems{
    getMenuItem(): Menu[]{
        return MENU_IEMS;
    }
}