// NusaStat data: every figure below was checked against an official or
// primary source on 26 November 2026 (see the Sources page for the full
// list). Years are the reference year of each figure, never the year the
// page was built. Where two official series disagree (for example the
// World Bank and BPS population counts), the figure used here names its
// source in its note.

export const COUNTRY = {
  name: "Indonesia",
  formalName: "Republic of Indonesia",
  capital: "Jakarta",
  language: "Indonesian (Bahasa Indonesia)",
  currency: "Indonesian rupiah (IDR)",
  landAreaKm2: 1904569,
  provinces: 38,
  dataYear: 2024,
};

// Headline indicators shown on the Overview dashboard.
export const HEADLINES = [
  { id: "population", label: "Population", value: "283.5 million", change: "+0.82% on 2023", year: 2024, source: "World Bank WDI / UN World Population Prospects 2024", note: "Mid-year estimate. BPS projects 284.4 million for mid-2025." },
  { id: "gdp", label: "GDP (nominal)", value: "Rp 22,139 trillion", change: "US$ 1.40 trillion", year: 2024, source: "Statistics Indonesia (BPS), Feb 2025 release", note: "Rp 22,138.96 trillion; US$ 1,396.3 billion (World Bank)." },
  { id: "gdpGrowth", label: "GDP growth", value: "5.03%", change: "Real, year on year", year: 2024, source: "Statistics Indonesia (BPS)", note: "Slightly below 5.05% in 2023. Household consumption grew 4.94%." },
  { id: "gdpPerCapita", label: "GDP per capita", value: "US$ 4,960", change: "Rp 78.62 million", year: 2024, source: "Statistics Indonesia (BPS), Feb 2025 release", note: "World Bank series gives US$ 4,942 on a different exchange-rate basis." },
  { id: "inflation", label: "Inflation (CPI)", value: "1.57%", change: "December, year on year", year: 2024, source: "Statistics Indonesia (BPS), Jan 2025 release", note: "Annual average CPI inflation was 2.18% (World Bank). Inside Bank Indonesia's 1.5–3.5% target band." },
  { id: "unemployment", label: "Open unemployment", value: "4.91%", change: "August, of the labour force", year: 2024, source: "Statistics Indonesia (BPS), Sakernas Aug 2024", note: "7.47 million people unemployed, down from 5.32% in August 2023." },
  { id: "poverty", label: "Poverty rate", value: "8.57%", change: "September", year: 2024, source: "Statistics Indonesia (BPS), Jan 2025 release", note: "24.06 million people; national poverty line Rp 595,242 per person per month." },
  { id: "hdi", label: "Human Development Index", value: "75.02", change: "+0.63 points on 2023", year: 2024, source: "Statistics Indonesia (BPS), Nov 2025 release", note: "High human development (UNDP band 70–80). Life expectancy 74.15 years." },
];

// GDP, nominal (Rp trillion) and real growth (%), 2019–2024. Nominal series:
// IMF International Financial Statistics via FRED (NGDPXDCIDA), matching
// BPS releases. Growth: BPS / World Bank NY.GDP.MKTP.KD.ZG.
export const GDP_SERIES = [
  { year: 2019, nominalRpTn: 15832.7, growth: 5.02, usdBn: 1119.1 },
  { year: 2020, nominalRpTn: 15443.4, growth: -2.07, usdBn: 1059.1 },
  { year: 2021, nominalRpTn: 16976.8, growth: 3.70, usdBn: 1186.5 },
  { year: 2022, nominalRpTn: 19588.5, growth: 5.31, usdBn: 1319.1 },
  { year: 2023, nominalRpTn: 20892.3, growth: 5.05, usdBn: 1371.2 },
  { year: 2024, nominalRpTn: 22139.0, growth: 5.03, usdBn: 1396.3 },
];

// Population, millions, 2019–2024 (World Bank WDI SP.POP.TOTL / UN WPP 2024).
export const POPULATION_SERIES = [
  { year: 2019, total: 272.49 },
  { year: 2020, total: 274.81 },
  { year: 2021, total: 276.76 },
  { year: 2022, total: 278.83 },
  { year: 2023, total: 281.19 },
  { year: 2024, total: 283.49 },
];

// Age structure, 2024 (UN World Population Prospects 2024).
export const AGE_GROUPS = [
  { group: "0–14 years", share: 24.6, note: "About 69.7 million children" },
  { group: "15–64 years", share: 68.1, note: "About 193.1 million of working age" },
  { group: "65+ years", share: 7.3, note: "About 20.7 million older people" },
];
export const MEDIAN_AGE = { value: 31.1, year: 2024, source: "UN World Population Prospects 2024" };

// GDP by sector, share of nominal GDP, 2024 (BPS, via BCA Economics table).
export const SECTORS = [
  { name: "Manufacturing", share: 19.0, valueRpTn: 4202.9, growth: 4.42 },
  { name: "Wholesale & retail trade", share: 13.1, valueRpTn: 2892.7, growth: 4.88 },
  { name: "Agriculture, forestry & fishing", share: 12.6, valueRpTn: 2791.4, growth: 0.53 },
  { name: "Construction", share: 10.1, valueRpTn: 2233.5, growth: 7.04 },
  { name: "Mining & quarrying", share: 9.2, valueRpTn: 2026.6, growth: 4.97 },
  { name: "Transport & storage", share: 6.1, valueRpTn: 1358.1, growth: 8.05 },
  { name: "Information & communication", share: 4.3, valueRpTn: 960.0, growth: 6.78 },
  { name: "Financial & insurance services", share: 4.2, valueRpTn: 922.8, growth: 5.52 },
  { name: "Government administration", share: 3.0, valueRpTn: 673.7, growth: 4.92 },
  { name: "Hotels, restaurants & catering", share: 2.6, valueRpTn: 583.9, growth: 8.69 },
  { name: "Real estate", share: 2.4, valueRpTn: 520.7, growth: 2.48 },
  { name: "Business services", share: 1.9, valueRpTn: 424.2, growth: 9.29 },
  { name: "Electricity & gas", share: 1.0, valueRpTn: 227.5, growth: 4.80 },
  { name: "Water supply & waste", share: 0.1, valueRpTn: 14.3, growth: 1.60 },
  { name: "Other services", share: 10.4, valueRpTn: 2306.7, growth: null },
];

// GDP by expenditure, share of nominal GDP, 2024 (BPS).
export const EXPENDITURE = [
  { name: "Household consumption", share: 54.0, valueRpTn: 11965.4 },
  { name: "Gross fixed capital formation", share: 28.5, valueRpTn: 6310.0 },
  { name: "Government consumption", share: 7.7, valueRpTn: 1711.6 },
  { name: "Exports of goods & services", share: 22.3, valueRpTn: 4939.1 },
  { name: "Imports of goods & services (less)", share: -12.5, valueRpTn: -2787.1 },
];

// CPI inflation, December year-on-year, % (BPS).
export const INFLATION_SERIES = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Trade, 2024 (BPS foreign trade statistics; World Bank merchandise series).
export const TRADE = {
  year: 2024,
  exportsUsdBn: 266.5,
  exportsOilGasUsdBn: 15.9,
  exportsNonOilGasUsdBn: 250.7,
  exportsGrowth: 2.70,
  importsUsdBn: 233.7,
  surplusUsdBn: 32.9,
  topExports: [
    { product: "Mineral fuels and oils", share: 21.0 },
    { product: "Animal and vegetable oils (incl. palm oil)", share: 10.1 },
    { product: "Iron and steel", share: 9.8 },
  ],
};

// Labour market, August 2024 (BPS Sakernas; IZA World of Labour 2026).
export const LABOUR = {
  unemploymentSeries: [
    { year: 2019, rate: 5.28 },
    { year: 2020, rate: 7.07 },
    { year: 2021, rate: 6.49 },
    { year: 2022, rate: 5.86 },
    { year: 2023, rate: 5.32 },
    { year: 2024, rate: 4.91 },
  ],
  employedMillion: 145,
  labourForceParticipation: 71,
  informalShare: 58,
  femaleParticipation: 56.4,
  maleParticipation: 84.2,
  employmentBySector: [
    { sector: "Agriculture, forestry & fishing", share: 28.0 },
    { sector: "Wholesale & retail trade", share: 18.7 },
    { sector: "Manufacturing", share: 13.8 },
    { sector: "Accommodation & food services", share: 8.2 },
    { sector: "Construction", share: 6.7 },
    { sector: "Other services", share: 24.6 },
  ],
};

// Health and human development (BPS HDI releases).
export const HEALTH = {
  lifeExpectancySeries: [
    { year: 2020, value: 73.37 },
    { year: 2021, value: 73.46 },
    { year: 2022, value: 73.70 },
    { year: 2023, value: 73.93 },
    { year: 2024, value: 74.15 },
  ],
  hdiSeries: [
    { year: 2020, value: 72.81 },
    { year: 2021, value: 73.16 },
    { year: 2022, value: 73.77 },
    { year: 2023, value: 74.39 },
    { year: 2024, value: 75.02 },
  ],
  hdiComponents2024: [
    { component: "Life expectancy at birth", value: "74.15 years" },
    { component: "Expected years of schooling", value: "13.21 years" },
    { component: "Adjusted real per-capita expenditure", value: "Rp 12,341,000 / year" },
  ],
  highestHdiProvince: { name: "DKI Jakarta", value: 84.15 },
  lowestHdiProvince: { name: "Highland Papua (Papua Pegunungan)", value: 54.91 },
};

// Education (BPS HDI release; APJII internet survey).
export const EDUCATION = {
  expectedSchoolingSeries: [
    { year: 2020, value: 12.98 },
    { year: 2021, value: 13.08 },
    { year: 2022, value: 13.10 },
    { year: 2023, value: 13.15 },
    { year: 2024, value: 13.21 },
  ],
  internetUsersMillion: 221.56,
  internetPenetration: 79.5,
  internetYear: 2024,
  internetSource: "APJII Internet Penetration Survey 2024",
};

// Provinces, mid-2025 population (BPS, as published in the 2025 provincial
// tables). Area in km2 from BPS provincial tables; density is computed.
export const PROVINCES = [
  { name: "West Java", indonesian: "Jawa Barat", capital: "Bandung", region: "Java", population: 50759000, areaKm2: 37053 },
  { name: "East Java", indonesian: "Jawa Timur", capital: "Surabaya", region: "Java", population: 42089000, areaKm2: 48037 },
  { name: "Central Java", indonesian: "Jawa Tengah", capital: "Semarang", region: "Java", population: 38234000, areaKm2: 34337 },
  { name: "North Sumatra", indonesian: "Sumatera Utara", capital: "Medan", region: "Sumatra", population: 15786000, areaKm2: 72438 },
  { name: "Banten", indonesian: "Banten", capital: "Serang", region: "Java", population: 12145000, areaKm2: 9353 },
  { name: "Jakarta", indonesian: "DKI Jakarta", capital: "Jakarta", region: "Java", population: 10678000, areaKm2: 662 },
  { name: "Lampung", indonesian: "Lampung", capital: "Bandar Lampung", region: "Sumatra", population: 9523000, areaKm2: 33571 },
  { name: "South Sumatra", indonesian: "Sumatera Selatan", capital: "Palembang", region: "Sumatra", population: 8929000, areaKm2: 86772 },
  { name: "Riau", indonesian: "Riau", capital: "Pekanbaru", region: "Sumatra", population: 6811000, areaKm2: 89901 },
  { name: "West Sumatra", indonesian: "Sumatera Barat", capital: "Padang", region: "Sumatra", population: 5914000, areaKm2: 42108 },
  { name: "Aceh", indonesian: "Aceh", capital: "Banda Aceh", region: "Sumatra", population: 5626000, areaKm2: 56835 },
  { name: "South Sulawesi", indonesian: "Sulawesi Selatan", capital: "Makassar", region: "Sulawesi", population: 9563130, areaKm2: 45324 },
];

// Island-group totals, mid-2025 (BPS provincial tables).
export const ISLAND_GROUPS = [
  { group: "Java", population: 158079100, provinces: 6, note: "55.6% of the national population on 7% of the land" },
  { group: "Sumatra", population: 62259500, provinces: 10, note: "21.9% of the national population" },
  { group: "Sulawesi", population: 21044800, provinces: 6, note: "7.4% of the national population" },
  { group: "Kalimantan", population: 17951300, provinces: 5, note: "6.3% of the national population" },
  { group: "Nusa Tenggara", population: 15935000, provinces: 3, note: "5.6% of the national population" },
  { group: "Maluku", population: 3344200, provinces: 2, note: "1.2% of the national population" },
  { group: "Papua", population: 5824500, provinces: 6, note: "2.0% of the national population" },
];

export const NATIONAL_POP_MID2025 = 284438782;

// Sources page: publisher, publication, what it covers.
export const SOURCES = [
  { publisher: "Statistics Indonesia (BPS)", publication: "Economic Growth of Indonesia 2024 (press release, 5 Feb 2025)", covers: "GDP Rp 22,138.96 trillion, growth 5.03%, GDP per capita Rp 78.62 million (US$ 4,960.33)" },
  { publisher: "Statistics Indonesia (BPS)", publication: "Human Development Index 2024 (press release, Nov 2025)", covers: "HDI 75.02, life expectancy 74.15 years, expected schooling 13.21 years, HDI by province" },
  { publisher: "Statistics Indonesia (BPS)", publication: "Poverty profile, September 2024 (press release, Jan 2025)", covers: "Poverty 8.57%, 24.06 million people, poverty line Rp 595,242 per person per month" },
  { publisher: "Statistics Indonesia (BPS)", publication: "Labour Force Situation, August 2024 (Sakernas)", covers: "Open unemployment 4.91%, 7.47 million unemployed; employment by sector" },
  { publisher: "Statistics Indonesia (BPS)", publication: "Consumer Price Index, December 2024 (press release, Jan 2025)", covers: "CPI inflation 1.57% year on year in December 2024" },
  { publisher: "Statistics Indonesia (BPS)", publication: "Foreign Trade Statistics by SITC Code, 2023 and 2024", covers: "Exports US$ 266,529.2 million (oil & gas 15,876.9; non-oil & gas 250,652.3), +2.70% on 2023" },
  { publisher: "Statistics Indonesia (BPS)", publication: "Provincial population tables, mid-2025", covers: "Population of the 38 provinces; Java 158.08 million, Sumatra 62.26 million" },
  { publisher: "World Bank", publication: "World Development Indicators (accessed Nov 2026)", covers: "Population 283,487,931 (2024); GDP US$ 1,396.3 billion (2024); GDP per capita US$ 4,942; CPI inflation average 2.18% (2024); merchandise imports US$ 233.7 billion" },
  { publisher: "United Nations", publication: "World Population Prospects 2024 (medium variant)", covers: "Age structure 2024: 0–14 24.6%, 15–64 68.1%, 65+ 7.3%; median age 31.1 years" },
  { publisher: "International Monetary Fund", publication: "International Financial Statistics (via FRED NGDPXDCIDA)", covers: "Nominal GDP in rupiah 2019–2024: 15,832.7 / 15,443.4 / 16,976.8 / 19,588.5 / 20,892.3 / 22,139.0 trillion" },
  { publisher: "Bank Indonesia", publication: "Monetary Policy Report, Quarter II 2025", covers: "Real GDP growth 2019–2024: 5.02 / −2.07 / 3.70 / 5.31 / 5.05 / 5.03%" },
  { publisher: "APJII", publication: "Indonesia Internet Penetration Survey 2024 (Feb 2024)", covers: "221,563,479 internet users, 79.5% penetration" },
  { publisher: "IZA World of Labour", publication: "The labour market in Indonesia, 2001–2024 (Nov 2026)", covers: "Employment 145 million (2024); labour-force participation 71%; informal share 58%; agriculture 28% of employment, manufacturing 13.8%" },
];

// Latest releases: what a visitor would check first.
export const RELEASES = [
  { date: "5 Nov 2025", title: "Human Development Index 2025: 75.90", detail: "BPS reports HDI up 0.88 points on 2024 (75.02); life expectancy 74.47 years." },
  { date: "5 Feb 2025", title: "GDP grew 5.03% in 2024", detail: "Nominal GDP Rp 22,139 trillion; GDP per capita Rp 78.62 million (US$ 4,960)." },
  { date: "Jan 2025", title: "Poverty fell to 8.57% (Sep 2024)", detail: "24.06 million people below the poverty line of Rp 595,242 per person per month." },
  { date: "Dec 2024", title: "Unemployment 4.91% (Aug 2024)", detail: "Sakernas: 7.47 million unemployed; 145 million people in work." },
  { date: "Jan 2025", title: "Inflation 1.57% in December 2024", detail: "Year-on-year CPI inflation, inside Bank Indonesia's 1.5–3.5% target band." },
  { date: "Feb 2024", title: "221.6 million internet users", detail: "APJII survey: 79.5% of Indonesians used the internet in early 2024." },
];
