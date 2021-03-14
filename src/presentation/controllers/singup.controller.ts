import { HttpResponse, HttpRequest } from '@src/presentation/protocols/http'
import { MissingParamError } from '@src/presentation/erros/missing-param.error'
import { badRequest } from '@src/presentation/helpers/http-helper'

export class SingUpController {
    handle (httpRequest: HttpRequest): HttpResponse|any {
       const requiredFields: string[] = ['name', 'email', 'password']

       for(const field of requiredFields) {
           if (!httpRequest.body[field]) {
               return badRequest(new MissingParamError(field))
           }
       }
    }
}