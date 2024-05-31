/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getProductsDetail } from "../services/adminService";
import { useParams } from "react-router-dom";
import CloudinaryDetailImg from "../component/Cloudinary/CloudImg";
import useLocalStorage from "../hook/useLocalStorage";

interface Product {
    ProductId: number;
    ProductName: string;
    CatalogName: string;
    ImageURL: string;
    CatalogId: number;
    Quantity: number;
    Price: number;
    Brand: string;
    Model: string;
    Processor: string;
    RAMSize: number;
    StorageSize: number;
    GraphicsCard: string;
    ReleaseDate: string;
    Details: any;
}

interface CartItem {
    ProductId: number;
    ProductName: string;
    ImageURL: string;
    Price: number;
    Quantity: number;
}

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState<Product | null>(null);
    const [items, setItems] = useLocalStorage('items', []);
    const { id } = useParams();

    useEffect(() => {
        const fetchDetailProducts = async () => {
            try {
                if (typeof id === 'string') {
                    const productsData = await getProductsDetail(parseInt(id, 10));
                    setProductDetail(productsData);
                    console.log(productsData);
                    
                }
            } catch (err) {
                console.error("Error fetching product details:", err);
            }
        };
        console.log(productDetail);
        
        if (id) {
            fetchDetailProducts();
        }
    }, [id]); // Add id as a dependency


    const addToCart = (ProductId: number, ProductName: string, ImageURL: string, Price: number, Quantity: number) => {
        const existingItemIndex = items.findIndex((item: CartItem) => item.ProductId === ProductId);

        if (existingItemIndex !== -1) {
            alert('san pham da ton tai trong gio hang');
        } else {
            const newItem = { ProductId, ProductName, ImageURL, Price , Quantity };
            console.log(ImageURL);
            
            setItems([...items, newItem]);
        }
    };

    return (
        <div className="container mx-auto px-4">
            {productDetail ? (
                <div key={productDetail.ProductId} className="grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-lg p-6 bg-white rounded-lg">
                    <div className="flex justify-center items-center">
                        <div className="max-w-md">
                            <CloudinaryDetailImg ImgUrl={productDetail.ImageURL} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">{productDetail.ProductName}</h2>
                        <p className="text-gray-600">{productDetail.Price}</p>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mt-6">Product information</h3>
                            <ul className="mt-2 text-gray-600">
                                <li><span className="font-semibold">Brand:</span> {productDetail.Details.Brand}</li>
                                <li><span className="font-semibold">Model:</span> {productDetail.Details.Model}</li>
                                <li><span className="font-semibold">Processor:</span> {productDetail.Details.Processor}</li>
                                <li><span className="font-semibold">RAM:</span> {productDetail.Details.RAMSize} GB</li>
                                <li><span className="font-semibold">Storage Size:</span> {productDetail.Details.StorageSize} GB</li>
                                <li><span className="font-semibold">Graphics Card:</span> {productDetail.Details.GraphicsCard}</li>
                            </ul>
                        </div>
                        {/* add to cart */}
                        <button type="button" onClick={() => {addToCart(productDetail.ProductId, productDetail.ProductName, productDetail.ImageURL, productDetail.Price , 1)}} className="w-full py-2.5 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700">Add to cart</button>
                    </div>
                </div>
            ) : (
                <p className="text-center mt-8">Loading...</p>
            )}
        </div>
    );
}

export default ProductDetail;
