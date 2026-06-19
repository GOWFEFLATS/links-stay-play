import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PrioritySignupForm } from "@/components/PrioritySignupForm";
import hole12Asset from "@/assets/hole-12.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gowfe Flats × Tarandowah | STAY HERE, PLAY THERE" },
      {
        name: "description",
        content:
          "Gowfe Flats is a private-style golf stay concept paired with Tarandowah Golfers Club — one of Canada's most authentic links-style layouts.",
      },
      { property: "og:title", content: "Gowfe Flats × Tarandowah | STAY HERE, PLAY THERE" },
      {
        property: "og:description",
        content:
          "A private-style golf stay concept paired with Tarandowah Golfers Club — one of Canada's most authentic links-style layouts.",
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function Index() {
  return (
    <main className="bg-background text-foreground font-sans">
      <Navigation />
      <HeroSection />
      <PricingSection />
      <FounderNote />
      <ConceptSection />
      <CourseSection />
      <CombinationSection />
      <ExperienceFlowSection />
      <AudienceSection />
      <HighlightsSection />
      <TestimonialsSection />
      <RoadmapSection />
      <CountdownSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ─── What's Included ─── */
function WhatsIncludedSection() {
  const includes = [
    "Private Gowfe Flats accommodations",
    "Comfortable sleeping arrangements for 4–8 golfers",
    "Three rounds of golf at Tarandowah",
    "Prime weekend scheduling",
    "Easy group planning with one reservation",
    "Early access to 2027 availability",
  ];
  return (
    <section id="pricing" className="px-6 pt-20 md:pt-28 pb-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] text-balance font-medium mb-4"
          >
            Everything Your Group Needs—<span className="italic font-normal">Already Included</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted max-w-[50ch] mx-auto leading-relaxed">
            When you arrive, all that's left to do is enjoy the weekend.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          className="bg-ink text-sand rounded-[2rem] p-10 md:p-16 grid md:grid-cols-2 gap-10 md:gap-16"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue mb-6">
              Your package includes:
            </p>
            <ul className="space-y-4">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base md:text-lg">
                  <span className="text-gold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="space-y-3">
              <p className="text-xl md:text-2xl text-sand font-medium">No hidden fees.</p>
              <p className="text-xl md:text-2xl text-sand font-medium">No complicated planning.</p>
              <p className="text-xl md:text-2xl text-sand font-medium">No coordinating multiple bookings.</p>
            </div>
            <p className="text-2xl md:text-3xl text-white font-serif">One reservation. One incredible golf trip.</p>
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-ink rounded-full text-base font-semibold hover:bg-gold/90 transition-all active:scale-95 w-fit"
            >
              CHECK AVAILABLE WEEKENDS
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Founder / Social Proof ─── */
function FounderNote() {
  return (
    <section className="px-6 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center space-y-4"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue block">
          From the Founder
        </span>
        <p className="font-serif italic text-2xl md:text-3xl leading-snug text-balance">
          “Built by a former Tarandowah member for golfers who wanted a better weekend experience.”
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Countdown to 2027 ─── */
function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now ? Math.max(0, target.getTime() - now.getTime()) : 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, ready: now !== null };
}

function CountdownSection() {
  // First 2027 weekend release: target May 1, 2027
  const target = new Date("2027-05-01T12:00:00Z");
  const { days, hours, minutes, seconds, ready } = useCountdown(target);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="px-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue block">
          2027 Release Countdown
        </span>
        <h2 className="font-serif text-3xl md:text-4xl leading-tight text-balance">
          2027 weekends released in limited phases.
        </h2>
        <p className="text-foreground/60 max-w-[48ch] mx-auto">
          Join the early access list before dates open publicly.
        </p>
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
          {units.map((u) => (
            <div
              key={u.label}
              className="border border-foreground/10 rounded-2xl py-6 px-2 bg-muted/30"
            >
              <div
                className="font-serif text-4xl md:text-5xl tabular-nums"
                suppressHydrationWarning
              >
                {ready ? String(u.value).padStart(2, "0") : "--"}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mt-2">
                {u.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Navigation ─── */
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-md border-b border-foreground/5">
      <span className="font-serif italic text-2xl tracking-tight text-ink">Gowfe Flats</span>
      <div className="hidden md:flex gap-10 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <a href="#course" className="hover:text-foreground transition-colors">
          The Links
        </a>
        <a href="#experience" className="hover:text-foreground transition-colors">
          Experience
        </a>
        <a href="#booking" className="hover:text-foreground transition-colors">
          Book
        </a>
      </div>
      <a
        href="#booking"
        className="px-5 py-2.5 bg-ink text-sand text-[10px] font-medium uppercase tracking-widest rounded-full hover:bg-ink/85 transition-colors"
      >
        Inquire
      </a>
    </nav>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <header className="relative h-[100dvh] flex flex-col justify-end overflow-hidden">
      <img
        src={hole12Asset.url}
        alt="Sunset over Tarandowah's hole 12 with whisky on the rail"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto w-full">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base uppercase tracking-[0.25em] text-white/70 mb-4"
          >
            2027 Tarandowah Golf Getaway
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] text-balance font-medium mb-6"
          >
            Escape. Golf. Repeat.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 max-w-[50ch] leading-relaxed text-pretty mb-6"
          >
            Bring your foursome—or your full group of eight—for an unforgettable golf weekend just minutes from Tarandowah Golfers Club.
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="space-y-2 text-white/80 text-base md:text-lg mb-8"
          >
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Private Gowfe Flats accommodations
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Three rounds of golf
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Weekend dates available for 2027
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              No deposit required until February 2027
            </li>
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <p className="text-2xl md:text-3xl text-white font-medium mb-1">From $599 <span className="text-lg text-white/60 font-normal">per golfer.</span></p>
              <p className="text-base text-white/60">Reserve your preferred weekend before they're gone.</p>
            </div>
            <a
              href="#booking"
              className="inline-flex items-center px-8 py-4 bg-emerald-500 text-white rounded-full text-base font-semibold hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-900/30"
            >
              RESERVE MY 2027 WEEKEND
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-3">
        <span>Scroll to Begin</span>
        <div className="w-px h-10 bg-white/20" />
      </div>
    </header>
  );
}

/* ─── Concept ─── */
function ConceptSection() {
  return (
    <section className="py-24 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.span
              variants={fadeUp}
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue"
            >
              The Concept
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance leading-tight"
            >
              A Different Kind of Links Getaway
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl max-w-[56ch] text-pretty leading-relaxed text-foreground/75"
            >
              Gowfe Flats is built for golfers who want more than a tee time. It’s a stay-and-play
              experience designed around group golf trips, weekend escapes, tournament-style travel,
              and links golf immersion.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-4">
              {[
                "Group golf trips (4–8 players)",
                "Weekend escapes from the GTA / London corridor",
                "Tournament-style travel",
                "Links golf immersion",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-foreground/5 pb-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-moss" />
                  <span className="text-sm uppercase tracking-wider font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-foreground/60 leading-relaxed max-w-[52ch]">
              Paired with Tarandowah Golfers Club, you get access to a true inland links experience
              shaped by wind, strategy, and shot-making.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block w-px h-72 bg-foreground/8 self-center"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Course Profile ─── */
function CourseSection() {
  return (
    <section id="course" className="bg-ink text-sand py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <motion.span
                variants={fadeUp}
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue"
              >
                The Links
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-none"
              >
                Tarandowah Golfers Club
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="max-w-[35ch] text-sand/50 font-medium uppercase text-xs tracking-widest"
            >
              Designed by Martin Hawtree. Pure golf requiring courage, skill, and strategy.
            </motion.p>
          </div>

          {/* Scorecard stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-sand/10 border border-sand/10 mb-16"
          >
            {[
              { label: "Par", value: "70" },
              { label: "Distance", value: "~7,000 Yds" },
              { label: "Holes", value: "18" },
              { label: "Location", value: "Springfield, ON" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 md:p-8 flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-sand/40">
                  {stat.label}
                </span>
                <span className="text-2xl md:text-3xl font-medium">{stat.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Course identity quote */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6 mb-12">
            <img
              src="/images/course-green.jpg"
              alt="Tarandowah links green with complex contouring"
              className="aspect-video object-cover rounded-lg opacity-90"
              loading="lazy"
            />
            <div className="p-8 border border-sand/10 flex flex-col justify-center rounded-lg">
              <p className="font-serif italic text-2xl mb-4 leading-snug">
                “Pure golf requiring courage, skill, and strategy.”
              </p>
              <p className="text-[10px] uppercase tracking-widest text-sand/40">
                Official Course Identity
              </p>
            </div>
            <img
              src="/images/fescue-bunker.jpg"
              alt="Deep sod-walled bunker and fescue rough at Tarandowah"
              className="aspect-video object-cover rounded-lg opacity-90"
              loading="lazy"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "True Links Layout",
                desc: "Authentic firm fairways and wind exposure requiring courage, skill, and strategy on every shot.",
              },
              {
                title: "Deep Bunkering",
                desc: "Strategic shot design with hazards that demand respect and careful navigation across 18 holes.",
              },
              {
                title: "Top Ranked",
                desc: "Consistently ranked among the top public links in Canada for its architectural purity.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 border border-sand/10 rounded-lg hover:bg-white/3 transition-colors"
              >
                <h3 className="font-serif text-2xl italic mb-4">{feature.title}</h3>
                <p className="text-sm text-sand/55 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Why This Combination Works ─── */
function CombinationSection() {
  return (
    <section className="py-24 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-20 items-center mb-24"
        >
          <div className="space-y-8">
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl leading-tight">
              Links + Stay Designed as One Experience
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="max-w-[48ch] text-pretty text-foreground/65 leading-relaxed text-lg"
            >
              Most golf trips feel disconnected — you book tee times, then figure out everything
              else. Gowfe Flats + Tarandowah is different.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-sm uppercase tracking-widest font-medium text-foreground/80">
                We design the full experience:
              </p>
              {[
                "Accommodation → walking distance / short drive access",
                "Tee times secured in advance",
                "Group-ready layouts for 4–8 golfers",
                "Built for weekend rhythm (arrive → play → relax → repeat)",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-foreground/5 pb-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              src="/images/cabin-interior.jpg"
              alt="Minimalist cabin interior with golf bags"
              className="aspect-square object-cover rounded-xl"
              loading="lazy"
            />
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              src="/images/dusk-fairway.jpg"
              alt="Dusk view of clubhouse from the 18th fairway"
              className="aspect-square object-cover rounded-xl mt-12"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Experience Flow ─── */
function ExperienceFlowSection() {
  const days = [
    {
      num: "01",
      title: "Arrival",
      subtitle: "Settle into the Land",
      desc: "Check-in to the Flats, warm-up session at Tarandowah, and evening group dinner as the wind settles over the fescue.",
    },
    {
      num: "02",
      title: "The Gauntlet",
      subtitle: "Peak Linkside Challenge",
      desc: "Morning tee time when the Ontario winds are most honest. Optional second round or recovery in the clubhouse lounge.",
    },
    {
      num: "03",
      title: "Departure",
      subtitle: "Take the Memories Home",
      desc: "Optional final loop at sunrise. Relaxed checkout with scorecard memories and a promise to return.",
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-40 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue mb-4 block"
          >
            The Weekend Rhythm
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl">
            Your Weekend at Gowfe Flats
          </motion.h2>
        </motion.div>

        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-[22px] left-0 w-full h-px bg-foreground/8 hidden md:block" />

          <div className="grid md:grid-cols-3 gap-12">
            {days.map((day, i) => (
              <motion.div
                key={day.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="relative"
              >
                <div
                  className={`size-11 rounded-full flex items-center justify-center mb-8 relative z-10 ${
                    i === 1 ? "bg-ink text-sand" : "bg-background border border-foreground/15"
                  }`}
                >
                  <span className="font-mono text-xs">{day.num}</span>
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-fescue mb-2 block">
                  Day {parseInt(day.num)} — {day.title}
                </span>
                <h3 className="font-serif text-2xl mb-4">{day.subtitle}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed">{day.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Who It's For ─── */
function AudienceSection() {
  return (
    <section className="py-24 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-24"
        >
          <div className="space-y-10">
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl">
              Built for Serious Links Trips
            </motion.h2>
            <div className="space-y-8">
              <motion.div variants={fadeUp}>
                <span className="text-[10px] font-medium uppercase tracking-widest text-moss block mb-5">
                  Perfect For
                </span>
                <ul className="space-y-3 text-sm">
                  {[
                    "Groups of friends (4–8 golfers)",
                    "Golf trips from Toronto / GTA / London corridor",
                    "Weekend competition groups",
                    "Golf culture travelers",
                    "Corporate golf retreats",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-l-2 border-moss/20 pl-4 py-1"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp}>
                <span className="text-[10px] font-medium uppercase tracking-widest text-fescue block mb-5">
                  Not Ideal For
                </span>
                <ul className="space-y-3 text-sm text-fescue/90">
                  {[
                    "Casual resort tourists",
                    "Rushed 9-hole players",
                    "Non-golf-focused stays",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-l-2 border-fescue/20 pl-4 py-1"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            className="bg-background p-10 md:p-14 border border-foreground/5 rounded-2xl"
          >
            <h3 className="font-serif text-3xl mb-8">Why Golfers Return</h3>
            <div className="space-y-8">
              {[
                {
                  title: "Shifting Conditions",
                  desc: "Wind-shaped strategy course that never plays the same way twice. Every round is a new puzzle.",
                },
                {
                  title: "Authentic Surfaces",
                  desc: "Fast, firm playing conditions and links-style fescue rough. The ball runs, bounces, and tests every club.",
                },
                {
                  title: "Traditional Walk",
                  desc: "A walkable experience that respects the heritage of the game. No carts required — just the wind and your thoughts.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="shrink-0 w-2 h-2 mt-2 rounded-full bg-moss/25" />
                  <div>
                    <p className="font-medium mb-1.5">{item.title}</p>
                    <p className="text-sm text-foreground/55 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Course Highlights ─── */
function HighlightsSection() {
  const highlights = [
    "Wind-shaped strategy course (never plays the same twice)",
    "Fast, firm playing conditions",
    "Links-style bunkering and fescue rough",
    "Walkable, traditional golf experience",
    "Strong reputation among Ontario golfers",
  ];

  return (
    <section className="py-24 bg-ink text-sand px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue mb-4 block"
          >
            Links Highlights
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl">
            Why Golfers Return to Tarandowah
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 border border-sand/10 rounded-lg hover:bg-white/3 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-gold/60 mb-4" />
              <p className="text-sm leading-relaxed text-sand/80">{h}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Roadmap ─── */
function RoadmapSection() {
  const phases = [
    {
      year: "2026",
      title: "Concept + Early Interest",
      desc: "Architecture finalization and early interest list registration opens for priority access.",
      active: true,
    },
    {
      year: "2027",
      title: "Soft Launch Weekends",
      desc: "Limited weekend access for founding members and select small groups (4–8 players).",
      active: true,
    },
    {
      year: "2028",
      title: "Full 3-Unit Rollout",
      desc: "Complete 3-unit opening with daily availability and full Tarandowah immersion packages.",
      active: false,
    },
  ];

  return (
    <section className="py-24 md:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20 space-y-4"
        >
          <motion.span
            variants={fadeUp}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue"
          >
            Phase Launch
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl">
            2027 Soft Launch — Limited Weekend Access
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-foreground/8 hidden md:block" />

          <div className="flex flex-col gap-14">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="relative pl-0 md:pl-16"
              >
                <div
                  className={`hidden md:flex absolute left-0 top-1.5 size-5 rounded-full items-center justify-center ${
                    phase.active ? "bg-background border border-foreground/20" : "bg-moss"
                  }`}
                >
                  {phase.active && <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />}
                </div>
                <span className="text-xs font-medium text-fescue mb-1 block">{phase.year}</span>
                <h4 className="font-medium text-xl mb-2">{phase.title}</h4>
                <p className="text-sm text-foreground/55 max-w-md">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-16"
        >
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-8 py-4 bg-ink text-sand rounded-full text-sm font-medium tracking-wide hover:bg-ink/85 transition-all active:scale-95"
          >
            Join Early Booking List
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-8 py-4 border border-foreground/15 rounded-full text-sm font-medium tracking-wide hover:bg-foreground/3 transition-all"
          >
            Reserve Priority Weekends
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Testimonials / Social Proof ─── */
function TestimonialsSection() {
  const quotes = [
    {
      quote:
        "Tarandowah is the closest thing to a true links experience I've played in Ontario. Pairing it with a proper stay is exactly what golf trips here have been missing.",
      name: "Marcus R.",
      role: "Group organizer, GTA",
    },
    {
      quote:
        "We've done Bandon, Cabot, Streamsong. Having a stay-and-play at this caliber within driving distance is a no-brainer for our crew.",
      name: "David L.",
      role: "8-player annual trip",
    },
    {
      quote:
        "Honest links golf, walked, with a place to decompress after. That's the whole pitch — and it works.",
      name: "Sean P.",
      role: "Former Tarandowah member",
    },
  ];
  return (
    <section className="px-6 py-24 md:py-32 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16 space-y-4"
        >
          <motion.span
            variants={fadeUp}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-fescue"
          >
            What Golfers Are Saying
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl">
            Built for golfers, <span className="italic">by golfers.</span>
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {quotes.map((q) => (
            <motion.figure
              key={q.name}
              variants={fadeUp}
              className="bg-background border border-foreground/10 rounded-2xl p-8 flex flex-col gap-6"
            >
              <blockquote className="font-serif italic text-lg leading-snug text-balance">
                “{q.quote}”
              </blockquote>
              <figcaption className="text-xs uppercase tracking-widest text-foreground/60">
                <div className="font-medium text-foreground">{q.name}</div>
                <div className="mt-1">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
        <p className="text-center text-[10px] uppercase tracking-widest text-foreground/40 mt-10">
          Early interest from groups across the GTA, London, and Detroit corridor.
        </p>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section id="booking" className="bg-background px-6 pb-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-5xl mx-auto bg-moss text-sand rounded-[2.5rem] p-12 md:p-24 text-center overflow-hidden relative"
      >
        <div className="relative z-10 space-y-8">
          <motion.span
            variants={fadeUp}
            className="uppercase tracking-[0.3em] text-[10px] opacity-50 block"
          >
            Opening Summer 2027
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight"
          >
            Lock In Your <span className="italic font-normal">2027 Golf Weekend.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sand/60 max-w-xl mx-auto text-lg leading-relaxed text-pretty"
          >
            Join the priority list and receive first access to released weekends. Limited dates.
            Small groups only.
          </motion.p>
          <motion.div variants={fadeUp} className="max-w-xl mx-auto pt-6">
            <PrioritySignupForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-foreground/5 py-16 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="space-y-4">
            <span className="font-serif italic text-3xl text-ink">Gowfe Flats</span>
            <p className="max-w-[28ch] text-sm text-foreground/40 leading-relaxed">
              Authentic links stays in the heart of Ontario golf country.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-5">
              <span className="text-[10px] uppercase tracking-widest text-foreground/70 font-medium">
                Navigate
              </span>
              <nav className="flex flex-col gap-3 text-sm text-foreground/50">
                <a href="#course" className="hover:text-foreground transition-colors">
                  The Links
                </a>
                <a href="#experience" className="hover:text-foreground transition-colors">
                  The Experience
                </a>
                <a href="#booking" className="hover:text-foreground transition-colors">
                  Bookings
                </a>
              </nav>
            </div>
            <div className="space-y-5">
              <span className="text-[10px] uppercase tracking-widest text-foreground/70 font-medium">
                Contact
              </span>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Springfield, Ontario
                <br />
                info@gowfeflats.ca
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-foreground/25 font-medium">
          <span>© 2025 Gowfe Flats × Tarandowah Golfers Club</span>
          <span>Designed for the Walk</span>
        </div>
      </div>
    </footer>
  );
}
