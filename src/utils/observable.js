import { Observable } from 'rxjs/Observable'

export const fetch$ = (request, ...params) =>
  Observable.from(request(...params).then(response => response.json()))
