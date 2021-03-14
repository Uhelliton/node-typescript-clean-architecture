import { SingUpController } from '@src/presentation/controllers/singup.controller'
import { MissingParamError } from '@src/presentation/erros/missing-param.error'

const makeSut = (): SingUpController => {
    return new SingUpController()
}

describe('SingUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        // system under test
        const sut = makeSut()
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
        const sut = makeSut()
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
        const sut = makeSut()
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
        const sut = makeSut()
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
})