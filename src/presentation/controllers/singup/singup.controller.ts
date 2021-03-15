import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './singup.protocols'
import { MissingParamError, InvalidParamError } from '@src/presentation/erros'
import { badRequest, serverError } from '@src/presentation/helpers/http-helper'

export class SingUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
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

           this.addAccount.add({ name, email, password})

       } catch (e) {
           return serverError()
       }
    }
}