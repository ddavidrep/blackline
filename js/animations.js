"use strict";
function initAnimations(){
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!reduced&&window.gsap){
  gsap.fromTo(".hero-title .reveal-line>span",{yPercent:105},{yPercent:0,duration:1.15,stagger:.16,ease:"power3.out",delay:.15});
  gsap.fromTo(".hero-eyebrow,.hero-tagline,.hero-copy,.hero-actions",{y:22,opacity:0},{y:0,opacity:1,duration:.8,stagger:.1,delay:.45,ease:"power2.out"});
  gsap.to(".hero-image",{scale:1,duration:2.5,ease:"power2.out"});
  if(window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.to("#methodProgress",{height:"100%",ease:"none",scrollTrigger:{trigger:"#methodList",start:"top 75%",end:"bottom 55%",scrub:true}})}
 }
 const elements=document.querySelectorAll("[data-reveal]");
 if(reduced||!('IntersectionObserver' in window)){elements.forEach(e=>e.classList.add("visible"));return}
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})},{threshold:.1,rootMargin:"0px 0px -35px 0px"});elements.forEach(e=>observer.observe(e));
}
