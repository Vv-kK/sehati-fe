"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import "./page.css";

type FormFields = {
    name : string;
    category : String;
    retailPrice : BigInt;
    basePrice : BigInt;
    stock : BigInt;
    imageUrl : string;
    description : string;
    discountPrice : BigInt;
    imageFile : FileList;
}

export default function AddProductPage() {
    const router = useRouter();
    const [ imageFile, setImageFile ] = useState();
    const { register, handleSubmit, setError, formState: {errors, isSubmitting},} = useForm<FormFields>({
        defaultValues: {
            discountPrice: 0,
        },
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            console.log(data)
            console.log(data.imageFile[0])
            const image = data.imageFile[0];
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "sehati");
            const uploadResponse = await fetch(
              "https://api.cloudinary.com/v1_1/dtp9yhnc2/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );
            const uploadedImageData = await uploadResponse.json();
            const imageUrl = uploadedImageData.secure_url;
            register("imageUrl", imageUrl);

            
            const postResponse = await fetch(
                "https://significant-bird-sehati789-bae72099.koyeb.app/product/admin/create",
                {
                  method: "POST",
                  body: JSON.stringify({
                    productName: data.name,
                    category: data.category,
                    description: data.description,
                    retailPrice: data.retailPrice,
                    basePrice: data.basePrice,
                    stock: data.stock,
                    image: data.imageUrl,
                    discountPrice: data.discountPrice
                }),
                }
              );
        } catch (error) {
          setError("root", {
            message: "This email is already taken",
          });
        }
    };

    return (       
        <div>
            <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white ">Tambah Produk Baru</h2>

        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Produk</label>
                <input {...register("category")} type="text" list="category" id="category-input" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="BUAH" required />
                <datalist id="category">  
                    <option value="US">United States of America</option>
                    <option value="KE"></option>
                    <option value="UK"></option>
                    <option value="IN">India</option>
                    <option value="CN">China</option>
                    <option value="CA">Canada</option>
                    <option value="RU">Russia</option>
                    <option value="DE">Germany</option>
                    <option value="ZA">South Africa</option>
                    <option value="BR">Brazil</option>
                </datalist>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Produk</label>
                <input {...register("name")} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Apel" required />
            </div>
            <div className="mb-5 col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi Produk</label>
                <textarea {...register("description")} id="desc" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Merah, 1 kg berisi 5-6 buah" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Jual Produk</label>
                <input {...register("retailPrice")} type="number" id="retailPrice" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="150000" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modal Produk (per Kg / per Pack)</label>
                <input {...register("basePrice")} type="number" id="retailPrice" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="120500" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stok Produk (dalam Kg / dalam Pack)</label>
                <input {...register("stock")} type="number" id="retailPrice" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="8" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Diskon (jika ada)</label>
                <input {...register("discountPrice")} type="number" id="retailPrice" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="99000" />
            </div>
            <div className="mb-5 col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Foto Produk</label>
                <input {...register("imageFile")} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="product_image" id="product_image" type="file"></input>
            </div>
        </div>

        <button disabled={isSubmitting} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isSubmitting ? "Loading..." : "Buat Produk Baru"}</button>
        </form>
        </div>
    );
}