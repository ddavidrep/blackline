"use strict";
function initNavigation(){
 const header=document.querySelector("#siteHeader"),toggle=document.querySelector("#menuToggle"),menu=document.querySelector("#mobileMenu");
 let returnFocus=null;
 const close=()=>{menu.classList.remove("open");menu.inert=true;header.classList.remove("menu-active");document.body.classList.remove("menu-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Abrir navegación");if(returnFocus&&document.contains(returnFocus))returnFocus.focus();returnFocus=null};
 const open=()=>{returnFocus=document.activeElement;menu.inert=false;menu.classList.add("open");header.classList.add("menu-active");document.body.classList.add("menu-open");toggle.setAttribute("aria-expanded","true");toggle.setAttribute("aria-label","Cerrar navegación");menu.querySelector("a").focus()};
 toggle.addEventListener("click",()=>menu.classList.contains("open")?close():open());
 menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",close));
 document.addEventListener("keydown",event=>{
  if(!menu.classList.contains("open"))return;
  if(event.key==="Escape"){event.preventDefault();close();return}
  if(event.key==="Tab"){
   const links=[...menu.querySelectorAll("a")];const first=links[0],last=links[links.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();toggle.focus()}
   else if(event.shiftKey&&document.activeElement===toggle){event.preventDefault();last.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();toggle.focus()}
   else if(!event.shiftKey&&document.activeElement===toggle){event.preventDefault();first.focus()}
  }
 });
 const onScroll=()=>header.classList.toggle("scrolled",scrollY>40);window.addEventListener("scroll",onScroll,{passive:true});onScroll();
 if("IntersectionObserver" in window){const links=[...document.querySelectorAll(".desktop-nav .nav-link")];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id))}})},{rootMargin:"-25% 0px -65% 0px"});["inicio","nosotros","servicios","metodo","studio","contacto"].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)})}
}
function initGallery(){
 const grid=document.querySelector("#galleryGrid"),dialog=document.querySelector("#galleryDialog"),img=document.querySelector("#galleryDialogImage"),title=document.querySelector("#galleryDialogTitle");let filtered=[...GALLERY_ITEMS],activeIndex=0;
 function render(category="todos"){
  filtered=GALLERY_ITEMS.filter(item=>category==="todos"||item.category===category);
  grid.innerHTML=filtered.map((item,index)=>`<button class="gallery-item" data-index="${index}" type="button" aria-label="Ampliar ${safeText(item.title)} (imagen ilustrativa)"><img src="${item.image}" loading="lazy" alt="Imagen ilustrativa pendiente de fotografía real"><span><small>IMAGEN DE REFERENCIA / ${safeText(item.category.toUpperCase())}</small><strong>${safeText(item.title)}</strong></span></button>`).join("");
  grid.querySelectorAll("[data-index]").forEach(button=>button.addEventListener("click",()=>{activeIndex=Number(button.dataset.index);showItem();dialog.showModal()}));
 }
 function showItem(){const item=filtered[activeIndex];img.src=item.image;img.alt=`Imagen ilustrativa de ${item.title}`;title.textContent=item.title}
 document.querySelectorAll(".gallery-filter").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll(".gallery-filter").forEach(b=>{const selected=b===button;b.classList.toggle("active",selected);b.setAttribute("aria-pressed",String(selected))});render(button.dataset.gallery)}));
 document.querySelector("#galleryClose").addEventListener("click",()=>dialog.close());
 document.querySelector("#galleryPrev").addEventListener("click",()=>{activeIndex=(activeIndex+filtered.length-1)%filtered.length;showItem()});
 document.querySelector("#galleryNext").addEventListener("click",()=>{activeIndex=(activeIndex+1)%filtered.length;showItem()});
 dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
 dialog.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){activeIndex=(activeIndex+filtered.length-1)%filtered.length;showItem()}else if(e.key==="ArrowRight"){activeIndex=(activeIndex+1)%filtered.length;showItem()}});
 render();
 const slider=document.querySelector("#compareSlider"),before=document.querySelector("#compareBefore"),handle=document.querySelector("#compareHandle"),comparison=document.querySelector("#comparison");
 function updateCompare(){const v=Number(slider.value);before.style.width=v+"%";handle.style.left=v+"%";const inner=before.querySelector("img");inner.style.width=comparison.clientWidth+"px";inner.style.height=comparison.clientHeight+"px"}
 slider.addEventListener("input",updateCompare);window.addEventListener("resize",updateCompare,{passive:true});updateCompare();
}
function init(){document.documentElement.classList.add("is-js");document.querySelectorAll(".current-year").forEach(e=>e.textContent=new Date().getFullYear());initNavigation();initServices();initBooking();initGallery();initAnimations()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
