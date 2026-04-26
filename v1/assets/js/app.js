
const DATA_URL = location.pathname.includes('/lab/') || location.pathname.includes('/country/') ? '../data/labs.json' : 'data/labs.json';
const META_URL = location.pathname.includes('/lab/') || location.pathname.includes('/country/') ? '../data/metadata.json' : 'data/metadata.json';
const $ = s => document.querySelector(s);
const labLink = id => `lab/index.html?id=${encodeURIComponent(id)}`;
const countryLink = c => `country/index.html?country=${encodeURIComponent(c)}`;
function tagHtml(arr){return (arr||[]).map(x=>`<span class="tag">${x}</span>`).join('')}
function card(lab, rel=''){return `<div class="card"><div class="score">${lab.score}</div><h3>${lab.name}</h3><div class="meta">${lab.institution}<br>${lab.city}, ${lab.country}</div><div class="tags">${tagHtml(lab.domain)}${tagHtml((lab.mission||[]).slice(0,2))}</div><p class="small">${lab.lab_type||''}</p><a class="btn" href="${rel}lab/index.html?id=${encodeURIComponent(lab.id)}">View Lab Profile</a></div>`}
function colorFor(lab){ if((lab.domain||[]).includes('Biological')) return '#69ff8f'; if((lab.domain||[]).includes('Chemical')) return '#ffb84d'; if((lab.domain||[]).includes('Radiological')) return '#00e5ff'; return '#b78cff';}
async function loadLabs(){return await (await fetch(DATA_URL)).json()}
async function loadMeta(){try{return await (await fetch(META_URL)).json()}catch(e){return {}}}
function uniq(a){return [...new Set(a.filter(Boolean))].sort()}
function bar(label,val){let pct=(val||0)*20;return `<div class="kv"><b>${label}</b><div><div class="bar"><i style="width:${pct}%"></i></div><span class="small">${val}/5</span></div></div>`}
async function initHome(){
 const labs=await loadLabs(), meta=await loadMeta();
 $('#labCount').textContent=labs.length; $('#countryCount').textContent=uniq(labs.map(l=>l.country)).length; $('#regionCount').textContent=uniq(labs.map(l=>l.region)).length; $('#avgScore').textContent=Math.round(labs.reduce((a,b)=>a+(b.score||0),0)/labs.length);
 if($('#versionNote')) $('#versionNote').textContent=`${meta.version||'v1'} · ${meta.date||''} · ${meta.status||'Workbook structured dataset'}`;
 const countries=uniq(labs.map(l=>l.country)); $('#countryFilter').innerHTML='<option value="">All countries</option>'+countries.map(c=>`<option>${c}</option>`).join('');
 $('#regionFilter').innerHTML='<option value="">All regions</option>'+uniq(labs.map(l=>l.region)).map(c=>`<option>${c}</option>`).join('');
 const map=L.map('map',{worldCopyJump:true}).setView([22,20],2);
 L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OpenStreetMap &copy; CARTO'}).addTo(map);
 let layer=L.layerGroup().addTo(map);
 function render(){
   const q=$('#q').value.toLowerCase(), cf=$('#countryFilter').value, rf=$('#regionFilter').value, df=$('#domainFilter').value;
   const filtered=labs.filter(l=>(!q || JSON.stringify(l).toLowerCase().includes(q)) && (!cf || l.country===cf) && (!rf || l.region===rf) && (!df || (l.domain||[]).includes(df)));
   layer.clearLayers();
   filtered.forEach(l=>L.circleMarker(l.coordinates,{radius:6,color:colorFor(l),fillColor:colorFor(l),fillOpacity:.75,weight:1}).addTo(layer).bindPopup(`<b>${l.name}</b><br>${l.country}<br>Score: ${l.score}<br><a href="${labLink(l.id)}">Open profile</a>`));
   $('#cards').innerHTML=filtered.slice(0,36).map(l=>card(l,'')).join('');
   $('#resultCount').textContent=filtered.length;
   const grouped={}; filtered.forEach(l=>{grouped[l.country]=(grouped[l.country]||0)+1});
   $('#countries').innerHTML=Object.entries(grouped).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`<a class="pill" href="${countryLink(c)}">${c} · ${n}</a>`).join(' ');
 }
 ['q','countryFilter','regionFilter','domainFilter'].forEach(id=>$('#'+id).addEventListener('input',render));
 render();
}
async function initCountry(){
 const labs=await loadLabs(); const c=new URLSearchParams(location.search).get('country')||labs[0].country;
 const filtered=labs.filter(l=>l.country===c).sort((a,b)=>(b.score||0)-(a.score||0));
 $('#countryTitle').textContent=c; $('#countryMeta').textContent=`${filtered.length} candidate profiles · ${uniq(filtered.flatMap(l=>l.domain||[])).join(', ')}`;
 $('#countryCards').innerHTML=filtered.map(l=>card(l,'../')).join('');
}
async function initLab(){
 const labs=await loadLabs(); const id=new URLSearchParams(location.search).get('id'); const lab=labs.find(l=>l.id===id)||labs[0];
 $('#title').textContent=lab.name; $('#subtitle').textContent=`${lab.institution} · ${lab.city}, ${lab.country}`;
 $('#summary').textContent=(lab.extended_profile&&lab.extended_profile.executive_summary)||lab.summary||'';
 $('#backCountry').href=`../country/index.html?country=${encodeURIComponent(lab.country)}`;
 const facts=[['Institution',lab.institution],['Country',lab.country],['City',lab.city],['Region',lab.region],['Lab type',lab.lab_type],['V1 score',lab.score],['Evidence grade',lab.evidence_grade],['Data status',lab.data_status],['Last updated',lab.last_updated]].map(([k,v])=>`<div class="kv"><b>${k}</b><span>${v||''}</span></div>`).join('');
 $('#facts').innerHTML=facts+`<div class="tags">${tagHtml(lab.domain)}${tagHtml(lab.mission)}</div>`;
 $('#caps').innerHTML=Object.entries(lab.capabilities||{}).map(([k,v])=>`<div class="kv"><b>${k}</b><span>${v}</span></div>`).join('');
 const b=lab.benchmark||{}; $('#bench').innerHTML=[
   bar('Strategic relevance',b.strategic_relevance),bar('Technical capability',b.technical_capability),bar('Accreditation / standards',b.accreditation_standards),bar('Operational support',b.operational_support),bar('Research output',b.research_output),bar('International collaboration',b.international_collaboration),bar('Infrastructure maturity',b.infrastructure_maturity)
 ].join('') + `<h2>Workbook profile</h2><div class="card"><h3>Selection rationale</h3><p class="small">${lab.selection_rationale}</p><h3>Anti / control / defense role</h3><p class="small">${lab.extended_profile?.anti_control_defense_role||''}</p><h3>Calibration / testing role</h3><p class="small">${lab.extended_profile?.calibration_testing_role||''}</p><h3>R&D role</h3><p class="small">${lab.extended_profile?.research_development_role||''}</p><h3>Validation gaps</h3><ul class="small">${(lab.extended_profile?.data_gaps_to_close||[]).map(x=>`<li>${x}</li>`).join('')}</ul><p class="small"><b>Confidence note:</b> ${lab.confidence_note||''}</p></div>`;
 $('#evidence').innerHTML=(lab.evidence||[]).map(e=>`<li><b>${e.type||'source'}:</b> ${e.title||''} ${e.url?`<a href="${e.url}">open</a>`:'<span class="muted">URL pending</span>'}</li>`).join('');
}
