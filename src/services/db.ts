import {
  BrandOpportunity,
  DistributorProfile,
  RequirementSubmission,
  Enquiry,
  ContactRequest,
  SavedSearch,
  Category,
} from '../types';
import { SAMPLE_OPPORTUNITIES } from '../data/sampleListings';
import { SAMPLE_DISTRIBUTORS } from '../data/sampleDistributors';
import { CATEGORIES_DATA } from '../data/categories';

const STORAGE_KEYS = {
  OPPORTUNITIES: 'nake_opportunities_v1',
  DISTRIBUTORS: 'nake_distributors_v1',
  REQUIREMENTS: 'nake_requirements_v1',
  ENQUIRIES: 'nake_enquiries_v1',
  CONTACT_REQUESTS: 'nake_contact_requests_v1',
  SAVED_OPPORTUNITIES: 'nake_saved_opportunities_v1',
  SAVED_SEARCHES: 'nake_saved_searches_v1',
  RECENTLY_VIEWED: 'nake_recently_viewed_v1',
};

// Safe JSON parser
function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event('nake_db_update'));
  } catch (err) {
    console.error('Storage write error', err);
  }
}

// Service implementation
export const db = {
  // Categories
  getCategories(): Category[] {
    return CATEGORIES_DATA;
  },

  getCategoryBySlug(slug: string): Category | undefined {
    return CATEGORIES_DATA.find((c) => c.slug === slug);
  },

  // Opportunities
  getOpportunities(): BrandOpportunity[] {
    const stored = safeGet<BrandOpportunity[]>(STORAGE_KEYS.OPPORTUNITIES, []);
    if (!stored || stored.length === 0) {
      safeSet(STORAGE_KEYS.OPPORTUNITIES, SAMPLE_OPPORTUNITIES);
      return SAMPLE_OPPORTUNITIES;
    }
    return stored;
  },

  getOpportunityBySlug(slug: string): BrandOpportunity | undefined {
    const opps = this.getOpportunities();
    return opps.find((o) => o.slug === slug || o.id === slug);
  },

  createOpportunity(opp: Omit<BrandOpportunity, 'id' | 'createdAt' | 'viewsCount' | 'savesCount' | 'enquiriesCount'>): BrandOpportunity {
    const all = this.getOpportunities();
    const newRecord: BrandOpportunity = {
      ...opp,
      id: `opp-custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
      viewsCount: 1,
      savesCount: 0,
      enquiriesCount: 0,
    };
    const updated = [newRecord, ...all];
    safeSet(STORAGE_KEYS.OPPORTUNITIES, updated);
    return newRecord;
  },

  // Distributors
  getDistributors(): DistributorProfile[] {
    const stored = safeGet<DistributorProfile[]>(STORAGE_KEYS.DISTRIBUTORS, []);
    if (!stored || stored.length === 0) {
      safeSet(STORAGE_KEYS.DISTRIBUTORS, SAMPLE_DISTRIBUTORS);
      return SAMPLE_DISTRIBUTORS;
    }
    return stored;
  },

  getDistributorBySlug(slug: string): DistributorProfile | undefined {
    const dists = this.getDistributors();
    return dists.find((d) => d.slug === slug || d.id === slug);
  },

  createDistributor(profile: Omit<DistributorProfile, 'id' | 'createdAt' | 'enquiriesReceived'>): DistributorProfile {
    const all = this.getDistributors();
    const newRecord: DistributorProfile = {
      ...profile,
      id: `dist-custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
      enquiriesReceived: 0,
    };
    const updated = [newRecord, ...all];
    safeSet(STORAGE_KEYS.DISTRIBUTORS, updated);
    return newRecord;
  },

  // Fast Requirements Intake
  getRequirements(): RequirementSubmission[] {
    return safeGet<RequirementSubmission[]>(STORAGE_KEYS.REQUIREMENTS, []);
  },

  createRequirement(req: Omit<RequirementSubmission, 'id' | 'createdAt' | 'status'>): RequirementSubmission {
    const all = this.getRequirements();
    const newRecord: RequirementSubmission = {
      ...req,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    safeSet(STORAGE_KEYS.REQUIREMENTS, [newRecord, ...all]);
    return newRecord;
  },

  // Direct Enquiries
  getEnquiries(userId?: string): Enquiry[] {
    const all = safeGet<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, [
      {
        id: 'enq-sample-1',
        senderId: 'user-sample-dist',
        senderName: 'Apex Health Logistics',
        senderEmail: 'distribution@apexhealth.example',
        senderRole: 'distributor',
        recipientId: 'user-brand-1',
        targetOpportunityId: 'opp-1',
        subject: 'Territory Representation for Northern California',
        message: 'We operate 8 refrigerated trucks and have direct relationships with 650 stores. Interested in discussing exclusivity terms.',
        preferredContact: 'email',
        status: 'new',
        createdAt: '2026-03-20T14:00:00Z',
      },
    ]);
    if (!userId) return all;
    return all.filter((e) => e.senderId === userId || e.recipientId === userId);
  },

  createEnquiry(enq: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry {
    const all = safeGet<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const newRecord: Enquiry = {
      ...enq,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    safeSet(STORAGE_KEYS.ENQUIRIES, [newRecord, ...all]);

    // Update enquiry counter on target opportunity if present
    if (enq.targetOpportunityId) {
      const opps = this.getOpportunities();
      const updatedOpps = opps.map((o) =>
        o.id === enq.targetOpportunityId ? { ...o, enquiriesCount: o.enquiriesCount + 1 } : o
      );
      safeSet(STORAGE_KEYS.OPPORTUNITIES, updatedOpps);
    }

    return newRecord;
  },

  updateEnquiryStatus(enquiryId: string, status: Enquiry['status']): void {
    const all = safeGet<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const updated = all.map((e) => (e.id === enquiryId ? { ...e, status } : e));
    safeSet(STORAGE_KEYS.ENQUIRIES, updated);
  },

  // Contact Requests (Phone/Email privacy authorization)
  getContactRequests(userId?: string): ContactRequest[] {
    const all = safeGet<ContactRequest[]>(STORAGE_KEYS.CONTACT_REQUESTS, []);
    if (!userId) return all;
    return all.filter((r) => r.requesterId === userId);
  },

  createContactRequest(req: Omit<ContactRequest, 'id' | 'createdAt' | 'status'>): ContactRequest {
    const all = safeGet<ContactRequest[]>(STORAGE_KEYS.CONTACT_REQUESTS, []);
    const newRecord: ContactRequest = {
      ...req,
      id: `cr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    safeSet(STORAGE_KEYS.CONTACT_REQUESTS, [newRecord, ...all]);
    return newRecord;
  },

  approveContactRequest(requestId: string): void {
    const all = safeGet<ContactRequest[]>(STORAGE_KEYS.CONTACT_REQUESTS, []);
    const updated = all.map((r) =>
      r.id === requestId ? { ...r, status: 'approved' as const, approvedAt: new Date().toISOString() } : r
    );
    safeSet(STORAGE_KEYS.CONTACT_REQUESTS, updated);
  },

  // Saved Opportunities (Bookmarks)
  getSavedOpportunityIds(): string[] {
    return safeGet<string[]>(STORAGE_KEYS.SAVED_OPPORTUNITIES, []);
  },

  toggleSaveOpportunity(oppId: string): boolean {
    const current = this.getSavedOpportunityIds();
    let updated: string[];
    let isSaved: boolean;
    if (current.includes(oppId)) {
      updated = current.filter((id) => id !== oppId);
      isSaved = false;
    } else {
      updated = [oppId, ...current];
      isSaved = true;
    }
    safeSet(STORAGE_KEYS.SAVED_OPPORTUNITIES, updated);

    // Update count in opportunity
    const opps = this.getOpportunities();
    const updatedOpps = opps.map((o) =>
      o.id === oppId ? { ...o, savesCount: Math.max(0, o.savesCount + (isSaved ? 1 : -1)) } : o
    );
    safeSet(STORAGE_KEYS.OPPORTUNITIES, updatedOpps);

    return isSaved;
  },

  // Recently Viewed Opportunities (Private localStorage only)
  getRecentlyViewedIds(): string[] {
    return safeGet<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
  },

  addRecentlyViewed(oppId: string): void {
    const current = this.getRecentlyViewedIds();
    const filtered = current.filter((id) => id !== oppId);
    safeSet(STORAGE_KEYS.RECENTLY_VIEWED, [oppId, ...filtered].slice(0, 10));
  },

  clearRecentlyViewed(): void {
    safeSet(STORAGE_KEYS.RECENTLY_VIEWED, []);
  },

  // Saved Search Alerts
  getSavedSearches(userId: string): SavedSearch[] {
    const all = safeGet<SavedSearch[]>(STORAGE_KEYS.SAVED_SEARCHES, []);
    return all.filter((s) => s.userId === userId);
  },

  createSavedSearch(userId: string, name: string, filters: SavedSearch['filters']): SavedSearch {
    const all = safeGet<SavedSearch[]>(STORAGE_KEYS.SAVED_SEARCHES, []);
    const newRecord: SavedSearch = {
      id: `ss-${Date.now()}`,
      userId,
      name,
      filters,
      createdAt: new Date().toISOString(),
    };
    safeSet(STORAGE_KEYS.SAVED_SEARCHES, [newRecord, ...all]);
    return newRecord;
  },
};

export default db;
