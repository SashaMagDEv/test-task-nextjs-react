import { useForm } from 'react-hook-form';
import {useRouter} from "next/router";

export default function PostForm({ onSubmit, isLoading }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate
              className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Заголовок:
                </label>
                <input
                    type="text"
                    {...register('title', {required: 'Заголовок обовʼязковий'})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Текст:
                </label>
                <textarea
                    {...register('body', {required: 'Текст поста обовʼязковий'})}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.body && (
                    <p className="text-sm text-red-500 mt-1">{errors.body.message}</p>
                )}
            </div>

            <div className="flex justify-between">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 transition duration-200"
                >
                    {isLoading ? 'Відправка...' : 'Створити'}
                </button>
                <button
                    onClick={() => router.back()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    ← Назад
                </button>
            </div>
        </form>


    );
}