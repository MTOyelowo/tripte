import PortfolioLayout from "@/components/layout/PortfolioLayout";
import AboutMe from "@/components/portfolio/AboutMe";
import ContactForm from "@/components/portfolio/ContactForm";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import Projects from "@/components/portfolio/Projects";
import Separator from "@/components/portfolio/Separator";
import SocialSection from "@/components/portfolio/SocialSection";
import WorkExperience from "@/components/portfolio/WorkExperience";
import { NextPage } from "next";

interface Props {}

const index: NextPage<Props> = () => {
  return (
    <PortfolioLayout>
      <PortfolioHero />
      <Separator />
      <AboutMe />
      <SocialSection />
      <WorkExperience />
      <Projects />
      <ContactForm />
    </PortfolioLayout>
  );
};

export default index;
