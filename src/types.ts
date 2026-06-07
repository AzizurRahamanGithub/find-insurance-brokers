
import { LucideIcon } from 'lucide-react';
import { style } from 'framer-motion/client';

export type PropertyType =
  | "Moto"
  | "Home"
  | "Life & Health"
  | "Travel"
  | "Pet"
  | "Business"
  | "Specialist"
  | "Financial";

export interface PropertyData {
  id: number;
  // description?: string;
  property_type?: PropertyType;
  image?: string;
  quote_link?: string;
  recommended?: boolean;
  rating?: string;
  views_count?: number;
  sub_category?: {
    id: number;
    title: string;
  };
  features?: {
    id: number;
    title: string;
    description?: string;
  }[];
  created_at?: string;
}

export interface PaginationData {
  total_count: number;
  total_pages: number;
  current_page: number;
  limit: number;
}

export interface SubCategoryData {
  id: number;
  title: string;
  property_type: string;
  quote_link?: string;
  created_at?: string;
}


