import React from "react";
import ContentMain from "./ContentMain";
import ContentTop from "./ContentTop";
import data from "../data";
import ContentBottom from "./ContentBottom";
import Container from "react-bootstrap/Container";

export default function Content() {
  return (
    <Container>
      <ContentTop data={data} />
      <main>
        <ContentMain data={data} />
      </main>
      <ContentBottom data={data} />
    </Container>
  );
}
