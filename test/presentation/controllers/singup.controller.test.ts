import { SingUpController } from '@src/presentation/controllers/singup/singup.controller'
import { MissingParamError, InvalidParamError, ServerError } from '@src/presentation/erros'
import { EmailValidator, AddAccount, AccountModel } from '@src/presentation/controllers/singup/singup.protocols'
import { AddAccountModel } from '@src/domains/usercases/add-account'

// sut   -- system under test
// Stub -- Dublê de tests fake

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

// const makeEmailValidatorWithError = (): EmailValidator => {
//     class EmailValidatorStub implements EmailValidator {
//         isValid (email: string): boolean {
//             throw new Error()
//         }
//     }
//     return new EmailValidatorStub()
// }

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        add (account: AddAccountModel): AccountModel {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email@email.com',
                password: 'valid_password',
            }

            return fakeAccount
        }
    }
    return new AddAccountStub()
}

interface SutTypes {
    sut: SingUpController,
    emailValidatorStub: EmailValidator,
    addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const addAccountStub = makeAddAccount()
    const sut = new SingUpController(emailValidatorStub, addAccountStub)

    return { sut, emailValidatorStub, addAccountStub }
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

    test('Should return 400 if no password confirmation is provided', () => {
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

    test('Should return 400 if no password confirmation fails', () => {
        // system under test
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                passwordConfirmation: 'invalid_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
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
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })

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

    test('Should call AddAccount with correct values', () => {
        // system under test
        const { sut, addAccountStub } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
    })

    test('Should return 500 if AddAccount throws', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should return 201 if valid data is provided', () => {
        // system under test
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'valid_name',
                email: 'invalid_email@email.com',
                password: 'valid_password',
                passwordConfirmation: 'valid_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(201)
        expect(httpResponse.body).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'
        })
    })

})