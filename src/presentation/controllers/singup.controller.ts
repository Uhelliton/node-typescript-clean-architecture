import { HttpResponse, HttpRequest } from '@src/presentation/protocols/http'
import { MissingParamError } from '@src/presentation/erros/missing-param.error'

export class SingUpController {
    handle (httpRequest: HttpRequest): HttpResponse|any {
       if (!httpRequest.body.name) {
          return {
              statusCode: 400,
              body: new MissingParamError('name')
          }
       }
        if (!httpRequest.body.email) {
            return {
                statusCode: 400,
                body: new MissingParamError('email')
            }
        }
    }
}