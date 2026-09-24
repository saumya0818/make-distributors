-- ==============================================================================
-- NAKE DISTRIBUTORS – DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Brand: Nake Distributors ("Where Brands Find Their Growth Network")
-- Target Database: Supabase PostgreSQL
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(32) NOT NULL DEFAULT 'visitor' CHECK (role IN ('visitor', 'brand', 'distributor', 'admin')),
  full_name VARCHAR(150) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  is_phone_verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  country VARCHAR(100) NOT NULL DEFAULT 'United States',
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  category_interest VARCHAR(100),
  investment_capacity VARCHAR(100),
  years_experience INTEGER DEFAULT 0,
  warehouse_capacity VARCHAR(100),
  verification_status VARCHAR(32) DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(120) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  accent_color VARCHAR(16) NOT NULL DEFAULT '#D7A83D',
  opportunity_count INTEGER DEFAULT 0,
  subcategories TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. OPPORTUNITIES (Brand Listings)
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  slug VARCHAR(200) UNIQUE NOT NULL,
  brand_name VARCHAR(200) NOT NULL,
  company_name VARCHAR(250) NOT NULL,
  tagline VARCHAR(300) NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(120) NOT NULL,
  subcategory VARCHAR(120) NOT NULL,
  business_type VARCHAR(64) NOT NULL CHECK (business_type IN ('Distributor', 'Super Stockist', 'C&F Agent', 'Franchise', 'Wholesaler')),
  country VARCHAR(100) NOT NULL DEFAULT 'United States',
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  investment_min NUMERIC(12,2) NOT NULL DEFAULT 0,
  investment_max NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency VARCHAR(8) NOT NULL DEFAULT 'USD',
  space_required_sqft INTEGER DEFAULT 0,
  space_unit VARCHAR(16) DEFAULT 'sq.ft',
  margin_percentage VARCHAR(64) NOT NULL,
  roi_months VARCHAR(64) NOT NULL,
  product_line TEXT[] DEFAULT ARRAY[]::TEXT[],
  benefits TEXT[] DEFAULT ARRAY[]::TEXT[],
  requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
  territories_available TEXT[] DEFAULT ARRAY[]::TEXT[],
  cover_image_url TEXT,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  enquiries_count INTEGER DEFAULT 0,
  status VARCHAR(32) NOT NULL DEFAULT 'under_review' CHECK (status IN ('published', 'draft', 'under_review', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DISTRIBUTOR PROFILES (Directory)
CREATE TABLE IF NOT EXISTS public.distributor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  slug VARCHAR(200) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  business_type VARCHAR(64) NOT NULL CHECK (business_type IN ('Distributor', 'Wholesaler', 'Stockist', 'Dealer', 'Importer')),
  categories TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  country VARCHAR(100) NOT NULL DEFAULT 'United States',
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  service_regions TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  investment_min NUMERIC(12,2) NOT NULL DEFAULT 0,
  investment_max NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency VARCHAR(8) NOT NULL DEFAULT 'USD',
  years_experience INTEGER NOT NULL DEFAULT 0,
  warehouse_capacity_sqft INTEGER NOT NULL DEFAULT 0,
  delivery_vehicles_count INTEGER DEFAULT 0,
  retail_network_reach VARCHAR(250),
  about TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_level VARCHAR(64) DEFAULT 'Basic' CHECK (verification_level IN ('Basic', 'Documents Submitted', 'Verified by Nake Distributors')),
  privacy_level VARCHAR(32) DEFAULT 'hidden_contact' CHECK (privacy_level IN ('hidden_contact', 'approved_only')),
  enquiries_received INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REQUIREMENTS (Public Fast-Intake)
CREATE TABLE IF NOT EXISTS public.requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(64) NOT NULL CHECK (type IN ('looking_for_distributor', 'want_to_become_distributor')),
  full_name VARCHAR(150) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  country VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  category VARCHAR(120) NOT NULL,
  investment_range VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  preferred_contact VARCHAR(32) DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
  status VARCHAR(32) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ENQUIRIES (Direct B2B Communication)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  target_distributor_id UUID REFERENCES public.distributor_profiles(id) ON DELETE SET NULL,
  subject VARCHAR(250) NOT NULL,
  message TEXT NOT NULL,
  preferred_contact VARCHAR(32) DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
  status VARCHAR(32) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed', 'spam')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONTACT REQUESTS (Phone & Email Privacy Authorization)
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_distributor_id UUID NOT NULL REFERENCES public.distributor_profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status VARCHAR(32) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- 8. SAVED OPPORTUNITIES (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, opportunity_id)
);

-- 9. AUDIT LOGS (Compliance & Security)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  details JSONB DEFAULT '{}'::JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Public profiles can be viewed by anyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update only their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- OPPORTUNITIES POLICIES
-- Visitors & authenticated users see published opportunities
CREATE POLICY "Published opportunities are publicly viewable"
  ON public.opportunities FOR SELECT
  USING (status = 'published' OR owner_id = auth.uid() OR public.is_admin());

-- Brands manage only their own opportunities
CREATE POLICY "Brands can insert their own opportunities"
  ON public.opportunities FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Brands can update their own opportunities"
  ON public.opportunities FOR UPDATE
  USING (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "Brands can delete their own opportunities"
  ON public.opportunities FOR DELETE
  USING (auth.uid() = owner_id OR public.is_admin());

-- DISTRIBUTOR PROFILES POLICIES
-- Public summary is viewable, private phone/email is never exposed directly in this table
CREATE POLICY "Distributor profiles are viewable by public"
  ON public.distributor_profiles FOR SELECT
  USING (true);

CREATE POLICY "Distributors can insert their own profile"
  ON public.distributor_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Distributors can update their own profile"
  ON public.distributor_profiles FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin());

-- ENQUIRIES POLICIES (Sender and recipient access only)
CREATE POLICY "Users view enquiries they sent or received"
  ON public.enquiries FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id OR public.is_admin());

CREATE POLICY "Authenticated users can create enquiries"
  ON public.enquiries FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can update enquiry status"
  ON public.enquiries FOR UPDATE
  USING (auth.uid() = recipient_id OR public.is_admin());

-- SAVED OPPORTUNITIES POLICIES
CREATE POLICY "Users manage their own saved opportunities"
  ON public.saved_opportunities FOR ALL
  USING (auth.uid() = user_id);

-- CONTACT REQUESTS POLICIES
CREATE POLICY "Requesters and distributor owners view contact requests"
  ON public.contact_requests FOR SELECT
  USING (
    auth.uid() = requester_id OR
    auth.uid() IN (SELECT user_id FROM public.distributor_profiles WHERE id = target_distributor_id) OR
    public.is_admin()
  );

CREATE POLICY "Authenticated users can create contact requests"
  ON public.contact_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Distributors can approve or reject contact requests"
  ON public.contact_requests FOR UPDATE
  USING (
    auth.uid() IN (SELECT user_id FROM public.distributor_profiles WHERE id = target_distributor_id) OR
    public.is_admin()
  );

-- ADMIN-ONLY TABLES
CREATE POLICY "Only admins can manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

CREATE POLICY "Categories are readable by everyone"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can view requirements submissions"
  ON public.requirements FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Anyone can submit a requirement form"
  ON public.requirements FOR INSERT
  WITH CHECK (true);
