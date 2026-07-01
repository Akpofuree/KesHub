import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const OrderSummary = ({ totalPrice, items }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const addressList = useSelector((state) => state.address.list);

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');
    const [paymentError, setPaymentError] = useState('');

    const orderTotal = coupon ? totalPrice - (coupon.discount / 100) * totalPrice : totalPrice;

    const handleCouponCode = async (event) => {
        event.preventDefault();
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        router.push('/orders');
    };

    const handlePayNow = async () => {
        setPaymentError('');

        if (!isLoaded || !isSignedIn) {
            router.push('/sign-in');
            return;
        }

        if (!items?.length) {
            setPaymentError('Your cart is empty');
            return;
        }

        if (!selectedAddress?.id) {
            setPaymentError('Please select a delivery address');
            return;
        }

        const email = selectedAddress?.email;
        if (!email) {
            setPaymentError('Please select a delivery address');
            return;
        }

        const orderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerName: selectedAddress.name || '',
                customerEmail: email,
                customerPhone: selectedAddress.phone || '',
                address: `${selectedAddress.street || ''}, ${selectedAddress.city || ''}, ${selectedAddress.state || ''}, ${selectedAddress.zip || ''}`,
                cartItems: items.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total: orderTotal,
            }),
        });

        const orderResult = await orderResponse.json();

        if (!orderResponse.ok || !orderResult?.success) {
            throw new Error(orderResult?.message || 'Failed to create order');
        }

        const paymentResponse = await fetch('/api/payments/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderResult.data.orderId,
                email,
            }),
        });

        const paymentResult = await paymentResponse.json();

        if (!paymentResponse.ok || !paymentResult?.success) {
            throw new Error(paymentResult?.message || 'Failed to initialize Paystack');
        }

        window.location.href = paymentResult.data.authorization_url;
    };

    return (
        <div className='w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7'>
            <h2 className='text-xl font-medium text-slate-600'>Payment Summary</h2>
            <p className='text-slate-400 text-xs my-4'>Payment Method</p>
            <div className='flex gap-2 items-center'>
                <input type="radio" id="COD" name="payment" className='accent-gray-500' defaultChecked />
                <label htmlFor="COD" className='cursor-pointer'>COD</label>
            </div>
            <div className='flex gap-2 items-center mt-1'>
                <input type="radio" id="PAYSTACK" name='payment' className='accent-gray-500' />
                <label htmlFor="PAYSTACK" className='cursor-pointer'>Paystack Payment</label>
            </div>
            <div className='my-4 py-4 border-y border-slate-200 text-slate-400'>
                <p>Address</p>
                {selectedAddress ? (
                    <div className='flex gap-2 items-center'>
                        <p>{selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
                        <SquarePenIcon onClick={() => setSelectedAddress(null)} className='cursor-pointer' size={18} />
                    </div>
                ) : (
                    <div>
                        {addressList.length > 0 && (
                            <select
                                className='border border-slate-400 p-2 w-full my-3 outline-none rounded'
                                onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                            >
                                <option value="">Select Address</option>
                                {addressList.map((address, index) => (
                                    <option key={index} value={index}>
                                        {address.name}, {address.city}, {address.state}, {address.zip}
                                    </option>
                                ))}
                            </select>
                        )}
                        <button type="button" className='flex items-center gap-1 text-slate-600 mt-1' onClick={() => setShowAddressModal(true)}>
                            Add Address <PlusIcon size={18} />
                        </button>
                    </div>
                )}
            </div>
            <div className='pb-4 border-b border-slate-200'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1 text-slate-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-1 font-medium text-right'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p>Free</p>
                        {coupon && <p>{`-${currency}${((coupon.discount / 100) * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {!coupon ? (
                    <form onSubmit={(e) => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex justify-center gap-3 mt-3'>
                        <input onChange={(e) => setCouponCodeInput(e.target.value)} value={couponCodeInput} type="text" placeholder='Coupon Code' className='border border-slate-400 p-1.5 rounded w-full outline-none' />
                        <button type="submit" className='bg-slate-600 text-white px-3 rounded hover:bg-slate-800 active:scale-95 transition-all'>Apply</button>
                    </form>
                ) : (
                    <div className='w-full flex items-center justify-center gap-2 text-xs mt-2'>
                        <p>Code: <span className='font-semibold ml-1'>{coupon.code.toUpperCase()}</span></p>
                        <p>{coupon.description}</p>
                        <XIcon size={18} onClick={() => setCoupon('')} className='hover:text-red-700 transition cursor-pointer' />
                    </div>
                )}
            </div>
            <div className='flex justify-between py-4'>
                <p>Total:</p>
                <p className='font-medium text-right'>{currency}{orderTotal.toLocaleString()}</p>
            </div>

            {!isLoaded || !isSignedIn ? (
                <button
                    type="button"
                    onClick={() => router.push('/sign-in')}
                    className="w-full bg-slate-700 text-white py-2.5 rounded hover:bg-slate-900 active:scale-95 transition-all"
                >
                    Please sign in to continue
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => toast.promise(handlePayNow(), {
                        loading: 'Preparing payment...',
                        success: 'Redirecting to Paystack...',
                        error: (err) => err.message || 'Payment failed',
                    })}
                    disabled={!items?.length || !selectedAddress}
                    className="w-full bg-emerald-600 text-white py-2.5 rounded hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all"
                >
                    Pay with Paystack
                </button>
            )}

            {!isLoaded || !isSignedIn ? (
                <p className="mt-3 text-xs text-amber-600">Please sign in to continue</p>
            ) : null}
            {isSignedIn && !items?.length ? (
                <p className="mt-3 text-xs text-amber-600">Your cart is empty</p>
            ) : null}
            {isSignedIn && items?.length > 0 && !selectedAddress ? (
                <p className="mt-3 text-xs text-amber-600">Please select a delivery address</p>
            ) : null}
            {paymentError ? <p className="mt-3 text-xs text-red-600">{paymentError}</p> : null}

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
        </div>
    );
}

export default OrderSummary;
