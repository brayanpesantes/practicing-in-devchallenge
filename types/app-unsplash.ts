export type Photo = {
  id: string;
  description: string;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: User;
  related_collections: RelatedCollections;
  created_at: string;
  links: Link;
};

export interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name?: string;
  portfolio_url?: string;
  bio?: string;
  location?: string;
  links: Link;
  profile_image: ProfileImage;
  total_collections: number;
  total_likes: number;
  total_photos: number;
}
export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}
export interface Link {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface RelatedCollections {
  total: number;
  type: string;
  results: Result[];
}

export interface Result {
  id: string;
  title: string;
  last_collected_at: string;
  updated_at: string;
  featured: boolean;
  total_photos: number;
  cover_photo: {
    urls: Urls;
  };
  user: User;
}
export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
