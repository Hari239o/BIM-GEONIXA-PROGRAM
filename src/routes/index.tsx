import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, Mail, Globe, ArrowRight, Check, Menu, X, Download,
  Users, MessageCircle, Calendar, ClipboardList, BarChart3,
  PlayCircle, FileCheck, GaugeCircle, UserCheck, FileText, Clock, CalendarDays, Loader2,
} from "lucide-react";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { z } from "zod";
import heroBim from "@/assets/hero-bim.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

/* -------------------------- Logo -------------------------- */
function GeonixaLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Geonixa">
      <g transform="translate(0, 8)">
        {/* Top-Left Arrow */}
        <path d="M12 4L4 4L4 12" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 4L14 14" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Top-Right Arrow */}
        <path d="M20 4L28 4L28 12" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 4L18 14" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Bottom-Right Arrow */}
        <path d="M28 20L28 28L20 28" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 28L18 18" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Bottom-Left Arrow (The Orange Accent) */}
        <path d="M4 20L4 28L12 28" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 28L14 18" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Text */}
      <text x="48" y="34" fill="#F97316" style={{ font: 'bold 30px sans-serif', letterSpacing: '2px' }}>
        GEONIXA
      </text>
    </svg>
  );
}

/* ---------------------- Nav config ---------------------- */
const navLinks = [
  { id: "workflow", label: "Workflow" },
  { id: "curriculum", label: "Curriculum" },
  { id: "portfolio", label: "Portfolio" },
  { id: "lms", label: "LMS" },
  { id: "mentors", label: "Mentors" },
  { id: "contact", label: "Contact" },
];

/* ---------------------- Scroll-spy ---------------------- */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ---------------------- Header ---------------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(navLinks.map(l => l.id));
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container-narrow flex items-center justify-between h-16 md:h-20">
        <button onClick={() => scrollToId("top")} className="flex items-center" aria-label="Geonixa home">
          <GeonixaLogo className="h-10 md:h-12 w-auto" />
        </button>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(l => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className={`relative text-sm transition-all pb-1 tracking-wide ${isActive ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground"}`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-steel transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                />
              </button>
            );
          })}
          <button
            onClick={() => scrollToId("contact")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-sm hover:bg-ink transition-all shadow-lg shadow-primary/10 active:scale-95"
          >
            Enroll Now
          </button>
        </nav>
        <button className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      {open && (
        <div className="md:hidden absolute top-16 inset-x-0 border-t border-border bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
          <div className="container-narrow py-6 flex flex-col gap-1">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => { scrollToId(l.id); setOpen(false); }}
                className={`text-left text-base py-3 px-4 rounded-md transition-colors ${active === l.id ? "bg-secondary text-foreground font-semibold" : "text-foreground/70 hover:bg-secondary/50"}`}
              >
                {l.label}
              </button>
            ))}
            <div className="mt-4 px-4 pb-2">
              <button
                onClick={() => { scrollToId("contact"); setOpen(false); }}
                className="w-full bg-primary text-primary-foreground text-sm font-semibold py-4 rounded-sm text-center shadow-xl shadow-primary/20"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------- Hero (only image used in/around nav area) ---------------------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBim} alt="Revit BIM 3D building model" className="w-full h-full object-cover" />
        {/* Single, even dark overlay across the whole hero (no split) */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90" />
        <div className="absolute inset-0 blueprint-grid opacity-25" />
      </div>
      <div className="relative container-narrow py-12 md:py-24 text-primary-foreground">
        <div className="max-w-3xl corner-frame px-5 sm:px-8 py-10 sm:py-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 sm:w-10 bg-steel" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary-foreground/70">Revit · BIM · Civil Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl leading-[1.1] font-semibold">
            Become an Industry-Ready<br className="hidden sm:block" />
            <span className="text-steel"> BIM Professional</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
            Live Interactive Training · Real-World Projects · Portfolio-Based Learning
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button onClick={() => scrollToId("contact")} className="inline-flex items-center justify-center gap-2 bg-steel text-accent-foreground px-6 py-3.5 rounded-sm text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.98]">
              Enroll Now <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToId("curriculum")} className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3.5 rounded-sm text-sm font-semibold hover:bg-primary-foreground/10 transition-all">
              View Curriculum
            </button>
          </div>
          <div className="mt-6">
            <a href="/geonixa-revit-syllabus.pdf" download className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-xs sm:text-sm transition-colors">
              <Download className="h-4 w-4" /> Download Syllabus (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Software Marquee ---------------------- */
function SoftwareMarquee() {
  const tools = [
    "Autodesk Revit", "Navisworks", "AutoCAD", "BIM 360", "Enscape", "Twinmotion", "Dynamo", "Cloud Engine"
  ];
  return (
    <div className="bg-ink py-6 border-y border-primary-foreground/5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...tools, ...tools].map((t, i) => (
          <span key={i} className="text-primary-foreground/30 text-[10px] tracking-[0.4em] uppercase mx-12 font-medium">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl mb-12">
      {kicker && (
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-steel" />
          <span className="text-xs tracking-[0.3em] uppercase text-steel">{kicker}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* ---------------------- Workflow ---------------------- */
function Workflow() {
  const stages = [
    "Concept Design", "Architectural", "Structural", "MEP Integration",
    "Clash Detection", "BOQ & Costing", "4D / 5D Planning",
  ];
  return (
    <section id="workflow" className="section-y scroll-mt-20">
      <div className="container-narrow">
        <SectionHeader kicker="BIM Lifecycle" title="Understand the Complete BIM Lifecycle" />
        <div className="border border-border p-6 sm:p-8 md:p-12 blueprint-grid-fine overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {stages.map((s, i) => (
              <div key={s} className="flex flex-col gap-3">
                <div className="border border-ink/30 bg-background px-4 py-4 text-sm font-medium text-foreground flex items-center justify-center text-center h-full min-h-[80px] transition-all hover:border-steel group">
                  <div className="absolute -top-3 -left-3 h-6 w-6 bg-steel text-white text-[10px] flex items-center justify-center font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Portfolio ---------------------- */
function Portfolio() {
  const projects = [
    { t: "Revit 3D Building Model", d: "Full architectural + structural BIM model.", b: "CAPSTONE", img: "/Revit 3D Building Model.JPG" },
    { t: "Clash Detection — Navisworks", d: "MEP vs structure coordination report.", b: "MINOR", img: "/Clash Detection — Navisworks.JPG" },
    { t: "BOQ Sheet — Excel", d: "Quantity takeoff & cost estimation.", b: "MINOR", img: "/BOQ Sheet — Excel.jpg" },
    { t: "Construction Drawings", d: "Plans, sections, elevations & details.", b: "MINOR", img: "/Construction Drawings.JPG" },
  ];
  return (
    <section id="portfolio" className="section-y bg-background scroll-mt-20">
      <div className="container-narrow">
        <SectionHeader 
          kicker="Portfolio" 
          title="Build a Portfolio with Real BIM Deliverables" 
          sub="5 minor projects + 1 capstone covering the full BIM workflow — the same artefacts hiring managers expect." 
        />
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group border border-border bg-background flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
                <img 
                  src={p.img} 
                  alt={p.t} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.2em] font-bold text-steel border border-border">
                  {p.b}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between border-t border-border">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 border border-border bg-secondary/20">
          <div className="p-6 border-b sm:border-b-0 sm:border-r border-border flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-steel uppercase font-bold mb-1">Minor Projects</div>
              <div className="text-xl font-bold text-foreground">05 Deliverables</div>
            </div>
            <div className="text-4xl font-light text-steel/20">05</div>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-steel uppercase font-bold mb-1">Capstone</div>
              <div className="text-xl font-bold text-foreground">Full BIM Workflow</div>
            </div>
            <div className="text-4xl font-light text-steel/20">01</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Curriculum (Modules + Day-by-Day + Preview) ---------------------- */
const modules = [
  { t: "BIM Fundamentals", o: "Understand BIM standards & workflows." },
  { t: "Architectural Modeling", o: "Build accurate Revit architecture models." },
  { t: "Structural Modeling", o: "Model RCC & steel structures in Revit." },
  { t: "MEP Basics", o: "Coordinate mechanical, electrical, plumbing systems." },
  { t: "BIM Coordination", o: "Detect & resolve clashes in Navisworks." },
  { t: "Documentation & BOQ", o: "Generate drawings, schedules and quantities." },
  { t: "Planning & Workflow", o: "Sequence projects with 4D/5D techniques." },
  { t: "Visualization", o: "Produce client-ready 3D presentations." },
];

type Day = { day: string; title: string; topics: string[] };
const syllabusDays: Day[] = [
  { day: "Day 1", title: "Introduction & Project Setup", topics: ["Introduction & Overview", "Project Templates", "Tool Palettes", "User Interface", "Starting a Project"] },
  { day: "Day 2", title: "Units, Levels & Grids", topics: ["Project Units", "Dimensions", "Levels & editing", "Create & edit Grids"] },
  { day: "Day 3", title: "Walls", topics: ["Wall Properties", "Wall Shapes & Draw panel", "Profile edit", "Wall Joins", "Drawing a plan"] },
  { day: "Day 4", title: "Modify Commands", topics: ["Move, Copy, Paste", "Rotate, Mirror, Array", "Scale, Trim / Extend", "Offset, Align, Split"] },
  { day: "Day 5", title: "Doors & Windows", topics: ["Placing Doors", "Door Properties", "Load From Family", "Placing Windows", "Window Properties"] },
  { day: "Day 6", title: "Components", topics: ["Loading Component", "Placing Components", "Modifying Properties", "Visibility Graphics"] },
  { day: "Day 7", title: "Managing Views", topics: ["Floor Plan", "Elevation", "Section", "3D Views, Section box"] },
  { day: "Day 8", title: "Annotation", topics: ["Dimensions", "Text", "Model Text", "Model Line"] },
  { day: "Day 9", title: "Floors", topics: ["Creating Floors", "Sloped Floor by slope arrow", "Floor Properties", "Editing Material"] },
  { day: "Day 10", title: "Roofs", topics: ["Roof by Footprint", "Roof by Extrusion", "Soffit, Fascia, Gutter", "Editing Material", "Join / Unjoin"] },
  { day: "Day 11", title: "Openings", topics: ["Vertical Opening", "Shaft opening", "Multi-floor Shaft", "Dormer & Wall opening", "Opening By Face"] },
  { day: "Day 12", title: "Ceiling & Lighting", topics: ["Create & Edit Ceiling", "External Lighting", "Internal Lighting"] },
  { day: "Day 13", title: "Curtain Walls", topics: ["Creating Curtain Walls", "Curtain Grids", "Mullions", "Reshape Panels", "Curtain Door Panel"] },
  { day: "Day 14", title: "Stairs & Railing", topics: ["Creating Stairs", "Modifying Stairs", "Stair Properties", "Editing Railing"] },
  { day: "Day 15", title: "Ramp & Insert", topics: ["Create & Edit Ramp", "Decal", "Insert CAD File", "Load Family"] },
  { day: "Day 16", title: "Rooms & Areas", topics: ["Room Plans", "Room Separation", "Area Boundaries & Tags", "Colour fill legend", "Keynotes"] },
  { day: "Day 17", title: "Schedules & Takeoff", topics: ["Door schedule", "Window Schedule", "Wall material takeoff"] },
  { day: "Day 18", title: "Detailing", topics: ["Callout views", "Duplicate View", "Creating Details", "Repeating Detail", "Drafting Views"] },
  { day: "Day 19", title: "Massing", topics: ["Mass Family intro", "In-Place Masses", "Walls / Floors / Roofs by Face", "Modifying Forms"] },
  { day: "Day 20", title: "Sheets", topics: ["Adding a Sheet", "Adding Views", "Modifying View on Sheet", "Title Sheet", "Print Setup"] },
  { day: "Day 21", title: "Visibility & Rendering", topics: ["Rendering", "Camera", "Walkthrough", "Export Image and walkthrough"] },
  { day: "Day 22", title: "Site Design", topics: ["Topo surface", "Sub region", "Building Pads", "Parking & Site Components"] },
  { day: "Day 23", title: "Legend & Lines", topics: ["Create Legend", "Detail Line", "Line Styles & Weights", "Line Patterns"] },
  { day: "Day 24", title: "In-Place Families", topics: ["Setting Work Planes", "Creating & Modifying In-Place Families"] },
  { day: "Day 25", title: "Family Creation", topics: ["Family Creation intro", "Creating a Door Family"] },
  { day: "Day 26–27", title: "Conceptual Mass", topics: ["Setup View Plan", "Draw Shapes", "Modify Shapes"] },
  { day: "Day 28–30", title: "All Commands Reminder", topics: ["Symbols", "Materials", "Revision of all commands"] },
  { day: "Day 31–35", title: "Project Work", topics: ["Capstone live project", "Architectural BIM deliverable", "Sheets, schedules and rendering"] },
];

const stats = [
  { i: Clock, l: "Total Hours", v: "70 Hrs" },
  { i: CalendarDays, l: "Duration", v: "35 Days" },
  { i: FileText, l: "Sessions", v: `${syllabusDays.length}` },
];

function Curriculum() {
  const [view, setView] = useState<"modules" | "days">("modules");

  return (
    <section id="curriculum" className="section-y bg-secondary scroll-mt-20">
      <div className="container-narrow">
        <SectionHeader kicker="Curriculum" title="Revit Architecture Program" sub="A complete day-wise syllabus designed for civil engineering students. Explore the modules and detailed day-by-day learning path below." />

        {/* Action Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-border pb-8">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Course Content</h3>
            <p className="text-sm text-muted-foreground">Comprehensive training from fundamentals to capstone projects.</p>
          </div>
          <a href="/geonixa-revit-syllabus.pdf" download className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-sm text-sm font-bold hover:bg-ink transition-all shadow-lg shadow-primary/20 shrink-0">
            <Download className="h-4 w-4" /> Download Complete Syllabus (PDF)
          </a>
        </div>
        {/* Stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border mb-12">
          {stats.map(s => (
            <div key={s.l} className="bg-background p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-steel/10 flex items-center justify-center shrink-0">
                <s.i className="h-5 w-5 text-steel" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{s.l}</div>
                <div className="text-lg font-bold text-foreground">{s.v}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter toggle */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="inline-flex border border-border bg-background p-1">
            <button
              onClick={() => setView("modules")}
              className={`px-5 py-2 text-sm transition-colors ${view === "modules" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}
            >
              Modules ({modules.length})
            </button>
            <button
              onClick={() => setView("days")}
              className={`px-5 py-2 text-sm transition-colors ${view === "days" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}
            >
              Day-by-Day ({syllabusDays.length})
            </button>
          </div>
          <div className="text-xs text-muted-foreground">
            {view === "modules" ? "High-level themes covered across the program." : "Detailed day-wise breakdown from the syllabus."}
          </div>
        </div>

        {/* Content */}
        {view === "modules" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {modules.map((m, i) => (
              <div key={m.t} className="bg-background p-6">
                <div className="text-xs text-steel tracking-widest mb-3">M{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-semibold text-foreground">{m.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.o}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {syllabusDays.map((d, i) => (
              <div key={d.day} className="bg-background p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="text-xs tracking-widest text-steel uppercase">{d.day}</div>
                  <div className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / {syllabusDays.length}</div>
                </div>
                <h3 className="font-semibold text-foreground">{d.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {d.topics.map(t => (
                    <li key={t} className="text-sm text-muted-foreground flex gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-steel shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


/* ---------------------- LMS ---------------------- */
function LMS() {
  const features = [
    { i: PlayCircle, t: "Recorded Sessions", d: "Revisit every live class on-demand." },
    { i: FileCheck, t: "Assignment Submission", d: "Upload Revit/Navis files for review." },
    { i: BarChart3, t: "Progress Tracking", d: "See module completion in real time." },
    { i: ClipboardList, t: "Project Evaluation", d: "Detailed mentor feedback per deliverable." },
    { i: UserCheck, t: "Attendance Tracking", d: "Live class attendance & make-up sessions." },
  ];
  return (
    <section id="lms" className="section-y bg-secondary scroll-mt-20">
      <div className="container-narrow">
        <SectionHeader kicker="LMS Platform" title="A Dedicated LMS for Practice, Feedback, and Progress" />
        <div className="border border-border bg-background p-6 md:p-10">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <GaugeCircle className="h-4 w-4 text-steel" /> Geonixa Dashboard
            </div>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-steel" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ i: Icon, t, d }) => (
              <div key={t} className="bg-secondary border border-border p-5">
                <Icon className="h-5 w-5 text-steel" strokeWidth={1.5} />
                <h3 className="mt-4 font-medium text-foreground">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Mentors ---------------------- */
function Mentors() {
  const mentors = [
    { n: "Senior BIM Engineer", c: "L&T Construction", y: "12+ yrs" },
    { n: "BIM Coordinator", c: "AECOM", y: "10+ yrs" },
    { n: "Project Coordinator", c: "Leading AEC Firm", y: "11+ yrs" },
  ];
  return (
    <section id="mentors" className="section-y scroll-mt-20">
      <div className="container-narrow">
        <SectionHeader kicker="Mentors" title="Learn from Industry BIM Professionals" />
        <div className="grid md:grid-cols-3 gap-6">
          {mentors.map(m => (
            <div key={m.n} className="bg-background border border-border p-6">
              <div className="aspect-square bg-primary blueprint-grid-fine relative mb-5 flex items-center justify-center">
                <div className="text-primary-foreground/30 text-5xl font-light">{m.n[0]}</div>
              </div>
              <div className="text-xs text-steel tracking-widest mb-2">{m.y} EXPERIENCE</div>
              <h3 className="font-semibold text-foreground">{m.n}</h3>
              <p className="text-sm text-muted-foreground mt-1">{m.c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Support ---------------------- */
function Support() {
  const items = [
    { i: Calendar, t: "Weekly Live Doubt Sessions", d: "Open Q&A with mentors every week." },
    { i: Users, t: "1:1 Support", d: "Personal guidance on your projects." },
    { i: MessageCircle, t: "Community Group", d: "Active peer network of BIM learners." },
  ];
  return (
    <section className="section-y bg-secondary">
      <div className="container-narrow">
        <SectionHeader kicker="Doubt Support" title="Support Beyond the Live Class" />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ i: Icon, t, d }) => (
            <div key={t} className="border border-border bg-background p-6">
              <Icon className="h-6 w-6 text-steel" strokeWidth={1.4} />
              <h3 className="mt-4 font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Outcomes ---------------------- */
function Outcomes() {
  const skills = ["BIM Modeling", "BOQ & Estimation", "Project Coordination"];
  const roles = ["BIM Engineer", "Revit Modeler", "Quantity Surveyor"];
  const bars = [{ r: "Junior", v: 35 }, { r: "Mid-Level", v: 60 }, { r: "Senior", v: 90 }];
  return (
    <section className="section-y border-t border-border/40">
      <div className="container-narrow">
        <SectionHeader kicker="Outcomes" title="Graduate with Job-Ready BIM Skills" />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="grid sm:grid-cols-2 gap-10 lg:gap-8">
            <div className="space-y-4">
              <h3 className="text-xs tracking-[0.2em] text-steel uppercase font-bold">Skills Acquired</h3>
              <ul className="space-y-3">
                {skills.map(s => <li key={s} className="flex items-center gap-3 text-sm text-foreground/90 font-medium"><Check className="h-4 w-4 text-steel shrink-0" /> {s}</li>)}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs tracking-[0.2em] text-steel uppercase font-bold">Career Roles</h3>
              <ul className="space-y-3">
                {roles.map(s => <li key={s} className="flex items-center gap-3 text-sm text-foreground/90 font-medium"><Check className="h-4 w-4 text-steel shrink-0" /> {s}</li>)}
              </ul>
            </div>
          </div>
          <div className="bg-secondary/50 border border-border p-8 md:p-10 corner-frame">
            <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-8 font-bold">Indicative Career Growth</div>
            <div className="space-y-6">
              {bars.map(b => (
                <div key={b.r}>
                  <div className="flex justify-between text-xs mb-3">
                    <span className="text-foreground font-semibold uppercase tracking-wider">{b.r}</span>
                    <span className="text-steel font-bold">{b.v}%</span>
                  </div>
                  <div className="h-1.5 bg-background overflow-hidden"><div className="h-full bg-steel transition-all duration-1000 ease-out" style={{ width: `${b.v}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Enrollment Lead Form ---------------------- */
const PROGRAMS = [
  "Revit Architecture",
  "BIM Coordination & Clash Detection",
  "BOQ & Quantity Takeoff",
  "Full BIM Workflow Capstone",
] as const;

const today = new Date();
today.setHours(0, 0, 0, 0);

const enrollSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(255, "Email is too long"),
  program: z.string().refine((v): v is (typeof PROGRAMS)[number] => (PROGRAMS as readonly string[]).includes(v), { message: "Select a program" }),
  startDate: z
    .string()
    .min(1, "Pick a preferred start date")
    .refine(v => {
      const d = new Date(v);
      return !isNaN(d.getTime()) && d >= today;
    }, "Start date must be today or later"),
});

type EnrollData = z.infer<typeof enrollSchema>;
type Errors = Partial<Record<keyof EnrollData, string>>;

function EnrollmentForm() {
  const [form, setForm] = useState({ name: "", email: "", program: "", startDate: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const successRef = useRef<HTMLDivElement | null>(null);

  const minDate = today.toISOString().slice(0, 10);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = enrollSchema.safeParse(form);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof EnrollData;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("submitting");
    // Mock API call
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
    setTimeout(() => {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      successRef.current?.focus();
    }, 300);
  };

  const reset = () => {
    setForm({ name: "", email: "", program: "", startDate: "" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="section-y bg-primary text-primary-foreground relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 blueprint-grid opacity-25" />
      <div className="container-narrow relative grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-steel" />
            <span className="text-xs tracking-[0.3em] uppercase text-steel">Enroll</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">Reserve Your Seat in the Next Cohort</h2>
          <p className="mt-4 text-primary-foreground/75 text-sm md:text-base">
            Tell us a bit about you and your preferred start date. A Geonixa counsellor will reach out within 24 hours with batch details and the placement roadmap.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-steel" /> +91 XXXXX XXXXX</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-steel" /> info@geonixa.com</li>
            <li className="flex items-center gap-3"><Globe className="h-4 w-4 text-steel" /> www.geonixa.com</li>
          </ul>
          <a href="/geonixa-revit-syllabus.pdf" download className="mt-8 inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground text-xs px-4 py-2 rounded-sm hover:bg-primary-foreground/10">
            <Download className="h-3.5 w-3.5" /> Download Syllabus PDF
          </a>
        </div>

        <div className="lg:col-span-3">
          {status === "success" ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="bg-background text-foreground border border-border p-8 corner-frame outline-none"
            >
              <div className="h-12 w-12 rounded-full bg-steel/15 flex items-center justify-center mb-5">
                <Check className="h-6 w-6 text-steel" />
              </div>
              <h3 className="text-2xl font-semibold">You're on the list — thank you!</h3>
              <p className="mt-3 text-muted-foreground text-sm">
                We've received your enrollment enquiry for <span className="text-foreground font-medium">{form.program}</span> with a preferred start date of <span className="text-foreground font-medium">{form.startDate}</span>. Our team will reach you at <span className="text-foreground font-medium">{form.email}</span> within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={reset} className="bg-primary text-primary-foreground text-sm px-5 py-2.5 rounded-sm hover:bg-ink">
                  Submit another enquiry
                </button>
                <a href="/geonixa-revit-syllabus.pdf" download className="inline-flex items-center gap-2 border border-border text-foreground text-sm px-5 py-2.5 rounded-sm hover:bg-secondary">
                  <Download className="h-4 w-4" /> Download Syllabus
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="bg-background text-foreground border border-border p-6 md:p-8 space-y-5">
              <Field label="Full Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange("name", e.target.value)}
                  maxLength={100}
                  placeholder="Aarav Sharma"
                  className={inputCls(!!errors.name)}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                  maxLength={255}
                  placeholder="you@email.com"
                  className={inputCls(!!errors.email)}
                />
              </Field>
              <Field label="Program Interest" error={errors.program}>
                <select
                  value={form.program}
                  onChange={e => handleChange("program", e.target.value)}
                  className={inputCls(!!errors.program)}
                >
                  <option value="">Select a program…</option>
                  {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Preferred Start Date" error={errors.startDate}>
                <input
                  type="date"
                  value={form.startDate}
                  min={minDate}
                  onChange={e => handleChange("startDate", e.target.value)}
                  className={inputCls(!!errors.startDate)}
                />
              </Field>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-medium hover:bg-ink disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>Sending… <Loader2 className="h-4 w-4 animate-spin" /></>
                ) : (
                  <>Submit Enrollment Enquiry <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted by the Geonixa team about cohort details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function inputCls(error: boolean) {
  return `w-full bg-background border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-ink transition-colors ${error ? "border-destructive" : "border-border"}`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-steel mb-2">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

/* ---------------------- FAQ ---------------------- */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = [
    { q: "Do I need previous Revit experience?", a: "No, the program starts from absolute fundamentals and builds up to advanced BIM coordination workflows." },
    { q: "Will I get a certificate?", a: "Yes, you will receive an industry-recognized Geonixa certification upon successful completion of your capstone project." },
    { q: "Is the software provided?", a: "We guide you through the official student version installation and provide all project-specific families and templates." },
    { q: "What is the batch timing?", a: "We offer multiple cohorts including weekend and evening batches to suit working professionals and students." }
  ];
  return (
    <section className="section-y bg-background scroll-mt-20">
      <div className="container-narrow">
        <SectionHeader kicker="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-border bg-secondary/30 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-sm">{f.q}</span>
                <span className={`text-steel transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`}>
                  <Menu className="h-4 w-4" />
                </span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Footer ---------------------- */
function Footer() {
  return (
    <footer className="bg-ink text-primary-foreground border-t border-primary-foreground/10">
      <div className="container-narrow py-14 grid md:grid-cols-3 gap-10">
        <div>
          <GeonixaLogo className="h-12 w-auto" />
          <p className="mt-4 text-sm text-primary-foreground/70">Engineering Skills. Real Projects.</p>
        </div>
        <div>
          <h4 className="text-xs tracking-widest text-steel uppercase mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-steel" /> +91 XXXXX XXXXX</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-steel" /> info@geonixa.com</li>
            <li className="flex items-center gap-3"><Globe className="h-4 w-4 text-steel" /> www.geonixa.com</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest text-steel uppercase mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {navLinks.map(l => (
              <li key={l.id}>
                <button onClick={() => scrollToId(l.id)} className="hover:text-primary-foreground">{l.label}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-narrow py-5 text-xs text-primary-foreground/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Geonixa. All rights reserved.</span>
          <span>Revit · BIM · Civil Engineering</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -right-20 w-[40rem] h-[40rem] bg-steel/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] -left-20 w-[30rem] h-[30rem] bg-steel/3 rounded-full blur-[100px] pointer-events-none" />
      
      <Header />
      <Hero />
      <SoftwareMarquee />
      <Curriculum />
      <Workflow />
      <Portfolio />
      
      <LMS />
      <Mentors />
      <Support />
      <Outcomes />
      <FAQ />
      <EnrollmentForm />
      <Footer />
    </main>
  );
}
