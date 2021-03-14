import { HttpResponse, HttpRequest } from '@src/presentation/protocols/http'
import { MissingParamError } from '@src/presentation/erros/missing-param.error'
import { badRequest } from '@src/presentation/helpers/http-helper'
import { Controller } from '@src/presentation/protocols/controller'
import { EmailValidator } from '@src/presentation/protocols/email.validator'
import {InvalidParamError} from "@src/presentation/erros/invalid-param.error";

export class SingUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }


    handle (httpRequest: HttpRequest): HttpResponse|any {
       const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
       const params =  httpRequest.body

       for(const field of requiredFields) {
           if (!httpRequest.body[field]) {
               return badRequest(new MissingParamError(field))
           }
       }

       const isValidEmail = this.emailValidator.isValid(params.email)
       if (!isValidEmail) return badRequest(new InvalidParamError('email'))
    }
}