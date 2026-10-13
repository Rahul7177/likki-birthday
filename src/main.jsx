import React, {useCallback, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, AnimatePresence} from 'framer-motion';
import {Heart, MailOpen, Sparkles, Music2, Download, Play, ChevronDown, X, VolumeX} from 'lucide-react';
import confetti from 'canvas-confetti';
import './style.css';

const photos = [
 ['1000067362.jpg','Where it all began','That first bowling day in Mysore.'],
 ['1000067325.jpg','Little adventures','Some days become memories before we even realise it.'],
 ['1000067331.jpg','A day by the water','The kind of afternoon you wish could last a little longer.'],
 ['1000067337.jpg','That smile','A little glimpse of you being you.'],
 ['1000067326.jpg','The silly moments','Because the best memories are rarely planned.'],
 ['1000067327.jpg','Together, in the frame','A moment worth keeping.'],
 ['1000067340.jpg','A familiar kind of comfort','Some company just feels easy.'],
 ['1000067343.jpg','A little dressed up','Another memory tucked safely away.'],
 ['1000067345.jpg','The everyday magic','Nothing extraordinary. And somehow, everything.'],
 ['1000067348.jpg','The happy chaos','Your smile says enough.'],
 ['1000067350.jpg','A little tradition','Some pictures just feel warm.'],
 ['1000067352.jpg','A day to remember','Glad we got to make this memory.'],
 ['1000067353.jpg','Cake, of course','A sweet little moment.'],
 ['1000067355.jpg','A favourite kind of evening','Good company makes ordinary days special.'],
 ['1000067356.jpg','One for the album','A little piece of our story.'],
 ['1000067357.jpg','The gang','A memory with our people.'],
 ['1000067358.jpg','Never change this energy','A little mischief suits you.'],
 ['1000067359.jpg','In your own little world','I hope you always find reasons to smile.'],
 ['1000067360.jpg','Just being you','And that is more than enough.']
];
const chapters = [
 {title:'Where it all began',sub:'A bowling day in Mysore',text:`It's strange, isn't it?\n\nHow you can meet someone on an ordinary day, without having the slightest idea of the place they're going to hold in your life someday.\n\nI still have that first picture of us from bowling.\n\nBack then, it was just a day out, a bunch of people, a game, a few smiles. We didn't know all the memories that would come after it.\n\nAnd maybe that's the beautiful thing about beginnings. You don't recognise them when they happen. You understand their value much later, when you look back and realise how glad you are that a particular day happened the way it did.`},
 {title:'Your kind of happiness',sub:'The smile, the calm, the fun',text:`Likhita, one of the things I love about knowing you is how you carry yourself.\n\nYou're usually so calm, with that smile that's almost always there. But there's another side to you, too. The fun, the silliness, the little moments when you completely let go and just enjoy yourself.\n\nAnd I think that's what makes these pictures so special to me. They aren't just pictures of places we've been or days we've spent together. They're little glimpses of you being you.\n\nAnd when I look at them, I don't just remember what happened that day. I remember how nice it felt to be there, sharing those moments with you.`},
 {title:'The comfort of having you around',sub:'For the thoughts that matter',text:`You know, I've realised that not every friendship needs you to talk all the time, explain everything, or share every little thing happening in your life.\n\nSometimes, it's enough to know that there's someone you can turn to when your thoughts get a little too deep, when something matters to you in a way that's difficult to explain, or when you just need someone who'll try to understand.\n\nAnd that's something I genuinely appreciate about you. I may not tell you everything. That's just how I am.\n\nBut when there's something sitting a little deeper in my mind, something I really want to talk through, I know that a conversation with you can help. There's a comfort in that. A feeling that I don't have to make everything sound perfect before I share it. That I can try to put my thoughts into words, and you'll meet them with understanding.\n\nAnd beyond all the fun, all the laughter, and all the memories, I think that's one of the most meaningful things a friendship can give you. The feeling that someone genuinely cares.`},
 {title:'The things I hope you never forget',sub:'A little wish for you',text:`I don't think we always realise what we bring into other people's lives. We get so caught up in our own days, our own worries, our own little worlds, that we don't always notice the difference our presence makes.\n\nSo, on your birthday, there's something I want you to know. I hope you never underestimate the goodness you carry in you. The kindness you show. The way you try to understand people. The care you give, even in ways that might seem small to you.\n\nI hope life gives you the same patience and understanding that you give to others. I hope you always have people around whom you can be completely yourself. People with whom you can laugh until you forget what was so funny in the first place. People who'll sit with you through the difficult thoughts, celebrate your smallest wins, and remind you to be gentle with yourself when life gets overwhelming.\n\nAnd I hope that, no matter how much life changes, you never lose that smile. Not because you always have to be happy. But because I hope you always find enough reasons to be.`},
 {title:'A reminder for the days in between',sub:'For whenever life feels a little much',text:`A tiny reminder for an ordinary day: you don't have to have everything figured out.\n\nYou can be the calm, capable person everyone knows, and still have days when you need a little patience yourself. You can take a break, be silly for no reason, change your mind, or simply do nothing for a while. None of that makes you any less you.\n\nI hope you keep making room for the things that bring out your easy smile — the spontaneous plans, the people who feel like home, the little jokes that make absolutely no sense to anyone else. And I hope you remember to offer yourself the same kindness you so naturally give to others.\n\nNo grand lesson here. Just a small note to come back to whenever you need it: you're allowed to take life one day at a time. ♡`}
];
const birthdayLetter = `Happy Birthday, Likhita. ❤️

I'm really glad that one ordinary day in Mysore brought us into each other's lives. I don't know what all the years ahead have planned for us, or how many more memories we'll add to this little collection. But I know that these moments have made a difference to me, and I'm grateful for them.

Thank you for being the person you are. For the laughter, the conversations, the understanding, and that quiet comfort that makes having you around feel so nice.

I hope this new year of your life is kind to you. I hope you grow into all the things you've dreamed of becoming, discover beautiful things about yourself, and find happiness in places you never expected.

And whenever you look back at these pictures, I hope you smile, remembering not just the places we went or the things we did, but the people we were in those moments. Because someday, these ordinary days will be the memories we wish we could revisit. And I'm glad we have them.

Happy Birthday, Likhita.

Stay the beautiful person you are.`;
function App(){
 const [opened,setOpened]=useState(false),[active,setActive]=useState(null),[note,setNote]=useState(null),[wish,setWish]=useState(false),[showLetter,setShowLetter]=useState(false),[letterReady,setLetterReady]=useState(false);
 const burstAt = useCallback((x, y, heart = false) => {
  const colors = heart ? ['#c45665', '#fc64a4', '#f1b5b9', '#88444c'] : ['#c45665', '#fc64a4', '#f1b5b9', '#f6c96b', '#88444c'];
  confetti({particleCount: heart ? 9 : 20, spread: heart ? 48 : 66, startVelocity: heart ? 16 : 24, gravity: .9, ticks: 100, scalar: heart ? .72 : .85, origin: {x: Math.min(.98, Math.max(.02, x)), y: Math.min(.98, Math.max(.02, y))}, colors, shapes: heart ? ['circle'] : ['square', 'circle'], disableForReducedMotion: true});
  if (heart) confetti({particleCount: 3, spread: 35, startVelocity: 12, gravity: .65, ticks: 75, scalar: 1.15, origin: {x, y}, colors: ['#c45665', '#fc64a4'], shapes: ['circle'], disableForReducedMotion: true});
 }, []);
 const handleSurfaceClick = useCallback((event) => {
  const target = event.target;
  if (target.closest('button, a, input, video, textarea, select, label, .lightbox, .letter-overlay')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  burstAt(event.clientX / window.innerWidth, event.clientY / window.innerHeight, true);
 }, [burstAt]);
 useEffect(() => {
  const onPointerDown = (event) => {
   if (!opened || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   const target = event.target;
   if (!target.closest('button, a, input, video, textarea, select, label')) burstAt(event.clientX / window.innerWidth, event.clientY / window.innerHeight, true);
  };
  window.addEventListener('pointerdown', onPointerDown, {passive:true});
  return () => window.removeEventListener('pointerdown', onPointerDown);
 }, [opened, burstAt]);
 const celebrate = useCallback((event, big = false) => {
  const rect = event.currentTarget.getBoundingClientRect();
  burstAt((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight, !big);
  if (big) {
   setTimeout(() => confetti({particleCount: 55, spread: 95, startVelocity: 28, gravity: .8, ticks: 140, origin: {x:.5,y:.46}, colors:['#c45665','#fc64a4','#f1b5b9','#f6c96b','#88444c'], disableForReducedMotion:true}), 120);
  }
 }, [burstAt]);
 return <div className="site">
  <div className="grain" aria-hidden="true"/>

  <div className="ambient-decor" aria-hidden="true">
   <span className="balloon balloon-one">♡</span><span className="balloon balloon-two">♡</span><span className="balloon balloon-three">♡</span><span className="balloon balloon-four">♡</span>
   <span className="float-heart heart-one">♥</span><span className="float-heart heart-two">♡</span><span className="float-heart heart-three">♥</span><span className="float-heart heart-four">♡</span>
   <span className="confetti-drift confetti-one">✦</span><span className="confetti-drift confetti-two">✧</span><span className="confetti-drift confetti-three">✦</span><span className="confetti-drift confetti-four">✧</span>
  </div>
  {!opened && <motion.div className="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><div className="intro-orbit">♡</div><p className="eyebrow">A little something, just for you</p><h1>For Likhita<span>,</span><br/><i>with warmth.</i></h1><p className="intro-copy">A small collection of moments, smiles, and things I wanted you to know.</p><button className="primary" onClick={e=>{celebrate(e,true);setOpened(true)}}><MailOpen size={17}/> Open your little surprise</button><p className="tiny">made with care · just for your birthday</p></motion.div>}
  {opened && <motion.main initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
   <nav><a className="brand" href="#top">for likhita <span>♡</span></a><a href="#memories">memories</a><a href="#letter">a little note</a></nav>
   <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><Sparkles size={14}/> OCTOBER 28 · YOUR DAY</p><h1>Some people make<br/>ordinary days <i>beautiful.</i></h1><p className="lead">This is a little collection of memories, made for someone whose calm smile, quiet kindness, and wonderfully silly side deserve to be celebrated.</p><a className="text-link" href="#memories">Let's look back together <ChevronDown size={16}/></a></div><div className="hero-photo"><img src="/photos/likhita-solo.png" alt="Likhita's Potrait"/><span className="photo-tag">a little moment, just for you ♡</span><span className="heart-stamp">♡</span></div></section>
   <section className="dedication"><span className="decor">✳</span><p className="eyebrow">A small thing I wanted to say</p><blockquote>“You don't have to tell someone everything to feel that <i>they care.</i>”</blockquote><p className="dedication-sub">And that's one of the things I appreciate most about knowing you.</p></section>
   <section className="memories" id="memories"><div className="section-head"><p className="eyebrow">THE LITTLE THINGS</p><h2>Our collection of <i>ordinary magic.</i></h2><p>Tap any photo. Some memories deserve a second look.</p></div><div className="photo-grid">{photos.map((p,i)=><motion.button key={p[0]} className={`photo-card card-${i%3}`} onClick={e=>{celebrate(e);setActive(p)}} whileHover={{y:-5, rotate: i%2===0 ? .5 : -.5}} whileTap={{scale:.985}}><img src={'/photos/'+p[0]} alt={p[1]} loading="lazy"/><span className="card-caption"><b>{p[1]}</b><small>{p[2]}</small></span></motion.button>)}</div></section>
   <section className="film-section"><div className="section-head"><p className="eyebrow">A LITTLE FILM</p><h2>For the memories<br/><i>we get to keep.</i></h2><p>A cinematic collection of the moments you shared. Best watched with a little quiet time.</p></div><div className="film-frame"><video controls playsInline preload="metadata" poster="/photos/1000067362.jpg"><source src="/birthday_film.mp4" type="video/mp4"/>Your browser does not support embedded video.</video></div><a className="text-link film-download" href="/birthday_film.mp4" download="For-Likhita-Birthday-Film.mp4"><Download size={15}/> Save the birthday film</a></section>
   <section className="chapters"><div className="section-head"><p className="eyebrow">A FEW THINGS I MEAN</p><h2>Not just pictures.<br/><i>A little of the story, too.</i></h2><p>Open each little chapter when you feel like it.</p></div><div className="chapter-list">{chapters.map((c,i)=><div className="chapter" key={c.title}><button onClick={e=>{celebrate(e);setNote(note===i?null:i)}} aria-expanded={note===i}><span className="chapter-number">0{i+1}</span><span className="chapter-name"><b>{c.title}</b><small>{c.sub}</small></span><span className="plus">{note===i?'−':'+'}</span></button><AnimatePresence>{note===i&&<motion.div className="chapter-text" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><p>{c.text}</p></motion.div>}</AnimatePresence></div>)}</div></section>
   <section className="letter-section" id="letter"><div className="letter-card"><div className="letter-flower">✳</div><p className="eyebrow">OPEN WHEN YOU'RE READY</p><h2>A little note<br/><i>for your birthday.</i></h2><p>Some things feel better when they're written down. This is one of them.</p><button className="primary" onClick={e=>{celebrate(e);setLetterReady(false);setShowLetter(true);window.setTimeout(()=>setLetterReady(true),1750)}}><MailOpen size={17}/> Read your letter</button><span className="letter-footer">with warmth, always ♡</span></div></section>
   <section className="wish-section"><p className="eyebrow">MAKE A LITTLE WISH</p><h2>Here's to a year that is <i>kind to you.</i></h2><p>Take a breath, make a wish, and tap the candle.</p><button className={`candle ${wish?'lit':''}`} onClick={e=>{celebrate(e,!wish);setWish(!wish)}} aria-label="Make a birthday wish"><span className="flame">✦</span><span className="wick"/><span className="wax"/></button>{wish&&<motion.p className="wish-reveal" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>May life give you many reasons to smile — and people who make you feel understood. ♡</motion.p>}</section>
   <footer><span>Made with care, for Likhita ♡</span><span>Some days become stories. This is one of ours.</span></footer>
  </motion.main>}
  <AnimatePresence>{active&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}><button className="close" onClick={()=>setActive(null)} aria-label="Close"><X/></button><motion.div className="lightbox-inner" initial={{scale:.96,y:10}} animate={{scale:1,y:0}} onClick={e=>e.stopPropagation()}><img src={'/photos/'+active[0]} alt={active[1]}/><h3>{active[1]}</h3><p>{active[2]}</p></motion.div></motion.div>}</AnimatePresence>
  <AnimatePresence>{showLetter&&<motion.div className="letter-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="close" onClick={()=>setShowLetter(false)} aria-label="Close letter"><X/></button><div className={`letter-opening-stage ${letterReady?'letter-is-open':''}`}><div className="envelope-scene" aria-hidden="true"><div className="envelope-shadow"/><div className="envelope-back"/><div className="envelope-letter"><span>For Likhita, ♡</span></div><div className="envelope-front"/><div className="envelope-flap"/><div className="envelope-seal">♡</div></div><p className="envelope-caption">{letterReady?'A little something, from me to you.':'A letter, written just for you…'}</p></div>{letterReady&&<motion.article className="full-letter" initial={{y:26,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.65,ease:[.22,1,.36,1]}}><p className="eyebrow">HAPPY BIRTHDAY, LIKHITA</p>{birthdayLetter.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}<button className="outline" onClick={()=>window.print()}><Download size={15}/> Save this letter as PDF</button></motion.article>}</motion.div>}</AnimatePresence>
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);
