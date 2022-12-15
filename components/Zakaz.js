import styles from '../styles/Zakaz.module.css'
import Image from 'next/image'
import ButtonArrow from './UI/Buttons/ButtonArrow'
import { useSelector, useDispatch } from 'react-redux'
import { openPopup } from '../redux/slices/popupsSlice'

function Zakaz() {
  const isOpen = useSelector((state) => state.popups.zakazPopup)
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(openPopup('zakazPopup'))
  }

  return (
    <section className={styles.zakaz}>
      <div className={styles.zakaz_container}>
        <div className={styles.zakaz__img}>
          <Image
            className={styles.img}
            src="/images/zakaz.jpg"
            layout="fill"
            objectFit="cover"
            alt="Пошив"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
        </div>

        <div className={styles.zakaz_descr}>
          <h3 className={styles.zakaz_title}>ИНДИВИДУАЛЬНЫЙ ПОШИВ</h3>
          <p className={styles.zakaz_text}>
            Пошью ремень под цвет вашей сумочки. Подберем стропу из более 500 вариантов, фурнитуру из более 300
            вариантов.
          </p>
          <p className={styles.zakaz_text}>
            Текстильный ремень с кожаными вставками из итальянской кожи в наличии и под заказ.
          </p>
          <p className={styles.zakaz_text}>Создадим красоту вместе!</p>
          <p className={styles.zakaz_text}></p>
          <ButtonArrow text="ОБСУДИТЬ ИДЕИ" url="#" font="fz14" onClick={handleClick} />
        </div>
      </div>
    </section>
  )
}

export default Zakaz
