import React from 'react';
import Banner from './Banner';
import LatestBook from './LatestBook';
import Coverage from './Coverage';
import WhyChoseUs from './WhyChoseUs';
import ImpactSection from './ImpactSection';
import CommunitySection from './ComunitySection';
import HowItWorks from './HowItWorks';


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
          <Coverage ></Coverage>
      </div>
      <div>
        <WhyChoseUs></WhyChoseUs>
      </div>
      <div className='mt-15'>
        <HowItWorks></HowItWorks>
      </div>

      <div className='mt-10'>
        <ImpactSection></ImpactSection>
      </div>
      <div className='my-20'>
        <CommunitySection></CommunitySection>
      </div>
    </div>
  );
};

export default Home;