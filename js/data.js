"use strict";
/* ÚNICA FUENTE DE VERDAD PARA TARIFAS Y CONFIGURACIÓN */
const BLACKLINE_CONFIG = Object.freeze({
  brand:"BLACKLINE AUTOMOTIVE", tagline:"Precision is the difference.",
  whatsappNumber:"", // Introduce solo dígitos internacionales: 52 + número de México. No inventar.
  city:"Santa Fe, Ciudad de México",
  currency:"MXN"
});
const VEHICLES = Object.freeze({auto:{label:"Auto"},camioneta:{label:"Camioneta"},suv:{label:"SUV"},suvxl:{label:"SUV XL / Especial"}});
const SERVICES = [
 {id:"essential",number:"01",name:"Essential",description:"Lo esencial, ejecutado con precisión.",prices:{auto:850,camioneta:1050,suv:1150},includes:["Lavado exterior manual","Limpieza de rines y neumáticos","Secado cuidadoso","Aspirado de cabina y cajuela","Limpieza de tablero y consola","Limpieza de paneles interiores","Cristales","Inspección final"],excludes:"No incluye descontaminación, pulido ni extracción profunda."},
 {id:"deep",number:"02",name:"Deep Clean Exterior",description:"Limpieza exterior especializada y protección.",prices:{auto:1900,camioneta:2300,suv:2600},includes:["Lavado técnico exterior","Descontaminación según necesidad","Limpieza de emblemas y molduras","Atención a zonas de difícil acceso","Aplicación de cera o sellador","Inspección final"],excludes:"No incluye corrección mecánica de pintura."},
 {id:"interior",number:"03",name:"Interior Reset",description:"Un nuevo estándar para el interior.",prices:{auto:1800,camioneta:2200,suv:2500},includes:["Aspirado profundo","Limpieza de paneles y compartimentos","Limpieza de textiles accesibles","Tratamiento compatible con piel o vinil","Limpieza de cristales interiores","Revisión final"],excludes:"No incluye extracción profunda profesional de tapicería."},
 {id:"paint",number:"04",name:"Paint Refinement",description:"Refinamiento condicionado a la inspección de pintura.",prices:{auto:3500,camioneta:4200,suv:4800},includes:["Lavado técnico","Descontaminación","Inspección de pintura","Prueba de panel","Pulido de un paso cuando proceda","Protección final"],excludes:"No se garantiza eliminación de rayones profundos ni defectos que atraviesan el barniz."},
 {id:"signature",number:"05",name:"Signature",description:"Nuestra experiencia integral insignia.",featured:true,prices:{auto:5500,camioneta:6500,suv:7500},includes:["Deep Clean Exterior","Interior Reset","Refinamiento ligero condicionado","Protección","Inspección detallada","Registro fotográfico"],excludes:"No incluye automáticamente corrección multipaso ni recubrimiento cerámico."}
];
const ADDONS = [
 {id:"cristales-clean",name:"Descontaminación de cristales",prices:{auto:500,camioneta:650,suv:750}},
 {id:"cristales-protect",name:"Protección de cristales",prices:{auto:600,camioneta:750,suv:850}},
 {id:"rines",name:"Limpieza profunda de rines",prices:{auto:600,camioneta:750,suv:900}},
 {id:"faros",name:"Restauración estética de faros",prices:{auto:800,camioneta:900,suv:1000}},
 {id:"plasticos",name:"Acondicionamiento de plásticos exteriores",prices:{auto:500,camioneta:650,suv:750}},
 {id:"piel",name:"Tratamiento de piel",prices:{auto:500,camioneta:650,suv:800}},
 {id:"mascotas",name:"Remoción de pelo de mascota",minimum:true,prices:{auto:400,camioneta:500,suv:600}}
];
const GALLERY_ITEMS = [
 {id:"g1",title:"Limpieza exterior",category:"exterior",image:"assets/images/car-placeholder.svg"},
 {id:"g2",title:"Cabina y superficies",category:"interior",image:"assets/images/car-placeholder.svg"},
 {id:"g3",title:"Refinamiento de pintura",category:"pintura",image:"assets/images/car-placeholder.svg"},
 {id:"g4",title:"Rines y neumáticos",category:"detalles",image:"assets/images/car-placeholder.svg"},
 {id:"g5",title:"Protección exterior",category:"exterior",image:"assets/images/car-placeholder.svg"},
 {id:"g6",title:"Atención al detalle",category:"detalles",image:"assets/images/car-placeholder.svg"}
];
const fmt = value => new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0}).format(value);
