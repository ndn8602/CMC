import Content from "./screen/Content/Content";
import Footer from "./screen/Footer/Footer";
import Header from "./screen/Header/Header";
// import Scrollbar from "react-smooth-scrollbar";
import Scroll from "./components/SmoothScroll/SmoothScroll";
function App() {
  return (
    <div className="App">
      <Scroll />
      <Header />
      <Content data-aos="fade-down" />
      <Footer />
    </div>
  );
}

export default App;
