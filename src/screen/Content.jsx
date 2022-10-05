import React from "react";
import ContentMain from "./ContentMain";
import ContentTop from "./ContentTop";
import data from "../data";
import ContentBottom from "./ContentBottom";
export default function Content() {
  return (
    <div>
      <ContentTop data={data} />
      <main>
        <ContentMain data={data} />
      </main>
      <ContentBottom data={data} />
    </div>
  );
}
