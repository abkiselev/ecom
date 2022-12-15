import styles from '../styles/LookbookSlider.module.css'
import Slider from './Slider'
import ButtonArrow from './UI/Buttons/ButtonArrow'
import Image from 'next/image'

function LookbookSlider({ lookbook, slidesPerView, className }) {
  return (
    <section className={styles.slider}>
      <div className={styles.head}>
        <h3 className={styles.name}>LOOKBOOK</h3>
        <ButtonArrow text="СМОТРЕТЬ ВСЕ" url="/lookbook" font="fz12" />
      </div>

      <Slider slidesPerView={slidesPerView} className={className}>
        {lookbook.slice(0, 10).map((item) => (
          <Image
            key={item.link}
            className={styles.img}
            src={`/images/uploads/${item.link}`}
            width="400"
            height="300"
            alt={item.link}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
        ))}
      </Slider>
    </section>
  )
}

export default LookbookSlider
