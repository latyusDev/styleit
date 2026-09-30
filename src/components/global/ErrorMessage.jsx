import React from 'react'
import mobileLogo from '../../images/m_logo.png' 
import Image from './Image'

const ErrorMessage = ({ error }) => {
    const message = error?.response?.data?.message ||
        error?.response?.data?.msg ||
        (error?.message === 'Network Error' ? 'You are offline, check your internet connection' : error?.message) ||
        'Something went wrong while processing your request'

    return (
        <div className='px-4  my-4 ' data-testid='error-message'>
            <div className='px-4 shadow-md text-center rounded-xl border py-32'>
            <Image src={mobileLogo} className='mb-3 mx-auto' />
                <p className=' text-xl '>{message}</p>
            </div>
        </div>
    )
}

export default ErrorMessage