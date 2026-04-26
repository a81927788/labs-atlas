
let labs=[], changelog={};
Promise.all([loadLabs(), fetch('data/dataset_changelog.json').then(r=>r.json()).catch(()=>({}))]).then(([l,c])=>{labs=l; changelog=c; renderAudit(); document.getElementById('auditSearch').addEventListener('input', renderCountryTable);});
function normalizeCountryName(c){return normalizeCountry(c||'Unspecified');}
function renderAudit(){
  const ids=labs.map(l=>l.id); const dupIds=ids.filter((id,i)=>ids.indexOf(id)!==i); const missingCoords=labs.filter(l=>!Array.isArray(l.coordinates)||l.coordinates.length<2||l.coordinates.some(x=>x===0||x===null||Number.isNaN(Number(x))));
  const tier3=labs.filter(l=>l.validation_status==='Tier 3').length; const gapLabs=labs.filter(l=>(l.missing_criteria_count||0)>0).length; const countries=unique(labs.map(l=>normalizeCountryName(l.country))).length;
  document.getElementById('auditStats').innerHTML=[['Total Labs',labs.length],['Countries',countries],['Duplicate IDs',unique(dupIds).length],['Missing Coordinates',missingCoords.length],['Candidate / Tier 3',tier3],['Evidence Gap Labs',gapLabs]].map(x=>`<div class="stat"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('');
  document.getElementById('changelog').innerHTML=`<p><strong>${changelog.version||'v4.2'}</strong> — ${changelog.summary||'Consistency release.'}</p><p>Previous master count: <strong>${changelog.previous_master_count??'—'}</strong></p><p>Current count: <strong>${changelog.current_count??labs.length}</strong></p><p>Restored from prior master: <strong>${(changelog.added_from_v3||[]).length}</strong></p><p>Removed since prior master: <strong>${(changelog.removed_since_v3||[]).length}</strong></p>`;
  document.getElementById('alerts').innerHTML=[
    dupIds.length?`Duplicate IDs found: ${unique(dupIds).join(', ')}`:'No duplicate stable IDs detected.',
    missingCoords.length?`${missingCoords.length} labs need coordinate review.`:'All records have coordinate arrays.',
    gapLabs?`${gapLabs} labs have one or more evidence gaps; this is visible, not hidden.`:'No evidence gaps flagged.',
    labs.some(l=>normalizeCountryName(l.country)==='Pakistan')?'Pakistan records are present in the dataset.':'Pakistan records are missing — restore from master list.'
  ].map(x=>`<p>• ${x}</p>`).join('');
  renderCountryTable(); renderIssues(dupIds, missingCoords);
}
function renderCountryTable(){
  const q=(document.getElementById('auditSearch')?.value||'').toLowerCase(); const by={};
  labs.forEach(l=>{const c=normalizeCountryName(l.country); if(!by[c]) by[c]=[]; by[c].push(l);});
  const rows=Object.entries(by).filter(([c,ls])=>(c+' '+ls.map(l=>l.name).join(' ')).toLowerCase().includes(q)).sort((a,b)=>b[1].length-a[1].length||a[0].localeCompare(b[0]));
  document.getElementById('countryAudit').innerHTML=`<thead><tr><th>Country</th><th>Lab Count</th><th>Tier 1</th><th>Tier 2</th><th>Tier 3</th><th>Examples</th><th>Open</th></tr></thead><tbody>${rows.map(([c,ls])=>`<tr><td><strong>${c}</strong></td><td>${ls.length}</td><td>${ls.filter(l=>l.validation_status==='Tier 1').length}</td><td>${ls.filter(l=>l.validation_status==='Tier 2').length}</td><td>${ls.filter(l=>l.validation_status==='Tier 3').length}</td><td>${ls.slice(0,4).map(l=>`<a href="${labUrl(l.id)}">${l.name}</a>`).join('<br>')}</td><td><a class="button" href="country.html?country=${encodeURIComponent(c)}">Country page</a></td></tr>`).join('')}</tbody>`;
}
function renderIssues(dupIds, missingCoords){
  const rows=[]; unique(dupIds).forEach(id=>rows.push(['Duplicate ID',id,labs.filter(l=>l.id===id).map(l=>l.name).join('; ')]));
  missingCoords.forEach(l=>rows.push(['Missing/weak coordinates',l.id,l.name+' · '+(l.country||'')]));
  labs.filter(l=>(l.missing_criteria_count||0)>=5).slice(0,100).forEach(l=>rows.push(['High evidence gap',l.id,`${l.name} · ${l.missing_criteria_count} missing criteria`]));
  document.getElementById('issueTable').innerHTML=`<thead><tr><th>Issue</th><th>Stable ID</th><th>Details</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join(''):'<tr><td colspan="3">No critical consistency issues detected.</td></tr>'}</tbody>`;
}
