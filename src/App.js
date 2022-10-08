import Content from "./screen/Content/Content";
import Footer from "./screen/Footer/Footer";
import Header from "./screen/Header/Header";
import Scroll from "./components/SmoothScroll/SmoothScroll";
import { useEffect, useReducer } from "react";
import { db } from "./firebase";
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

function App() {
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
  const ContentTop = content.filter((content) => content.position === "top");
  const ContentMid = content.filter((content) => content.position === "mid");
  const ContentBottom = content.filter(
    (content) => content.position === "bottom"
  );
  return (
    <div className="App">
      <Scroll />
      <Header />
      <Content
        data-aos="fade-down"
        contentTop={ContentTop}
        contentMid={ContentMid}
        contentBottom={ContentBottom}
      />
      <Footer />
    </div>
  );
}

export default App;
