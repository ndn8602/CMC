import React, { useEffect } from "react";
import ContentMain from "./ContentMid";
import ContentTop from "./ContentTop";
import ContentBottom from "./ContentBottom";
import Container from "react-bootstrap/Container";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Content(props) {
  const { contentTop, contentMid, contentBottom } = props;
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Container>
      <section>
        <ContentTop data={contentTop} data-aos="fade-down" />
      </section>
      <main>
        <ContentMain data={contentMid} data-aos="fade-down" />
      </main>
      <section>
        <ContentBottom data={contentBottom} data-aos="fade-down" />
      </section>
    </Container>
  );
}
