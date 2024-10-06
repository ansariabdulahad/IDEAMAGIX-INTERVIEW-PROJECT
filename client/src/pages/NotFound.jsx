import { Loader } from 'lucide-react'
import React from 'react'

const NotFound = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <Loader className='animate-spin' />
            Page Not Found
        </div>
    )
}

export default NotFound