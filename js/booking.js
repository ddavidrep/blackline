"use strict";
let latestRequest="";
function composeRequest(form){
 const fields=new FormData(form),estimate=calculateEstimate();
 const date=fields.get("fecha")||"Sin especificar";
 const addons=estimate.addons.length?estimate.addons.map(a=>`${a.name} (${a.minimum?'desde ':''}${priceFor(a.prices)===null?'a cotizar':fmt(priceFor(a.prices))})`).join("; "):"Ninguno";
 const total=estimate.custom?"Cotización personalizada":estimate.total===null?"Por confirmar (servicio sin seleccionar)":`${estimate.hasMinimum?'Desde ':''}${fmt(estimate.total)}`;
 const lines=[
 `Hola, BLACKLINE AUTOMOTIVE. Quiero solicitar una cita.`,
 ``, `*DATOS DEL CLIENTE*`, `Nombre: ${fields.get("nombre")}`, `Teléfono: ${fields.get("telefono")}`,
 ``, `*VEHÍCULO*`, `Marca: ${fields.get("marca")}`, `Modelo: ${fields.get("modelo")}`, `Año: ${fields.get("anio")}`, `Tipo: ${VEHICLES[appState.vehicle].label}`,
 ``, `*SERVICIO SOLICITADO*`, `Paquete: ${estimate.service?.name||"Por definir"}`, `Adicionales: ${addons}`,
 `Modalidad: ${appState.mode==="studio"?"Blackline Studio":"Blackline Concierge"}`, `Fecha preferida: ${date}`,
 `Comentarios: ${String(fields.get("comentarios")||"").trim()||"Ninguno"}`,
 ``, `*TOTAL ESTIMADO: ${total}*`,
 `Tarifa orientativa sujeta a inspección y confirmación. La solicitud no es una reserva confirmada.`
 ];
 if(estimate.hasMinimum)lines.push("Los importes 'desde' son mínimos orientativos.");
 if(appState.mode==="concierge")lines.push("El costo Concierge se cotiza por separado.");
 return lines.join("\n");
}
function initBooking(){
 const form=document.querySelector("#bookingForm"),feedback=document.querySelector("#formFeedback"),copy=document.querySelector("#copyRequest");
 const date=form.elements.fecha;date.min=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
 document.querySelector("#bookingVehicle").addEventListener("change",event=>setVehicle(event.target.value));
 document.querySelector("#bookingService").addEventListener("change",event=>{appState.service=event.target.value||null;renderServices();updateQuote()});
 document.querySelector("#bookingMode").addEventListener("change",event=>selectMode(event.target.value));
 form.addEventListener("submit",event=>{
  event.preventDefault();feedback.textContent="";copy.hidden=true;
  if(!form.reportValidity())return;
  const digits=String(form.elements.telefono.value).replace(/\D/g,"");
  if(digits.length<10||digits.length>15){feedback.textContent="Escribe un teléfono válido (10 a 15 dígitos).";form.elements.telefono.focus();return}
  if(!appState.service){feedback.textContent="Selecciona un servicio para preparar la solicitud.";form.elements.servicio.focus();return}
  const consent=form.querySelector("#privacyConsent");if(consent&&!consent.checked){feedback.textContent="Confirma que aceptas compartir los datos de la solicitud por WhatsApp.";consent.focus();return}
  latestRequest=composeRequest(form);
  if(!/^\d{11,15}$/.test(BLACKLINE_CONFIG.whatsappNumber)){
   feedback.textContent="La solicitud está preparada, pero falta configurar el número oficial de WhatsApp. Puedes copiarla para enviarla manualmente.";copy.hidden=false;return;
  }
  const url=`https://wa.me/${BLACKLINE_CONFIG.whatsappNumber}?text=${encodeURIComponent(latestRequest)}`;
  const win=window.open(url,"_blank");
  if(win)win.opener=null;
  if(!win){feedback.textContent="El navegador bloqueó la nueva pestaña. Copia tu solicitud y envíala por WhatsApp.";copy.hidden=false}
  else feedback.textContent="Se abrió WhatsApp con tu solicitud. Revisa el mensaje y pulsa Enviar; tu cita aún no está confirmada.";
 });
 copy.addEventListener("click",async()=>{
  if(!latestRequest)return;
  try{await navigator.clipboard.writeText(latestRequest);feedback.textContent="Solicitud copiada. Envíala al WhatsApp oficial del estudio."}
  catch{const t=document.createElement("textarea");t.value=latestRequest;document.body.append(t);t.select();try{document.execCommand("copy");feedback.textContent="Solicitud copiada."}catch{feedback.textContent="No fue posible copiar automáticamente. Selecciona el texto manualmente."}t.remove()}
 });
 const footer=document.querySelector("#footerContactStatus");if(/^\d{11,15}$/.test(BLACKLINE_CONFIG.whatsappNumber))footer.textContent=`WhatsApp: +${BLACKLINE_CONFIG.whatsappNumber}`;
 const floating=document.querySelector("#floatingWhatsApp");floating.addEventListener("click",()=>{});
}
