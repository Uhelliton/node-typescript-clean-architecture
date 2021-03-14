import { HttpResponse, HttpRequest } from '@src/presentation/protocols/http'
import { MissingParamError } from '@src/presentation/erros/missing-param.error'
import { badRequest } from '@src/presentation/helpers/http-helper'
import { Controller } from '@src/presentation/protocols/controller'

export class SingUpController implements Controller {
    handle (httpRequest: HttpRequest): HttpResponse|any {
       const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

       for(const field of requiredFields) {
           if (!httpRequest.body[field]) {
               return badRequest(new MissingParamError(field))
           }
       }
    }
}