import { HttpResponse } from '@src/presentation/protocols/http'
import {ServerError} from "@src/presentation/erros/server.error";

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}

export const internalErrorRequest = (): HttpResponse => {
    return {
        statusCode: 500,
        body: new ServerError()
    }
}