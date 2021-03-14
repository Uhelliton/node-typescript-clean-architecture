import { AccountModel } from '@src/domains/models/account.model'

export interface AddAccountModel {
    name: string,
    email: string,
    password: string,
}

export interface AddAccount {
    add (account: AddAccountModel): AccountModel
}