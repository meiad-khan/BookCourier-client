import React from 'react';

const ImpactSection = () => {
  return (
    <section className="py-20 bg-secondary text-center rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary mb-12">
          Our Growing Community
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-base-100 shadow-lg p-8 rounded-xl hover:scale-105 transition duration-300">
            <h3 className="text-4xl font-bold text-primary">5,000+</h3>
            <p className="mt-2 text-gray-600">Books Available</p>
          </div>

          <div className="bg-base-100 shadow-lg p-8 rounded-xl hover:scale-105 transition duration-300">
            <h3 className="text-4xl font-bold text-primary">2,000+</h3>
            <p className="mt-2 text-gray-600">Active Readers</p>
          </div>

          <div className="bg-base-100 shadow-lg p-8 rounded-xl hover:scale-105 transition duration-300">
            <h3 className="text-4xl font-bold text-primary">50+</h3>
            <p className="mt-2 text-gray-600">Partner Libraries</p>
          </div>

          <div className="bg-base-100 shadow-lg p-8 rounded-xl hover:scale-105 transition duration-300">
            <h3 className="text-4xl font-bold text-primary">98%</h3>
            <p className="mt-2 text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
