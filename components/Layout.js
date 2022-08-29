import Footer from "./Footer";
import Navbar from "./Navbar";
import Popup from "./Popup";


export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Popup
        id="zakazPopup"
        title="Обсудить идеи"
        buttonText="Отправить"
      />
      <Popup
        id="writeUsPopup"
        title="Написать мне"
        buttonText="Отправить"
      />

    </>
  )
}
