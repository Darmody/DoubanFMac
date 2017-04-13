import { Observable as Rx$ } from 'rxjs'

const Observable = jest.genMockFromModule('rxjs/Observable')

Observable.fromEvent = () => Rx$.of(1)

export {
  Observable
}
