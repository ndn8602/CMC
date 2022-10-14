import React, { useEffect, useReducer } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ContentMid from "./ContentMid";
import ContentBottom from "./ContentBottom";
import ContentTop from "./ContentTop";
import Container from "react-bootstrap/Container";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import LoadingSkeletonTop from "../Loading/LoadingSkeletonTop";
import LoadingSkeletonMid from "../Loading/LoadingSkeletonMid";
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
      const datasCollectionRef = collection(db, "cmcContent");
      try {
        const data = await getDocs(datasCollectionRef);
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
      <div className="navbarFixed">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          {!loading && <SmoothScroll />}
        </Navbar>
      </div>
      <div id="webScroll">
        <Header />
        <Container className="content">
          <section>
            <div className="contentTop">
              <img src="./image/image1.jpg" className="img-fluid" alt="" />
              <h3 className="contentTitle">
                Unskilled labor shortages are a difficult reality for businesses
                in many states.
              </h3>
              <p>
                Massive labor shortages are causing difficulties for businesses
                across the United States. Currently, The American Chamber of
                Commerce estimates that there are about 10 million open jobs in
                the United States, but only about 6 million Americans are
                unemployed.
              </p>
              <p>
                "It is deeply concerning that at a time when jobs are in such
                high demand nationwide, the number of vacant entry-level
                manufacturing positions continues to grow," Paul Wellener, vice
                chairman and US industrial products and constructions leader at
                Deloitte, said in a statement.
              </p>
              <p>
                Employers are having a hard time finding qualified workers for
                many positions. They are also facing difficulties in finding
                personnel due to the fiercely competitive labor market. Business
                owners are having to raise wages, improve benefits and invest in
                developing their employees.
              </p>
              <p>
                This has led to an increase in demand for migrant workers in a
                number of industries and states.
              </p>
              <p>
                If you are an employer struggling to fill a variety of unskilled
                jobs, you might consider hiring foreign workers. The EB-3
                immigrant visa is one of the most common immigrant visas used by
                employers to fill these open positions.
              </p>
            </div>
            <div className="contentTop">
              <img src="./image/image2.jpg" className="img-fluid" alt="" />
              <h3 className="contentTitle">
                EB 3 Visa Green Card Program for Employers - A solution to the
                chronic shortage of unskilled workers
              </h3>
              <p>
                If you are an employer affected by unskilled worker shortages
                and learn that the issue could not be solved effectively in the
                next some months or some years, hiring unskilled labor from
                abroad through EB3 visa program can be a good choice for you.
              </p>
              <p>
                EB3 visa is an employment-based category of visa issued to
                foreign national employees to work in the United States. This
                kind of visa category allows U.S. employers to hire a foreign
                national through green card sponsorship when American workers
                are unavailable.
              </p>
            </div>
          </section>
          <main>
            <div className="contentMid">
              <h3>
                To be eligible for this program, an employer only needs to meet
                two requirements:
              </h3>
              <ol>
                <li>
                  The employer must have a bona fide offer of full-time,
                  permanent employment for the foreign worker.
                </li>
                <li>
                  The employer must pay at least the prevailing wage for the
                  occupation in the area of intended employment
                </li>
              </ol>
              <p>
                The EB3 visa is open to professionals, skilled workers, and
                unskilled workers. Here, we just focus on unskilled workers
                only.{" "}
              </p>
            </div>
            <div className="contentMid">
              <h3>
                To be eligible for EB3 visa unskilled worker, an alien has to
                meet the two requirements{" "}
              </h3>
              <ol>
                <li>
                  The worker can perform unskilled labor requiring less than 2
                  years training or experience, not of a temporary or seasonal
                  nature.
                </li>
                <li>
                  The worker got a labor certification and a permanent,
                  full-time job offer from a qualified employer.{" "}
                </li>
              </ol>
            </div>
            <div className="contentMid">
              <h3>
                Employers willing to go through the EB3 program will be able to
                find the workers they need to stay in business for the long
                term.
              </h3>
              <p>
                Employers willing to go through the EB3 program will be able to
                find the workers they need to stay in business for the long
                term.
              </p>
              <p>
                Employers willing to go through the EB3 program will be able to
                find the workers they need to stay in business for the long
                term.
              </p>
              <p>Hiring EB3 employees will benefit your business:</p>
              <ol>
                <li>Cut recruitment costs.</li>
                <li>Achieve annual HR targets.</li>
                <li>Maintain stable employment environment.</li>
                <li>Build a team of dedicated workers</li>
              </ol>
            </div>
            <div className="contentMid">
              <h3 className="contentTitle">EB3 Visa Process</h3>
              <p>
                The process of hiring an immigrant worker through the EB-3 visa
                can be done in four steps
              </p>
              <ul>
                <li>Step 1: PERM Labor Certification</li>
                <li>Step2: I-140 Petition</li>
                <li>Step 3 Wait for Priority Date</li>
                <li>Step 4: Consular Processing or Adjustment of Status</li>
              </ul>
            </div>
          </main>
          <section>
            <div className="contentBottom">
              <img src="./image/image3.jpg" alt="" />
              <h3 className="contentTitle">
                Vietnam Workers - A reliable labor source for the US market
              </h3>
              <p>
                If you have ever hired Vietnamese workers, you will easily
                recognize their advantages:
              </p>
              <ul>
                <li>
                  Always find a way to do the job well, even with those that
                  require meticulousness, or dexterity, and carefulness.
                </li>
                <li>Work diligently</li>
                <li>Ready to work overtime</li>
                <li>
                  Always looking for a stable job to ensure an income for their
                  family
                </li>
              </ul>
            </div>
            <div className="contentBottom">
              <img src="./image/image4.jpg" alt="" />
              <h3 className="contentTitle">Let us be your partner</h3>
              <p>
                You would think that it is difficult and complicated to recruit
                this source of staff at the first glance.
              </p>
              <p>
                Actually, this recruitment is not difficult, we can help you
                through the process and find qualified EB3 Vietnam candidates.
                Our mission is to provide low-cost recruitment solutions for
                your long-term staffing goals.
              </p>
              <p>
                This way of recruiting will save you cost and time in recruiting
                and can stabilize the number of employees in the long run. These
                workers will work steadily for your company for at least 12
                months.
              </p>
              <p>
                We are here to help you connect with unskilled workers from
                Vietnam. These ideal candidates have a great work ethic and
                excellent communication skills.
              </p>
            </div>
          </section>
        </Container>
        <Footer />
      </div>
    </>
  );
}
