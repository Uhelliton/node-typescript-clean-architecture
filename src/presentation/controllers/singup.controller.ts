import { HttpResponse, HttpRequest } from '@src/presentation/protocols/http'
import { MissingParamError } from '@src/presentation/erros/missing-param.error'
import { badRequest } from '@src/presentation/helpers/http-helper'

export class SingUpController {
    handle (httpRequest: HttpRequest): HttpResponse|any {
       if (!httpRequest.body.name) {
          return badRequest(new MissingParamError('name'))
       }
       if (!httpRequest.body.email) {
            return badRequest(new MissingParamError('email'))
       }
    }
}