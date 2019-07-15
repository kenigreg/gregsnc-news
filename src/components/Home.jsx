import React from 'react';
import { Carousel } from 'react-bootstrap';
import carousel1 from '../assets/carousel1.jpeg';
import carousel2 from '../assets/carousel2.jpeg';
import carousel3 from '../assets/carousel3.jpeg';

const Home = props => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel1} alt="First slide" />
          <Carousel.Caption>
            <h3 className="text-body">Enjoy our Articles</h3>
            <p className="text-body bg-light">
              Browse through the articles, leave comments and vote up on your
              favourite articles.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel2} alt="Third slide" />

          <Carousel.Caption>
            <h3 className="text-body">
              Read articles from your favourite topics
            </h3>
            <p className="text-body bg-light">
              Select your favourite topic and browse through the catalogue of
              articles available.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel3} alt="Third slide" />

          <Carousel.Caption>
            <h3 className="text-warning">Have you got a nice article?</h3>
            <p className="text-body bg-light">
              You can submit an article relating to the available topics.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
