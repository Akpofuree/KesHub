'use client'

import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AnimatedSubmitButton from "@/components/ui/AnimatedSubmitButton";

export default function ContactPage() {
    const [status, setStatus] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            toast.success("Message sent successfully! We'll get back to you soon.");
            e.target.reset();
            setStatus("success");
            setTimeout(() => setStatus("idle"), 2500);
        } catch (error) {
            toast.error(error.message || 'Something went wrong. Please try again.');
            setStatus("idle");
        }
    };

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto py-16">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight mb-4">
                        We'd love to hear from you.
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Have a question about a product, need help with an order, or just want to say hi? 
                        Drop us a line and our team will get back to you as soon as possible.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
                    
                    {/* Contact Info */}
                    <div className="flex-1 space-y-8">
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-slate-800 mb-6">Contact Information</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white p-3 rounded-full border border-slate-200 text-slate-600">
                                        <MapPinIcon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">Our Office</p>
                                        <p className="text-slate-500 text-sm mt-1">794 Francisco Street<br />San Francisco, CA 94102</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white p-3 rounded-full border border-slate-200 text-slate-600">
                                        <PhoneIcon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">Phone</p>
                                        <p className="text-slate-500 text-sm mt-1">
                                            <a href="tel:+12124567890" className="hover:text-indigo-600 transition">+1 (212) 456-7890</a>
                                        </p>
                                        <p className="text-slate-400 text-xs mt-0.5">Mon-Fri from 8am to 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white p-3 rounded-full border border-slate-200 text-slate-600">
                                        <MailIcon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">Email</p>
                                        <p className="text-slate-500 text-sm mt-1">
                                            <a href="mailto:contact@keshub.com" className="hover:text-indigo-600 transition">contact@keshub.com</a>
                                        </p>
                                        <p className="text-slate-400 text-xs mt-0.5">We aim to reply within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative border border-slate-100 flex items-center justify-center">
                            <p className="text-slate-500 font-medium">Interactive Map Placeholder</p>
                            <div className="absolute inset-0 bg-[url('https://placehold.co/800x400/e2e8f0/94a3b8?text=Map')] bg-cover bg-center opacity-50 mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="flex-[1.5]">
                        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-10">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Send us a message</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                    <input required name="firstName" type="text" id="firstName" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="John" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                    <input required name="lastName" type="text" id="lastName" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input required name="email" type="email" id="email" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="john@example.com" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <input required name="subject" type="text" id="subject" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="How can we help?" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea required name="message" id="message" rows="5" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none" placeholder="Write your message here..."></textarea>
                            </div>

                            <AnimatedSubmitButton 
                                status={status}
                                idleText="Send Message"
                                loadingText="Sending..."
                                successText="Message Sent!"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg disabled:bg-indigo-400 disabled:cursor-not-allowed"
                            />
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

