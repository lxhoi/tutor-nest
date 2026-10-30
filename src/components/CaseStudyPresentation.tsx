import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowLeft, Maximize2, Minimize2, Grid2X2, PanelLeftClose, PanelLeftOpen, StickyNote, Check, ShieldCheck, CalendarDays, CreditCard, Shapes, Route, BookOpen, X } from 'lucide-react';
import { CASE_STUDY_SLIDES, CaseStudySlide } from '../data/caseStudy';
import { CASE_STUDY_SLIDES_VI } from '../data/caseStudy.vi';
import { CaseStudyLanguageContext, translateCaseStudy, useCaseStudyTranslation, type CaseStudyLanguage } from '../data/caseStudyI18n';
import { INITIAL_BOOKING } from '../data/mockData';
import { V2HomeScreen } from './screens/v2/V2HomeScreen';
import { V2TutorProfileScreen } from './screens/v2/V2TutorProfileScreen';
import { V2ScheduleTimeScreen } from './screens/v2/V2ScheduleTimeScreen';
import { V2CheckoutScreen } from './screens/v2/V2CheckoutScreen';
import { V2ConfirmationScreen } from './screens/v2/V2ConfirmationScreen';
import { HomeScreen } from './screens/HomeScreen';
import './CaseStudyPresentation.css';
import { CaseStudyEvidence } from './CaseStudyEvidence';

const FIGMA_URL = 'https://www.figma.com/design/6P3XwYly9wYY2jHWQgclYY/TutorNest?node-id=23201-4624';
const noop = () => {};
const previewBooking = { ...INITIAL_BOOKING, bookingType: 'recurring' as const };
type Preview = 'home' | 'profile' | 'schedule' | 'checkout' | 'confirmation' | 'original';
const previewNames: Record<Preview, string> = { home: 'Discover tutors', profile: 'Build trust', schedule: 'Plan lessons', checkout: 'Review & pay', confirmation: 'Feel reassured', original: 'Existing V1' };

function Phone({ screen = 'home', height = 440, muted = false }: { screen?: Preview; height?: number; muted?: boolean }) {
  const t = useCaseStudyTranslation();
  const scale = height / 820;
  const content = screen === 'profile' ? <V2TutorProfileScreen tutor={previewBooking.tutor} booking={previewBooking} updateBooking={noop} onNavigate={noop} />
    : screen === 'schedule' ? <V2ScheduleTimeScreen booking={previewBooking} updateBooking={noop} onNavigate={noop} />
    : screen === 'checkout' ? <V2CheckoutScreen booking={previewBooking} updateBooking={noop} onNavigate={noop} />
    : screen === 'confirmation' ? <V2ConfirmationScreen booking={previewBooking} onNavigate={noop} />
    : screen === 'original' ? <HomeScreen booking={previewBooking} onNavigate={noop} onSelectTutor={noop} />
    : <V2HomeScreen booking={previewBooking} onNavigate={noop} onSelectTutor={noop} />;
  return <div className={`cs-phone-holder ${muted ? 'cs-phone-muted' : ''}`} style={{ width: 402 * scale, height }} role="img" aria-label={`${t('TutorNest mobile mockup:')} ${t(previewNames[screen])}`}>
    <div className="cs-phone app-version-v2" style={{ transform: `scale(${scale})` }} inert>
      <div className="cs-status"><span>9:41</span><i /><span>••• ▰</span></div>
      <div className="cs-phone-screen">{content}</div>
      <div className="cs-home-indicator" />
    </div>
  </div>;
}

function Wireframe({ variant = 0 }: { variant?: number }) {
  const t = useCaseStudyTranslation();
  return <div className="cs-wireframe"><div className="cs-wire-top"><span>TutorNest</span><span>☰</span></div>
    <div className="cs-wire-search">{t("Search for a tutor")}<span>⌕</span></div>
    <div className="cs-wire-chips"><i>{t("Subject")}</i><i>{t("Grade")}</i><i>{t("Location")}</i></div>
    {variant === 1 ? <><div className="cs-wire-avatar"/><b>{t("Tutor profile")}</b><p>{t("Qualifications · experience · reviews")}</p><div className="cs-wire-box">{t("Verified credentials")}</div><div className="cs-wire-box cs-wire-tall">{t("Teaching approach")}<br/><span>{t("Information organized by importance")}</span></div><div className="cs-wire-box">{t("Weekly availability")}</div></> : variant === 2 ? <><b>{t("Plan your lessons")}</b><div className="cs-wire-box">{t("Trial lesson　|　Weekly lessons")}</div><div className="cs-wire-days">{['M','T','W','T','F','S','S'].map((d,i)=><i key={i}>{d}</i>)}</div><div className="cs-wire-box cs-wire-tall">{t("Choose a time")}<br/><span>{t("Selected date & session duration")}</span></div><div className="cs-wire-box">{t("Review your schedule")}</div></> : <>{[0,1,2].map(i=><div className="cs-wire-card" key={i}><div className="cs-wire-avatar"/><div><b>{t("Tutor name")}</b><p>{t("Subject · grade")}</p><p>{t("Experience · rating")}</p><strong>{t("Hourly rate →")}</strong></div></div>)}</>}
    <div className="cs-wire-cta">{t(variant === 0 ? 'Explore tutor' : variant === 1 ? 'Book a lesson' : 'Continue')}</div>
  </div>;
}

function SlideContent({ slide, index, onOpenPrototype }: { slide: CaseStudySlide; index: number; onOpenPrototype: () => void }) {
  const t = useCaseStudyTranslation();
  const items = slide.items || [];
  const intro = <div className="cs-slide-intro"><span className="cs-eyebrow">{slide.kicker}</span><h1>{slide.title}</h1><p className="cs-lead">{slide.description}</p></div>;
  const cards = <div className={`cs-cards cs-count-${items.length}`}>{items.map((item,i)=><article key={item.title}><span className="cs-card-number">0{i+1}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}</div>;
  switch(slide.layout) {
    case 'cover': return <><div className="cs-cover-copy"><span className="cs-eyebrow">{slide.kicker}</span><div className="cs-cover-tag"><span/>{t("A parent-first tutoring experience")}</div><h1>{slide.title}</h1><p>{slide.description}</p><div className="cs-cover-meta"><span>{t("UX / UI DESIGN")}</span><span>{t("MOBILE EXPERIENCE")}</span><span>{t("VIETNAM")}</span></div></div><div className="cs-cover-art"><div className="cs-orbit"/><div className="cs-cover-phone-one"><Phone screen="home" height={565}/></div><div className="cs-cover-phone-two"><Phone screen="profile" height={565}/></div><div className="cs-floating-label"><ShieldCheck size={23}/><span>{t("Trust comes first.")}</span></div></div></>;
    case 'chapter': return <><span className="cs-chapter-numeral">{slide.kicker.slice(-2)}</span><div className="cs-chapter-copy"><span className="cs-eyebrow">{slide.kicker} / {slide.description}</span><h1>{slide.title}</h1><div className="cs-chapter-list">{items.map((x,i)=><div key={t(x.title)}><span>0{i+1}</span><strong>{t(x.title)}</strong><p>{x.text}</p><ArrowUpRight size={22}/></div>)}</div></div><div className="cs-chapter-mark"><BookOpen size={150} strokeWidth={0.7}/></div></>;
    case 'overview': return <div className="cs-two-col"><div>{intro}<div className="cs-overview-facts">{items.map(x=><div key={t(x.title)}><h2>{t(x.title)}</h2><p>{x.text}</p></div>)}</div></div><div className="cs-overview-art"><Phone screen="home" height={530}/><div className="cs-art-caption"><span>{t("DISCOVER → BOOK → LEARN")}</span><p>{t("Support for every step.")}</p></div></div></div>;
    case 'split': return <>{intro}<div className="cs-problem-grid">{items.map((x,i)=><article key={t(x.title)}><span>{t(i===0?'THE CHALLENGE':'THE OPPORTUNITY')}</span><h2>{t(x.title)}</h2><p>{x.text}</p>{i===0?<Shapes size={52}/>:<Route size={52}/>}</article>)}</div></>;
    case 'persona': return <>{intro}<div className="cs-persona-layout"><div className="cs-persona-card"><div className="cs-persona-monogram">MA<span>✳</span></div><h2>Minh Anh</h2><span>{t("Working parent · Vietnam")}</span><p>{t("Seeking reliable tutoring that fits a family routine.")}</p><small>{t("Illustrative proto-persona")}</small></div><div className="cs-persona-needs">{items.map(x=><div key={t(x.title)}><h2>{t(x.title)}</h2><p>{x.text}</p></div>)}<div className="cs-problem-statement"><span>{t("PROBLEM STATEMENT")}</span><p>{t("A busy parent needs a clear way to assess a tutor and arrange affordable, consistent lessons so they can support their child with confidence.")}</p></div></div></div></>;
    case 'journey': return <>{intro}<div className="cs-journey">{items.map((x,i)=><div className="cs-journey-step" key={t(x.title)}><span className="cs-journey-dot">0{i+1}</span><h2>{t(x.title)}</h2><p>{x.text}</p><div className="cs-journey-question"><small>{t("PARENT’S QUESTION")}</small><p>{t(['Where should I start?','Is this a good fit?','Will this work for us?','What is due today?','What comes next?'][i])}</p></div><div className="cs-journey-opportunity"><small>{t("DESIGN OPPORTUNITY")}</small><p>{t(['Visible search & filters','Credentials & reviews','Clear calendar states','Payment breakdown','Lesson & payment tracking'][i])}</p></div></div>)}</div></>;
    case 'sitemap': return <>{intro}<div className="cs-sitemap"><div className="cs-map-root">TutorNest <BookOpen size={23}/></div><div className="cs-map-branches">{[{title:'Discover',children:['Home','Search & filters','Tutor profile','Availability & reviews']},{title:'Book a lesson',children:['Trial or weekly','Date & time','Review & checkout','Confirmation']},{title:'Manage learning',children:['Lesson schedule','Reschedule','Payment schedule','Pause renewal']},{title:'Stay connected',children:['Messages','Notifications','Account']}].map(x=><div key={t(x.title)}><h2>{t(x.title)}</h2>{x.children.map(c=><p key={t(c)}>{t(c)}</p>)}</div>)}</div></div></>;
    case 'wireframes': return <div className="cs-wire-slide"><div>{intro}<div className="cs-small-callout"><span>{t("DESIGN PRIORITIES")}</span>{items.length?items.map(item=><p key={item.title}><strong>{item.title}</strong><br/>{item.text}</p>):<p>{t("Scan tutor details.")}<br/>{t("Understand the schedule.")}<br/>{t("Find the next action.")}</p>}</div></div><div className={`cs-wireframes ${index===11?'cs-paper':''}`}>{[0,1,2].map(i=><div key={i}><Wireframe variant={i}/><span className="cs-visual-label">{t(['Discovery','Tutor profile','Scheduling'][i])}</span></div>)}</div></div>;
    case 'mobile-sizes': return <>{intro}<div className="cs-mobile-sizes">{items.map((item,i)=><div key={item.title}><Phone screen="profile" height={[285,325,365][i]}/><span className="cs-visual-label">{item.title}</span></div>)}</div></>;
    case 'mobile-states': return <>{intro}<div className="cs-mobile-states">{items.map((item,i)=><div key={item.title}><Phone screen={(['profile','schedule','checkout'] as Preview[])[i]} height={390}/><span className="cs-visual-label">{item.title}<small>{item.text}</small></span></div>)}</div></>;
    case 'responsive': return <>{intro}<div className="cs-responsive-layout"><div><div className="cs-desktop"><div className="cs-desktop-bar"><i/><i/><i/><span>{t("TutorNest / proposed wider layout")}</span></div><div className="cs-desktop-content"><div className="cs-desktop-nav">TutorNest<span>{t("Find a tutor　　My lessons　　Messages")}</span></div><div className="cs-desktop-columns"><div><span className="cs-eyebrow">{t("FIND THE RIGHT SUPPORT")}</span><h2>{t("A tutor who fits")}<br/>{t("your family.")}</h2><div className="cs-wire-search">{t("Subject · Grade · Location")}</div><div className="cs-desktop-tutor"><div className="cs-wire-avatar"/><div><b>{t("Verified tutor")}</b><p>{t("Qualifications · reviews · availability")}</p></div></div><div className="cs-desktop-tutor"><div className="cs-wire-avatar"/><div><b>{t("Teaching that connects")}</b><p>{t("Subject expertise · teaching approach")}</p></div></div></div><aside><CalendarDays size={25}/><h3>{t("Plan your lessons")}</h3><p>{t("Trial lesson or weekly schedule")}</p><div className="cs-wire-days">{['M','T','W','T','F'].map((d,i)=><i key={i}>{d}</i>)}</div><p>{t("Review dates and fees")}</p><div className="cs-wire-cta">{t("Continue →")}</div></aside></div></div></div><span className="cs-visual-label">{t("Proposed wider layout / concept")}</span></div><div>{index===21?<Phone screen="profile" height={345}/>:<Wireframe variant={1}/>}<span className="cs-visual-label">{t("Mobile / primary experience")}</span></div></div></>;
    case 'flow': return <>{intro}<div className="cs-flow-path">{items.map((x,i)=><React.Fragment key={t(x.title)}><div><span>0{i+1}</span><h2>{t(x.title)}</h2><p>{x.text}</p></div>{i<items.length-1&&<ArrowRight size={25}/>}</React.Fragment>)}</div><div className="cs-flow-branch"><span>{t("BOOKING CHOICE")}</span><div>{t("One trial lesson")}</div><span>{t("or")}</span><div>{t("Recurring weekly lessons")}</div></div><p className="cs-bottom-insight">{t("One clear sequence. Two levels of commitment.")}</p></>;
    case 'study': return <>{intro}<div className="cs-study-grid">{items.map((x,i)=><article key={t(x.title)}><span>0{i+1}</span><div><h2>{t(x.title)}</h2><p>{x.text}</p></div></article>)}</div></>;
    case 'findings': return <>{intro}<div className="cs-findings">{items.map((x,i)=><article key={t(x.title)}><div className="cs-finding-icon">{i===0?<ShieldCheck size={30}/>:i===1?<CalendarDays size={30}/>:<CreditCard size={30}/>}</div><span className="cs-card-number">{t('REVIEW FINDING 0')}{i+1}</span><h2>{t(x.title)}</h2><p>{x.text}</p><div className="cs-finding-response"><small>{t("VERIFICATION")}</small><p>{t(['Check: restore the second-evening slot on Back/Continue.','Check: a trial never receives a full-course discount.','Check: export actual calendar events without claiming sync.'][i])}</p></div></article>)}</div></>;
    case 'comparison': return <div className="cs-release-comparison"><div>{intro}<div className="cs-release-corrections">{items.map((item,i)=><article key={item.title}><span>0{i+1}</span><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</div></div><div className="cs-release-phone"><Phone screen="schedule" height={510}/><span className="cs-visual-label">{t('CURRENT V2')}</span></div></div>;
    case 'gallery': return <>{intro}<div className="cs-gallery">{(['home','profile','schedule','checkout','confirmation'] as Preview[]).map((screen,i)=><div key={screen}><Phone screen={screen} height={370}/><span className="cs-visual-label">0{i+1} / {t(previewNames[screen])}</span></div>)}</div></>;
    case 'prototype': return <div className="cs-two-col"><div>{intro}<div className="cs-prototype-steps">{items.map((x,i)=><div key={t(x.title)}><span>0{i+1}</span><div><h2>{t(x.title)}</h2><p>{x.text}</p></div></div>)}</div><div className="cs-link-row"><button onClick={onOpenPrototype} className="cs-primary">{t("Open interactive prototype")}<ArrowUpRight size={19}/></button><a href={FIGMA_URL} target="_blank" rel="noreferrer">{t("View Figma")}<ArrowUpRight size={17}/></a></div></div><div className="cs-prototype-art"><Phone screen="schedule" height={540}/><div className="cs-prototype-caption">{t("A connected experience.")}<br/><span>{t("From choice to confirmation.")}</span></div></div></div>;
    case 'accessibility': return <>{intro}<div className="cs-accessibility">{items.map((x,i)=><article key={t(x.title)}><div className="cs-accessibility-demo">{i===0?<><strong>Aa</strong><span>{t("Heading")}</span><p>{t("Supporting information")}</p></>:i===1?<><div className="cs-state"><Check size={20}/>{t("Selected")}</div><div className="cs-state cs-state-off">{t("Unavailable")}</div></>:<><div className="cs-step-demo"><i>1</i><span/><i>2</i><span/><i>3</i></div><div className="cs-review-demo">{t("Review your booking")}<Check size={17}/></div></>}</div><span className="cs-card-number">0{i+1}</span><h2>{t(x.title)}</h2><p>{x.text}</p></article>)}</div></>;
    case 'takeaways': return <>{intro}<div className="cs-takeaways"><article><span>{t("RELEASE SCOPE")}</span><h2>{items[0]?.title}</h2><p>{items[0]?.text}</p><ShieldCheck size={56}/></article><div>{items.slice(1).map(x=><article key={t(x.title)}><h2>{t(x.title)}</h2><p>{x.text}</p></article>)}</div></div></>;
    case 'closing': return <><div className="cs-closing-mark"><BookOpen size={64} strokeWidth={1}/></div><div className="cs-closing"><span className="cs-eyebrow">{slide.kicker}</span><h1>{slide.title}</h1><p>{slide.description}</p><div className="cs-link-row"><a className="cs-primary" href={FIGMA_URL} target="_blank" rel="noreferrer">{t("Explore the Figma file")}<ArrowUpRight size={19}/></a><a href="https://github.com/lxhoi/tutor-nest" target="_blank" rel="noreferrer">{t("View project source")}<ArrowUpRight size={18}/></a></div><span className="cs-contact-note"><a href="mailto:lxhoi.2k@gmail.com">Bryan Lê · lxhoi.2k@gmail.com <ArrowUpRight size={14}/></a></span></div><div className="cs-closing-flower">✳</div></>;
    default: return <>{intro}{cards}</>;
  }
}

export function CaseStudyPresentation({ onOpenPrototype }: { onOpenPrototype: () => void }) {
  const [language, setLanguage] = useState<CaseStudyLanguage>(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'en' || requested === 'vi') return requested;
    try { return localStorage.getItem('tutornest.case-study.language') === 'vi' ? 'vi' : 'en'; }
    catch { return 'en'; }
  });
  const t = (text: string) => translateCaseStudy(text, language);
  const slides = language === 'vi' ? CASE_STUDY_SLIDES_VI : CASE_STUDY_SLIDES;
  const [index, setIndex] = useState(() => Math.min(27, Math.max(0, Math.floor(Number(new URLSearchParams(window.location.search).get('slide') || 1)) - 1)) || 0);
  const [sidebar, setSidebar] = useState(() => window.innerWidth >= 1000);
  const [showEvidence, setShowEvidence] = useState(false);
  const [overview, setOverview] = useState(false);
  const [notes, setNotes] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [scale, setScale] = useState(0.7);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const slide = slides[index];
  const select = (next: number) => { setIndex(Math.max(0, Math.min(slides.length-1, next))); setOverview(false); };
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang',language);
    try { localStorage.setItem('tutornest.case-study.language', language); } catch { /* Storage may be unavailable. */ }
    url.searchParams.set('view','case-study'); url.searchParams.set('slide', String(index + 1));
    window.history.replaceState(null, '', url);
  }, [index, language]);
  useEffect(() => {
    if (!stage.current) return;
    const resize = new ResizeObserver(([entry]) => setScale(Math.max(0.1, Math.min((entry.contentRect.width - 48)/1440, (entry.contentRect.height - 40)/810))));
    resize.observe(stage.current); return () => resize.disconnect();
  }, [overview, notes]);
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (document.querySelector('.cs-evidence-panel')) return;
      if (e.target instanceof HTMLElement && (e.target.matches('input, textarea, select') || e.target.isContentEditable)) return;
      if (e.key === ' ' && e.target instanceof HTMLElement && e.target.closest('button, a')) return;
      if (['ArrowRight','ArrowLeft','PageDown','PageUp','Home','End',' '].includes(e.key)) e.preventDefault();
      if (['ArrowRight','PageDown',' '].includes(e.key)) setIndex(i=>Math.min(27,i+1));
      if (['ArrowLeft','PageUp'].includes(e.key)) setIndex(i=>Math.max(0,i-1));
      if (e.key==='Home') setIndex(0);
      if (e.key==='End') setIndex(27);
      if (e.key==='Escape') setOverview(false);
    };
    const change = () => setFullscreen(document.fullscreenElement === root.current);
    window.addEventListener('keydown',keydown); document.addEventListener('fullscreenchange',change);
    return () => { window.removeEventListener('keydown',keydown); document.removeEventListener('fullscreenchange',change); };
  }, []);
  useEffect(() => { root.current?.querySelector(`[data-slide="${index}"]`)?.scrollIntoView({ block: 'nearest' }); }, [index]);
  const toggleFullscreen = async () => {
    try { if(document.fullscreenElement) await document.exitFullscreen(); else await root.current?.requestFullscreen(); }
    catch { setSidebar(false); }
  };
  return <CaseStudyLanguageContext.Provider value={language}><div className="cs-presentation" lang={language} ref={root}>
    {sidebar&&<aside className="cs-sidebar" aria-label={t("Presentation slides")}><div className="cs-sidebar-title"><span>{t("THE CASE STUDY")}</span><strong>TutorNest<span>®</span></strong><p>{t("28 slides · Google UX structure")}</p></div><nav>{slides.map((s,i)=><React.Fragment key={s.kicker}>{(i===0||s.chapter!==slides[i-1].chapter)&&<div className="cs-nav-section">{s.chapter}</div>}<button data-slide={i} onClick={()=>select(i)} aria-current={i===index?'step':undefined} className={i===index?'cs-nav-active':''}><span>{String(i+1).padStart(2,'0')}</span><span>{i===0?t('Cover'):s.layout==='chapter'?s.description:s.kicker.replace(/^\d+ \/ /,'').toLowerCase()}</span>{i===index&&<i/>}</button></React.Fragment>)}</nav><div className="cs-sidebar-bottom"><span className="cs-live-dot"/>{t("Concept case study · English")}</div></aside>}
    <div className="cs-workspace"><div className="cs-toolbar"><div><button onClick={()=>setSidebar(!sidebar)} title={t(sidebar?'Hide slide list':'Show slide list')} aria-label={t(sidebar?'Hide slide list':'Show slide list')}>{sidebar?<PanelLeftClose size={18}/>:<PanelLeftOpen size={18}/>}</button><span className="cs-toolbar-divider"/><span>{slide.chapter}</span><span className="cs-toolbar-breadcrumb">/ {index===0?t('Cover'):slide.layout==='chapter'?slide.description:slide.kicker.replace(/^\d+ \/ /,'').toLowerCase()}</span></div><div><div className="cs-language-switch" role="group" aria-label={language === 'vi' ? 'Ngôn ngữ trình bày' : 'Presentation language'}>
        <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>English</button>
        <button type="button" lang="vi" aria-pressed={language === 'vi'} onClick={() => setLanguage('vi')}>Tiếng Việt</button>
      </div><button onClick={()=>setShowEvidence(true)} className="cs-evidence-trigger">{language==='vi'?'Bằng chứng':'Evidence'}</button><button onClick={()=>setOverview(!overview)} aria-pressed={overview} title={t("Slide overview")} aria-label={t("Slide overview")}>{overview?<X size={17}/>:<Grid2X2 size={17}/>}</button><button onClick={()=>setNotes(!notes)} aria-pressed={notes} title={t("Speaker notes")} aria-label={t("Speaker notes")}><StickyNote size={17}/></button><button onClick={toggleFullscreen} title={t("Full screen")} aria-label={t("Full screen")}>{fullscreen?<Minimize2 size={17}/>:<Maximize2 size={17}/>}</button></div></div>
      {overview?<div className="cs-overview-grid" aria-label={t("All 28 slides")}>{slides.map((s,i)=><button className={`${s.layout==='chapter'?'cs-grid-chapter':''} ${index===i?'cs-grid-selected':''}`} onClick={()=>select(i)} key={i}><span>{String(i+1).padStart(2,'0')} / {s.chapter}</span><strong>{s.title}</strong><small>{s.layout==='chapter'?s.description:s.kicker.replace(/^\d+ \/ /,'')}</small></button>)}</div>:<div className="cs-stage" ref={stage}><div className="cs-scaled-wrap" style={{width:1440*scale,height:810*scale}}><section className={`cs-slide cs-layout-${slide.layout}`} style={{transform:`scale(${scale})`}} aria-label={`Slide ${index+1}: ${slide.title.replace('\n',' ')}`}><div className="cs-slide-brand"><img src="/tutornest-logo.svg" alt="TutorNest"/><span>{t("DESIGNING FOR CONFIDENCE")}</span></div><div className="cs-slide-body"><SlideContent slide={slide} index={index} onOpenPrototype={onOpenPrototype}/></div><footer className="cs-slide-footer"><span>{t("TUTOR NEST / UX CASE STUDY")}</span>{slide.evidence&&<span className="cs-evidence">{slide.evidence}</span>}<span>{String(index+1).padStart(2,'0')} <i>/</i> 28</span></footer></section></div></div>}
      {notes&&<div className="cs-speaker-notes"><span>{t("SPEAKER NOTES")}</span><p>{slide.note || t('Explain the design intent shown on this slide. Distinguish proposed ideas from research-backed conclusions.')}</p></div>}
      <div className="cs-deck-controls"><span className="cs-keyboard-hint">{t("← → to navigate")}<span>·</span>{t("Home / End to jump")}</span><div className="cs-pagination"><button onClick={()=>select(index-1)} disabled={index===0} aria-label={t("Previous slide")}><ArrowLeft size={18}/></button><label><span className="sr-only">{t("Go to slide")}</span><select value={index} onChange={e=>select(Number(e.target.value))}>{slides.map((_,i)=><option key={i} value={i}>{String(i+1).padStart(2,'0')}</option>)}</select><span>/ 28</span></label><button onClick={()=>select(index+1)} disabled={index===27} aria-label={t("Next slide")}><ArrowRight size={18}/></button></div><span className="cs-deck-label">TUTOR NEST <span>{t("CASE STUDY")}</span></span></div><div className="cs-progress-track"><div style={{width:`${((index+1)/28)*100}%`}}/></div>
    </div>
    {showEvidence && <CaseStudyEvidence language={language} onClose={()=>setShowEvidence(false)}/>}
  </div></CaseStudyLanguageContext.Provider>;
}
