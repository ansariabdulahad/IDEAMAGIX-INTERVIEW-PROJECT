import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const DynamicForm = ({ formConfig, onSubmit, formData, setFormData }) => {
    return (
        <form
            onSubmit={onSubmit}
            className='p-6 bg-white shadow-md rounded-lg space-y-4'
        >
            {
                formConfig.map((field, index) => (
                    <div
                        key={index}
                        className='space-y-1'
                    >
                        <Label htmlFor={field.label}
                            className="block text-sm font-medium text-gray-700"
                        >{field.label}</Label>
                        <Input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder}
                            onChange={(e) => setFormData({
                                ...formData,
                                [e.target.name]: e.target.value
                            })}
                            className="block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                ))
            }
            <Button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md shadow-sm"
            >Submit</Button>
        </form>
    )
}

export default DynamicForm