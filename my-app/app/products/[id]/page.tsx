import React from 'react'
import axios from 'axios'

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

type Product = {
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: string,
        count: number
    }
}


const Products = async ({ params }: PageProps) => {

    const { id } = await params;

    let fetchData = async (): Promise<Product[]> => {

        let response = await fetch(`https://fakestoreapi.com/products`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw Error("Something Went wrong while fetching the data")
        }

        return response.json()

    }


    const Products: Product[] = await fetchData()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {Products.map((ele) => (
                <div
                    key={ele.id}
                    className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  
                    <div className="relative h-64 w-full bg-gray-50 p-4 flex items-center justify-center">
                        <img
                            src={ele.image}
                            alt={ele.title}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                        />
                    </div>

                  
                    <div className="p-4 flex flex-col grow">
                        <h2 className="text-sm font-medium text-slate-700 line-clamp-2 mb-2 h-10">
                            {ele.title}
                        </h2>

                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-lg font-bold text-slate-900">
                                ${ele.price}
                            </span>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}





export default Products     