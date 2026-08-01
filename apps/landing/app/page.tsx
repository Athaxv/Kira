import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { WorkflowViz } from "./components/workflow-viz";
import { Showcase } from "./components/showcase";
import { Story } from "./components/story";
import { UseCases } from "./components/use-cases";
import { Pricing } from "./components/pricing";
import { Faq } from "./components/faq";
import { Cta } from "./components/cta";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WorkflowViz />
        <Showcase />
        <Story />
        <UseCases />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
