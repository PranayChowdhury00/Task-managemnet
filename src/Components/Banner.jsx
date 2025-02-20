import task1 from "/task1.jpg";
import task2 from "/task2.jpg";
import task3 from "/task3.jpg";
import task4 from "/task4.jpg";

const Banner = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={task1} className="w-full h-64 object-cover " />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-center text-white text-xl font-bold">
          <h2>Stay Organized, Stay Productive</h2>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={task2} className="w-full h-64 object-cover" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-center text-white text-xl font-bold">
          <h2>Manage Your Tasks Efficiently</h2>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={task3} className="w-full h-64 object-cover" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-center text-white text-xl font-bold">
          <h2>Collaborate and Achieve Goals</h2>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img src={task4} className="w-full h-64 object-cover" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-center text-white text-xl font-bold">
          <h2>Track Progress and Stay Motivated</h2>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
