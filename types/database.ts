export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          name: string;
          type: string;
          description: string;
          rating: number;
          status: string;
          created_at: string;
          updated_at: string;
          owner_id: string;
          price: number;
          currency: string;
          images: string[];
          address_id?: string;
          permit_id?: string;
        };
        Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['properties']['Insert']>;
      };
      property_addresses: {
        Row: {
          id: string;
          property_id: string;
          street: string;
          city: string;
          country: string;
          postal_code?: string;
          latitude?: number;
          longitude?: number;
        };
        Insert: Omit<Database['public']['Tables']['property_addresses']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['property_addresses']['Insert']>;
      };
      room_type: {
        Row: {
          id: string;
          property_id: string;
          type: string;
          capacity: number;
          price: number;
          currency: string;
          description?: string;
        };
        Insert: Omit<Database['public']['Tables']['room_type']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['room_type']['Insert']>;
      };
      room_pricing: {
        Row: {
          id: string;
          room_id: string;
          date: string;
          price: number;
          currency: string;
          available: boolean;
        };
        Insert: Omit<Database['public']['Tables']['room_pricing']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['room_pricing']['Insert']>;
      };
      ratings: {
        Row: {
          id: string;
          property_id: string;
          user_id: string;
          rating: number;
          comment?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ratings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['ratings']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          role: string;
          phone_number?: string;
          business_name?: string;
          address?: string;
          city?: string;
          country?: string;
          terms?: boolean;
          oauth_provider?: string;
          bio?: string;
          identification?: number;
          points?: number;
          qr_code?: string;
          card_level?: string;
          first_name?: string;
          last_name?: string;
          status?: string;
          subrole?: string;
          jobtitle?: string;
          idnumber?: string;
          jobstatus?: string;
          isEmployee?: boolean;
          employee_number?: string;
          job_avatar?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
    };
  };
};