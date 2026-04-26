const WEIGHTS={strategic_relevance:.22,technical_capability:.20,operational_support:.16,accreditation_standards:.12,research_output:.12,infrastructure_maturity:.10,international_collaboration:.08};
const LABELS={strategic_relevance:'Strategic Relevance',technical_capability:'Technical Capability',operational_support:'Operational Support',accreditation_standards:'Accreditation Standards',research_output:'Research Output',infrastructure_maturity:'Infrastructure Maturity',international_collaboration:'International Collaboration'};
const DOMAIN_COLORS={biological:'#159a5b',chemical:'#c77800',radiological:'#1f78d1',nuclear:'#8645c7','multi-domain':'#2454d6'};
async function loadLabs(){const r=await fetch('data/labs.json');return await r.json();}
function score(lab){return Object.keys(WEIGHTS).reduce((s,k)=>s+(lab.benchmark?.[k]?.score||0)*WEIGHTS[k],0)*20;}
function fmt(n){return Number(n||0).toFixed(1)}
function tierClass(t){return t==='Tier 1'?'tier1':t==='Tier 2'?'tier2':'tier3'}
function confidenceOpacity(c){return c==='High'?.9:c==='Medium'?.62:.36}
function primaryDomain(lab){return lab.primary_domain||['biological','chemical','radiological','nuclear'].find(k=>lab.domain_depth?.[k]==='High')||'multi-domain'}
function domainColor(lab){return DOMAIN_COLORS[primaryDomain(lab)]||DOMAIN_COLORS['multi-domain']}
function labUrl(id){return `lab.html?id=${encodeURIComponent(id)}`}
function countryUrl(country){return `country.html?country=${encodeURIComponent(country||'')}`}
function card(lab){return `<article class="card"><div class="score">${fmt(lab.total_score||score(lab))}</div><h3>${lab.name}</h3><p><strong>${lab.institution||'Institution not specified'}</strong></p><p>${lab.city?lab.city+', ':''}<a href="${countryUrl(lab.country)}">${lab.country}</a></p><div><span class="pill ${tierClass(lab.validation_status)}">${lab.validation_status}</span><span class="pill">${lab.confidence_level} confidence</span><span class="pill">${primaryDomain(lab)}</span></div><p>${(lab.summary||'').slice(0,180)}${(lab.summary||'').length>180?'…':''}</p><div class="bar"><span style="width:${Math.min(100,lab.evidence_coverage||0)}%"></span></div><p class="muted">Evidence coverage: ${lab.evidence_coverage||0}% · Missing criteria: ${lab.missing_criteria_count||0}</p><div class="card-actions"><a class="button" href="${labUrl(lab.id)}">Open profile</a><a class="button" href="compare.html?add=${encodeURIComponent(lab.id)}">Compare</a></div></article>`}
function unique(arr){return [...new Set(arr.filter(Boolean))].sort((a,b)=>a.localeCompare(b));}
