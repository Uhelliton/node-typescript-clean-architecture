import { HttpResponse } from '@src/presentation/protocols/http'
import {ServerError} from "@src/presentation/erros/server.error";

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}

export const createRequest = (body: any): HttpResponse => {
    return {
        statusCode: 201,
        body: body
    }
}

export const serverError = (): HttpResponse => {
    return {
        statusCode: 500,
        body: new ServerError()
    }
}