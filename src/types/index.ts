export type UserRole = 'visitor' | 'brand' | 'distributor' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  companyName: string;
  phone?: string;
  isPhoneVerified?: boolean;
  avatarUrl?: string;
  country: string;
  state: string;
  city: string;
  categoryInterest?: string;
  investmentCapacity?: string;
  yearsExperience?: number;
  warehouseCapacity?: string;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  accentColor: string;
  opportunityCount: number;
  subcategories: string[];
}

export interface BrandOpportunity {
  id: string;
  slug: string;
  brandName: string;
  companyName: string;
  logoUrl?: string;
  coverImageUrl?: string;
  tagline: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  businessType: 'Distributor' | 'Super Stockist' | 'C&F Agent' | 'Franchise' | 'Wholesaler';
  country: string;
  state: string;
  city: string;
  investmentMin: number;
  investmentMax: number;
  currency: string;
  spaceRequiredSqFt: number;
  spaceUnit: string;
  marginPercentage: string;
  roiMonths: string;
  productLine: string[];
  benefits: string[];
  requirements: string[];
  territoriesAvailable: string[];
  isVerified: boolean;
  isFeatured: boolean;
  viewsCount: number;
  savesCount: number;
  enquiriesCount: number;
  ownerId: string;
  createdAt: string;
  status: 'published' | 'draft' | 'under_review';
}

export interface DistributorProfile {
  id: string;
  slug: string;
  name: string;
  companyName: string;
  avatarUrl?: string;
  businessType: 'Distributor' | 'Wholesaler' | 'Stockist' | 'Dealer' | 'Importer';
  categories: string[];
  country: string;
  state: string;
  city: string;
  serviceRegions: string[];
  investmentMin: number;
  investmentMax: number;
  currency: string;
  yearsExperience: number;
  warehouseCapacitySqFt: number;
  deliveryVehiclesCount: number;
  retailNetworkReach: string;
  about: string;
  isVerified: boolean;
  verificationLevel: 'Basic' | 'Documents Submitted' | 'Verified by Make Distributors' | 'Verified by Nake Distributors';
  privacyLevel: 'hidden_contact' | 'approved_only';
  enquiriesReceived: number;
  createdAt: string;
}

export interface RequirementSubmission {
  id: string;
  type: 'looking_for_distributor' | 'want_to_become_distributor';
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  category: string;
  investmentRange: string;
  description: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  status: 'new' | 'reviewed' | 'contacted';
  createdAt: string;
}

export interface Enquiry {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  senderRole: UserRole;
  recipientId: string;
  targetOpportunityId?: string;
  targetDistributorId?: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  status: 'new' | 'read' | 'replied' | 'closed' | 'spam';
  createdAt: string;
}

export interface ContactRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterCompany: string;
  requesterRole: UserRole;
  targetDistributorId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  coverColor: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  filters: {
    category?: string;
    state?: string;
    investmentMax?: number;
    businessType?: string;
  };
  createdAt: string;
}
