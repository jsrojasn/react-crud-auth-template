import { useState, useEffect, useCallback } from 'react'
import axios from "axios"
import { ProductType } from '../types'
import Card from '../components/Card'
import { useAuth } from '../contexts/AuthContext'

function Products() {
    const [products, setProducts] = useState<ProductType[]>([])
    const { user } = useAuth()
    const fetchProducts = useCallback(
        async () => {
            try {
                const { data } = await axios.get<ProductType[]>(`${process.env.REACT_APP_API_URL}/products`, { headers: { Authorization: `Bearer ${user?.token}` } })
                setProducts(data)
            } catch (error) {
                alert("ERROR")
            }
        },
        [user?.token],
    )


    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const deleteProduct = useCallback(
        async (id: number) => {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, { headers: { Authorization: `Bearer ${user?.token}` } })
                fetchProducts()
            } catch (error) {
                alert("ERROR")
            }
        }
        ,
        [fetchProducts, user?.token],
    )



    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className='text-center my-3 text-3xl font-bold'>Products</h1>
            <div className='grid gap-4 grid-cols-3'>
                {products.map(product => <Card key={product.id} product={product} onDelete={deleteProduct} />)}

            </div>
        </div>
    )
}

export default Products