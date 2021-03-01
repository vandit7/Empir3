
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http'

//api urls
export class Urls {
  
  baseUrlOfLocal: string = 'https://api.empireannouncement.com/Api/Services/';
  //baseUrlOfLocal: string = 'http://localhost/Empir3News/Api/Services/';
  ImagesPath :string = 'https://api.empireannouncement.com';
}

// api heardes
export class headers {
  Options: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    })
  };
}

// api data
export class ApiErrors {

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log('Client Side Error : ', errorResponse.error.message);
    } else {
      console.log('Server Side Error : ', errorResponse);
    }
  }

}
