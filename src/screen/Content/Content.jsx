import React, { useEffect, useReducer, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ContentMid from "./ContentMid";
import ContentBottom from "./ContentBottom";
import ContentTop from "./ContentTop";
import Container from "react-bootstrap/Container";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import LoadingSkeletonTop from "../Loading/LoadingSkeletonTop";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import Navbar from "react-bootstrap/Navbar";
import "./content.css";

//  <!---- REDUCER GET DATA ---->

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_FIREBASE":
      return { ...state, loading: true };
    case "GET_FIREBASE_SUCCESS":
      return { ...state, loading: false, listcontent: action.payload };
    case "GET_FIREBASE_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//  <!---- END REDUCER GET DATA ---->

export default function Content() {
  // <!--- Use Reducer ---->
  const [{ loading, listcontent }, dispatch] = useReducer(reducer, {
    loading: true,
    listcontent: [],
  });
  const [content, setContent] = useState([]);

  useEffect(() => {
    const contactCollectionRef = collection(db, "content");
    const q = query(contactCollectionRef, orderBy("numberPosition", "asc"));
    const data = onSnapshot(q, (snapshot) =>
      setContent(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return data;
  }, []);

  console.log("content");
  console.log(content);

  useEffect(() => {
    dispatch({ type: "REQUEST_FIREBASE" });
    try {
      const contactCollectionRef = collection(db, "content");
      const q = query(contactCollectionRef, orderBy("numberPosition", "asc"));
      const data = onSnapshot(q, (snapshot) =>
        dispatch({
          type: "GET_FIREBASE_SUCCESS",
          payload: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        })
      );
      return data;
    } catch (err) {
      dispatch({ type: "GET_FIREBASE_FAIL", payload: err.message });
    }
    return () => {};
  }, []);
  const contentTop = listcontent.filter(
    (content) => content.position === "Top"
  );
  const contentMid = listcontent.filter(
    (content) => content.position === "Mid"
  );
  const contentBottom = listcontent.filter(
    (content) => content.position === "Bottom"
  );
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
            {!loading ? (
              <ContentTop datas={contentTop} />
            ) : (
              <LoadingSkeletonTop />
            )}
          </section>
          <main>
            {" "}
            {!loading ? (
              <ContentMid datas={contentMid} />
            ) : (
              <LoadingSkeletonTop />
            )}
          </main>
          <section>
            {!loading ? (
              <ContentBottom datas={contentBottom} />
            ) : (
              <LoadingSkeletonTop />
            )}
          </section>
        </Container>
        <Footer />
      </div>
    </>
  );
}
