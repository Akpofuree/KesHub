'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"

export default function StoreAddProduct() {

    const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Health', 'Toys & Games', 'Sports & Outdoors', 'Books & Media', 'Food & Drink', 'Hobbies & Crafts', 'Others']
    const deviceStates = ['Brand New', 'Boxed', 'Unboxed', 'Second-hand', 'UK Used']
    const grades = ['A+', 'A', 'B', 'C', 'Refurbished']
    const simStatuses = ['SIM Unlocked', 'SIM Locked']
    const usageTypes = ['Brand New', 'Used', 'UK Used']

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        brand: "",
        storage: "",
        deviceType: "",
        deviceState: "",
        grade: "",
        simStatus: "",
        usageType: "",
        mrp: 0,
        price: 0,
        category: "",
    })
    const [loading, setLoading] = useState(false)


    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result || ""
            resolve(String(result).split(",")[1] || "")
        }
        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsDataURL(file)
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const imageUrls = []
        for (const file of Object.values(images)) {
            if (!file) continue
            const fileData = await fileToBase64(file)
            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    fileData,
                }),
            })
            const uploadResult = await uploadResponse.json()
            if (!uploadResponse.ok) throw new Error(uploadResult.message || "Failed to upload image")
            imageUrls.push(uploadResult.data.secure_url)
        }

        const storesResponse = await fetch("/api/stores")
        const storesResult = await storesResponse.json()
        const storeId = storesResult.data?.[0]?.id
        if (!storeId) throw new Error("No store found for product creation")

        const productResponse = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...productInfo,
                mrp: Number(productInfo.mrp),
                price: Number(productInfo.price),
                images: imageUrls,
                storeId,
            }),
        })
        const productResult = await productResponse.json()
        if (!productResponse.ok) throw new Error(productResult.message || "Failed to add product")
    }


    return (
        <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })} className="text-slate-500 mb-28">
            <h1 className="text-2xl">Add New <span className="text-slate-800 font-medium">Products</span></h1>
            <p className="mt-7">Product Images</p>

            <div htmlFor="" className="flex gap-3 mt-4">
                {Object.keys(images).map((key) => (
                    <label key={key} htmlFor={`images${key}`}>
                        <Image width={300} height={300} className='h-15 w-auto border border-slate-200 rounded cursor-pointer' src={images[key] ? URL.createObjectURL(images[key]) : assets.upload_area} alt="" />
                        <input type="file" accept='image/*' id={`images${key}`} onChange={e => setImages({ ...images, [key]: e.target.files[0] })} hidden />
                    </label>
                ))}
            </div>

            <label htmlFor="" className="flex flex-col gap-2 my-6 ">
                Name
                <input type="text" name="name" onChange={onChangeHandler} value={productInfo.name} placeholder="Enter product name" className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded" required />
            </label>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
                <label className="flex flex-col gap-2 my-2 text-slate-600">
                    Brand
                    <input type="text" name="brand" onChange={onChangeHandler} value={productInfo.brand} placeholder="e.g. Samsung" className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
                <label className="flex flex-col gap-2 my-2 text-slate-600">
                    Storage
                    <input type="text" name="storage" onChange={onChangeHandler} value={productInfo.storage} placeholder="e.g. 128 GB" className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mt-4">
                <label className="flex flex-col gap-2 text-slate-600">
                    Device type
                    <input type="text" name="deviceType" onChange={onChangeHandler} value={productInfo.deviceType} placeholder="e.g. Phone" className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
                <label className="flex flex-col gap-2 text-slate-600">
                    Device state
                    <select name="deviceState" onChange={onChangeHandler} value={productInfo.deviceState} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                        <option value="">Select state</option>
                        {deviceStates.map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mt-4">
                <label className="flex flex-col gap-2 text-slate-600">
                    Grade
                    <select name="grade" onChange={onChangeHandler} value={productInfo.grade} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                        <option value="">Select grade</option>
                        {grades.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
                    </select>
                </label>
                <label className="flex flex-col gap-2 text-slate-600">
                    SIM status
                    <select name="simStatus" onChange={onChangeHandler} value={productInfo.simStatus} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                        <option value="">Select SIM status</option>
                        {simStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                </label>
            </div>

            <label className="flex flex-col gap-2 my-6 text-slate-600 max-w-sm">
                Usage type
                <select name="usageType" onChange={onChangeHandler} value={productInfo.usageType} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                    <option value="">Select usage type</option>
                    {usageTypes.map((usage) => <option key={usage} value={usage}>{usage}</option>)}
                </select>
            </label>

            <label htmlFor="" className="flex flex-col gap-2 my-6 ">
                Description
                <textarea name="description" onChange={onChangeHandler} value={productInfo.description} placeholder="Enter product description" rows={5} className="w-full max-w-2xl p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
            </label>

            <div className="flex gap-5">
                <label htmlFor="" className="flex flex-col gap-2 ">
                    Actual Price ($)
                    <input type="number" name="mrp" onChange={onChangeHandler} value={productInfo.mrp} placeholder="0" rows={5} className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
                </label>
                <label htmlFor="" className="flex flex-col gap-2 ">
                    Offer Price ($)
                    <input type="number" name="price" onChange={onChangeHandler} value={productInfo.price} placeholder="0" rows={5} className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
                </label>
            </div>

            <select onChange={e => setProductInfo({ ...productInfo, category: e.target.value })} value={productInfo.category} className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded" required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <br />

            <button type="submit" disabled={loading} className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition">Add Product</button>
        </form>
    )
}
