import React, { useEffect, useReducer } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import ContentMid from "./ContentMid";
import ContentBottom from "./ContentBottom";
import ContentTop from "./ContentTop";
import Container from "react-bootstrap/Container";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_FIREBASE":
      return { ...state, loading: true };
    case "GET_FIREBASE_SUCCESS":
      return { ...state, content: action.payload, loading: false };
    case "GET_FIREBASE_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function Content() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [{ loading, error, content }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    content: [],
  });
  useEffect(() => {
    const getDatas = async () => {
      dispatch({ type: "REQUEST_FIREBASE" });
      const datasCollectionRef = collection(db, "cmcContent");
      try {
        const data = await getDocs(datasCollectionRef);
        console.log(data);
        dispatch({
          type: "GET_FIREBASE_SUCCESS",
          payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
      } catch (err) {
        dispatch({ type: "GET_FIREBASE_FAIL", payload: err.message });
      }
    };
    getDatas();
  }, []);
  const contentTop = content.filter((content) => content.position === "top");
  const contentMid = content.filter((content) => content.position === "mid");
  const contentBottom = content.filter(
    (content) => content.position === "bottom"
  );
  return (
    <>
      <Header />
      <Container>
        <section>
          <ContentTop data={contentTop} data-aos="fade-down" />
        </section>
        <main>
          <ContentMid data={contentMid} ata-aos="fade-down" />
        </main>
        <section>
          <ContentBottom data={contentBottom} data-aos="fade-down" />
        </section>
      </Container>
      <Footer />
    </>
  );
}
