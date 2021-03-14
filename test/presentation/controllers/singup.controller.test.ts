import { SingUpController } from '@src/presentation/controllers/singup.controller'
import { MissingParamError } from '@src/presentation/erros/missing-param.error'

describe('SingUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        // system under test
        const sut = new SingUpController()
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
        const sut = new SingUpController()
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
})