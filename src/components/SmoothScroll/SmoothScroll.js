import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import AOS from "aos";
import "aos/dist/aos.css";

// const overscrollOptions = {
//   enable: true,
//   effect: "bounce",
//   damping: 0.15,
//   maxOverscroll: 150,
//   glowColor: "#fff",
// };

const overscrollOptions = {
  enable: true,
  effect: "glow",
  damping: 0.1,
  maxOverscroll: 200,
  glowColor: "#222a2d",
};

const options = {
  damping: 0.07,
  plugins: {
    overscroll: { ...overscrollOptions },
  },
};
const Scroll = () => {
  useEffect(() => {
    AOS.init({ delay: 500 });
    Scrollbar.use(OverscrollPlugin);
    const smoothScroll = Scrollbar.init(
      document.getElementById("webScroll"),
      options
    );
    const navbars = document.querySelector(".navbar");
    const header = document.querySelector(".header");
    const content = document.querySelector(".content");
    const footer = document.querySelector(".footer");
    console.log(header.offsetTop);
    console.log(content.offsetTop);
    console.log(footer.offsetTop);
    function listener(status) {
      let scrollbar = smoothScroll.offset.y;
      if (scrollbar >= 300) {
        navbars.classList.add("active");
      } else {
        navbars.classList.remove("active");
      }
    }
    [].forEach.call(document.querySelectorAll("[data-aos]"), (el) => {
      smoothScroll.addListener(() => {
        if (smoothScroll.isVisible(el)) {
          el.classList.add("aos-animate");
        }
      });
    });
    smoothScroll.addListener(listener);
    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);
  return null;
};

export default Scroll;
