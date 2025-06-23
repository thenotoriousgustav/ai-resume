export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cover_letters: {
        Row: {
          content: string
          created_at: string | null
          generated_at: string | null
          id: string
          job_application_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          generated_at?: string | null
          id?: string
          job_application_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          generated_at?: string | null
          id?: string
          job_application_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applied_at: string | null
          company: string
          country: string
          created_at: string
          currency: string
          description: string
          id: string
          is_favorite: boolean
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          position: string
          priority: Database["public"]["Enums"]["job_priority"] | null
          resume_id: string | null
          salary: number | null
          source_url: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_at?: string | null
          company: string
          country?: string
          created_at?: string
          currency?: string
          description?: string
          id?: string
          is_favorite?: boolean
          job_type?: Database["public"]["Enums"]["job_type"]
          location: string
          position: string
          priority?: Database["public"]["Enums"]["job_priority"] | null
          resume_id?: string | null
          salary?: number | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_at?: string | null
          company?: string
          country?: string
          created_at?: string
          currency?: string
          description?: string
          id?: string
          is_favorite?: boolean
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: string
          position?: string
          priority?: Database["public"]["Enums"]["job_priority"] | null
          resume_id?: string | null
          salary?: number | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_analysis: {
        Row: {
          analysis_date: string | null
          career_recommendation: string | null
          created_at: string | null
          id: string
          keywords: Json
          language: string | null
          overall_impression: string
          overall_score: number
          raw_analysis_data: Json
          resume_id: string
          sections: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_date?: string | null
          career_recommendation?: string | null
          created_at?: string | null
          id?: string
          keywords?: Json
          language?: string | null
          overall_impression: string
          overall_score: number
          raw_analysis_data: Json
          resume_id: string
          sections?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_date?: string | null
          career_recommendation?: string | null
          created_at?: string | null
          id?: string
          keywords?: Json
          language?: string | null
          overall_impression?: string
          overall_score?: number
          raw_analysis_data?: Json
          resume_id?: string
          sections?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string
          description: string
          extracted_text: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          is_active: boolean
          storage_path: string
          storage_url: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          extracted_text?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          is_active?: boolean
          storage_path: string
          storage_url: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          extracted_text?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          is_active?: boolean
          storage_path?: string
          storage_url?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resumes_builder: {
        Row: {
          certifications: Json
          created_at: string
          education: Json
          experiences: Json
          id: string
          objective: string | null
          personal_info: Json
          skills: Json
          template: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certifications?: Json
          created_at?: string
          education?: Json
          experiences?: Json
          id?: string
          objective?: string | null
          personal_info?: Json
          skills?: Json
          template?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certifications?: Json
          created_at?: string
          education?: Json
          experiences?: Json
          id?: string
          objective?: string | null
          personal_info?: Json
          skills?: Json
          template?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      targeted_resume_analysis: {
        Row: {
          created_at: string | null
          id: string
          job_application_id: string
          job_title_missing: Json | null
          keywords_missing: string[] | null
          keywords_present: string[] | null
          keywords_suggestions: string[] | null
          match_score: number | null
          resume_id: string
          suggestions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_application_id: string
          job_title_missing?: Json | null
          keywords_missing?: string[] | null
          keywords_present?: string[] | null
          keywords_suggestions?: string[] | null
          match_score?: number | null
          resume_id: string
          suggestions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_application_id?: string
          job_title_missing?: Json | null
          keywords_missing?: string[] | null
          keywords_present?: string[] | null
          keywords_suggestions?: string[] | null
          match_score?: number | null
          resume_id?: string
          suggestions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      job_priority: "low" | "medium" | "high"
      job_status: "applied" | "interview" | "offer" | "rejected" | "accepted"
      job_type:
        | "full_time"
        | "part_time"
        | "contract"
        | "temporary"
        | "internship"
        | "remote"
        | "hybrid"
        | "freelance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      job_priority: ["low", "medium", "high"],
      job_status: ["applied", "interview", "offer", "rejected", "accepted"],
      job_type: [
        "full_time",
        "part_time",
        "contract",
        "temporary",
        "internship",
        "remote",
        "hybrid",
        "freelance",
      ],
    },
  },
} as const
