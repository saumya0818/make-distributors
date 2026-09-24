import React, { useState, useEffect, useRef } from 'react';
import {
  Globe2,
  MapPin,
  Building2,
  Warehouse,
  Truck,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  RotateCw,
  Play,
  Pause,
  X,
  Compass,
  CheckCircle2,
  DollarSign,
  Clock,
  ChevronRight,
} from 'lucide-react';

export interface LocationDetail {
  id: string;
  name: string;
  stateOrCountry: string;
  region: string;
  lat: number;
  lng: number;
  flag: string;
  tier: string;
  activeDistributors: number;
  brandOpportunities: number;
  averageMargin: string;
  minInvestment: string;
  warehouseCapacity: string;
  leadTime: string;
  corridorRoutes: string[];
  topCategories: string[];
  featuredDistributors: {
    name: string;
    fleetSize: string;
    verifiedYear: number;
    specialty: string;
  }[];
  overview: string;
}

export const DISTRIBUTION_LOCATIONS: LocationDetail[] = [
  {
    id: 'california-hub',
    name: 'Los Angeles & Long Beach',
    stateOrCountry: 'California, USA',
    region: 'West Coast Gateway',
    lat: 34.05,
    lng: -118.24,
    flag: '🇺🇸',
    tier: 'Tier-1 Trans-Pacific Mega Hub',
    activeDistributors: 680,
    brandOpportunities: 340,
    averageMargin: '22% - 35%',
    minInvestment: '$35,000 - $120,000',
    warehouseCapacity: '6.4M sq. ft. Grade-A & Cold Chain',
    leadTime: '12 - 24 Hours DSD',
    corridorRoutes: ['I-5 Pacific Corridor', 'I-10 Transcontinental', 'Ports of LA & Long Beach', 'BNSF Intermodal Rail'],
    topCategories: ['Food & Beverage', 'Health & Personal Care', 'Consumer Electronics', 'Apparel & Fashion'],
    featuredDistributors: [
      { name: 'Pacific Coast FMCG Wholesalers', fleetSize: '45 Temperature-Controlled Trucks', verifiedYear: 2018, specialty: 'Direct Store Delivery (DSD)' },
      { name: 'Golden State Bio Supply & Logistics', fleetSize: '28 Box Trucks & Sprinters', verifiedYear: 2020, specialty: 'Natural Foods & Personal Care' },
    ],
    overview: 'The primary trade artery for trans-Pacific imports and high-velocity consumer goods. Serves over 39 million residents with dense urban retail and supermarket distribution routes.',
  },
  {
    id: 'texas-hub',
    name: 'Dallas-Fort Worth & Houston',
    stateOrCountry: 'Texas, USA',
    region: 'Central South & Cross-Border',
    lat: 32.77,
    lng: -96.79,
    flag: '🇺🇸',
    tier: 'Tier-1 Intermodal Trade Hub',
    activeDistributors: 590,
    brandOpportunities: 295,
    averageMargin: '20% - 32%',
    minInvestment: '$25,000 - $85,000',
    warehouseCapacity: '7.8M sq. ft. High-Bay Storage',
    leadTime: '24 - 36 Hours Statewide',
    corridorRoutes: ['I-35 NAFTA Highway', 'I-45 Houston Port Link', 'DFW Global Cargo Gateway', 'Union Pacific Alliance Yard'],
    topCategories: ['Building & Construction', 'Automobile & Lubes', 'Food & Beverage', 'Packaging Solutions'],
    featuredDistributors: [
      { name: 'Lone Star Regional Distribution', fleetSize: '62 Dry Van & Flatbed Units', verifiedYear: 2016, specialty: 'Industrial & Building Hardware' },
      { name: 'Texoma Consumer Brands Network', fleetSize: '34 DSD Vans', verifiedYear: 2021, specialty: 'Convenience & Supermarket Lines' },
    ],
    overview: 'Unmatched geographic reach connecting the Gulf of Mexico, Mexican manufacturing corridors, and central US inland freight. Favorable tax incentives drive massive 3PL warehouse expansion.',
  },
  {
    id: 'newyork-hub',
    name: 'New York & Tri-State Metro',
    stateOrCountry: 'New York, USA',
    region: 'East Coast Corridor',
    lat: 40.71,
    lng: -74.00,
    flag: '🇺🇸',
    tier: 'Tier-1 High-Density Consumer Market',
    activeDistributors: 740,
    brandOpportunities: 420,
    averageMargin: '25% - 38%',
    minInvestment: '$50,000 - $150,000',
    warehouseCapacity: '4.9M sq. ft. Urban Cross-Dock',
    leadTime: 'Same-Day / 18 Hours',
    corridorRoutes: ['I-95 Eastern Megalopolis', 'Port of NY & NJ', 'I-80 Midwest Connector', 'JFK Air Cargo'],
    topCategories: ['Gourmet Food & Beverage', 'Health & Beauty', 'Ayurvedic & Wellness', 'Electronics & Appliances'],
    featuredDistributors: [
      { name: 'Empire State Food Service & Supply', fleetSize: '55 Refrig-Units', verifiedYear: 2015, specialty: 'Specialty Grocery & Supermarket' },
      { name: 'Tri-State FastTrack Distributors', fleetSize: '40 Metro Delivery Vans', verifiedYear: 2019, specialty: 'Bodegas & Independent Retail' },
    ],
    overview: 'The highest retail spending density in North America. Rapid turnover and premium margin potential across thousands of independent groceries, pharmacies, and specialty retailers.',
  },
  {
    id: 'illinois-hub',
    name: 'Chicago & Great Lakes',
    stateOrCountry: 'Illinois, USA',
    region: 'Midwest Freight Epicenter',
    lat: 41.87,
    lng: -87.62,
    flag: '🇺🇸',
    tier: 'Tier-1 Rail & Inland Freight Hub',
    activeDistributors: 510,
    brandOpportunities: 260,
    averageMargin: '18% - 28%',
    minInvestment: '$25,000 - $75,000',
    warehouseCapacity: '8.2M sq. ft. Central Distribution',
    leadTime: '24 Hours to 60% of US population',
    corridorRoutes: ['I-90 / I-94 Transcontinental', 'I-55 St. Louis Corridor', '6 Class-I Freight Railroads', 'O’Hare International Cargo'],
    topCategories: ['Agriculture & Farm Inputs', 'Automobile Parts', 'Packaged Foods', 'Industrial Hardware'],
    featuredDistributors: [
      { name: 'Midwest Freight & Route Alliance', fleetSize: '70 Class-8 Semis', verifiedYear: 2014, specialty: 'Wholesale Pallet & LTL Logistics' },
      { name: 'Windy City Retail Distributors', fleetSize: '32 Urban Delivery Trucks', verifiedYear: 2021, specialty: 'FMCG & Beverages' },
    ],
    overview: 'The historic freight crossroads of America. Where all six Class I railroads converge, enabling lowest-cost transport to the largest proportion of consumers in under 24 hours.',
  },
  {
    id: 'florida-hub',
    name: 'Miami & Orlando Corridor',
    stateOrCountry: 'Florida, USA',
    region: 'Southeast & Caribbean Link',
    lat: 25.76,
    lng: -80.19,
    flag: '🇺🇸',
    tier: 'Tier-2 LatAm Export & Tourism Hub',
    activeDistributors: 430,
    brandOpportunities: 230,
    averageMargin: '24% - 36%',
    minInvestment: '$30,000 - $90,000',
    warehouseCapacity: '3.6M sq. ft. Multi-Temp Facility',
    leadTime: '24 - 48 Hours',
    corridorRoutes: ['I-95 South Terminal', 'Florida Turnpike', 'PortMiami & Port Everglades', 'MIA Perishables Hub'],
    topCategories: ['Beverages & Hospitality', 'Personal Care & Sun Care', 'Apparel & Resort Wear', 'Home Supplies'],
    featuredDistributors: [
      { name: 'Sunshine State Distribution LLC', fleetSize: '38 Multi-Temp Vans', verifiedYear: 2017, specialty: 'Hospitality & Convenience' },
      { name: 'Caribbean Gateway Wholesale', fleetSize: '22 Container Rigs', verifiedYear: 2022, specialty: 'Export & Regional Island Supply' },
    ],
    overview: 'Massive seasonal tourism velocity and gateway for trade with Latin America and the Caribbean. Thriving demand for cold drinks, hospitality amenities, and consumer products.',
  },
  {
    id: 'london-hub',
    name: 'London & Southeast England',
    stateOrCountry: 'United Kingdom',
    region: 'Western Europe Gateway',
    lat: 51.50,
    lng: -0.12,
    flag: '🇬🇧',
    tier: 'Tier-1 European Consumer Hub',
    activeDistributors: 380,
    brandOpportunities: 210,
    averageMargin: '26% - 40%',
    minInvestment: '£25,000 - £80,000',
    warehouseCapacity: '3.2M sq. ft. M25 Orbit Hubs',
    leadTime: '12 - 24 Hours Next-Day',
    corridorRoutes: ['M25 Orbital Motorway', 'M1 / M6 Industrial Spine', 'Port of Felixstowe', 'Heathrow Cargo'],
    topCategories: ['Specialty Organic Food', 'Eco Personal Care', 'Smart Consumer Electronics', 'Beverages'],
    featuredDistributors: [
      { name: 'Britannia FMCG Logistics', fleetSize: '35 Clean-Emission Vans', verifiedYear: 2017, specialty: 'Supermarket & Chemist Distribution' },
    ],
    overview: 'One of the world’s most concentrated metropolitan economies with immense appetite for new organic, wellness, and innovative retail brand lines.',
  },
  {
    id: 'dubai-hub',
    name: 'Dubai & Abu Dhabi',
    stateOrCountry: 'United Arab Emirates',
    region: 'Middle East & GCC Freezone',
    lat: 25.20,
    lng: 55.27,
    flag: '🇦🇪',
    tier: 'Tier-1 MENA Transshipment Hub',
    activeDistributors: 310,
    brandOpportunities: 185,
    averageMargin: '28% - 42%',
    minInvestment: '$40,000 - $150,000',
    warehouseCapacity: '5.1M sq. ft. JAFZA Free Zone',
    leadTime: '24 Hours Across Emirates',
    corridorRoutes: ['Jebel Ali Port Terminal', 'Sheikh Zayed Highway', 'Al Maktoum Logistics City', 'GCC Overland Freight'],
    topCategories: ['Luxury & Beauty Goods', 'Confectionery & Beverages', 'Electronics & Gadgets', 'Building Materials'],
    featuredDistributors: [
      { name: 'Gulf Horizon Trade Distribution', fleetSize: '42 Air-Conditioned Fleets', verifiedYear: 2016, specialty: 'Hypermarkets & Duty Free' },
    ],
    overview: 'Zero corporate tax free zones, deepwater port facilities, and a wealthy consumer base commanding premium distributor margins across the entire Arabian Gulf.',
  },
  {
    id: 'mumbai-hub',
    name: 'Mumbai & Maharashtra',
    stateOrCountry: 'India',
    region: 'South Asia High-Velocity Hub',
    lat: 19.07,
    lng: 72.87,
    flag: '🇮🇳',
    tier: 'Tier-1 Retail Super-Corridor',
    activeDistributors: 820,
    brandOpportunities: 490,
    averageMargin: '16% - 28%',
    minInvestment: '₹5 Lakh - ₹25 Lakh',
    warehouseCapacity: '9.2M sq. ft. Bhiwandi Logistics Belt',
    leadTime: 'Same-Day / 24 Hours Kirana Delivery',
    corridorRoutes: ['JNPA Container Port', 'Mumbai-Pune Expressway', 'Western Dedicated Freight Corridor', 'Bhiwandi Warehousing Hub'],
    topCategories: ['Ayurvedic & Herbal', 'Staples & Packaged Food', 'FMCG Personal Care', 'Electricals & Wire'],
    featuredDistributors: [
      { name: 'Bharat Kirana Network Partners', fleetSize: '110 Small Commercial Vehicles', verifiedYear: 2013, specialty: 'General Trade & Kirana Direct' },
      { name: 'Sahyadri Wholesale Distro Hub', fleetSize: '48 Heavy Commercial Trucks', verifiedYear: 2018, specialty: 'Modern Trade & Supermarkets' },
    ],
    overview: 'India’s financial and distribution powerhouse. Bhiwandi logistics cluster serves millions of mom-and-pop stores and modern supermarkets with hyper-rapid inventory rotation.',
  },
  {
    id: 'singapore-hub',
    name: 'Singapore Maritime Hub',
    stateOrCountry: 'Singapore',
    region: 'ASEAN Crossroads',
    lat: 1.35,
    lng: 103.81,
    flag: '🇸🇬',
    tier: 'Tier-1 Maritime & Cold Chain Capital',
    activeDistributors: 240,
    brandOpportunities: 140,
    averageMargin: '22% - 34%',
    minInvestment: '$30,000 - $90,000 SGD',
    warehouseCapacity: '3.8M sq. ft. Automated Cold Logistics',
    leadTime: 'Under 12 Hours Island-wide',
    corridorRoutes: ['Tuas Mega Port', 'Changi Cold Chain Cargo Hub', 'AYE / PIE Expressways', 'Johor-Singapore Causeway'],
    topCategories: ['Premium Food & Nutrition', 'Biotech & Health Supplies', 'Smart Home Tech', 'Specialty Packaging'],
    featuredDistributors: [
      { name: 'Lion City Straits Distribution', fleetSize: '24 Automated Chilled Vans', verifiedYear: 2019, specialty: 'Pharmacy & Supermarket Chains' },
    ],
    overview: 'The undisputed logistics benchmark of Southeast Asia with cutting-edge customs clearance, pristine cold chain integrity, and springboard access to 650M ASEAN consumers.',
  },
  {
    id: 'tokyo-hub',
    name: 'Tokyo & Kanto Region',
    stateOrCountry: 'Japan',
    region: 'East Asia Advanced Hub',
    lat: 35.67,
    lng: 139.65,
    flag: '🇯🇵',
    tier: 'Tier-1 Automated High-Efficiency Hub',
    activeDistributors: 290,
    brandOpportunities: 160,
    averageMargin: '20% - 30%',
    minInvestment: '¥4,000,000 - ¥12,000,000',
    warehouseCapacity: '4.5M sq. ft. Robotic Distribution',
    leadTime: 'Under 18 Hours 24/7 Konbini Replenishment',
    corridorRoutes: ['Tokyo Bay Port Complex', 'Shuto Expressway', 'Tomei Highway', 'Narita & Haneda Air Logistics'],
    topCategories: ['Cosmetics & Skincare', 'Ready-to-Eat Food & Drinks', 'Automotive Aftermarket', 'Consumer Gadgets'],
    featuredDistributors: [
      { name: 'Kanto Convenience Supply System', fleetSize: '50 Hybrid Delivery Trucks', verifiedYear: 2016, specialty: 'High-Frequency Store Replenishment' },
    ],
    overview: 'The pinnacle of precision supply chains with round-the-clock convenience store delivery cycles, high standards of brand packaging, and steadfast partnership loyalty.',
  },
];

interface InteractiveEarthSectionProps {
  onNavigate?: (path: string) => void;
  onOpenRequirement?: (locationName?: string) => void;
}

export const InteractiveEarthSection: React.FC<InteractiveEarthSectionProps> = ({
  onNavigate,
  onOpenRequirement,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationDetail>(DISTRIBUTION_LOCATIONS[0]);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'corridors' | 'distributors'>('overview');
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<LocationDetail | null>(null);

  // Globe orientation state (Euler angles)
  // Initialized to center North America (around lat 35, lng -95)
  const rotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -1.7 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -1.7 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Focus Earth to specific location
  const focusLocation = (loc: LocationDetail, openDetails = true) => {
    setSelectedLocation(loc);
    if (openDetails) {
      setIsDetailDrawerOpen(true);
    }
    // Convert lat/lng to sphere rotation angles
    const targetY = -((loc.lng * Math.PI) / 180) - Math.PI / 2;
    const targetX = (loc.lat * Math.PI) / 180;
    targetRotationRef.current = { x: targetX, y: targetY };
  };

  // Canvas Earth Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Generate pseudo-continent dots once
    const continentPoints: { lat: number; lng: number }[] = [];
    const numPoints = 1200;
    for (let i = 0; i < numPoints; i++) {
      const lat = (Math.asin(Math.random() * 2 - 1) * 180) / Math.PI;
      const lng = (Math.random() * 360 - 180);
      continentPoints.push({ lat, lng });
    }

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate rotation towards target
      if (!isDraggingRef.current) {
        if (isAutoSpinning) {
          targetRotationRef.current.y += 0.003;
        }
        rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.06;
        rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.06;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // 1. Atmosphere Radial Glow behind Earth (Light Blue & Golden Halo)
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.85,
        centerX,
        centerY,
        radius * 1.35
      );
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      glowGrad.addColorStop(0.5, 'rgba(215, 168, 61, 0.25)');
      glowGrad.addColorStop(1, 'rgba(224, 242, 254, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Earth Sphere Base (Luminous Light Blue & Ocean Gradient)
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGrad.addColorStop(0, '#BAE6FD'); // Light ice blue sun reflection
      sphereGrad.addColorStop(0.4, '#38BDF8'); // Sky blue ocean
      sphereGrad.addColorStop(0.85, '#0284C7'); // Deep cobalt blue curve
      sphereGrad.addColorStop(1, '#0369A1'); // Shadow terminator
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Golden Rim Edge
      ctx.strokeStyle = '#D7A83D';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 3. Latitude & Longitude Meridians (Golden / Sky Blue Grid)
      ctx.strokeStyle = 'rgba(253, 230, 138, 0.25)';
      ctx.lineWidth = 1;

      // Draw latitude circles
      [-60, -30, 0, 30, 60].forEach((latDeg) => {
        const latRad = (latDeg * Math.PI) / 180;
        const rLat = radius * Math.cos(latRad);
        const yLat = -radius * Math.sin(latRad);

        // Project latitude ellipse tilted by rotX
        ctx.beginPath();
        const ellipseHeight = Math.abs(rLat * Math.sin(rotX));
        const ellipseCenterY = centerY + yLat * Math.cos(rotX);
        ctx.ellipse(centerX, ellipseCenterY, rLat, ellipseHeight, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. Dot Grid (Continents / Terrestrial Nodes in Golden / Light Accents)
      continentPoints.forEach((pt) => {
        const phi = (pt.lat * Math.PI) / 180;
        const theta = (pt.lng * Math.PI) / 180 + rotY;

        // 3D Cartesian on unit sphere
        const x3d = Math.cos(phi) * Math.sin(theta);
        const y3d = Math.sin(phi);
        const z3d = Math.cos(phi) * Math.cos(theta);

        // Rotate around X axis (tilt)
        const yRot = y3d * Math.cos(rotX) - z3d * Math.sin(rotX);
        const zRot = y3d * Math.sin(rotX) + z3d * Math.cos(rotX);

        // Visible only if in front (zRot > 0)
        if (zRot > 0) {
          const screenX = centerX + x3d * radius;
          const screenY = centerY - yRot * radius;
          const alpha = Math.max(0.1, zRot) * 0.45;
          ctx.fillStyle = `rgba(253, 230, 138, ${alpha})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Inter-Hub Golden Trade Route Arcs
      for (let i = 0; i < DISTRIBUTION_LOCATIONS.length - 1; i++) {
        const locA = DISTRIBUTION_LOCATIONS[i];
        const locB = DISTRIBUTION_LOCATIONS[(i + 2) % DISTRIBUTION_LOCATIONS.length];

        const phiA = (locA.lat * Math.PI) / 180;
        const thetaA = (locA.lng * Math.PI) / 180 + rotY;
        const xA = Math.cos(phiA) * Math.sin(thetaA);
        const yA = Math.sin(phiA);
        const zA = Math.cos(phiA) * Math.cos(thetaA);
        const yRotA = yA * Math.cos(rotX) - zA * Math.sin(rotX);
        const zRotA = yA * Math.sin(rotX) + zA * Math.cos(rotX);

        const phiB = (locB.lat * Math.PI) / 180;
        const thetaB = (locB.lng * Math.PI) / 180 + rotY;
        const xB = Math.cos(phiB) * Math.sin(thetaB);
        const yB = Math.sin(phiB);
        const zB = Math.cos(phiB) * Math.cos(thetaB);
        const yRotB = yB * Math.cos(rotX) - zB * Math.sin(rotX);
        const zRotB = yB * Math.sin(rotX) + zB * Math.cos(rotX);

        if (zRotA > 0.05 && zRotB > 0.05) {
          const sxA = centerX + xA * radius;
          const syA = centerY - yRotA * radius;
          const sxB = centerX + xB * radius;
          const syB = centerY - yRotB * radius;

          ctx.beginPath();
          ctx.moveTo(sxA, syA);
          // Curve arc slightly outwards
          const midX = (sxA + sxB) / 2;
          const midY = (syA + syB) / 2 - 15;
          ctx.quadraticCurveTo(midX, midY, sxB, syB);
          ctx.strokeStyle = 'rgba(215, 168, 61, 0.4)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // 6. Distribution Location Pins (High-Visibility Glowing Golden Markers)
      DISTRIBUTION_LOCATIONS.forEach((loc) => {
        const phi = (loc.lat * Math.PI) / 180;
        const theta = (loc.lng * Math.PI) / 180 + rotY;

        const x3d = Math.cos(phi) * Math.sin(theta);
        const y3d = Math.sin(phi);
        const z3d = Math.cos(phi) * Math.cos(theta);

        const yRot = y3d * Math.cos(rotX) - z3d * Math.sin(rotX);
        const zRot = y3d * Math.sin(rotX) + z3d * Math.cos(rotX);

        // Only draw if facing the camera
        if (zRot > 0) {
          const screenX = centerX + x3d * radius;
          const screenY = centerY - yRot * radius;
          const isSelected = selectedLocation.id === loc.id;
          const isHovered = hoveredLocation?.id === loc.id;

          // Pulse waves for selected pin
          if (isSelected) {
            const time = Date.now() / 600;
            const pulseRadius = 8 + (Math.sin(time) + 1) * 6;
            ctx.beginPath();
            ctx.arc(screenX, screenY, pulseRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(215, 168, 61, 0.35)';
            ctx.fill();
            ctx.strokeStyle = '#FEF08A';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Outer pin border
          ctx.beginPath();
          ctx.arc(screenX, screenY, isSelected ? 7 : isHovered ? 6 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#D7A83D' : isHovered ? '#F59E0B' : '#FFFFFF';
          ctx.shadowColor = '#D7A83D';
          ctx.shadowBlur = isSelected ? 12 : 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner pin center
          ctx.beginPath();
          ctx.arc(screenX, screenY, isSelected ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#071A2B' : '#0284C7';
          ctx.fill();

          // Location Tag Pill for active or hovered
          if (isSelected || isHovered) {
            ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
            const text = `${loc.flag} ${loc.name}`;
            const textWidth = ctx.measureText(text).width;
            const tagX = screenX + 10;
            const tagY = screenY - 10;

            ctx.fillStyle = '#071A2B';
            ctx.beginPath();
            ctx.roundRect(tagX, tagY - 14, textWidth + 14, 20, 6);
            ctx.fill();
            ctx.strokeStyle = '#D7A83D';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            ctx.fillStyle = '#FDE68A';
            ctx.fillText(text, tagX + 7, tagY);
          }
        }
      });

      // 7. Ambient Lighting Specular Highlight
      const specular = ctx.createRadialGradient(
        centerX - radius * 0.45,
        centerY - radius * 0.45,
        radius * 0.05,
        centerX - radius * 0.45,
        centerY - radius * 0.45,
        radius * 0.6
      );
      specular.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      specular.addColorStop(0.5, 'rgba(186, 230, 253, 0.15)');
      specular.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specular;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoSpinning, selectedLocation, hoveredLocation]);

  // Click handler on canvas to detect clicking on a location pin
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) * 0.38;
    const centerX = width / 2;
    const centerY = height / 2;

    const rotX = rotationRef.current.x;
    const rotY = rotationRef.current.y;

    // Check each location distance to mouse
    for (const loc of DISTRIBUTION_LOCATIONS) {
      const phi = (loc.lat * Math.PI) / 180;
      const theta = (loc.lng * Math.PI) / 180 + rotY;

      const x3d = Math.cos(phi) * Math.sin(theta);
      const y3d = Math.sin(phi);
      const z3d = Math.cos(phi) * Math.cos(theta);

      const yRot = y3d * Math.cos(rotX) - z3d * Math.sin(rotX);
      const zRot = y3d * Math.sin(rotX) + z3d * Math.cos(rotX);

      if (zRot > 0) {
        const screenX = centerX + x3d * radius;
        const screenY = centerY - yRot * radius;
        const dist = Math.hypot(mouseX - screenX, mouseY - screenY);

        if (dist < 22) {
          focusLocation(loc, true);
          return;
        }
      }
    }
  };

  // Mouse drag handlers for manual Earth rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) {
      // Check for hover
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;
      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      let found: LocationDetail | null = null;
      for (const loc of DISTRIBUTION_LOCATIONS) {
        const phi = (loc.lat * Math.PI) / 180;
        const theta = (loc.lng * Math.PI) / 180 + rotY;
        const x3d = Math.cos(phi) * Math.sin(theta);
        const y3d = Math.sin(phi);
        const z3d = Math.cos(phi) * Math.cos(theta);
        const yRot = y3d * Math.cos(rotX) - z3d * Math.sin(rotX);
        const zRot = y3d * Math.sin(rotX) + z3d * Math.cos(rotX);
        if (zRot > 0) {
          const screenX = centerX + x3d * radius;
          const screenY = centerY - yRot * radius;
          if (Math.hypot(mouseX - screenX, mouseY - screenY) < 18) {
            found = loc;
            break;
          }
        }
      }
      setHoveredLocation(found);
      return;
    }

    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(
      -Math.PI / 2.5,
      Math.min(Math.PI / 2.5, targetRotationRef.current.x + deltaY * 0.008)
    );

    rotationRef.current.y = targetRotationRef.current.y;
    rotationRef.current.x = targetRotationRef.current.x;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="relative bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#BAE6FD]/40 text-[#07263F] py-16 sm:py-24 border-t border-[#BAE6FD] overflow-hidden">
      {/* Background Golden Circuit / Radial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="earthGridGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#D7A83D" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#earthGridGlow)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Light Blue & Golden Badges */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D7A83D]/60 shadow-sm backdrop-blur-md">
            <Globe2 className="w-4 h-4 text-[#D7A83D]" />
            <span className="text-xs font-bold text-[#92400E] uppercase tracking-wider">
              Interactive 3D Earth Network · Live Hub Locations
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
            Explore Global & Domestic{' '}
            <span className="bg-gradient-to-r from-[#B45309] via-[#D7A83D] to-[#F59E0B] bg-clip-text text-transparent">
              Distribution Corridors
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Click on any glowing pin on Earth or select a hub below to inspect active distributors, brand listings, average gross margins, and trade corridor transit times in real time.
          </p>
        </div>

        {/* Quick Location Pills Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {DISTRIBUTION_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => focusLocation(loc, true)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#071A2B] text-white border-[#D7A83D] shadow-md scale-105'
                    : 'bg-white/80 hover:bg-white text-slate-700 hover:text-[#071A2B] border-[#BAE6FD] hover:border-[#D7A83D]/60 shadow-xs'
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.name.split('&')[0]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#D7A83D] text-[#071A2B]' : 'bg-[#E0F2FE] text-[#0284C7]'
                  }`}
                >
                  {loc.activeDistributors}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage: 3D Earth + Interactive Location Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/70 backdrop-blur-md rounded-3xl border-2 border-[#BAE6FD] shadow-2xl p-6 sm:p-10 relative">
          {/* Earth Canvas Column (Lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px]">
            {/* Interactive Tool Overlay Buttons */}
            <div className="absolute top-2 left-2 z-20 flex items-center gap-2">
              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white border border-[#BAE6FD] hover:border-[#D7A83D] text-[#071A2B] text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
                title="Toggle Earth Auto-Rotation"
              >
                {isAutoSpinning ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#D7A83D]" />
                    <span>Pause Spin</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#D7A83D]" />
                    <span>Auto Spin</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  targetRotationRef.current = { x: 0.35, y: -1.7 };
                }}
                className="p-1.5 rounded-xl bg-white/90 hover:bg-white border border-[#BAE6FD] hover:border-[#D7A83D] text-[#071A2B] text-xs font-bold shadow-sm cursor-pointer transition-all active:scale-95"
                title="Reset Earth View"
              >
                <RotateCw className="w-4 h-4 text-[#0284C7]" />
              </button>
            </div>

            <div className="absolute bottom-2 left-2 z-20 text-[11px] font-medium text-slate-500 bg-white/80 px-2.5 py-1 rounded-lg border border-[#BAE6FD]">
              🖱️ Drag to rotate 3D Earth · Click pins for location details
            </div>

            {/* Canvas Earth Globe */}
            <canvas
              ref={canvasRef}
              width={520}
              height={520}
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full max-w-[420px] sm:max-w-[500px] aspect-square cursor-grab active:cursor-grabbing select-none"
              style={{ touchAction: 'none' }}
            />
          </div>

          {/* Location Details Inspector Column (Lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-[#F0F9FF] to-white rounded-2xl border-2 border-[#D7A83D]/40 p-5 sm:p-7 shadow-lg space-y-5">
            {/* Header: Flag, Name, Tier */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-label="Flag">
                  {selectedLocation.flag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-[#92400E] border border-[#D7A83D] text-[10px] font-black uppercase tracking-wider">
                  {selectedLocation.tier}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#071A2B] mt-1 leading-snug">
                {selectedLocation.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-[#0284C7] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#D7A83D]" />
                <span>{selectedLocation.stateOrCountry}</span>
                <span className="text-slate-400">·</span>
                <span>{selectedLocation.region}</span>
              </div>
            </div>

            {/* Quick Metrics Badges (Distributors & Brands) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white border border-[#BAE6FD] shadow-xs text-left">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Warehouse className="w-3 h-3 text-[#0284C7]" />
                  <span>Verified Distributors</span>
                </div>
                <div className="text-lg font-black text-[#071A2B] mt-0.5">
                  {selectedLocation.activeDistributors}+
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">Active in Directory</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#BAE6FD] shadow-xs text-left">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#D7A83D]" />
                  <span>Brand Opportunities</span>
                </div>
                <div className="text-lg font-black text-[#071A2B] mt-0.5">
                  {selectedLocation.brandOpportunities}+
                </div>
                <div className="text-[10px] text-[#D7A83D] font-semibold">Seeking Partners</div>
              </div>
            </div>

            {/* Key Commercial Terms Grid */}
            <div className="p-3.5 rounded-xl bg-[#E0F2FE]/50 border border-[#BAE6FD] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#D7A83D]" />
                  <span>Average Distributor Margin:</span>
                </span>
                <span className="font-bold text-[#071A2B] bg-white px-2 py-0.5 rounded border border-[#BAE6FD]">
                  {selectedLocation.averageMargin}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Min. Investment Spread:</span>
                </span>
                <span className="font-bold text-[#071A2B] bg-white px-2 py-0.5 rounded border border-[#BAE6FD]">
                  {selectedLocation.minInvestment}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Fulfillment Transit Time:</span>
                </span>
                <span className="font-bold text-[#071A2B] bg-white px-2 py-0.5 rounded border border-[#BAE6FD]">
                  {selectedLocation.leadTime}
                </span>
              </div>
            </div>

            {/* Warehouse Capacity & Corridor Specs */}
            <div className="text-xs space-y-1.5 text-left">
              <div className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Primary Logistics Arteries:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedLocation.corridorRoutes.slice(0, 3).map((route) => (
                  <span
                    key={route}
                    className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px] font-medium"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Categories In-Demand */}
            <div className="text-xs space-y-1.5 text-left">
              <div className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#D7A83D]" />
                <span>Top In-Demand Categories:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedLocation.topCategories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-0.5 rounded bg-[#FEF08A]/70 text-[#78350F] border border-[#FDE68A] text-[10px] font-bold"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/opportunities');
                  }
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Browse {selectedLocation.name.split('&')[0]} Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/distributors');
                  }
                }}
                className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#071A2B] font-bold text-xs border border-[#BAE6FD] hover:border-[#D7A83D] transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Find Distributors</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveEarthSection;
