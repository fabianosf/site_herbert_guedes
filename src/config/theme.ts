/**
 * Structural / non-translatable site configuration.
 * All textual copy lives in /src/i18n/locales/*.json.
 */

export type NavKey =
  | 'home'
  | 'members'
  | 'research'
  | 'publications'
  | 'teaching'
  | 'contact';

export type MemberRole = 'coordinator' | 'partner' | 'secretary' | 'postdoc' | 'phd' | 'masters' | 'undergrad';
export type LabKey = 'libtec' | 'lic' | 'libtec-lic' | 'unirio';

export type LabMember = {
  id: string;
  initials: string;
  color: string;
  role: MemberRole;
  lab: LabKey;
  photo?: string;
  lattes?: string;
  project?: string;
};

export const labMembers: LabMember[] = [
  // === PROFESSORES ===
  { id: 'herbert-guedes', initials: 'HG', color: 'from-nebula-violet/40 to-nebula-indigo/40', role: 'coordinator', lab: 'libtec-lic', photo: '/imagens/membros/membro-000.jpg', lattes: 'http://lattes.cnpq.br/7011121250058339' },
  { id: 'alessandra-martins', initials: 'AM', color: 'from-nebula-pink/30 to-nebula-violet/30', role: 'partner', lab: 'unirio', photo: '/imagens/membros/membro-001.jpg', lattes: 'http://lattes.cnpq.br/2680998194805836' },
  { id: 'amanda-lisboa', initials: 'AL', color: 'from-nebula-cyan/25 to-nebula-indigo/25', role: 'secretary', lab: 'libtec-lic', photo: '/imagens/membros/amanda-lisboa.jpg' },
  // === PÓS-DOUTORANDOS ===
  { id: 'luan-cruz', initials: 'LC', color: 'from-nebula-indigo/30 to-nebula-cyan/30', role: 'postdoc', lab: 'libtec', photo: '/imagens/membros/membro-015.jpg', lattes: 'http://lattes.cnpq.br/7725348333995008', project: 'sestrinas-cd8' },
  { id: 'najara-rodrigues', initials: 'NR', color: 'from-nebula-violet/30 to-nebula-pink/30', role: 'postdoc', lab: 'lic', photo: '/imagens/membros/membro-024.jpg', lattes: 'http://lattes.cnpq.br/0800834416709200', project: 'vacina-segunda-geracao' },
  { id: 'gabriane-porcino', initials: 'GP', color: 'from-nebula-pink/30 to-nebula-violet/20', role: 'postdoc', lab: 'lic', photo: '/imagens/membros/membro-032.jpg', lattes: 'http://lattes.cnpq.br/7013877419396917', project: 'mrna-imunoterapia' },
  { id: 'federico-marsili', initials: 'FM', color: 'from-nebula-indigo/25 to-nebula-cyan/20', role: 'postdoc', lab: 'lic', photo: '/imagens/membros/membro-023.jpg', lattes: 'http://lattes.cnpq.br/3914789471745300' },
  { id: 'pollyanna-gomes', initials: 'PG', color: 'from-nebula-violet/35 to-nebula-cyan/25', role: 'postdoc', lab: 'lic', lattes: 'http://lattes.cnpq.br/3104709683877706', project: 'vacina-segunda-geracao-leishmania' },
  // === DOUTORANDOS ===
  { id: 'alice-continentino', initials: 'AC', color: 'from-nebula-violet/25 to-nebula-indigo/25', role: 'phd', lab: 'libtec', photo: '/imagens/membros/membro-009.jpg', lattes: 'http://lattes.cnpq.br/9510804336155596', project: 'exaustao-celulas-t' },
  { id: 'igor-santos', initials: 'IS', color: 'from-nebula-indigo/25 to-nebula-cyan/20', role: 'phd', lab: 'libtec', photo: '/imagens/membros/membro-010.jpg', lattes: 'http://lattes.cnpq.br/0040197202113817', project: 'tcd8-reguladoras' },
  { id: 'hozany-araujo', initials: 'HA', color: 'from-nebula-cyan/25 to-nebula-indigo/20', role: 'phd', lab: 'libtec', photo: '/imagens/membros/membro-011.jpg', lattes: 'http://lattes.cnpq.br/8262311546024370', project: 'tgd-leishmaniose' },
  { id: 'naiara-manhaes', initials: 'NM', color: 'from-nebula-pink/25 to-nebula-violet/20', role: 'phd', lab: 'libtec', photo: '/imagens/membros/membro-012.jpg', lattes: 'http://lattes.cnpq.br/7385638830037568', project: 'exaustao-mieloides' },
  { id: 'douglas-almeida', initials: 'DA', color: 'from-nebula-violet/20 to-nebula-pink/20', role: 'phd', lab: 'libtec', photo: '/imagens/membros/membro-013.jpg', lattes: 'http://lattes.cnpq.br/7234047890292201', project: 'vesiculas-adiposo' },
  { id: 'alisson-rocha', initials: 'AR', color: 'from-nebula-cyan/20 to-nebula-indigo/20', role: 'phd', lab: 'libtec', photo: '/imagens/membros/membro-014.jpg', lattes: 'http://lattes.cnpq.br/3667166927941557', project: 'vacina-atenuada' },
  { id: 'glauber-peixoto', initials: 'GP', color: 'from-nebula-indigo/20 to-nebula-cyan/25', role: 'phd', lab: 'lic', photo: '/imagens/membros/membro-022.jpg', lattes: 'http://lattes.cnpq.br/1921358417037159', project: 'flagelina-intranasal' },
  // === MESTRANDOS ===
  { id: 'thalita-silva', initials: 'TS', color: 'from-nebula-pink/20 to-nebula-violet/20', role: 'masters', lab: 'libtec', photo: '/imagens/membros/membro-006.jpg', lattes: 'http://lattes.cnpq.br/1151571483026073', project: 'sporothrix' },
  { id: 'guilherme-oliveira', initials: 'GO', color: 'from-nebula-indigo/20 to-nebula-violet/20', role: 'masters', lab: 'libtec', photo: '/imagens/membros/membro-007.jpg', lattes: 'http://lattes.cnpq.br/3384449044746404', project: 'nocicepcao-leishmania' },
  { id: 'giuliana-correa', initials: 'GC', color: 'from-nebula-violet/20 to-nebula-pink/20', role: 'masters', lab: 'libtec', photo: '/imagens/membros/membro-008.jpg', lattes: 'http://lattes.cnpq.br/1278064250192201', project: 'vacina-laag' },
  { id: 'vinicius-souza', initials: 'VS', color: 'from-nebula-cyan/20 to-nebula-violet/20', role: 'masters', lab: 'lic', photo: '/imagens/membros/membro-021.jpg', lattes: 'http://lattes.cnpq.br/7718286901377064', project: 'pf429242-leishmania' },
  { id: 'lara-nascimento', initials: 'LN', color: 'from-nebula-pink/20 to-nebula-indigo/20', role: 'masters', lab: 'lic', photo: '/imagens/membros/membro-033.jpg', lattes: 'http://lattes.cnpq.br/4134546580271033', project: 'imunoterapia-agren' },
  // === GRADUANDOS / IC ===
  { id: 'luna-ribeiro', initials: 'LR', color: 'from-nebula-cyan/15 to-nebula-indigo/15', role: 'undergrad', lab: 'libtec', photo: '/imagens/membros/membro-003.jpg', lattes: 'http://lattes.cnpq.br/3314575990992914', project: 'microbiota-leishmania' },
  { id: 'caroline-araujo', initials: 'CA', color: 'from-nebula-violet/15 to-nebula-cyan/15', role: 'undergrad', lab: 'libtec', photo: '/imagens/membros/membro-004.jpg', lattes: 'http://lattes.cnpq.br/6427029781523176', project: 'il22-il23-leishmania' },
  { id: 'camila-fernandez', initials: 'CF', color: 'from-nebula-pink/15 to-nebula-violet/15', role: 'undergrad', lab: 'libtec', photo: '/imagens/membros/membro-005.jpg', lattes: 'http://lattes.cnpq.br/7517244060859336', project: 'vesiculas-leishmaniose' },
  { id: 'brunno-silva', initials: 'BS', color: 'from-nebula-indigo/15 to-nebula-cyan/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-016.jpg', lattes: 'http://lattes.cnpq.br/7117603094554794' },
  { id: 'julia-nascimento', initials: 'JN', color: 'from-nebula-violet/15 to-nebula-pink/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-017.jpg', lattes: 'http://lattes.cnpq.br/0981276186991173', project: 'vacina-leishmaniose' },
  { id: 'joao-duarte', initials: 'JD', color: 'from-nebula-cyan/15 to-nebula-violet/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-018.jpg', lattes: 'http://lattes.cnpq.br/8210663629450208' },
  { id: 'guilhermina-silva', initials: 'GS', color: 'from-nebula-indigo/15 to-nebula-violet/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-019.jpg', lattes: 'http://lattes.cnpq.br/5937714560342103', project: 'marizomib-leishmania' },
  { id: 'vinicius-cordeiro', initials: 'VC', color: 'from-nebula-violet/15 to-nebula-indigo/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-020.jpg', lattes: 'http://lattes.cnpq.br/8479158484553405', project: 'vacina-segunda-geracao' },
  { id: 'maria-luiza-silva', initials: 'ML', color: 'from-nebula-cyan/15 to-nebula-pink/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-025.jpg', lattes: 'http://lattes.cnpq.br/8320101821606963' },
  { id: 'vitoria-pinto', initials: 'VP', color: 'from-nebula-violet/15 to-nebula-cyan/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-026.jpg', lattes: 'http://lattes.cnpq.br/2568381086509940', project: 'vacina-kmp11' },
  { id: 'julia-andrade', initials: 'JA', color: 'from-nebula-pink/15 to-nebula-violet/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-027.jpg', lattes: 'http://lattes.cnpq.br/8384856030582864', project: 'sirna-leishmaniose' },
  { id: 'ana-luiza-pires', initials: 'AP', color: 'from-nebula-indigo/15 to-nebula-violet/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-028.jpg', lattes: 'http://lattes.cnpq.br/9586616566199218', project: 'exaustao-mieloides' },
  { id: 'kaylane-goes', initials: 'KG', color: 'from-nebula-violet/15 to-nebula-pink/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-029.jpg', lattes: 'http://lattes.cnpq.br/3101504850686128', project: 'coinfeccao-exaustao' },
  { id: 'bianca-sa', initials: 'BS', color: 'from-nebula-cyan/15 to-nebula-indigo/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-030.jpg', lattes: 'http://lattes.cnpq.br/5749849805380675', project: 'laag-hamster' },
  { id: 'hanna-ribeiro', initials: 'HR', color: 'from-nebula-indigo/15 to-nebula-violet/15', role: 'undergrad', lab: 'lic', photo: '/imagens/membros/membro-031.jpg', lattes: 'http://lattes.cnpq.br/1039444266392544', project: 'leishmania-infantum' },
];

export type AffiliationLogo = {
  id: string;
  name: string;
  src: string;
  url: string;
};

export const affiliationLogos: AffiliationLogo[] = [
  { id: 'ufrj', name: 'UFRJ', src: '/imagens/logo-ufrj.jpeg', url: 'https://ufrj.br' },
  { id: 'fiocruz', name: 'FIOCRUZ', src: '/imagens/logo-fiocruz.jpeg', url: 'https://fiocruz.br' },
  { id: 'ioc', name: 'IOC', src: '/imagens/logo-ioc.jpeg', url: 'https://ioc.fiocruz.br' },
  { id: 'microbiologia', name: 'Instituto de Microbiologia UFRJ', src: '/imagens/logo-microbiologia-ufrj.jpeg', url: 'https://microbiologia.ufrj.br' },
  { id: 'libtec', name: 'Libtec', src: '/imagens/logo-libtec.jpeg', url: 'https://www.microbiologia.ufrj.br/laboratorio-de-imunobiotecnologia/' },
  { id: 'lic', name: 'LIC', src: '/imagens/logo-lic.jpeg', url: 'https://www.ioc.fiocruz.br/lic' },
  { id: 'inct', name: 'INCT Mucosa e Pele', src: '/imagens/logo-inct.jpeg', url: 'https://inctmucosaepele.org/' },
];

export type SiteConfig = {
  socials: Array<{ label: string; href: string }>;
  nav: Array<{ key: NavKey }>;
  email: string;
  contactEndpoint?: string;
};

export const siteConfig: SiteConfig = {
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'ORCID', href: 'https://orcid.org/' },
    { label: 'Lattes', href: 'http://lattes.cnpq.br/' },
    { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/' },
  ],
  nav: [
    { key: 'home' },
    { key: 'members' },
    { key: 'research' },
    { key: 'publications' },
    { key: 'teaching' },
    { key: 'contact' },
  ],
  email: import.meta.env.VITE_CONTACT_EMAIL ?? 'herbertguedeslab@gmail.com',
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT,
};

export const socialLinks = {
  instagramLibtec: 'https://www.instagram.com/libtec_ufrj/',
  instagramLic: 'https://www.instagram.com/lic_ioc_fiocruz/',
  instagramImUNIRIO: 'https://www.instagram.com/imunirio/',
  instagramGptImunoPrecisao: 'https://www.instagram.com/gptimunoprecisao/',
  emailContato: 'herbertguedeslab@gmail.com',
  emailAlessandra: 'alemfmartins@unirio.br',
};

export const institutionalLinks = {
  libtec: 'https://www.microbiologia.ufrj.br/laboratorio-de-imunobiotecnologia/',
  lic: 'https://www.ioc.fiocruz.br/lic',
  inct: 'https://inctmucosaepele.org/',
};

export type Publication = {
  id: string;
  year: number;
  journal: string;
  doi?: string;
  wos?: string;
};

export const publications: Publication[] = [
  { id: 'pub-2026-01', year: 2026, journal: 'Parasites & Vectors' },
  { id: 'pub-2026-02', year: 2026, journal: 'Frontiers in Immunology' },
  { id: 'pub-2025-01', year: 2025, journal: 'Vaccines', doi: 'https://doi.org/10.3390/vaccines13010129', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:001430671500001' },
  { id: 'pub-2025-02', year: 2025, journal: 'Scientific Reports', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:001605876400035' },
  { id: 'pub-2025-03', year: 2025, journal: 'Frontiers in Immunology' },
  { id: 'pub-2025-04', year: 2025, journal: 'Antimicrobial Agents and Chemotherapy', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:A1972L620200001' },
  { id: 'pub-2025-05', year: 2025, journal: 'Virulence' },
  { id: 'pub-2024-01', year: 2024, journal: 'Journal of Leukocyte Biology', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:001380769900001' },
  { id: 'pub-2024-02', year: 2024, journal: 'Acta Tropica', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:001181305200001' },
  { id: 'pub-2024-03', year: 2024, journal: 'Journal of Extracellular Vesicles', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:001285491600001' },
  { id: 'pub-2023-01', year: 2023, journal: 'Vaccine: X', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:001112106500001' },
  { id: 'pub-2022-01', year: 2022, journal: 'Frontiers in Immunology', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:000826891500001' },
];

export const motionDefaults = {
  durationFast: 0.4,
  durationBase: 0.7,
  durationSlow: 1.2,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  staggerChildren: 0.08,
};
