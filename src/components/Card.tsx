import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductType } from '../types'

interface Props {
    product: ProductType;
    onDelete: (id: number) => Promise<void>;
}

function Card({ product, onDelete }: Props) {
    const { title, description, price, id } = product
    const navigate = useNavigate()
    return (
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
            <h1 className=' text-lg font-bold'>{title}</h1>
            <p>{description}</p>
            <p>Only ${price}</p>
            <hr className='my-2' />
            <div className='flex justify-between'>
                <button className='text-blue-700' onClick={() => navigate(`/products/${id}`)}>Edit</button>
                <button className='text-blue-700' onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    )
}

export default Card