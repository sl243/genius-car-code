import React from 'react';
import './BannerItem.css'

const BannerItem = ({slide}) => {
    const {image, id, prev , next} = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-image'>
                <img src={image} alt='' className="w-full rounded-lg" />
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-24 top-1/4">
                <h1 className='text-6xl text-white font-bold'>
                    Affordable <br></br> Price For <br></br> Car Servicing
                </h1>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 w-2/5 left-24 top-1/2">
                <h1 className='text-xl text-white'>
                    There are many variations of passages of  available, but
                    the majority have suffered alteration in some form
                </h1>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-24 top-3/4">
                <button className="btn btn-warning mr-5">Discover More</button>
                <button className="btn btn-outline btn-secondary">Latest Project</button>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;