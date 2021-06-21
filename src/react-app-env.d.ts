/// <reference types="react-scripts" />

import { Action } from 'redux'

type ISpendAction = {
	type: string
	spending: ISpending
}

type SpendsState = ISpend[] | []

interface ISpend {
	_id: Types.ObjectId
	owner: Types.ObjectId
	category: string
	comment: string
	cost: number
	currency: string
}

interface SpendsStateAction extends Action {
	type: string
	payload: TSpendsState
}

interface IUser {
	_id: Types.ObjectId
	id: string
	email: string
	password: string
	name: string
	spends: [] | Types.ObjectId[]
}

type TUserState = boolean | IUser

type TSpendsState = ISpend[]

interface UserStateAction extends Action {
	type: string
	payload: UserState
}

interface IRootState {
	user: TUserState
	spends: TSpendsState
}

interface ISpend {
	_id: Types.ObjectId
	owner: Types.ObjectId
	category: string
	comment: string
	cost: number
	currency: string
	date: Date
}

type TAddDateToSpend = (spend: ISpend) => ISpendWithDate
type TConvertIdToDate = (idString: string) => Date
type TSpendsSplitter = (spendsArr: ISpend[]) => ISpendWithDate[][]

interface IServerResp {
	status: {
		success: boolean
		message: string
	}
}

interface IUserServerResp extends IServerResp {
	user?: IUser
}

interface ISpendServerResp extends IServerResp {
	spends: ISpend[]
}
