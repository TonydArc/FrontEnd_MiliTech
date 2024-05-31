/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getProductsByCatalog, getProductsDetail } from '../../services/adminService';
import Cloudinaryshow from '../Cloudinary/Cloudinary';

interface Product {
    ProductId: number;
    ProductName: string;
    CatalogName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ImageURL: any;
    CatalogId: number;
    Quantity: number;
    Price: number;
}

export default function Productcataloglist() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productDetail, setProductsDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const { catalog } = useParams();

    const fetchProducts = async () => {
        try {
            const productsData = await getProductsByCatalog(catalog);
            setProducts(productsData);
            // console.log(productsData);

        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    const handleDetail = async (ProductId: number) => {
        const id = ProductId;
        console.log(id);

        try {
            const productsDetail = await getProductsDetail(id);
            setProductsDetail(productsDetail);
            console.log(productDetail);
        } catch (err) {
            return;
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    if (loading) {
        return (
            <div className="my-48">
                <div className="text-center">
                    <div className="animate-bounce">
                        <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <>
            <nav id="store" className="mt-12 w-full z-30 top-0 px-6 py-1">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

                    <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                        Các sản phẩm thuộc thương hiệu {catalog}
                    </a>

                    <div className="flex items-center" id="store-nav-content">

                        <a className="pl-3 inline-block no-underline hover:text-black" href="">
                            <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                            </svg>
                        </a>

                        <a className="pl-3 inline-block no-underline hover:text-black" href="">
                            <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                            </svg>
                        </a>

                    </div>
                </div>
            </nav>
            <div className="flex flex-wrap">
                {products.map((product: Product) => (
                    <div key={product.ProductId} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                        <Link to={`/detail/${product.ProductId}`}>
                            <div onClick={() => handleDetail(product.ProductId)} className='border rounded-md p-2 shadow-sm'>
                                <div className="hover:grow hover:shadow-lg">
                                    <Cloudinaryshow product={product} />
                                </div>
                                <div className="pt-3 flex text-sm font-bold items-center justify-between">
                                    <p className="">{product.ProductName}</p>
                                </div>
                                <p className="pt-1 text-gray-500 text-left">{formatPrice(product.Price)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
