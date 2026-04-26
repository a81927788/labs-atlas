const WEIGHTS={strategic_relevance:.22,technical_capability:.20,operational_support:.16,accreditation_standards:.12,research_output:.12,infrastructure_maturity:.10,international_collaboration:.08};
const LABELS={strategic_relevance:'Strategic Relevance',technical_capability:'Technical Capability',operational_support:'Operational Support',accreditation_standards:'Accreditation Standards',research_output:'Research Output',infrastructure_maturity:'Infrastructure Maturity',international_collaboration:'International Collaboration'};

const COUNTRY_ALIASES={'pakstan':'Pakistan','pakistain':'Pakistan','u.s.':'United States','usa':'United States','united states of america':'United States','uk':'United Kingdom','u.k.':'United Kingdom','great britain':'United Kingdom','ksa':'Saudi Arabia','saudi':'Saudi Arabia'};
function normalizeCountry(c){const raw=(c||'').trim(); const key=raw.toLowerCase(); return COUNTRY_ALIASES[key]||raw;}
function countryMatches(a,b){return normalizeCountry(a)===normalizeCountry(b);}

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
function card(lab){const s=fmt(lab.total_score||score(lab)); const c=normalizeCountry(lab.country); const summary=(lab.summary||'Expert profile pending further validation.').trim(); return `<article class="card lab-card"><div class="card-body"><div class="card-top"><div class="card-title-block"><h3>${lab.name}</h3><p class="institution">${lab.institution||'Institution not specified'}</p></div><div class="score-badge"><span>${s}</span><small>score</small></div></div><p class="card-location">${lab.city?lab.city+' · ':''}<a href="${countryUrl(c)}">${c}</a></p><div class="pill-row"><span class="pill ${tierClass(lab.validation_status)}">${lab.validation_status}</span><span class="pill">${lab.confidence_level||'Unknown'} confidence</span><span class="pill domain-pill" style="--domain:${domainColor(lab)}">${primaryDomain(lab)}</span></div><p class="card-summary">${summary.slice(0,220)}${summary.length>220?'…':''}</p><div class="evidence-line"><div class="bar"><span style="width:${Math.min(100,lab.evidence_coverage||0)}%"></span></div><p class="muted">Evidence coverage: ${lab.evidence_coverage||0}% · Missing criteria: ${lab.missing_criteria_count||0}</p></div></div><div class="card-actions"><a class="button primary" href="${labUrl(lab.id)}">Open profile</a><a class="button" href="compare.html?add=${encodeURIComponent(lab.id)}">Compare</a></div></article>`}
function unique(arr){return [...new Set(arr.filter(Boolean))].sort((a,b)=>a.localeCompare(b));}
