import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

interface FormValues {
    title: string;
    description?: string;
    price: number;
}

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    price: yup.number().required()
});

function CreateProduct() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const onSubmit = handleSubmit(async (values) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/products`, { title: values.title, description: values.description, price: values.price }, { headers: { Authorization: `Bearer ${user?.token}` } })
            navigate("/")
        } catch (error) {
            console.log(error)
            alert("ERROR")
        }
    });
    return (
        <div className="max-w-3xl mx-auto px-4">
            <h1 className='text-center my-3 text-3xl font-bold'>Single Product</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor='title' className="block text-grey-darker text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="title"
                        type="text"
                        {...register('title')}
                    />
                    {errors.title && (
                        <span className="text-rose-700 text-xs italic py-1 text-right">
                            {errors.title.message}
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor='description' className="block text-grey-darker text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="description"
                        {...register('description')}
                    />
                    {errors.description && (
                        <span className="text-rose-700 text-xs italic py-1 text-right">
                            {errors.description.message}
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor='price' className="block text-grey-darker text-sm font-bold mb-2">
                        Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="price"
                        type="number"
                        {...register('price')}
                    />
                    {errors.price && (
                        <span className="text-rose-700 text-xs italic py-1 text-right">
                            {errors.price.message}
                        </span>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-sky-900 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct