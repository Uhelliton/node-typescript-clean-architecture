import { HttpResponse, HttpRequest, Controller, EmailValidator } from '@src/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@src/presentation/erros'
import { badRequest, serverError } from '@src/presentation/helpers/http-helper'

export class SingUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }


    handle (httpRequest: HttpRequest): HttpResponse|any {
       try {
           const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
           const { name, email, password, passwordConfirmation} =  httpRequest.body

           for(const field of requiredFields) {
               if (!httpRequest.body[field]) {
                   return badRequest(new MissingParamError(field))
               }
           }


           const isValidEmail = this.emailValidator.isValid(email)
           if (!isValidEmail) return badRequest(new InvalidParamError('email'))

           if (password !== passwordConfirmation) {
               return badRequest(new InvalidParamError('passwordConfirmation'))
           }

       } catch (e) {
           return serverError()
       }
    }
}