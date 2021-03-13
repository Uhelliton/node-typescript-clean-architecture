import { SingUpController } from '@src/presentation/controllers/singup.controller'

describe('SingUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        // system under test
        const sut = new SingUpController()
        const httpRequest = {
            email: 'any_email',
            password: 'any_password',
            passwordConfirmation: 'any_password_confirm',
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error('Mission param: name'))
    })
})