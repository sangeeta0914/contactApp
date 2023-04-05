import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs'; // Add throwError
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string ='http://localhost:4000';

  constructor(private http:HttpClient) { }
  
  public getAllContacts(): Observable<MyContact[]> { 
    let dataUrl:string = `${this.baseUrl}/contacts
    `;
    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError)); 
  }
  
 
//get single contact
public getContacts(contactId:string):Observable<MyContact>{
  let dataUrl:string =`${this.baseUrl}/contacts/${contactId}`
  return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
}

//create contact

public CreateContacts(contact:MyContact) :Observable<MyContact>{
  let dataUrl:string =`${this.baseUrl}/contacts`;
  return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError));
}
//update contact
public UpdateContacts(contact:MyContact,contactId:string):Observable<MyContact>{
  let dataUrl:string =`${this.baseUrl}/contacts/${contactId}`;
  return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError));
}
//Delete contact
public DeleteContacts(contactId:string) :Observable<MyContact>{
  let dataUrl:string =`${this.baseUrl}/contacts`;
  return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError));
}

//Groups

public getAllGroups(): Observable<MyGroup> { 
  let dataUrl:string = `${this.baseUrl}/groups`;
  return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError)); 
}

//single group

public getGroups(contact:MyContact): Observable<MyGroup> { 
  let dataUrl:string = `${this.baseUrl}/groups/${contact.groupID}`;
  return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError)); 
}





  //error slove
  private handleError(error: any): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}