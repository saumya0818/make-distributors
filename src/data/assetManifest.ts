export interface AssetMetadata {
  asset_id: string;
  asset_name: string;
  purpose: string;
  section: string;
  description: string;
  file_path: string;
  alt_text: string;
  fallback_type: 'svg-network' | 'gradient-mesh' | 'role-badge' | 'category-abstract';
  dimensions: { width: number; height: number };
  generated_at: string;
}

export const ASSET_MANIFEST: Record<string, AssetMetadata> = {
  // Hero Central Network Hub
  'hero-central-hub': {
    asset_id: 'hero-central-hub',
    asset_name: 'Make Distributors Central Network Hub Medallion',
    purpose: 'Central glowing illuminated distribution network hub with MD monogram and circuit board routes',
    section: 'Hero',
    description: 'Radiant metallic circular emblem featuring stylized MD monogram with glowing electric cyan and gold circuit route nodes and light particles',
    file_path: '/src/assets/images/hero_central_hub_1790224023047.jpg',
    alt_text: 'Make Distributors business distribution network central hub',
    fallback_type: 'svg-network',
    dimensions: { width: 600, height: 600 },
    generated_at: '2026-03-24T04:27:11Z',
  },

  // Hero Floating Image 1: Manufacturer
  'hero-manufacturer-factory': {
    asset_id: 'hero-manufacturer-factory',
    asset_name: 'Manufacturer Factory Facility',
    purpose: 'Hero floating 3D asset representing industrial manufacturers',
    section: 'Hero (Upper Right)',
    description: 'Modern blue and white manufacturing factory building with production line architecture in clean 3D isometric render',
    file_path: '/src/assets/images/hero_manufacturer_factory_1790224040673.jpg',
    alt_text: 'Manufacturer factory in the Make Distributors network',
    fallback_type: 'role-badge',
    dimensions: { width: 512, height: 512 },
    generated_at: '2026-03-24T04:27:23Z',
  },

  // Hero Floating Image 2: Brand Product
  'hero-brand-product-package': {
    asset_id: 'hero-brand-product-package',
    asset_name: 'Brand Product Package & Bottle',
    purpose: 'Hero floating 3D asset representing consumer product brands',
    section: 'Hero (Upper Left)',
    description: 'Premium generic unbranded light blue product carton package box and cosmetic bottle ready for distribution',
    file_path: '/src/assets/images/hero_brand_product_package_1790224052078.jpg',
    alt_text: 'Brand product package ready for distribution',
    fallback_type: 'role-badge',
    dimensions: { width: 512, height: 512 },
    generated_at: '2026-03-24T04:27:39Z',
  },

  // Hero Floating Image 3: Wholesaler
  'hero-wholesaler-warehouse': {
    asset_id: 'hero-wholesaler-warehouse',
    asset_name: 'Wholesaler Warehouse Shelves',
    purpose: 'Hero floating 3D asset representing regional wholesale stockists',
    section: 'Hero (Middle Right)',
    description: 'Organized warehouse inventory shelving with neatly stacked product cartons and pallets in 3D isometric view',
    file_path: '/src/assets/images/hero_wholesaler_warehouse_1790224068006.jpg',
    alt_text: 'Wholesaler warehouse and inventory',
    fallback_type: 'role-badge',
    dimensions: { width: 512, height: 512 },
    generated_at: '2026-03-24T04:27:53Z',
  },

  // Hero Floating Image 4: Supplier
  'hero-supplier-shipment': {
    asset_id: 'hero-supplier-shipment',
    asset_name: 'Supplier Shipment & Quotation',
    purpose: 'Hero floating 3D asset representing raw and packaging suppliers',
    section: 'Hero (Lower Left)',
    description: 'B2B shipment cartons with glowing digital quotation document sheet and connected dotted supply route line',
    file_path: '/src/assets/images/hero_supplier_shipment_1790224082419.jpg',
    alt_text: 'Supplier shipment and quotation workflow',
    fallback_type: 'role-badge',
    dimensions: { width: 512, height: 512 },
    generated_at: '2026-03-24T04:28:06Z',
  },

  // Hero Floating Image 5: Distributor
  'hero-distributor-delivery': {
    asset_id: 'hero-distributor-delivery',
    asset_name: 'Distributor Delivery Van & Pin',
    purpose: 'Hero floating 3D asset representing route distributors',
    section: 'Hero (Lower Right)',
    description: 'Small commercial blue delivery van truck carrying cartons accompanied by a glowing 3D location map pin marker',
    file_path: '/src/assets/images/hero_distributor_delivery_1790224094988.jpg',
    alt_text: 'Distributor delivery vehicle and location route',
    fallback_type: 'role-badge',
    dimensions: { width: 512, height: 512 },
    generated_at: '2026-03-24T04:28:19Z',
  },

  // Hero Floating Image 6: Business Partnership
  'hero-business-partnership': {
    asset_id: 'hero-business-partnership',
    asset_name: 'Verified Business Partnership Cards',
    purpose: 'Hero floating 3D asset representing verified mutual trade contracts',
    section: 'Hero (Center Right)',
    description: 'Two sleek commercial business profile cards connected by an illuminated agreement verification shield and handshake',
    file_path: '/src/assets/images/hero_business_partnership_1790224106581.jpg',
    alt_text: 'Verified business partnership connection',
    fallback_type: 'role-badge',
    dimensions: { width: 512, height: 512 },
    generated_at: '2026-03-24T04:28:42Z',
  },

  // Panoramic Complete Distribution Network Scene
  'network-panoramic-scene': {
    asset_id: 'network-panoramic-scene',
    asset_name: 'Every Business Partner Connected Scene',
    purpose: 'Wide panoramic illustration for the trade architecture section below categories',
    section: 'Every Business Partner Connected',
    description: 'Wide panoramic illustration of factory to supplier to wholesaler to distributor van to retail shop across a stylized distribution map',
    file_path: '/src/assets/images/network_panoramic_scene_1790224130839.jpg',
    alt_text: 'End-to-end B2B distribution pipeline and route logistics',
    fallback_type: 'svg-network',
    dimensions: { width: 1200, height: 675 },
    generated_at: '2026-03-24T04:28:54Z',
  },
};
