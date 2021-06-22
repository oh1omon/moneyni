import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { IFormObject, IValRes } from '../react-app-env'
import { registerUser, signInUser } from '../services/dispatchers/userDispatcher'
import Button from './Button'
import Input from './Input'

const inputFields = [
	{ inputId: 'email', inputType: 'email', activated: true },
	{ inputId: 'name', inputType: 'text', activated: false },
	{ inputId: 'password', inputType: 'password', activated: true },
	{ inputId: 'salary', inputType: 'tel', activated: false },
]

const SignInUp = (): JSX.Element => {
	const [signIn, setSignIn] = useState(true)
	const [inputs, setInputs] = useState(inputFields)
	const [form, setForm] = useState<IFormObject>({})
	const [err, setErr] = useState<IValRes>([])

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	/**
	 * Function controls which input fields to show to the user
	 * Another words, it toggles name input field on or off
	 */
	const signInChangeHandler = () => {
		//Toggling new account state
		setSignIn(!signIn)

		//Getting index of name input object in the inputs state
		const getNameInputIndex = (inputName: string) => inputs.findIndex((i) => i.inputId === inputName)

		//Input names, that are needed only for Sign Up
		const signUpInputs = ['name', 'salary']

		//We are iterating Sign Up needed inputs and toggling them on and off
		for (let i = 0; i < signUpInputs.length; i++) {
			const inputIndex = getNameInputIndex(signUpInputs[i])

			//Creating a new name input field based on the one in the state
			const input = inputs[inputIndex]

			//Toggling the input's activated value
			input.activated = !input.activated

			//Here we changing old name input field version with new, toggled one
			inputs.splice(inputIndex, 1, input)

			//Updating the state
			setInputs([...inputs])
		}

		//If we are toggling from Sign Up to Sign In, then we need to delete those fields from the form state
		const prevForm = form
		if (prevForm.name) {
			delete prevForm['name']
			delete prevForm['salary']
		}

		//Updating new form state
		setForm(prevForm)
	}

	const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setErr([])
		const validationResult: IValRes = formValidator(form)
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}
		signIn ? signInUser(form) : registerUser(form)
	}

	const formValidator = (formObject: IFormObject) => {
		const err: string[] = []

		if (!formObject.email) {
			err.push('email')
		} else {
			const testRes = /^[^\s@]+@[^\s@]+$/.test(formObject.email)
			if (!testRes) {
				err.push('email')
			}
		}
		if (!formObject.password) {
			err.push('password')
		}
		if (!signIn && !formObject.name) {
			err.push('name')
		}

		return err
	}

	return (
		<div className='w-full h-screen flex justify-center items-center bg-main-dark'>
			<form className='flex flex-col justify-between items-center h-3/4 w-3/4'>
				{inputs
					.filter((input) => input.activated)
					.map((input) => (
						<Input
							key={input.inputId}
							inputType={input.inputType}
							inputId={input.inputId}
							changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
							err={err.includes(input.inputId)}
						/>
					))}
				<Button buttonText={signIn ? 'Sign In' : 'Sign Up'} clickHandler={submitHandler} />
				<Input inputType={'checkbox'} inputId={'signIn'} changeHandler={signInChangeHandler} />
			</form>
		</div>
	)
}

export default SignInUp
