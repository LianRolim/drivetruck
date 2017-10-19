/*import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Menu } from './../models/menu';

@Injectable()
export class DataService {
    public menu = new Menu();

    public messageSource = new BehaviorSubject(this.menu);
    currentMessage = this.messageSource.asObservable();

    constructor() {
        this.menu.mostrarMenu = false;
    }

    changeMessage(menu: Menu) {
        this.messageSource.next(menu);
    }

}
*/