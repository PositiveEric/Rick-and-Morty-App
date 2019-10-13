import React from 'react';
import { Carousel } from 'react-bootstrap';

export const ImageCarousel: React.FC = () => {
  return (
    <div className="Carousel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://a.imge.to/2019/09/05/vgU2tG.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://a.imge.to/2019/09/05/vgUCnj.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://a.imge.to/2019/09/05/vgU06r.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
