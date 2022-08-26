import './Zakaz.css';
import like from '../../images/test.jpg';


function Zakaz() {
  return (
    <section className="zakaz">

      <div className="zakaz_container">
          <div className="zakaz__main">
            <img className="zakaz__img" src={like}/> 
            <img className="zakaz__img" src={like}/> 
            <img className="zakaz__img-absolute" src={like}/> 
          </div>
          
          <div>
            <h3>ИНДИВИДУАЛЬНЫЙ ПОШИВ РЕМНЕЙ</h3>
            <p>Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью </p>
            <p>Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью </p>
            <p>Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью </p>
            <a className="button goods_slider__button zakaz__button" href='#'>ПОДРОБНЕЕ</a>
          </div>
        
      </div>

    </section>
   
  );
}

export default Zakaz;
