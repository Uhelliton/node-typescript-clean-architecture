import { HttpResponse, HttpRequest } from '@src/presentation/protocols/http'

export class SingUpController {
    handle (httpRequest: HttpRequest): HttpResponse|undefined {
       if (!httpRequest.body.name) {
          return {
              statusCode: 400,
              body: new Error('Mission param: name')
          }
       }
        if (!httpRequest.body.email) {
            return {
                statusCode: 400,
                body: new Error('Mission param: email')
            }
        }
    }
}