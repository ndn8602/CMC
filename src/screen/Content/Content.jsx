import React, { useEffect } from "react";
import ContentMain from "./ContentMain";
import ContentTop from "./ContentTop";
import data from "./data";
import ContentBottom from "./ContentBottom";
import Container from "react-bootstrap/Container";
import AOS from "aos";
import "aos/dist/aos.css";
// import LocomotiveScroll from "locomotive-scroll";
export default function Content() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Container>
      <section>
        <ContentTop data={data} data-aos="fade-down" />
      </section>
      <main>
        <ContentMain data={data} data-aos="fade-down" />
      </main>
      <section>
        <ContentBottom data={data} data-aos="fade-down" />
      </section>
    </Container>
  );
}
