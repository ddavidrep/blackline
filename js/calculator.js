"use strict";
function calculateEstimate(){
 const service=SERVICES.find(s=>s.id===appState.service);
 const base=service?priceFor(service.prices):null;
 const addons=ADDONS.filter(a=>appState.extras.has(a.id));
 const addonSum=addons.reduce((sum,a)=>sum+(priceFor(a.prices)||0),0);
 const hasMinimum=addons.some(a=>a.minimum);
 const custom=appState.vehicle==="suvxl";
 return {service,base,addons,addonSum,hasMinimum,custom,total:base===null||custom?null:base+addonSum};
}
function updateQuote(){
 const result=calculateEstimate();
 const vehicle=VEHICLES[appState.vehicle].label;
 document.querySelector("#quoteVehicle").textContent=vehicle;
 document.querySelector("#quoteService").textContent=result.service?.name||"Sin seleccionar";
 document.querySelector("#quoteExtras").textContent=result.addons.length?result.addons.map(a=>a.name).join(", "):"Ninguno";
 document.querySelector("#quoteMode").textContent=appState.mode==="studio"?"Blackline Studio":"Blackline Concierge";
 const label=result.custom?"A cotizar":result.total===null?"Selecciona servicio":`${result.hasMinimum?'Desde ':''}${fmt(result.total)}`;
 document.querySelector("#quoteTotal").textContent=label;
 document.querySelector("#formTotal").textContent=label;
 const notes=["Tarifa orientativa sujeta a inspección y confirmación."];
 if(result.hasMinimum)notes.push("Los adicionales marcados 'Desde' son importes mínimos orientativos.");
 if(result.custom)notes.push("SUV XL y unidades extraordinarias requieren cotización personalizada.");
 if(appState.mode==="concierge")notes.push("Recolección y devolución se cotizan por separado y no están incluidas.");
 document.querySelector("#quoteDisclaimer").textContent=notes.join(" ");
}
