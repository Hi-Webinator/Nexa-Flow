import {
  ScrollProgress,
  BackToTop,
  CursorGlow,
} from "../components/UIextras/UIextras";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Routing from "../Routing/Routing";
import AIChatAssistant from "../components/AIChatAssistant/AIChatAssistant";

const Layouts = () => {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Routing />
      <AIChatAssistant />
      <Footer />
      <BackToTop />
    </>
  );
};

export default Layouts;
