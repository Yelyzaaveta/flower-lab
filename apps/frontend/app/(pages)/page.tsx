import CatalogSection from "./_components/catalog-section/catalog-section";
import CategoriesSection from "./_components/categories-section/categories-section";
import HeroSection from "./_components/hero-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CatalogSection />
      <CategoriesSection />
    </>
  );
}
