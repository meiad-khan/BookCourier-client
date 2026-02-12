import { FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-200 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary">
            How BookCourier Works
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Borrowing books has never been easier. Follow these simple steps and
            enjoy doorstep delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
            <div className="card-body text-center">
              <FaSearch className="text-5xl text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-2">Browse Books</h3>
              <p className="text-gray-600">
                Explore a wide collection of books from multiple partner
                libraries.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
            <div className="card-body text-center">
              <FaShoppingCart className="text-5xl text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-2">Place Order</h3>
              <p className="text-gray-600">
                Fill in your delivery details and confirm your request securely.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
            <div className="card-body text-center">
              <FaTruck className="text-5xl text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-2">Home Delivery</h3>
              <p className="text-gray-600">
                Receive your books at your doorstep quickly and reliably.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
