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
    AOS.init();
    Scrollbar.use(OverscrollPlugin);
    const smoothScroll = Scrollbar.init(document.body, options);
    function listener(status) {
      console.log(smoothScroll.scrollTop);
    }
    smoothScroll.addListener(listener);
    [].forEach.call(document.querySelectorAll("[data-aos]"), (el) => {
      smoothScroll.addListener(() => {
        if (smoothScroll.isVisible(el)) {
          el.classList.add("aos-animate");
        }
      });
    });
    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);
  return null;
};

export default Scroll;
