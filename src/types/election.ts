export interface PartyData {
  id: number; number: number; name: string; slogan: string; logo_url: string;
  instagram_url: string; president_name: string; president_photo_url: string | null;
  votes: number; color_theme: "gold" | "red"; color_hex: string;
}

export interface SpecialVote { id: string; label: string; votes: number; color: string; }
export interface Booth { id: number; winner: "party1" | "party2" | null; }
export interface Settings {
  school_name: string; school_subtitle: string; school_year: string; school_logo_url: string;
  total_voters: number; booths_total: number; booths_counted: number; is_live: boolean;
}
