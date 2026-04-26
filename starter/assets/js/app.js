
const DATA_URL = new URL('data/labs.json', location.href).href.includes('/lab/') || new URL('data/labs.json', location.href).href.includes('/country/') ? '../data/labs.json' : 'data/labs.json';
const $ = s => document.querySelector(s);
const labLink = id => `lab/index.html?id=${encodeURIComponent(id)}`;
const countryLink = c => `country/index.html?country=${encodeURIComponent(c)}`;
function tagHtml(arr){return (arr||[]).map(x=>`<span class="tag">${x}</span>`).join('')}
function card(lab, rel=''){return `<div class="card"><div class="score">${lab.score}</div><h3>${lab.name}</h3><div class="meta">${lab.institution}<br>${lab.city}, ${lab.country}</div><div class="tags">${tagHtml(lab.domain)}${tagHtml(lab.mission.slice(0,2))}</div><a class="btn" href="${rel}lab/index.html?id=${encodeURIComponent(lab.id)}">View Lab Profile</a></div>`}
function colorFor(lab){ if(lab.domain.includes('Biological')) return '#69ff8f'; if(lab.domain.includes('Chemical')) return '#ffb84d'; if(lab.domain.includes('Radiological')) return '#00e5ff'; return '#b78cff';}
async function loadLabs(){return await (await fetch(DATA_URL)).json()}
function uniq(a){return [...new Set(a)].sort()}
async function initHome(){
 const labs=await loadLabs();
 $('#labCount').textContent=labs.length; $('#countryCount').textContent=uniq(labs.map(l=>l.country)).length; $('#regionCount').textContent=uniq(labs.map(l=>l.region)).length; $('#avgScore').textContent=Math.round(labs.reduce((a,b)=>a+b.score,0)/labs.length);
 const countries=uniq(labs.map(l=>l.country)); $('#countryFilter').innerHTML='<option value="">All countries</option>'+countries.map(c=>`<option>${c}</option>`).join('');
 $('#regionFilter').innerHTML='<option value="">All regions</option>'+uniq(labs.map(l=>l.region)).map(c=>`<option>${c}</option>`).join('');
 const map=L.map('map',{worldCopyJump:true}).setView([22,20],2);
 L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OpenStreetMap &copy; CARTO'}).addTo(map);
 let layer=L.layerGroup().addTo(map);
 function render(){
   const q=$('#q').value.toLowerCase(), cf=$('#countryFilter').value, rf=$('#regionFilter').value, df=$('#domainFilter').value;
   const filtered=labs.filter(l=>(!q || JSON.stringify(l).toLowerCase().includes(q)) && (!cf || l.country===cf) && (!rf || l.region===rf) && (!df || l.domain.includes(df)));
   layer.clearLayers();
   filtered.forEach(l=>L.circleMarker(l.coordinates,{radius:6,color:colorFor(l),fillColor:colorFor(l),fillOpacity:.75,weight:1}).addTo(layer).bindPopup(`<b>${l.name}</b><br>${l.country}<br><a href="${labLink(l.id)}">Open profile</a>`));
   $('#cards').innerHTML=filtered.slice(0,24).map(l=>card(l,'')).join('');
   $('#resultCount').textContent=filtered.length;
   const grouped={}; filtered.forEach(l=>{grouped[l.country]=(grouped[l.country]||0)+1});
   $('#countries').innerHTML=Object.entries(grouped).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`<a class="pill" href="${countryLink(c)}">${c} · ${n}</a>`).join(' ');
 }
 ['q','countryFilter','regionFilter','domainFilter'].forEach(id=>$('#'+id).addEventListener('input',render)); render();
}
async function initLab(){
 const labs=await loadLabs(); const id=new URLSearchParams(location.search).get('id'); const l=labs.find(x=>x.id===id)||labs[0];
 document.title=l.name; $('#title').textContent=l.name; $('#subtitle').textContent=`${l.institution} — ${l.city}, ${l.country}`;
 $('#summary').textContent=l.summary; $('#facts').innerHTML=[
 ['Country',l.country],['City',l.city],['Region',l.region],['Domains',l.domain.join(', ')],['Mission',l.mission.join(', ')],['Status',l.status]
 ].map(([k,v])=>`<div class="kv"><b>${k}</b><span>${v}</span></div>`).join('');
 $('#bench').innerHTML=Object.entries(l.benchmark).map(([k,v])=>`<div style="margin:12px 0"><b>${k.replaceAll('_',' ')}</b><div class="bar"><i style="width:${v*20}%"></i></div></div>`).join('');
 $('#caps').innerHTML=Object.entries(l.capabilities).map(([k,v])=>`<div class="kv"><b>${k}</b><span>${v}</span></div>`).join('');
 $('#evidence').innerHTML=l.evidence.map(e=>`<li>${e.title}${e.url?` — <a href="${e.url}">source</a>`:''}</li>`).join('');
 $('#backCountry').href='../country/index.html?country='+encodeURIComponent(l.country);
}
async function initCountry(){
 const labs=await loadLabs(); const c=new URLSearchParams(location.search).get('country')||labs[0].country; const arr=labs.filter(l=>l.country===c);
 document.title=c+' Labs'; $('#countryTitle').textContent=c; $('#countryMeta').textContent=`${arr.length} candidate labs / institutions`;
 $('#countryCards').innerHTML=arr.map(l=>card(l,'../')).join('');
}
