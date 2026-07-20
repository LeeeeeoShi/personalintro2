import Nav from '@/components/nav';
import Hero from '@/components/hero';
import About from '@/components/about';
import Experience from '@/components/experience';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Thinking from '@/components/thinking';
import Gallery from '@/components/gallery';
import CoffeeGallery from '@/components/coffee';
import Reading from '@/components/reading';
import Contact from '@/components/contact';
import Privacy from '@/components/privacy';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Thinking />
      <Gallery />
      <CoffeeGallery />
      <Reading />
      <Contact />
      <Privacy />
      <Footer />
    </>
  );
}
