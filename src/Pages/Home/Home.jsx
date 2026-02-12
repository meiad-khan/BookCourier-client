import React, { Suspense } from 'react';
import Banner from './Banner';
import LatestBook from './LatestBook';
import Coverage from './Coverage';
import Loading from '../../Components/Loading/Loading';
import WhyChoseUs from './WhyChoseUs';

 const coveragePromise =  fetch("/serviceCenters.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <div className="mt-8">
        <Banner></Banner>
      </div>
      <div>
        <LatestBook></LatestBook>
      </div>
      <div>
        <Suspense fallback={<Loading></Loading>}>
          <Coverage coveragePromise={coveragePromise}></Coverage>
        </Suspense>
      </div>
      <div>
        <WhyChoseUs></WhyChoseUs>
      </div>
    </div>
  );
};

export default Home;