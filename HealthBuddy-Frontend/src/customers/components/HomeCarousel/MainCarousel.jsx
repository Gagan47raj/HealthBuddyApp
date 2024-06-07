import React from "react";
import { mainCarouselData } from "./MainCarouselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./MainCarousel.css";

// const responsive = {
//     0: { items: 1 },
//     568: { items: 2 },
//     1024: { items: 3 },
// };

const MainCarousel = () => {
  const items = mainCarouselData.map((item) => (
    <img
      className="cursor-pointer z-30"
      role="presentation"
      src={item.image}
      alt=""
    />
  ));

  return (
    <div className="carousel-container">
        <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={2000}
      infinite
      animationDuration={800}
      animationType="fadeout"
      // responsive={responsive}
    />
    </div>
    
  );
};

export default MainCarousel;
