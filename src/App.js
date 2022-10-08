// import Content from "./screen/Content/Content";
// import Footer from "./screen/Footer/Footer";
// import Header from "./screen/Header/Header";
// import Scroll from "./components/SmoothScroll/SmoothScroll";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
function App() {
  const [contents, setContents] = useState([]);
  console.log("start");
  console.log(contents);
  const datasCollectionRef = collection(db, "data");
  useEffect(() => {
    const getDatas = async () => {
      const data = await getDocs(datasCollectionRef);
      setContents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDatas();
  }, []);

  return (
    <div className="App">
      content :
      {contents.map((content) => (
        <p key={content.id}>{content.title}</p>
      ))}
      {/* <Scroll />
      <Header />
      <Content data-aos="fade-down" />
      <Footer /> */}
    </div>
  );
}

export default App;
