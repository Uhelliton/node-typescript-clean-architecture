import { SingUpController } from '@src/presentation/controllers/singup.controller'
import { MissingParamError, InvalidParamError, ServerError } from '@src/presentation/erros'
import { EmailValidator } from '@src/presentation/protocols'

// sut   -- system under test
// Stub -- Dublê de tests fake

interface SutTypes {
    sut: SingUpController,
    emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeEmailValidatorWithError = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            throw new Error()
        }
    }
    return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const sut = new SingUpController(emailValidatorStub)

    return { sut, emailValidatorStub }
}

describe('SingUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        // system under test
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirm',
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })

    test('Should return 400 if no email is provided', () => {
        // system under test
        const { sut } = makeSut()
        const httpRequest = {
           body: {
               name: 'any_name',
               password: 'any_password',
               passwordConfirmation: 'any_password_confirm',
           }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provided', () => {
        // system under test
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                passwordConfirmation: 'any_password_confirm',
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 400 if no passwordConfirmation is provided', () => {
        // system under test
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })

    test('Should return 400 if an invalid email is provided', () => {
        // system under test
        const { sut, emailValidatorStub } = makeSut()

        // spyOn para expionar um método de uma classe e alterar seu valor
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation',
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })

    test('Should call EmailValidator with correct email', () => {
        // system under test
        const { sut, emailValidatorStub } = makeSut()

        // spyOn para expionar um método de uma classe e alterar seu valor
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation',
            }
        }
        const { email } = httpRequest.body

        sut.handle(httpRequest)
        expect(isValidSpy).toHaveBeenCalledWith(email)
    })

    test('Should return 500 if EmailValidator throws', () => {
        const emailValidatorStub = makeEmailValidatorWithError()
        const sut = new SingUpController(emailValidatorStub)

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password_confirmation',
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })
})