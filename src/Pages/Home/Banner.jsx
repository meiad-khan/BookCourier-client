import React from 'react';
import bannerImg1 from '../../assets/Banner/banner-1.jpg';
import bannerImg2 from '../../assets/Banner/banner-2.jpg';
import bannerImg3 from '../../assets/Banner/banner-3.jpg';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative">
      <Carousel autoPlay={true} infiniteLoop={true}>
        {/* <div className='max-h-125'>
          <img src={bannerImg1} />
        </div> */}
        <div
          className="hero min-h-125 rounded-xl"
          style={{
            backgroundImage: `url(${bannerImg1})`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Discover Your Next Favorite Book
              </h1>
              <p className="mb-5">
                Explore thousands of stories, from timeless classics to modern
                bestsellers.
              </p>
              <Link to={"/all-books"} className="btn btn-primary">
                All Books
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hero min-h-125 rounded-xl"
          style={{
            backgroundImage: `url(${bannerImg2})`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Where Stories Come Alive
              </h1>
              <p className="mb-5">
                Dive into worlds of imagination, knowledge, and inspiration —
                all in one place.
              </p>
              <Link to={"/all-books"} className="btn btn-primary">
                All Books
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hero min-h-125 rounded-xl"
          style={{
            backgroundImage: `url(${bannerImg3})`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Read. Learn. Grow.</h1>
              <p className="mb-5">
                Find books that expand your mind and spark your creativity every
                day.
              </p>
              <Link to={"/all-books"} className="btn btn-primary">
                All Books
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="max-h-125">
          <img src={bannerImg2} />
        </div>
        <div className="max-h-125">
          <img src={bannerImg3} />
        </div> */}
      </Carousel>
      {/* <div className="hidden lg:flex items-center gap-2 absolute bottom-40 left-22">
        <button className="btn bg-primary rounded-xl">Track Your Parcel</button>
        <BsArrowUpRightCircleFill className="text-3xl" />
        <button className="btn">Be A Rider</button>
      </div> */}
    </div>
  );
};

export default Banner;