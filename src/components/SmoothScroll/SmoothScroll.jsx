import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./Navbar.css";
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
  AOS.init({ delay: 500 });
  Scrollbar.use(OverscrollPlugin);
  const smoothScroll = Scrollbar.init(
    document.getElementById("webScroll"),
    options
  );

  const navbars = document.querySelector(".navbarFixed");
  const navbarss = document.querySelector(".navbar");
  const header = document.querySelector(".header");
  const content = document.querySelector(".content");
  const footer = document.querySelector(".footer");

  function listener(status) {
    let scrollbar = smoothScroll.offset.y;
    if (scrollbar >= 300) {
      navbars.classList.add("active");
    } else {
      navbars.classList.remove("active");
    }
  }

  smoothScroll.addListener(listener);
  useEffect(() => {
    const p = document.querySelectorAll("p");
    const li = document.querySelectorAll("li");
    console.log(p);
    p.forEach((element) => {
      console.log(element);
      element.setAttribute("data-aos", "fade-down");
    });
    li.forEach((element) => {
      console.log(element);
      element.setAttribute("data-aos", "fade-down");
    });

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
  }, [smoothScroll]);
  let menu = true;
  const handleButtonMenu = () => {
    if (window.innerWidth <= 992) {
      if (menu) {
        menu = false;
        navbarss.classList.add("background");
      } else {
        menu = true;
        navbarss.classList.remove("background");
      }
    } else {
      navbarss.classList.remove("background");
    }
  };
  const sessionHome = () => {
    smoothScroll.scrollTo(0, header.offsetTop - 130, 1000);
    if (window.innerWidth <= 992) {
      if (menu) {
        menu = false;
        navbarss.classList.add("background");
      } else {
        menu = true;
        navbarss.classList.remove("background");
      }
    }
  };
  const sessionContent = () => {
    smoothScroll.scrollTo(0, content.offsetTop - 130, 1000);
    if (window.innerWidth <= 992) {
      if (menu) {
        menu = false;
        navbarss.classList.add("background");
      } else {
        menu = true;
        navbarss.classList.remove("background");
      }
    }
  };
  const sessionFooter = (e) => {
    smoothScroll.scrollTo(0, footer.offsetTop - 130, 1000);
    if (window.innerWidth <= 992) {
      if (menu) {
        menu = false;
        navbarss.classList.add("background");
      } else {
        menu = true;
        navbarss.classList.remove("background");
      }
    }
  };
  return (
    <>
      <Container fluid className="align-items-start">
        <Navbar.Brand href="/">
          <img src="./image/Logo.png" alt="" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleButtonMenu}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href="#!" onClick={sessionHome}>
              HOME
            </Nav.Link>
            <Nav.Link href="#!" onClick={sessionContent}>
              Q&A
            </Nav.Link>
            <Nav.Link href="#!" onClick={sessionFooter}>
              CONTACT US
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </>
  );
};

export default Scroll;
