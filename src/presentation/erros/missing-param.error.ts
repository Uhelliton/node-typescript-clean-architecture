export class MissingParamError extends Error {
    constructor(paramName: string) {
        super(`Mission param: ${paramName}`)
        this.name = 'MissingParamError'
    }
}