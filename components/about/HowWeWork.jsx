"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Check,
  Package,
  Shield,
  DollarSign,
  Target,
  Truck,
  MessageSquare,
  Smartphone,
  Wifi,
  Battery,
  Signal,
  Send,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Sourcing",
    description:
      "Bought directly from trusted brands and authorized distributors.",
    subtext: "100% authentic supply chain.",
    stat: "Verified Partners",
    icon: Package,
    screen: "verification",
  },
  {
    id: 2,
    title: "Quality Check",
    description: "Every unit tested, inspected, and verified before listing.",
    subtext: "98% of inspected devices pass our quality checks.",
    stat: "32-Point Check",
    icon: Shield,
    screen: "inspection",
  },
  {
    id: 3,
    title: "Fair Pricing",
    description: "Transparent pricing with no hidden markups or surprise fees.",
    subtext: "Always exactly what you see.",
    stat: "Zero Hidden Fees",
    icon: DollarSign,
    screen: "pricing",
  },
  {
    id: 4,
    title: "Your Budget",
    description: "We recommend what fits your budget and needs perfectly.",
    subtext: "Curated tech recommendations.",
    stat: "Personalized",
    icon: Target,
    screen: "budget",
  },
  {
    id: 5,
    title: "Fast Delivery",
    description: "Tracked nationwide delivery with real-time updates.",
    subtext: "Secure handling and dispatch.",
    stat: "2-4 Working Days",
    icon: Truck,
    screen: "tracking",
  },
  {
    id: 6,
    title: "Real Support",
    description: "Human support ready to help you anytime you need.",
    subtext: "Before and after you buy.",
    stat: "< 5m Response Time",
    icon: MessageSquare,
    screen: "support",
  },
];

// App Header common to all screens
const AppHeader = ({ title }) => (
  <div className="flex flex-col bg-white border-b border-gray-100 z-10 sticky top-0 shrink-0">
    <div className="flex justify-between items-center px-6 pt-4 pb-2">
      <span className="text-[11px] font-semibold text-gray-800">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-3 h-3 text-gray-800" />
        <Wifi className="w-3 h-3 text-gray-800" />
        <Battery className="w-4 h-4 text-gray-800" />
      </div>
    </div>
    <div className="flex items-center justify-center pb-3">
      <span className="font-bold text-sm text-gray-900 tracking-wide">
        {title}
      </span>
    </div>
  </div>
);

const PhoneMockup = ({ activeFeature }) => {
  const screenContent = {
    verification: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <AppHeader title="Supplier Verification" />
        <div className="p-4 flex-1 flex flex-col gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                Apple Authorized
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Official Distributor
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Samsung Partner</p>
              <p className="text-xs text-gray-500 font-medium">
                Verified Source
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                Authentic Devices
              </p>
              <p className="text-xs text-gray-500 font-medium">100% Genuine</p>
            </div>
          </div>
        </div>
      </div>
    ),
    inspection: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <AppHeader title="Quality Check" />
        <div className="p-4 flex-1 flex flex-col">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex-1 flex flex-col">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">
              Inspection Checklist
            </p>
            <div className="space-y-5 flex-1">
              {[
                "Screen & Display",
                "Battery Health",
                "Face ID / Biometrics",
                "Cameras",
                "Speakers & Mics",
              ].map((item, i) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.12, type: "spring" }}
                    className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-sm"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                </div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 pt-4 border-t border-gray-100 text-center"
            >
              <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold tracking-wide">
                ✓ Inspection Passed
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    ),
    pricing: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <AppHeader title="Fair Pricing" />
        <div className="p-4 flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
            <p className="text-xs font-medium text-gray-500 mb-1 mt-1">
              Device Price
            </p>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">
              ₦450,000
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Price Breakdown
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">
                  Market Average
                </span>
                <span className="text-gray-400 line-through font-semibold">
                  ₦485,000
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-800 font-medium">KESHub Price</span>
                <span className="font-bold text-gray-900">₦450,000</span>
              </div>
              <div className="h-px bg-gray-100 my-1" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-600 font-bold">Your Savings</span>
                <span className="text-green-600 font-bold text-base">
                  ₦35,000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    budget: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <AppHeader title="Your Match" />
        <div className="p-4 flex-1 flex flex-col gap-4">
          <div className="bg-gray-900 rounded-xl p-5 text-white shadow-lg">
            <p className="text-xs font-medium text-gray-400 mb-1">
              Target Budget
            </p>
            <p className="text-2xl font-bold tracking-tight">₦500,000</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-bl-xl">
              98% Match
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 border border-gray-100">
              <Smartphone className="w-6 h-6 text-gray-700" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">
              iPhone 13 Pro
            </p>
            <p className="text-xs font-medium text-gray-500 mb-4">
              128GB • Excellent Condition
            </p>

            <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
              <span className="text-base font-bold text-gray-900">
                ₦485,000
              </span>
              <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                In Budget
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    tracking: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <AppHeader title="Order Tracking" />
        <div className="p-4 flex-1">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full">
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Estimated Delivery
              </p>
              <p className="text-lg font-bold text-gray-900">
                Tomorrow, 2:00 PM
              </p>
            </div>

            <div className="relative pl-4 space-y-7 mt-8">
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-100 rounded-full" />
              <div className="absolute left-[7px] top-2 h-[55%] w-[2px] bg-green-500 rounded-full" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                    Order Confirmed
                  </p>
                  <p className="text-[10px] font-medium text-gray-400">
                    Yesterday, 10:24 AM
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                    Packed
                  </p>
                  <p className="text-[10px] font-medium text-gray-400">
                    Yesterday, 4:15 PM
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm mt-0.5 shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.4)]" />
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                    In Transit
                  </p>
                  <p className="text-[10px] font-medium text-green-600">
                    Arriving in Lagos Hub
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex items-start gap-4 opacity-40">
                <div className="w-4 h-4 rounded-full bg-gray-200 border-4 border-white shadow-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-500 leading-none">
                    Out for Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    support: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <AppHeader title="KESHub Support" />
        <div className="p-4 flex-1 flex flex-col justify-end gap-3 pb-20 relative">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
            Online
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-end max-w-[85%] bg-gray-900 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm shadow-sm font-medium"
          >
            Hi! Could you verify the battery health on the iPhone 13 Pro?
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="self-start max-w-[85%] bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm shadow-sm flex flex-col gap-3 font-medium"
          >
            <p>
              Absolutely. It's at 96% maximum capacity. I've attached the 3CX
              diagnostic certificate for you.
            </p>
            <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2.5 border border-gray-100">
              <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center shrink-0">
                <Shield className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-[11px] font-bold text-gray-700">
                Diagnostic_Report.pdf
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="self-start bg-white border border-gray-100 rounded-full px-3 py-2 shadow-sm flex items-center gap-1 mt-1"
          >
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
            <div
              className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </motion.div>

          {/* Chat Input Mockup */}
          <div className="absolute bottom-5 left-4 right-4 h-11 bg-white rounded-full border border-gray-200 shadow-sm flex items-center px-4 justify-between">
            <span className="text-[13px] font-medium text-gray-400">
              Message...
            </span>
            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
              <Send className="w-3 h-3 text-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <motion.div
      animate={{ y: ["-4px", "4px", "-4px"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-[280px] h-[580px] bg-gray-200 rounded-[3rem] p-2.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] shrink-0 border border-gray-300"
    >
      <div className="w-full h-full bg-black rounded-[2.5rem] p-1">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
        <div className="w-full h-full bg-white rounded-[2.25rem] overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature?.screen || "verification"}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full h-full absolute top-0 left-0 flex flex-col"
            >
              {screenContent[activeFeature?.screen || "verification"]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ feature, isActive, index, total }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0.3,
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.97,
      }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      <div className="max-w-[420px] mx-auto lg:mx-0 py-8 lg:py-0">
        <div className="relative mb-4 inline-block">
          <motion.div
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center"
          >
            <feature.icon
              className={`w-7 h-7 ${isActive ? "text-gray-900" : "text-gray-400"}`}
            />
          </motion.div>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-green-400/30 rounded-2xl blur-xl -z-10"
            />
          )}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2
              className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${isActive ? "text-gray-900" : "text-gray-500"}`}
            >
              {feature.title}
            </h2>
            <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-500 rounded-md tracking-wider">
              {index + 1}/{total}
            </span>
          </div>
          <p className="text-[17px] text-gray-600 leading-relaxed mb-4 font-medium">
            {feature.description}
          </p>

          <div className="flex items-center gap-2.5">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isActive ? "bg-green-500" : "bg-gray-300"}`}
            />
            <p className="text-sm font-medium text-gray-500">
              {feature.subtext}{" "}
              <span className="text-gray-900 font-bold ml-1">
                {feature.stat}
              </span>
            </p>
          </div>
        </div>

        <div className="h-1 bg-gray-200/60 rounded-full mt-6 overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              width: isActive ? `100%` : "0%",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-green-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sections = sectionRef.current.querySelectorAll(".feature-section");

      // On mobile, trigger slightly earlier so the card is active when it's clearly visible under the sticky phone
      const isDesktop = window.innerWidth >= 1024;
      const viewportMiddle = isDesktop
        ? window.innerHeight / 2
        : window.innerHeight * 0.7;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportMiddle && rect.bottom > viewportMiddle) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAFAFA] py-16 sm:py-20 md:py-24"
    >
      {/* Subtle Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#FAFAFA] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.015),transparent_50%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center tracking-tight">
          How We Work
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-500 text-center font-medium max-w-2xl mx-auto leading-snug">
          Verified. Transparent. Trusted.
        </p>
      </div>

      {/* Layout Structure */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start relative">
          {/* Sticky Phone Column */}
          <div className="w-full lg:w-1/2 sticky top-24 h-[45vh] lg:h-[calc(100vh-6rem)] flex items-center justify-center z-[60] bg-[#FAFAFA] lg:bg-transparent pt-6 lg:pt-0 pb-4 lg:pb-0 border-b border-gray-100/50 lg:border-none shadow-[0_20px_20px_-20px_rgba(0,0,0,0.02)] lg:shadow-none">
            <div className="transform scale-[0.65] sm:scale-75 lg:scale-100 origin-center">
              <PhoneMockup activeFeature={features[activeIndex]} />
            </div>

            {/* Soft fade at the bottom of the sticky container on mobile to blend with scrolling cards */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#FAFAFA] to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* Scrollable Features Column */}
          <div className="w-full lg:w-1/2 z-10 lg:pl-16 pt-8 lg:pt-0">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-section flex items-center justify-center lg:justify-start min-h-[65vh] lg:min-h-screen"
              >
                <div className="w-full flex items-center justify-center lg:justify-start">
                  <FeatureCard
                    feature={feature}
                    isActive={index === activeIndex}
                    index={index}
                    total={features.length}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
