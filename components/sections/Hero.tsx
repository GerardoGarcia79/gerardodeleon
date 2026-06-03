import { useTranslations } from "next-intl";
import TypewriterText from "@/components/ui/TypewriterText";

const HERO_ROLES = ["Frontend Developer", "Fullstack en progreso"] as const;

const Hero = () => {
  const t = useTranslations();

  return (
    <section
      id="top"
      className="relative flex min-h-screen scroll-mt-nav items-center justify-center px-6 py-20"
      aria-label="Sección principal"
    >
      <div className="mesh-gradient absolute inset-0 z-0" aria-hidden="true" />
      <div className="z-10 flex max-w-7xl items-center gap-4 text-center">
        <div className="flex flex-1 flex-col">
          <TypewriterText phrases={HERO_ROLES} className="justify-center" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gradient">
            Gerardo de León García
          </h1>
          <h3 className="text-lg text-muted-foreground my-4 text-balance tracking-normal">
            {t("Hero.summary")}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            {t("Hero.main stack").toUpperCase()}
          </p>
          <p className="text-muted-foreground text-sm mb-2">
            {t("Hero.complementary stack").toUpperCase()}
          </p>
        </div>
        <div className="flex flex-1">IDE</div>
      </div>
    </section>
  );
};

export default Hero;
