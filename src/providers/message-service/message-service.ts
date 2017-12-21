import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Jar } from '../../app/jar/jar';
import { Person } from '../../app/person/person';
import { Foul } from '../../app/foul/foul';

@Injectable()
export class MessageService {

  private messageSubject = new Subject<any>();
  private jarSelectedSubject = new Subject<Jar>();
  private personSelectedSubject = new Subject<Person>();
  private foulSelectedSubject = new Subject<Foul>();

  // Store last selections
  public currentlySelectedJar: Jar;
  public currentlySelectedPerson: Person;
  public currentlySelectedFoul: Foul;

  // Text message routing
  sendMessage(message: string) {
    this.messageSubject.next({ text: message });
  }
  clearMessage() {
    this.messageSubject.next();
  }
  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  // Jar selection message routing
  sendJarSelectedMessage(jarSelected: Jar) {
    this.currentlySelectedJar = jarSelected;
    this.jarSelectedSubject.next(jarSelected);
  }
  clearJarSelectedMessage() {
    this.jarSelectedSubject.next();
  }
  getJarSelectedMessage(): Observable<Jar> {
    return this.jarSelectedSubject.asObservable();
  }

  // Person selection message routing
  sendPersonSelectedMessage(personSelected: Person) {
    this.currentlySelectedPerson = personSelected;
    this.personSelectedSubject.next(personSelected);
  }
  clearPersonSelectedMessage() {
    this.personSelectedSubject.next();
  }
  getPersonSelectedMessage(): Observable<Person> {
    return this.personSelectedSubject.asObservable();
  }

  // Foul selection message routing
  sendFoulSelectedMessage(foulSelected: Foul) {
    this.currentlySelectedFoul = foulSelected;
    this.foulSelectedSubject.next(foulSelected);
  }
  clearFoulSelectedMessage() {
    this.foulSelectedSubject.next();
  }
  getFoulSelectedMessage(): Observable<Foul> {
    return this.foulSelectedSubject.asObservable();
  }
}
