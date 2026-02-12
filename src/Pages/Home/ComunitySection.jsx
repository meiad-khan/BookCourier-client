import { Link } from "react-router";


const CommunitySection = () => {
  return (
    <section className="py-24 bg-base-100 rounded-2xl">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">
          Join Our Reading Community
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Discover thousands of books, request home delivery, and experience a
          smarter way to borrow from libraries. Start your journey today.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/books"
            className="btn bg-primary text-white hover:bg-primary/90 px-8"
          >
            Browse Books
          </Link>

          <Link
            to="/register"
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white px-8"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
