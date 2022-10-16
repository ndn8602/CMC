import React, { useEffect, useReducer } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ContentMid from "./ContentMid";
import ContentBottom from "./ContentBottom";
import ContentTop from "./ContentTop";
import Container from "react-bootstrap/Container";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
// import LoadingSkeletonTop from "../Loading/LoadingSkeletonTop";
// import LoadingSkeletonMid from "../Loading/LoadingSkeletonMid";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import Navbar from "react-bootstrap/Navbar";
import "./content.css";
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
  const [{ loading, content }, dispatch] = useReducer(reducer, {
    loading: true,
    content: [],
  });

  useEffect(() => {
    const getDatas = async () => {
      dispatch({ type: "REQUEST_FIREBASE" });
      const datasCollectionRef = collection(db, "content");
      try {
        const data = await getDocs(datasCollectionRef);
        dispatch({
          type: "GET_FIREBASE_SUCCESS",
          payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
        console.log("data.");
        console.log(data.docs.map((doc) => doc.data()));
      } catch (err) {
        dispatch({ type: "GET_FIREBASE_FAIL", payload: err.message });
      }
    };
    getDatas();
  }, []);
  const contentTop = content.filter((content) => content.position === "Top");
  const contentMid = content.filter((content) => content.position === "Mid");
  const contentBottom = content.filter(
    (content) => content.position === "Bottom"
  );
  console.log("contentTop");
  console.log(contentTop);
  console.log("contentMid");
  console.log(contentMid);
  console.log("contentBottom");
  console.log(contentBottom);
  return (
    <>
      <div className="navbarFixed">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          {!loading && <SmoothScroll />}
        </Navbar>
      </div>
      <div id="webScroll">
        <Header />
        <Container className="content">
          <section>
            <ContentTop datas={contentTop} />
          </section>
          <main>
            <ContentMid datas={contentMid} />
          </main>
          <section>
            {/* <ContentBottom data={contentBottom} /> */}
          </section>
        </Container>
        <Footer />
      </div>
    </>
  );
}
