import React from 'react';
import {
  FaTruck,
  FaClock,
  FaBookOpen,
  FaShieldAlt,
  FaUserGraduate,
  FaTachometerAlt,
} from "react-icons/fa";

const WhyChoseUs = () => {

  

const whyChooseData = [
    {
      id: 1,
      icon: FaTruck,
      title: "Doorstep Delivery",
      description:
        "Get your favorite books delivered directly to your home without visiting the library. Save time and focus on learning.",
    },
    {
      id: 2,
      icon: FaClock,
      title: "Fast & Reliable Service",
      description:
        "Our system ensures quick order processing and transparent delivery updates from request to doorstep.",
    },
    {
      id: 3,
      icon: FaBookOpen,
      title: "Wide Library Network",
      description:
        "Access books from multiple partner libraries across different cities — all from one platform.",
    },
    {
      id: 4,
      icon: FaShieldAlt,
      title: "Secure Payments",
      description:
        "Safe and encrypted online payment system with instant confirmation and digital invoices.",
    },
    {
      id: 5,
      icon: FaTachometerAlt,
      title: "Easy Dashboard Management",
      description:
        "Track orders, manage wishlist, view invoices, and update profile — all in one simple dashboard.",
    },
    {
      id: 6,
      icon: FaUserGraduate,
      title: "Trusted by Students & Researchers",
      description:
        "Designed especially for students, researchers, and passionate readers who value convenience and reliability.",
    },
  ];


  return (
    <div>
      <h4 className="text-4xl text-center mb-5 mt-9">Why Choose <span className='text-primary'>LibraGo</span></h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {whyChooseData.map(({ id, icon: Icon, title, description }) => (
          <div
            key={id}
            className="p-5 bg-base-100 space-y-2.5 rounded-xl shadow-sm text-center hover:bg-secondary"
          >
            <div className="flex justify-center items-center">
              <Icon className="text-3xl text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium">{title}</h3>
            </div>
            <div>
              <p className="text-sm text-[#606060]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoseUs;