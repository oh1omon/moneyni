import React from 'react'
import { useSelector } from 'react-redux'
import { IOperationsState, IOperationWithDate, IRootState } from '../react-app-env'
import { operationSplitter } from '../services/logic/operationsWorker'
import OperationsWindow from './OperationsWindow'

const Operations = (): JSX.Element => {
	// Getting operations array from global store
	const operations: IOperationsState = useSelector((state: IRootState) => state.operations)

	return (
		<ul className='w-4/5 h-auto mt-10 mb-20'>
			{operations &&
				operationSplitter(operations)
					.reverse()
					.map((operations: IOperationWithDate[]) => (
						<OperationsWindow
							key={operations.map((s) => s._id).toString()}
							operationsArr={operations}
						/>
					))}
		</ul>
	)
}

export default Operations
