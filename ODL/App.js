import './App.css';
import Header from '../Header/Header.js';
import Main_slider from '../Main_slider/Main_slider.js';
import Goods_slider from '../Goods_slider/Goods_slider.js';
import Lookbook_slider from '../Lookbook_slider/Lookbook_slider.js';
import Features from '../Features/Features.js';
import Zakaz from '../Zakaz/Zakaz.js';
import Footer from '../Footer/Footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Main_slider />
      <Features />
      <Goods_slider slidesPerView='4.7'  className="swiper_overflow" />
      {/* <Goods_slider slidesPerView='4.7'  className="swiper_overflow" /> */}
      <Lookbook_slider slidesPerView='3.2'  className="swiper_overflow" />
      <Zakaz />
      <Footer />
    </div>
  );
}

export default App;
