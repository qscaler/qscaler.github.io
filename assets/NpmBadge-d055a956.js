import{g as o,h as t,o as r,c as p,a as g,_ as d}from"./app-9cad6f30.js";const l=["href","title"],_=["src","alt"],i=o({__name:"NpmBadge",props:{package:{type:String,required:!0},distTag:{type:String,required:!1,default:"next"}},setup(a){const e=a,n=t(()=>`https://www.npmjs.com/package/${e.package}`),c=t(()=>e.distTag?`${e.package}@${e.distTag}`:e.package),s=t(()=>`https://badgen.net/npm/v/${e.package}/${e.distTag}?label=${encodeURIComponent(c.value)}`);return(m,u)=>(r(),p("a",{class:"npm-badge",href:n.value,title:a.package,target:"_blank",rel:"noopener noreferrer"},[g("img",{src:s.value,alt:a.package},null,8,_)],8,l))}});const f=d(i,[["__scopeId","data-v-7cbb391b"],["__file","NpmBadge.vue"]]);export{f as default};