

//------------------------  User ------------------------
export type UserLoginInfo = {
  email: string
  password: string
}

export type Session = {
  accessToken: string
  idToken: string
  expiresIn: number
  tokenType: string
  role?: []
  mandateId?: number | string
  isSocial?: boolean
  roles: string[]
}

export type ClientSession = {
  access_token: string
  id_token: string
  expires_in: number
  token_type: string
  role?: []
  mandateId?: number | string
  isSocial?: boolean
}

export type MandateAuthenticator = MandateList[]

type MandateList = {
  mandateId: string
}

export type ArchiveDetailData = {
  details: string
  contents: InsightContent[]
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
  disclaimer?: string
  video: string
  guests: Guest[]
  downloadLink: string
}

enum UserStatus {
  Active,
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum StartInvestmentTimeFrame {
  ThisMonth = "ThisMonth",
  Next3Months = "Next3Months",
  Next6Months = "Next6Months",
  After1Year = "After1Year",
}

export enum selfClassification {
  ProfessionalInvestor = "ProfessionalInvestor",
  PrivateInvestor = "ProfessionalPrivateInvestor",
  InstitutionalInvestor = "InstitutionalInvestor",
  NoneOfTheAbove = "None",
}


export type User = {
  userId: string
  email: string
  emailVerified: boolean
  picture: string
  nickname: string
  status: UserStatus
  profile: Profile
  name?: string
  mandateId?: string
  isFirstTimeLogin?: boolean
  user_metadata?: {
    phone_number?: string
  }
  roles: string[]
  phoneNumberVerified?: boolean
  contactId?: string
}

export type InvestorSurvey = {
  investMinimumAmount?: string
  whenToStartInvestment?: string
  interestedInvestments?: InterestedInvestments[]
  investmentExperience?: string
  priorInvExperience?: PriorInvestment[]
  otherInterestedInvDetails?: string
  otherPriorDetails?: string
}

export type RelationshipManager = {
  assigned: boolean
  manager?: {
    firstName: string
    lastName: string
    email: string
  }
}

export type ClientRelationshipManager = {
  email?: string
  manager: {
    name: string
    email?: string
  }
}

export type UserStatuses = {
  status: UserQualificationStatus
}

export type Profile = {
  firstName?: string
  lastName?: string
  countryOfResidence?: any
  nationality?: any
  region?: any
  phoneCountryCode?: string
  phoneNumber?: string
  // Note: Added boolean support as a temporary backend workaround.
  // We should look at creating a separate API client specifically for form types on the FE.
  // For example, `/services/client` and `/services/server`.
  isTaxableInUS?: YesOrNo | boolean
  isDefinedSophisticatedByCMA?: YesOrNo | boolean
  isAccreditedByCBB?: YesOrNo | boolean
  relationshipManager?: RelationshipManager
  investorSurvey?: InvestorSurvey
  preProposalInitialAction?: string
  flagName?: string
  selfClassification?: selfClassification
  investmentFlow?: ProfileInvestmentFlow | null
}

export enum ProfileInvestmentFlow {
  Advisory = "Advisory",
  Solutions = "Solutions",
}

export enum PreProposalInitialActionType {
  QualifyToUnlock = "QualifyToUnlock",
  StartInvesting = "StartInvesting",
}

export enum PreProposalInitialAcccessType {
  Opportunities = "Opportunities",
  Proposal = "Proposal",
}

export type Preference = {
  language?: LanguageCode
  selectedProposal?: string
  shareLocationConsent?: boolean | null
}

export type LogActivity = {
  event?: string
  metaData?: string
}

export enum AnnualIncome {
  USD100KTo250K = "100,000 - 250,000",
  USD250KTo500K = "250,000 - 500,000",
  USD500KTo1M = "500,000 - 1,000,000",
  USD1MTo5M = "1,000,000 - 5,000,000",
  USD5MTo10M = "5,000,000 - 10,000,000",
  USDAbove10M = "Above 10,000,000",
}

export enum NetWorth {
  USD500KTo2M = "500,000 - 2,000,000",
  USD2MTo5M = "2,000,000 - 5,000,000",
  USD5MTo10M = "5,000,000 - 10,000,000",
  USD10MTo50M = "10,000,000 - 50,000,000",
  USD50MTo100M = "50,000,000 - 100,000,000",
  USDAbove100M = "Above 100,000,000",
}

export type InvestorProfileGoals = {
  whoIsPortfolioFor?: PortfolioOwner
  whoIsPortfolioForOtherDetails?: string
  investmentGoals?: InvestmentGoal[]
  shouldGenerateIncome?: YesOrNo | Unsure
  investmentDurationInYears?: number
  investmentAmountInUSD?: number | string
  topUpInvestmentAnnually?: YesOrNo
  annualInvestmentTopUpAmountInUSD?: number | string
  excludedAssets?: Asset[]
  additionalPreferences?: AdditionalPreference[]
  investmentGoalsOtherDetails?: string | null
  desiredAnnualIncome?: number
  esgCompliant?: YesOrNo
}

export type MeetingDetails = {
  name: string
  date: string
  time: string
  meetingId: string
}

export enum PortfolioOwner {
  Myself = "Myself",
  ImmediateFamily = "ImmediateFamily",
  FamilyAndFutureGen = "FamilyAndFutureGen",
  Other = "Other",
}

export enum InvestmentGoal {
  Diversify = "Diversify",
  MaintainLifestyle = "MaintainLifestyle",
  BuildGlobalPortfolio = "BuildGlobalPortfolio",
  GrowWealth = "GrowWealth",
  Other = "Other",
}

export type YesOrNo = "yes" | "no"
export type LanguageCode = "DE" | "EN"
export type Unsure = "unsure"

export enum Asset {
  USPrivateEquity = "USPrivateEquity",
  AsianPrivateEquity = "AsianPrivateEquity",
  AsianRealEstate = "AsianRealEstate",
  USRealEstateDebt = "USRealEstateDebt",
  USPrivateCredit = "USPrivateCredit",
  USRealEstate = "USRealEstate",
}

export enum InterestedInvestments {
  PrivateEquity = "PrivateEquity",
  RealEstates = "RealEstates",
  PrivateDebt = "PrivateDebt",
  BondsSukuks = "BondsSukuks",
  Equities = "Equities",
  Other = "Other",
}

export enum PriorInvestment {
  PrivateEquity = "PrivateEquity",
  RealEstates = "RealEstates",
  PrivateDebt = "PrivateDebt",
  BondsSukuks = "BondsSukuks",
  Equities = "Equities",
  Other = "Other",
}

export enum InvestmentExperience {
  LessThanOne = "LessThanOne",
  OneToTwo = "OneToTwo",
  TwoToFive = "TwoToFive",
  FiveToTen = "FiveToTen",
  OverTen = "OverTen",
}

export enum AdditionalPreference {
  Ethical = "Ethical",
  ShariahCompliant = "ShariahCompliant",
  None = "None",
}

export type QuestionAnswer = 1 | 2 | 3 | 4 | 5

export type InvestorRiskAssessment = {
  q1?: QuestionAnswer
  q2?: QuestionAnswer
  q3?: QuestionAnswer
  q4?: QuestionAnswer
  q5?: QuestionAnswer
  q6?: QuestionAnswer
  q7?: QuestionAnswer
  q8?: QuestionAnswer
  q9?: QuestionAnswer
  isConfirmed?: boolean
}

export type QualificationStatus = {
  investorProfile: boolean
  investmentGoals: boolean
  riskAssessment: boolean
}

export type PortfolioSummary = {
  timeHorizon: number
  goal: InvestmentGoal[]
  investmentAmount: number
  riskLevel: RiskScoreDescriptionId
  lastProposalDate: string
}

export type RiskAssessmentScore = {
  data: {
    rawRiskScore: number
    rawResponsivenessScore: number
    adjustedScore: number
    scoreDescription: RiskScoreDescription
    scoreDescriptionId: RiskScoreDescriptionId
    riskScore: number
  }
  message: string
  status: string
}

export enum RiskScoreDescription {
  Conservative = "Conservative",
  ModeratelyConservative = "Moderately Conservative",
  ModeratelyAggressive = "Moderately Aggressive",
  Aggressive = "Aggressive",
  VeryAggressive = "Very Aggressive",
}

export enum RiskScoreDescriptionId {
  Conservative = "conservative",
  ModeratelyConservative = "moderately_conservative",
  ModeratelyAggressive = "moderately_aggressive",
  Aggressive = "aggressive",
}

export type FAQ = {
  id: string
  title: string
  description: string
  sortOrder: number
}

export type MeetingCalendarInput = {
  contact: string
  startDate: string
  endDate: string
  timeZone: string
  availabilityViewInterval: number
}

export type ClientMeetingCalendarInput = {
  contact: string
  startDate: string
  endDate: string
  timeZone: string
  availabilityViewInterval: number
  mandateId: string
}

export enum MeetingSlotStatus {
  Free = "Free",
  Busy = "Busy",
  Tentative = "Tentative",
  Unavailable = "Unavailable",
}

export type MeetingSlot = {
  rawTime?: string
  time: string
  available: boolean
  status: MeetingSlotStatus
  from?: string
  to?: string
}

export type MeetingSchedule = {
  date: string
  hasFreeHour: boolean
  hours: MeetingSlot[]
}

export type MeetingCalendar = {
  schedules: MeetingSchedule[]
}

export type AvailableSchedule = {
  schedules: MeetingSchedule
}

export type ScheduleMeetingInput = {
  contactEmail: string
  subject: string
  content: string
  startTime: string
  endTime: string
  timeZone: string
  location: string
  isOnlineMeeting: boolean
  eventId?: string
}

export type CancelMeetingInput = {
  eventId: string
}

export type MeetingInfo = {
  contactEmail: string
  contactName: string
  subject: string
  content: string
  startTime: Date | string
  endTime: Date | string
  timeZone: string
  location: string
  isOnlineMeeting: Boolean
}

export type ScheduleVideoCallFormInput = {
  timeZone?: string
  availableDate?: string
  availableTimeSlot?: string
  email?: string
}

//------------------------  Dashboard ------------------------

export enum UserQualificationStatus {
  Verified = "VERIFIED",
  Unverified = "UNVERIFIED",
  PendingApproval = "PENDING_APPROVAL",
  Disqualified = "DISQUALIFIED",
  ActivePipeline = "ACTIVE_PIPELINE",
  AlreadyClient = "ALREADY_CLIENT",
}

export type OpportunitySubstance = {
  description: string
}
export type OpportunityOtherInfo = {
  title: string
  substances: OpportunitySubstance[]
}

export type Opportunity = {
  id: string
  title: string
  description: string
  document: string
  country: string
  sector: string
  component: string
  assetClass: string
  image: string
  isShariahCompliant: boolean
  sponsor: string
  expectedExit: string
  expectedReturn: string
  otherInfo?: OpportunityOtherInfo[]
  videoLink?: string
  isNewOpportunity?: boolean
  titleSanitized?: string
  strategy?: AllocationCategory
  isOpportunityClosed: boolean
}

export type OpportunitiesResponse = {
  status: UserQualificationStatus
  opportunities: Opportunity[]
}

export type OpportunityCardVariant = "summary" | "detailed"

//------------------------  Simulator ------------------------

export type SimulatePortfolioInput = {
  investmentAmount: number | string
  timeHorizonInYears: number
  riskTolerance: number
  isShariaCompliant: boolean
}

export type SimulatePortfolioFormInput = {
  investmentAmount: string
  timeHorizonInYears: number
  riskTolerance: number
  isShariaCompliant: boolean
}

export type SimulatedPortfolioYearlyReturn = {
  name: string
  initialInvestment: number
  cumulativeYieldPaidOut: number
  totalValue: number
  portfolioValue: number
  relativeReturn: number
}

export type SimulatedAllocation = {
  spv: string
  categorization: string
  percentage: number
  sampleDeals?: SimulatedSampleDeal[]
  text?: string
  description?: string
}

export type SimulatedPortfolio = {
  roi: number
  averageIncome: number
  expectedYield: number
  expectedReturn: number
  projectedValue: number
  graphData: SimulatedPortfolioYearlyReturn[]
  allocations: SimulatedAllocation[]
}

export type ProposalProgramProps = {
  programName?: string
  minimumAllocation?: number
  maximumAllocation?: number
  description?: string
}
export type SimulatedSampleDeal = {
  title: string
  country: string
  sector: string
  component: string
  assetClass: string
  image: string
  isShariahCompliant: boolean
}

export type SampleDeals = {
  capitalYielding: SimulatedSampleDeal[]
  opportunistic: SimulatedSampleDeal[]
  capitalGrowth: SimulatedSampleDeal[]
  absoluteReturn: SimulatedSampleDeal[]
}

export type ProposalChart = {
  graphData: PortfolioProposal[]
}
export type PortfolioProposal = {
  name: string
  capitalGrowth: number
  capitalYielding: number
  opportunistic: number
  absoluteReturn: number
}

export type MyProposal = {
  type: string
  instanceId: string
  earnings: Earnings[]
  expectedReturn: string
  expectedYield: string
  forecastedVolatility: string
  sharpeRatio: string
  strategies: Strategies
  totalCommitted: string
  transformedStrategiesData?: StrategiesTabularData[]
  graphData: PortfolioProposal[]
}

export type ProposalType = {
  proposalType: string
}

export type ProposalsStatus = {
  status: string
}

export enum ProposalsStatuses {
  Accepted = "Accepted",
  Generated = "Generated",
}

export type Strategies = {
  capitalGrowth: Strategy
  capitalYielding: Strategy
  opportunistic: Strategy
  absoluteReturn: Strategy
  BondVest: Strategy
  GlobalCreditFund: Strategy
}

export type Strategy = {
  deploymentYears: number[]
  percentageAllocation: number
}
export type StrategiesTabularData = {
  years: number[]
  percentageAllocation: number
  name: string
  totalAmount: number
}

export type AcceptProposal = {
  instanceId: string
  selectedProposal: string
}

export type NumberOfSubscribedDeals = {
  [key: string]: string
}

export type ChooseProposal = {
  instanceId?: string
  numberOfSubscribedDeals: NumberOfSubscribedDeals
}

export enum StrategiesType {
  CapitalYielding = "capitalYielding",
  CapitalGrowth = "capitalGrowth",
  Opportunistic = "opportunistic",
  AbsoluteReturn = "absoluteReturn",
  BondVest = "BondVest",
  GlobalCreditFund = "GlobalCreditFund",
}

export enum YOUR_ALLOCATION_DETAIL {
  CAPITAL_GROWTH_DEALS = "CAPITAL_GROWTH_DEALS",
  CAPITAL_YIELD_DEALS = "CAPITAL_YIELD_DEALS",
  CAPITAL_YIELDING = "Capital Yielding",
  CAPITAL_GROWTH = "Capital Growth",
  OPPORTUNISTIC = "Opportunistic",
  ABSOLUTE_RETURN = "Absolute return",
}
export enum PROPOSAL_ASSETCLASS_LIST {
  PRIVATE_EQUITY = "Private Equity",
  PRIVATE_CREDIT = "Private Credit",
  REAL_ESTATE = "Real Estate",
  LEASEBACK = "Leaseback",
}

export type Earnings = {
  capital: number
  income: number
  year: string
  total: number
  cumulativeDistribution: number
  percentage: number
}

export enum RiskTolerance {
  VeryConservative = 1,
  Conservative = 2,
  Balanced = 3,
  Aggressive = 4,
  VeryAggressive = 5,
}

export enum AllocationCategory {
  CapitalYielding = "Capital Yielding",
  CapitalGrowth = "Capital Growth",
  Opportunistic = "Opportunistic",
  AbsoluteReturn = "Absolute Return",
}

export type PortfolioProposalBarChart = {
  name: string
  tfo: number
  euro: number
  nikkei: number
  sp: number
}

export enum MyPortfolioCategory {}

export enum InsightType {
  Article = "Article",
  Webinar = "Webinar",
  Whitepaper = "Whitepaper",
  MarketUpdate = "MarketUpdate",
  QuarterlyReview = "QuarterlyReview",
  ManagementView = "ManagementView",
}

export type Insight = {
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
}

export type Insights = {
  type: InsightType
  insights: Insight[]
}

export type InsightsWithPagination = {
  page: number
  totalCount: number
  data: Insight[]
}

export type InsightContent = {
  title: string
  description: string
}

export type Article = {
  details: string
  contents: InsightContent[]
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
  disclaimer?: string
}

export type Guest = {
  id: string
  name: string
  picture: string
  title: string
  type: string
}

export type Webinar = {
  bannerImage: string
  cardImage: string
  description: string
  estimatedDuration: string
  id: string
  publishDate: string
  title: string
  contents: InsightContent[]
  video: string
  guests: Guest[]
  insightType: InsightType
  disclaimer?: string
}

export type MarketUpdate = {
  details?: string
  contents: InsightContent[]
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
  disclaimer?: string
  downloadLink?: string
}

export type MonthlyMarketUpdate = {
  details: string
  contents: InsightContent[]
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
  disclaimer?: string
  downloadLink?: string
}

export type ManagementView = {
  details: string
  contents: InsightContent[]
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
  video: string
  disclaimer?: string
}

export type UpcomingWebinar = {
  id: string
  title: string
  date: string
  timeZone: string
  language: string
  guests: Guests[]
}

export type PastWebinar = {
  video: string
  guests: Guests[]
  insightType: string
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimationDuration: string
}

export type Guests = {
  id: string
  name: string
  picture: string
  title: string
  type: string
}

export type QuarterlyReview = {
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
  downloadLink: string
  contents: InsightContent[]
  disclaimer?: string
}

export type Whitepaper = {
  insightType: InsightType
  id: string
  title: string
  bannerImage: string
  cardImage: string
  description: string
  publishDate: string
  estimatedDuration: string
  downloadLink: string
  contents: InsightContent[]
  disclaimer?: string
  video?: string
}

export type AllocationPieChartObj = {
  value: number
  allocationCategory: string
}
export type ProposalDealsGridObj = {
  assetClass: string
  assets: ProposalDealsGridAssets[]
}
export type ProposalDealsGridAssets = {
  id?: string
  title?: string
  assetManager?: string
  preferences?: string
  expectedReturn?: string
  description?: string
  document?: string
  targetReturn?: string
  targetYield?: string
  fundTerm?: string
  administrator?: string
  auditor?: string
  assetClass?: string
  shareClasses?: string
  redemptions?: string
  offeringPeriod?: string
  src?: string
  sector?: string
  expectedExit?: string
  country?: string
  sponsor?: string
  image?: string
  isShariahCompliant?: boolean
  assetType?: string
  videoLink?: string
}

export type ValuationType = {
  id: string
  amount: number
  currencyCode: string
  currencyToUsdFxRate: number
  amountInUsd: number
  originCode: string
  valuatedAt: string
  createdAt: string
  updatedAt: string
}

export type TagType = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type RealEstateType = {
  id: string
  type: string
  description: string
  address: string
  countryCode: string
  acquiringCost: number

  currencyCode: string
  currencyToUsdFxRate: number
  acquiringCostInUsd: number

  acquiringDate: string
  ownership: number
}

export type BankAccountType = {
  id: string
  bankName: string
  countryCode: string
  description: string
  accountType: string
  interestRate: number
  ownership: number
  startDate: string
  tenureInYears: number
}

export type AssetType = {
  id: string
  type: string
  owner: string
  name: string
  tags: Array<TagType>
  createdAt: string
  updatedAt: string
  valuations: Array<ValuationType>
  bankAccount?: BankAccountType
  realEstate?: RealEstateType
}

export type LiabilityType = {
  id: string
  type: string
  owner: string
  name: string
  tags: Array<TagType>
  createdAt: string
  updatedAt: string
  valuations: Array<ValuationType>
}

export type PortfolioYieldType = {
  id: string
  owner: string
  name: string
  portfolio_yield_type: string
  currency_code: string
  valuation: number
  usd_valuation: number
  currency_to_usd_fx_rate: number
  origin_code: string
  valuated_at: string
  created_at: string
  updated_at: string
}

export type GettingStartedType = {
  stepNumber: number
  text: string
  isCompleted: boolean
  isActive: boolean
}

export type StatValueType = {
  name: string
  value: number
  icon?: Element
}

export type StatValueWithColorType = StatValueType & {
  color: string
}

export type SimulatedNetWorthStatsType = {
  year: string
  asset: number
  liability: number
}

//----------------------------------------- KYC ---------------------------------------

export type KycStatus = {
  personalInfoCompleted: boolean
  investmentExperienceCompleted: boolean
  identityVerificationCompleted: boolean
  callScheduled: boolean
}

export enum NameTitle {
  Mr = "Mr",
  Mrs = "Mrs",
  Miss = "Ms",
}

export type KycLatestTransactionStatus = {
  status: string
}

export enum KycLatestTransactionStatusActivity {
  IDENT_CREATED = "IDENT_CREATED",
  IDENT_PENDING = "IDENT_PENDING",
  IDENT_IN_REVIEW = "IDENT_IN_REVIEW",
  IDENT_FINISHED = "IDENT_FINISHED",
  FRAUD_SUSPICION = "FRAUD_SUSPICION",
  IDENT_ARCHIVED = "IDENT_ARCHIVED",
  IDENT_DELETED = "IDENT_DELETED",
}

export enum EmploymentActivity {
  Employed = "Employed",
  SelfEmployed = "SelfEmployed",
  Retired = "Retired",
  Unemployed = "Unemployed",
}

export enum PepCheck {
  YesIamPep = "YesAPep",
  YesIamPepRelated = "YesPepRelatedPerson",
  NoIamNotPep = "No",
}

export enum AccountHolderRelationship {
  SpouseOfPep = "SpouseOfPEP",
  SiblingOfPep = "SiblingOfPEP",
  ParentOfPep = "ParentOfPEP",
  ChildOfPep = "ChildOfPEP",
  GrandChildOfPep = "GrandchildOfPEP",
  GrandParentOfPep = "GrandparentOfPEP",
  CloseAssociateOfPep = "CloseAssociateOfPEP",
  Other = "OtherRelationshipWithPEP",
}
export enum EmploymentSector {
  diversifiedConglomerate = "DiversifiedConglomerate",
  education = "Education",
  energyChemicalUtilities = "EnergyChemicalUtilities",
  financialServicesBanking = "FinancialServicesBankingSecurities",
  financialServicesInsurance = "FinancialServicesInsurance",
  financialServicesInvestment = "FinancialServicesInvestment",
  financialServicesOther = "FinancialServicesOther",
  foodAndBeverage = "FoodAndBeverages",
  governmentNational = "GovernmentNational",
  governmentStateLocal = "GovernmentStateLocalOther",
  healthCare = "HealthCareMedicalPharmaBiotech",
  humanHealth = "HumanHealthAndSocialWorkActivities",
  hospitality = "HospitalityEntertainmentLeisure",
  jewels = "JewelsOrPreciousMetal",
  manufacturing = "Manufacturing",
  media = "MediaAdvertisingPR",
  professionalServicesAccounting = "ProfessionalServicesAccounting",
  professionalServicesConsulting = "ProfessionalServicesConsulting",
  professionalServicesLegal = "ProfessionalServicesLegal",
  professionalServicesOther = "ProfessionalServicesOther",
  retail = "Retail",
  technologyHardware = "TechnologyHardwareEquipment",
  technologyOther = "TechnologyOther",
  technologySoftware = "TechnologySoftwareServices",
  telecommunication = "Telecommunications",
  transportationDistribution = "TransportationDistribution",
  transportationShipping = "TransportationShippingAndStorage",
  waterSupply = "WaterSupplySewerageWasteRemediation",
  noneOfTheAbove = "Other",
}

export enum EstimatedNumnberOfEmployees {
  LessThan50 = "E0_50",
  Between50And100 = "E51_100",
  Between100And500 = "E101_500",
  Between500And1000 = "E501_1000",
  Between100And5000 = "E1001_5000",
  Above5000 = "EAbove5000",
}

export enum EstimatedAnnualRevenue {
  Between1000kand5000k = "AR1000000_5000000",
  Between5000kand10000k = "AR5000000_10000000",
  Between10000kand20000k = "AR10000000_20000000",
  Between20000kand50000k = "AR20000000_50000000",
  Between50000kand100000k = "AR50000000_100000000",
  Between100000kand500000k = "AR100000000_500000000",
  Above500000k = "ARAbove500000000",
}

export enum KycAnnualIncome {
  Between100kand250k = "AI100000_250000",
  Between250kand500k = "AI250000_500000",
  Between500kand1000k = "AI500000_1000000",
  Between1000kand5000k = "AI1000000_5000000",
  Between5000kand10000k = "AI5000000_10000000",
  Above10000k = "AI10000000_20000000",
}

export enum KycNetWorth {
  Between500kand2000k = "NW500000_2000000",
  Between2000kand5000k = "NW2000000_5000000",
  Between5000kand10000k = "NW5000000_10000000",
  Between10000kand50000k = "NW10000000_50000000",
  Between50000kand100000k = "NW50000000_100000000",
  Above100000k = "NWAbove100000000",
}

export enum KycSourceOfWealth {
  SalariedEmployeeNoOtherIncome = "SalariedEmployeeNoOtherIncome",
  SalariedEmployeeWithOtherIncome = "SalariedEmployeeWithOtherIncome",
  CompanyDirectorCEOPresident = "CompanyDirectorCEOPresident",
  ClientLivingOffAccumulatedWealth = "ClientLivingOffAccumulatedWealth",
  FamilyTrustIncome = "FamilyTrustIncome",
  Gift = "Gift",
  Inheritance = "Inheritance",
  PetroleumProductsProductionTrading = "ProductionAndwholesaleTradingOfPetroleumProducts",
  TradingOfArtCollections = "TradingOfArtCollections",
  PaymentInstitutionsAndElectronicMoneyInstitutions = "PaymentInstitutionsAndElectronicMoneyInstitutions",
  PawnShops = "PawnShops",
  NonProfitOrganizations = "NonProfitOrganizations",
  RealEstateBusiness = "RealEstateBusiness",
  Charities = "Charities",
  Other = "Other",
}

export enum KycSourceOfFunds {
  SalaryOrBonus = "SalaryOrBonus",
  Savings = "Savings",
  Inheritance = "Inheritance",
  Gift = "Gift",
  SaleOfProperty = "SaleOfProperty",
  SaleOfBusiness = "SaleOfBusiness",
  SaleOfAssets = "SaleOfAssets",
  InvestmentIncome = "InvestmentIncome",
  Pension = "Pension",
  Other = "Other",
}

export type KycPersonalInformation = {
  isAbsher?: boolean
  title?: NameTitle
  firstName?: string
  middleName?: string
  lastName?: string
  gender?: Gender
  birthMonthYear?: string
  dateOfBirth?: Date
  countryOfBirth?: string
  placeOfBirth?: string
  nationality?: string
  otherNationality?: string
  address1?: KycPersonalInformationAddress
  hasResidenceAddressOutsideSaudiArabia?: boolean | YesOrNo
  address2?: KycPersonalInformationAddress
  nationalIdNumber?: string
  passportNumber?: string
  documentType?: documentType | string
  employmentActivity?: EmploymentActivity
  employmentDetails?: KycPersonalInformationEmploymentDetails
  employerDetails?: KycPersonalInformationEmployerDetails | null
  companyDetails?: KycPersonalInformationCompanyDetails
  incomeDetails?: KycPersonalInformationIncomeDetails
  taxInformation?: KycPersonalInformationTaxInformation
  reasonablenessCheck?: KycReasonablenessCheck
  pepCheck?: KycPersonalInformationPepCheck
}

export type KycAbsherCitizenInfo = {
  dateOfBirthH: Date | string
  englishFirstName: string
  englishLastName: string
  englishSecondName: string
  englishThirdName: string
  familyName: string
  fatherName: string
  firstName: string
  gender: string
  grandFatherName: string
  idExpiryDate: string
  idIssueDate: string
  occupationCode: string
  placeOfBirth: string
  socialStatusDesc: string
  dateOfBirth: string
  additionalNumber: string
  buildingNumber: string
  city: string
  district: string
  primaryAddress: boolean
  locationCoordinates: string
  postCode: string
  streetName: string
  unitNumber: string
  passportNumber: string
  passportExpiryDateG: string
  passportIssueCountry: string
}

export type KycPersonalInformationAddress = {
  buildingNumber?: string
  address?: string
  streetName?: string
  district?: string
  city?: string
  postcode?: string
  country?: string
  sameMailingAddress?: boolean
}

export type KycPersonalInformationEmploymentDetails = {
  employmentSector?: EmploymentSector
  yearsOfProfessionalExperience?: number | null
  jobTitle?: string
  areYouDirectorOfListedCompany?: boolean | YesOrNo | null
  sectorOfLastEmployment?: EmploymentSector
  lastJobTitleHeld?: string
}

export type KycPersonalInformationEmployerDetails = {
  country?: string
  nameOfCompany?: string
  buildingNumber?: string
  streetName?: string
  address?: string
  district?: string
  city?: string
  postcode?: string
  phoneNumber?: string
  phoneCountryCode?: string
  estimatedNumberOfEmployees?: EstimatedNumnberOfEmployees
  estimatedAnnualRevenue?: EstimatedAnnualRevenue
  isEmployeeKsa?: boolean
}

export type KycPersonalInformationCompanyDetails = {
  country?: string
  nameOfCompany?: string
  buildingNumber?: string
  streetName?: string
  address?: string
  district?: string
  city?: string
  postcode?: string
  phoneNumber?: string
  estimatedNumberOfEmployees?: string
  estimatedAnnualRevenue?: string
}

export type KycPersonalInformationIncomeDetails = {
  annualIncome?: string
  netWorth?: string
  sourceOfWealth?: string[]
  sourceOfFunds?: string[]
  sourceOfFundsOtherText?: string
}

export enum NoTinReason {
  CountryNotIssueTin = "CountryNotIssueTin",
  UnableToObtainTin = "UnableToObtainTin",
  NoTinRequired = "NoTinRequired",
}

export type TinInformation = {
  countriesOfTaxResidency?: string
  globalTaxIdentificationNumber?: string
  haveNoTin?: boolean
  reasonForNoTin?: NoTinReason
  reasonForNoTinExplanation?: string
}

export type KycPersonalInformationTaxInformation = {
  locationOfMainTaxDomicile?: string
  taxableInUSA?: boolean | YesOrNo
  tinInformation?: TinInformation[]
  taxableReasonType?: string
  taxableReason?: string
}

export enum OptionForTaxableInUSA {
  USAResident = "USAResident",
  USACitizen = "USACitizen",
  GreenCardHolder = "GreenCardHolder",
  SubstantialPresenceTest = "SubstantialPresenceTest",
  Other = "Other",
}

export type KycInvestmentExperience = {
  wealth: {
    cash?: number
    bonds?: number
    stockEquities?: number
    hedgeFunds?: number
    privateEquity?: number
    realEstate?: number
    other?: number
  }
  holdConcentratedPosition: string
  concentratedPositionDetails: string
  receivedInvestmentAdvisory: string
  investmentInFinancialInstruments: string
  financialTransactions: string[]
}

export enum AddressNotMatchTaxResidence {
  AddressNotMatchTaxResidence1 = "IAmAForeigner",
  AddressNotMatchTaxResidence2 = "IOnlyRecentlyMovedToTheCurrentResidentialAddress",
  AddressNotMatchTaxResidence3 = "IAmTemporarilyPostedOverseasForWork",
  AddressNotMatchTaxResidence4 = "TheResidentialAddressBelongsToMySpouseAndParents",
  AddressNotMatchTaxResidence5 = "Others",
}

export enum PhoneNumberNotMatchTaxResidence {
  PhoneNumberNotMatchTaxResidence1 = "CurrentlyWorkingAndstudyingAndresidingOverseas",
  PhoneNumberNotMatchTaxResidence2 = "OthersPleaseElaborate",
}
export enum NationalityNotMatchTaxResidence {
  NationalityNotMatchTaxResidence1 = "MyCountryOfCitizenshipDoesNotHaveTaxationLaws",
  NationalityNotMatchTaxResidence2 = "ResidentResidingAndOrWorkingInBahrain",
  NationalityNotMatchTaxResidence3 = "ResidingAndWorkingOverseasAndATaxResidentOfWhereICurrentlyResideAndWork",
  NationalityNotMatchTaxResidence4 = "OthersPleaseElaborate",
}
export enum MailingAddressNotMatchTaxResidence {
  MailingAddressNotMatchTaxResidence1 = "TheMailingAdrressBelongsToParentSpouseSiblingChild",
  MailingAddressNotMatchTaxResidence2 = "IAmCurrentlyWorkingStudyingOverseas",
  MailingAddressNotMatchTaxResidence3 = "IAmCurrentlyStayingWithMyFriendSpouseOther",
  MailingAddressNotMatchTaxResidence4 = "TheMailingAdrressBelongsToARentedDwellingThatIAmStaying",
  MailingAddressNotMatchTaxResidence5 = "TheMailingAdrressIsCOAdrressToMyBankingRepresentative",
  MailingAddressNotMatchTaxResidence6 = "Other",
}

export type KycReasonablenessCheck = {
  addressNotMatchTaxResidence?: {
    isValid?: boolean
    checkValue?: AddressNotMatchTaxResidence
    otherText?: string
  }
  phoneNumberNotMatchTaxResidence?: {
    isValid?: boolean
    checkValue?: PhoneNumberNotMatchTaxResidence
    otherText?: string
  }
  nationalityNotMatchTaxResidence?: {
    isValid?: boolean
    checkValue?: NationalityNotMatchTaxResidence
    otherText?: string
  }
  mailingAddressNotMatchTaxResidence?: {
    isValid?: boolean
    checkValue?: MailingAddressNotMatchTaxResidence
    otherText?: string
  }
}

export type KycPersonalInformationPepCheck = {
  optionValue?: PepCheck | string
  dateOfAppointment?: Date | undefined
  fullLegalName?: string
  accountHolderRelationship?: AccountHolderRelationship
  jurisdiction?: string
}

export type KycDocument = {
  FileName: string
  Content: string
}

export type KycUploadDocumentsRequest = {
  userIdentity: string
  documents: KycDocument[]
}

export type KycValidateOtpResponse = {
  token: string | null
  tokenExpiry: number
  message?: string
}

export type KycSendOtpResponse = {
  otpExpiry: number
  message?: string
}

export type KycCreateIdentEsignResponse = {
  identId: string
  transactionId: string
}

export enum KycDocumentTypes {
  PassportFront = "PassportFront",
  PassportSignature = "PassportSignature",
  NationalIdFront = "NationalIdFront",
  NationalIdBack = "NationalIdBack",
  LivePhoto = "LivePhoto",
}

export type KycSubmitDocumentRequest = {
  type: KycDocumentTypes
  base64Image: string
}

export type KycDocumentVerificationStatus = {
  passportFront: boolean
  passportFrontFileName: string
  passportSignature: boolean
  passportSignatureFileName: string
  nationalIdFront: boolean
  nationalIdFrontFileName: string
  nationalIdBack: boolean
  nationalIdBackFileName: string
  livePhoto: boolean
  livePhotoFileName: string
}

export type Disclaimer = {
  disclaimerAccepted?: boolean
  disclaimerUpdatedOn?: string
}

export type DisclaimerResponse = {
  message?: string
  success?: boolean
}

export type KycHybridFlowFlag = {
  isHybridFlow?: boolean
}

export type KycOnboardingId = number

//------------------------------------------------------------------------------------
export type media = {
  url: string
  type: string
  thumbnail: string
  url_ar: string
  thumbnail_ar: string
}

type breakdown = {
  title: string
  value: string
  titleAr: string
  valueAr: string
}

type text = {
  type: string
  value: string
  valueAr: string
}

type info = {
  title: string
  titleAr: string
  text: text[]
}

type gallery = {
  url: string
  type: string
  thumbnail: string
  url_ar: string
  thumbnail_ar: string
}

type nativeDeal = {
  location: string
  about: string
  message: string
  disclaimer: string
  locationAr: string
  aboutAr: string
  messageAr: string
  disclaimerAr: string
  breakdown: breakdown[]
  info: info[]
  gallery: gallery[]
}

export type clientOpportunities = {
  clientOpportunityId: number
  opportunityId: number
  opportunityName: string
  media: media[]
  pdfUrl: string
  sponsor: string
  assetClass: string
  assetClassAr: string
  sector: string
  sectorAr: string
  expectedExitYear: string
  expectedReturn: string
  countryImageUrl: string
  country: string
  countryAr: string
  isInterested: string
  isSeen: boolean
  isScheduled: boolean
  isValid: boolean
  isShariah: boolean
  closingDate: string
  startDate: string
  nativeDeal: nativeDeal
  minimumAmount: number
  maximumAmount: number
  isProgram: boolean
  isAddedToCart: boolean
  isInvested: boolean
  associatedConventionalDealId: number
}

export type clientOpportunitiesArray = clientOpportunities[]

export type PeriodicPerformance = {
  period: {
    month: number
    year: number
  }
  netChange: number
  additionsOrWithdrawels: number
  performance: number
  cumulativePerformancePercent: number
  cumulativePerformanceValue: number
}

export type PerformancePercentChange = {
  timeperiod: {
    month: number
    year: number
  }
  change: number
}
export interface PerformanceCumulativeChange {
  timeperiod: {
    toDate: string
  }
  change: number
}

export type PerformanceDataForPeriods = {
  timeperiod: {
    year: number
    quarter: number
    toDate: string
  }
  valuationProgress: number
  additions: number
  annualizedPerformance: number
  valueStart: number
  valueEnd: number
  netChangePercent: {
    percent: number
    direction: string
  }
  netChangeValue: {
    money: number
    direction: string
  }
  itdIlliquidPerformance: {
    percent: number
    direction: string
  }
  annualizedIlliquidPerformance: {
    percent: number
    direction: string
  }
  last12MonthsValue: {
    percent: number
    direction: string
  }
  itdAnnualizedPercent: {
    percent: number
    direction: string
  }
  itdAnnualizedPercentPerAnnum: number
  liquidValue: {
    percent: number
    direction: string
  }
  liquidValuePerAnnum: number
  illiquidValue: {
    percent: number
    direction: string
  }
  illiquidValuePerAnnum: number
  avgHoldingPeriod: number
  illiquidVintage: {
    percent: number
    direction: string
  }
  illiquidVintagePerAnnum: number
  sharpeRatio: number
  riskVolatility: number
  cumulativePerformanceStart: {
    timeperiod: {
      year: number
      quarter: number
    }
    value: number
  }
  periodicPerformance: PeriodicPerformance[]
  chartPerformance: {
    start: {
      month: number
      year: number
    }
    end: {
      month: number
      year: number
    }
    percentChanges: PerformancePercentChange[]
    cumulativeChanges: PerformanceCumulativeChange[]
  }
}

export type PerformanceDetails = {
  inception: {
    year: number
    quarter: number
  }
  dataForPeriods: PerformanceDataForPeriods[]
}

export type AccountSummariesHoldings = {
  illiquid: number
  liquid: number
  cash: number
  cashInTransit: number
  percentages: {
    type: string
    percent: number
  }[]
}

export type AccountSummaries = {
  profitLoss?: {
    money: number
    direction: string
  }
  accountCreationDate?: string
  cashflowChartValuesCapitalCall?: []
  lastValuationDate?: string
  totalValue?: number
  ytdGrowth?: {
    percent: number
    direction: string
  }
  itdGrowth?: {
    percent: number
    direction: string
  }
  annualizedGrowth?: {
    percent: number
    direction: string
  }
  irrGrowth?: {
    percent: number
    direction: string
  }
  mwrGrowth?: {
    percent: number
    direction: string
  }
  holdings?: AccountSummariesHoldings
  marketSpectrumData?: {
    start: {
      value: number
      date: string
    }
    end: {
      value: number
      date: string
    }
  }
  performanceChartValues?: number[]
  deals?: number
  commitments?: number
  cashFlowProjections?: number
  accountStage?: number
  cashflowChartValues?: number[]
  profitLossChartValues?: number[]
  commitmentChartValues?: number[]
  totalCommitmentsStartAndEndDate?: {}
}

export type PerformanceMetrixProps = {
  metricsData: {
    totalAumValue: number
    ytdGrowth: { percent: number; direction: string }
    itdGrowth: { percent: number; direction: string }
    annualizedGrowth: { percent: number; direction: string }
    irrGrowth: { percent: number; direction: string }
    netChangeValue: {
      percent?: number
      direction?: string
      money: number
    }
  }
}

export type Deals = {
  inception: {
    year: number
    quarter: number
  }
  lastValuation: {
    year: number
    quarter: number
  }
  timePeriods: {
    timeperiod: {
      year: number
      quarter: number
    }
    valuationProgress: number
    holdings: {
      illiquid: number
      liquid: number
      cash: number
      cashInTransit: number
      percentages: {
        type: string
        percent: number
      }[]
    }
    amounts: {
      alt: number
      cash: number
      fixedIncome: number
      otherIlliquid: number
      privateEquity: number
      realEstate: number
      yielding: number
      equities: number
      others: number
    }
    deals: {
      id: number
      name: string
      portfolioSize: number
      type: string
      region: string
      age: number
      industry: {
        key: string
        langCode: string
        value: string
      }[]
      investmentVehicle: string
      distributionAmount: number
      marketValue: number
      bookValue: number
      performance: {
        percent: number
        direction: string
      }
      holdingPeriod: number
      initialInvestmentDate: string
      priceDate: string
      sponsorOrPartner: string
      strategy: string
      brochure: {
        address: string
        description: string
        largeImageURL: string
        smallImage1URL: string
        smallImage2URL: string
      }
    }[]
    regionPercentage: {
      perNorthAmerica: number
      perAsia: number
      perEurope: number
      perGlobal: number
    }[]
  }[]
  totalDeal: number
}

export type ProfitLoss = {
  timeperiod: {
    year?: number
    quarter?: number
    toDate: string
  }
  summary: Summary
  results: ProfitLossResults[]
}

export type ProfitLossResults = {
  holdingType: string
  totalChange: {
    value: {
      money: number
      direction: string
    }
    percentChange: {
      percent: number
      direction: string
    }
  }
  results: ProfitLossHoldingResults[]
}

export type ProfitLossHoldingResults = {
  result: string
  value: {
    money: number
    direction: string
  }
  percentChange: {
    percent: number
    direction: string
  }
}

export type Summary = {
  totalChange: {
    value: {
      money: number
      direction: string
    }
    percentChange: {
      percent: number
      direction: string
    }
  }
  results: ProfitLossSummaryResult[]
}

export type ProfitLossSummaryResult = {
  result: string
  value: {
    money: number
    direction: string
  }
  percentChange: {
    percent: number
    direction: string
  }
}

export type ProfitLossDetails = {
  profitLoss: ProfitLoss[]
}

export type DistributionCapital = {
  distributionDate: string
  clientId: string
  capitalGain: number
  incomeDistribution: number
}[]
export type RecentDealActivities = {
  month: string | number
  recentFunding: number
  moneyInvested: number
  distribution: {
    capitalGain: number
    incomeDistribution: number
  }
}[]

export enum RecentActivitiesMonths {
  Last3Months = "LastThreeMonths",
  Last6Months = "LastSixMonths",
}

export type crrRoot = {
  success: boolean
  finalData: {
    metaData: {
      mandateId: string
      reconciliationDate: string
      portfolioType: string
      jsonFileCreatedDate: string
      classification: string
    }
    targetAssetAllocation: {
      liquid: {
        data: Array<{
          targetAssetAllocationPercent: number
          currentAssetAllocationPercent: number
          deviation: number
          subStrategy: string
          strategy: string
        }>
        strategyPerc: number
        liquidPercentage: number
      }
      illiquid: {
        data: Array<{
          targetAssetAllocationPercent: number
          currentAssetAllocationPercent: number
          deviation: number
          subStrategy: string
          strategy: string
        }>
        strategyPerc: number
        illiquidPercentage: number
      }
    }
    assetAllocationOverYears: {
      assetClassValues: Array<{
        type: string
        years: Array<number>
        values: Array<number>
      }>
      years: Array<number>
      liquidAtBeginning: number
      illiquidAtBeginning: number
      illiquidAfterCommitments: number
      liquidAfterCommitments: number
    }
    detailedPerformance: {
      totalReturnPercentage: number
      totalReturnAmount: number
      annualizedReturnPercentage: number
      liquidPercentage: number
      illiquidPercentage: number
      liquidPercentagePerAnnum: number
      illiquidPercentagePerAnnum: number
      illiquidVintagePercentage: number
      illiquidVintagePerAnnum: number
      sharpeRatio: number
      riskVoaltility: number
    }
    overallPerformance: {
      performanceValues: Array<{
        name: string
        values: Array<number>
      }>
      years: Array<number>
    }
    maximumDrawDown: {
      illiquidMaximumDrawdown: number
      msciWorldIndexDrawdown: number
    }
  }
  isSourceExists: boolean
  nonAA: boolean
}

export type synthesiaVideoRoot = {
  success: boolean
  url: {
    url: string
    isSourceExists: boolean
  }
}

export type PerformanceQuarterDealsRoot = {
  timeperiod: {
    year: number
    quarter: number
  }
  valuationProgress: number
  holdings: {
    illiquid: number
    liquid: number
    cash: number
    cashInTransit: number
    percentages: Array<{
      type: string
      percent: number
    }>
  }
  amounts: {
    alt: string | null
    cash: string | null
    fixedIncome: string | null
    otherIlliquid: string | null
    privateEquity: string | null
    realEstate: string | null
    yielding: string | null
    equities: string | null
    others: string | null
  }
  deals: Array<{
    id: number
    name: string
    portfolioSize: number
    type: string
    region: string
    age: number
    industry: Array<{
      key: string
      langCode: string
      value: string
    }>
    investmentVehicle: string
    distributionAmount: number
    marketValue: number
    bookValue: number
    performance: {
      percent: number
      direction: string
    }
    holdingPeriod: number
    initialInvestmentDate: string
    priceDate?: string | null
    sponsorOrPartner: string
    strategy: string
    brochure: {
      address: string
      description: string
      largeImageURL?: string | null
      smallImage1URL?: string | null
      smallImage2URL?: string | null
    }
  }>
  totalDeal: string | null
  regionPercentage: string | null
}
export type AllMarket = {
  title: string
  badText: string
  goodText: string
  spectrum: {
    start: {
      value: number
      date: string
    }
    end: {
      value: number
      date: string
    }
  }
  description: string
}

export type MarketIndicator = {
  summaryTitle: string
  summaryText: string
  allMarkets: AllMarket[]
}

export type Cashflows = {
  ytdDistributionProjection: number
  itdDistributionProjection: number
  ytdCapitalCallProjection: number
  itdCapitalCallProjection: number
  distributionFirstValuation: {
    year: number
    quarter: number
  }
  distributionPerTimePeriod: Array<{
    timeperiod: {
      toDate?: string
      year?: number
      quarter?: number
    }
    totalDistributions: number
    deals: Array<{
      date: string
      investmentVehicle: string
      name: string
      distribution: number
    }>
  }>
  projectionForQuarters: Array<{
    timeperiod: {
      year: number
      quarter: number
    }
    projection: {
      net: number
      capitalCall: number
      capitalDistribution: number
      totalDistribution: number
      incomeDistribution: number
    }
  }>
  projectionForYears: Array<{
    timeperiod: {
      year: number
      quarter: number
    }
    projection: {
      net: number
      capitalCall: number
      capitalDistribution: number
      totalDistribution: number
      incomeDistribution: number
    }
  }>
}

export type PopupDetailRoot = {
  popupDetails: PopupDetail[]
}

export interface PopupDetail {
  popupId: number
  popupName: string
  flag: boolean
}

export type clientOpportunitiesPayload = opportunitiesPayloadObj[]

export type opportunitiesPayloadObj = {
  clientOpportunityId: number
  opportunityId: number
  isInterested: string
  isScheduled: boolean
  isSeen: boolean
  isAddedToCart?: boolean
}

export type RedemptionFundRoot = {
  redemptionFunds: RedemptionFund[]
}

export type RedemptionFund = {
  date: string
  fundName: string
  balance: number
}

export type RedeemDetailsPayload = {
  fundName: string
  reson: string
  redemptionAmount: number
  remainingAmount: number
}

export type RedeemDetailsRoot = {
  redemptionSavedClientAppDB: RedemptionSavedClientAppDb
}

export type RedemptionSavedClientAppDb = {
  id: number
  clientId: number
  assetName: string
  redemptionAmount: number
  remainingBalance: number
  reason: string
}
export type Commitment = {
  id: number
  managedVehicle: string
  deployed: number
  committed: number
  called: number
  uncalled: number
  portfolioWeight: number
  strategy: string
  lastCommitment: string
  holdingType: string
}

export type TotalCommitments = {
  timeperiod: {
    toDate: string
  }
  lastValuation: {
    year: number
    month: number
  }
  totalCommitted: number
  totalUncalled: number
  commitments: Commitment[]
}

export type InvestmentCart = {
  investmentCartDeals: InvestmentCartDeal[]
}
export type InvestmentCartDeal = {
  dealId: number
  dealName: string
  isInvestmentPreferenceShariah: boolean
  isProgram: boolean
  associatedConventionalDealId?: number
}

export type CommitmentDealsTimePeriod = {
  timeperiod: {
    year: number
    quarter: number
  }
  valuationProgress: number
  holdings: {
    illiquid: number
    liquid: number
    cash: number
    cashInTransit: number
    percentages: {
      type: string
      percent: number
    }[]
  }
  deals: CommitmentDeal[]
}

export type CommitmentDeal = {
  id: number
  name: string
  portfolioSize: number
  type: string
  region: string
  age: number
  industry: {
    key: string
    langCode: string
    value: string
  }[]
  investmentVehicle: string
  distributionAmount: number
  marketValue: number
  bookValue: number
  performance: {
    percent: number
    direction: string
  }
  holdingPeriod: number
  initialInvestmentDate: string
  sponsorOrPartner: string
  strategy: string
  brochure: {
    address: string
    description: string
  }
}

export type CommitmentRelatedDeals = {
  inception: {
    year: number
    quarter: number
  }
  lastValuation: {
    year: number
    quarter: number
  }
  timePeriods: CommitmentDealsTimePeriod[]
}

export type ProgramDeals = {
  programName: string
  programId: number
  deals: DealsDetail[]
}[]

export type DealsDetail = {
  dealName: string
  dealId: number
  unplacedAmount: number
  defaultSelection: boolean
  sponsor: string
  assetClass: string
  assetClassAr: string
  sector: string
  sectorAr: string
  expectedExitYear: string
  expectedReturn: string
  country: string
  countryAr: string
  moreInfo: {
    title: string
    value: string
  }[]
  isShariah: number
}

export type ProgramsDetailsPayload = ProgramsPayload[]
export type ProgramsPayload = {
  concentration: number
  programId: number
  subscriptionAmount: string
  isInvestmentPreferenceShariah: boolean
  associatedConventionalProgramId: number
}

export type DocCenterParams = {
  action: string
  opportunityId?: number
  fileName?: string
  folderName?: string
}

export type MultipleDocsDownloadParams = {
  action: string
  fileName?: string[]
  folderName?: string
}

export type DownloadDealSheetRes = {
  success: boolean
  url: string
  isBlobExists: boolean
}

export type DocCenterList = {
  success: boolean
  data: DocCenterListObj[]
}

export type DocCenterListObj = {
  name: string
  filecounts: number
  contentType: string
}

export type ReportAndVideoList = {
  success: boolean
  data: ReportAndVideoObj[]
  pageTotal: number
}

export type ReportAndVideoObj = {
  name: string
  date: string
  contentType: string
  size: string
  length: string
  fileWithPrefix: string
  checked: boolean
  type: string
}

export type DownloadDocs = {
  action: string
  success: boolean
  url?: string
}

export type SubscriptionSavedClientAppDb = {
  subscriptionSavedClientAppDB: SubscriptionSavedClientAppDbObj[]
}

export type SubscriptionSavedClientAppDbObj = {
  id: number
  clientId: number
  dealId: number
  dealName: string
  totalInvestmentAmount: number
  investmentAmount?: number
  isProgram: boolean
  indermediateInvestmentAmount?: number
  concentration?: number
  isPrefund?: boolean
  isShariahSelected?: boolean
  isInvestmentPreferenceShariah?: boolean
  subscriptionProgramDealDTOList: {
    id: number
    clientId: number
    dealName: string
    investmentAmount: number
    programDealId: number
  }[]
}

export type SubscriptionSavedClientAppDbPayload = {
  subscriptionDealDTOList: SubscriptionDealDtolist[]
  subscriptionProgramDTOList: SubscriptionProgramDtolist[]
}

export type SubscriptionDealDtolist = {
  dealId: number
  dealName: string
  investmentAmount: string
  isInvestmentPreferenceShariah: boolean
}

export type SubscriptionProgramDtolist = {
  concentration: number
  dealId: number
  dealName: string
  indermediateInvestmentAmount: number
  isPrefund: number
  totalInvestmentAmount: number
  subAmountofDeal: number
  isShariahSelected: boolean
  associatedConventionalDealId?: number
  subscriptionProgramDealDTOList: {
    dealName: string
    investmentAmount: number
    programDealId: number
  }[]
}

export type FilterDataType = {
  filterName: string
  filterType: "radio" | "checkbox"
  selectedOption?: string
  filterNameKey?: string
  filterOptions: FilterOptionType[]
}

export type FilterOptionType = {
  value: string | number
  label: string | number
  isSelected?: boolean
}

export type TopWeekly = {
  week: string
  month: string
  year: string
  weekId: string
  timestamp: string
  sectionTitle: string
  topBonds: TopBond[]
  topIndices: TopIndice[]
  topStocks: TopStock[]
  message: string
  messageAr: string
  darstAudio: string
}

export type TopBond = {
  bondYields: string
  bondMaturity: number
  flag: string
  bondStockWeekChange: BondStockWeekChange
  bondYTDChange: BondYtdchange
  bondCloseChange: BondCloseChange
  bondWeekChange: BondWeekChange
}
export type BondStockWeekChange = {
  percent: number
  direction: string
  unit?: string
}

export type BondYtdchange = {
  percent: number
  direction: string
  unit: string
}

export type BondCloseChange = {
  percent: number
  direction: string
  unit?: string
}

export type BondWeekChange = {
  percent: number
  direction: string
  unit: string
}

export type TopIndice = {
  indexName: string
  indexCode: string
  indexLevel: string
  indexWeekChange: IndexWeekChange
  indexYTDChange: IndexYtdchange
  indexFXCurrencyCode?: string
  indexFXValue: IndexFxvalue
  indexFXStrength?: string
}

export type IndexWeekChange = {
  percent: number
  direction: string
  unit: string
}

export type IndexYtdchange = {
  percent: number
  direction: string
  unit: string
}

export type IndexFxvalue = {
  percent: number
  direction: string
}

export type TopStock = {
  stockCompany: string
  stockCode: string
  stockPrice: number
  stockWeekChange: StockWeekChange
  stockYTDChange: StockYtdchange
}

export type StockWeekChange = {
  percent: number
  direction: string
}

export type StockYtdchange = {
  percent: number
  direction: string
}

export type Highlights = {
  highlights: string[]
}

export type Watchlist = {
  indices: {
    indexName: string
    indexCode: string
    indexLevel: string
    indexFXStrength: string
    indexWeekChange: {
      percent: number
      direction: string
      unit: string
    }
    indexYTDChange: {
      percent: number
      direction: string
      unit: string
    }
    indexFXCurrencyCode: string
    indexFXValue: {
      percent: number
      direction: string
    }
  }[]
  bond: {
    bondYields: string
    bondMaturity: number
    flag: string
    bondStockWeekChange: {
      percent: number
      direction: string
      unit: string
    }
    bondYTDChange: {
      percent: number
      direction: string
      unit: string
    }
    bondCloseChange: {
      percent: number
      direction: string
      unit: string
    }
    bondWeekChange: {
      percent: number
      direction: string
      unit: string
    }
  }[]
  stock: {
    stockCompany: string
    stockCode: string
    stockPrice: number
    stockWeekChange: {
      percent: number
      direction: string
    }
    stockYTDChange: {
      percent: number
      direction: string
    }
  }[]
}

export type CardCategories = {
  stockCategories: {
    categoryName: string
    categoryNumber: number
    items: {
      stockCompany: string
      stockCode: string
      stockPrice: number
      stockWeekChange: {
        percent: number
        direction: string
      }
      stockYTDChange: {
        percent: number
        direction: string
      }
    }[]
  }[]
  bondCategories: {
    categoryName: string
    categoryNumber: number
    items: {
      bondYields: string
      bondMaturity: number
      flag: string
      bondStockWeekChange: {
        percent: number
        direction: string
        unit: string
      }
      bondYTDChange: {
        percent: number
        direction: string
        unit: string
      }
      bondCloseChange: {
        percent: number
        direction: string
        unit: string
      }
      bondWeekChange: {
        percent: number
        direction: string
        unit: string
      }
    }[]
  }[]
  indexCategories: {
    categoryName: string
    categoryNumber: number
    items: {
      indexName: string
      indexCode: string
      indexLevel: string
      indexFXStrength: string
      indexWeekChange: {
        percent: number
        direction: string
        unit: string
      }
      indexYtdChange: {
        percent: number
        direction: string
        unit: string
      }
      indexFXCurrencyCode: string
      indexFXValue: {
        percent: number
        direction: string
      }
    }[]
  }[]
}

export type OptionsProps = {
  value: number | string
  label: string
}

export type ChipDataType = {
  filter: string
  label: string | number
  value: string | number
}

export type QuarterDeals = {
  deals: QuarterDealsObj[]
  valuationProgress: number
}

export type QuarterDealsObj = {
  id: number
  name: string
  performanceObj: {
    percent: number
    direction: string
  }
}

export type ProfileCompletionTracker = {
  investmentGoalCompleted: boolean
  investmentGoalTracker: number
  investorProfileCompleted: boolean
  investorProfileTracker: number
  proposalAccepted: boolean
  proposalAcceptedTracker: number
  proposalGenerated: boolean
  proposalGeneratedTracker: number
  riskAssessmentCompleted: boolean
  riskAssessmentTracker: number
  total: number
}

export type UnlockOpportunityFlow = {
  opportunityFlow: string
}

export type VerifyOTPInput = {
  phoneNumber: string
  otp: string
}

export type Location = {
  countryCode: any
  country: string
}

export type ErrorType = {
  response: {
    status: number
  }
}

export type ErrorJsonResponse = {
  message: string
  success: boolean
}

export type InvestorInformation = {
  InvestmentGoals: Pick<
    InvestorProfileGoals,
    | "whoIsPortfolioFor"
    | "investmentDurationInYears"
    | "investmentGoals"
    | "additionalPreferences"
  >
  Identity: Pick<InvestorSurvey, "interestedInvestments">
}

export type PhoneNumberInput = {
  number: string
  countryCode: any
}

export type SummaryAllocationType = { type?: string; data?: [] }

export enum Rating {
  Poor = "Poor",
  Average = "Average",
  Good = "Good",
  Excellent = "Excellent",
}

export enum FeedbackSubmissionScreen {
  Opportunity = "Opportunity",
  Proposal = "Proposal",
  KYC = "KYC",
}

export type UserFeedbackInput = {
  rating: Rating
  details?: string
  generateLink: boolean
  submissionScreen: FeedbackSubmissionScreen
}

export type Program = {
  id?: string
  title?: string
  description?: string
  document?: string
  country?: string
  sector?: string
  component?: string
  assetClass?: string
  image?: string
  isShariahCompliant?: boolean
  sponsor?: string
  expectedExit?: string
  expectedReturn?: string
  otherInfo?: OpportunityOtherInfo[]
  videoLink?: string
  isNewOpportunity?: boolean
  titleSanitized?: string
  strategy?: AllocationCategory
  isOpportunityClosed: boolean
  bannerImage?: string
  terms?: string
  targetYield?: string
  deployment?: string
  about?: string
}

export type ProgramsResponse = {
  status?: string
  programs?: Program[]
}

export type ProgramAllocation = {
  programName: string
  minimumAllocation: number
  maximumAllocation: number
  description: string
}

export type InterestedSolutions = {
  programId?: string
  isInterested?: boolean
}

export type InvestmentList = {
  investmentId: number
  investmentAmount: number
}

export type InvestmentDetails = {
  InvestmentData: InvestmentList[]
}

export type programDetails = {
  id: number
  name: string
  target: string
  terms: string
  details: string
  amount?: string
}
export type programData = {
  programData: {
    programDetails: programDetails[]
  }
}
export enum documentType {
  Passport = 1,
  NationalId = 2,
}

export type ProposalStatus = {
  proposalCompleted?: boolean
}
