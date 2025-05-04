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
      job_applications: {
        Row: {
          applied_at: string | null
          company: string | null
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          position: string | null
          priority: string | null
          resume_used: string | null
          salary: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          applied_at?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          position?: string | null
          priority?: string | null
          resume_used?: string | null
          salary?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          applied_at?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          position?: string | null
          priority?: string | null
          resume_used?: string | null
          salary?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      resume_analyses: {
        Row: {
          created_at: string | null
          education: Json | null
          experience: Json | null
          id: string
          improvement_suggestions: string[] | null
          keywords_detected: string[] | null
          missing_keywords: string[] | null
          resume_id: string | null
          score: number | null
          skills: Json | null
          strengths: string[] | null
          updated_at: string | null
          weaknesses: string[] | null
        }
        Insert: {
          created_at?: string | null
          education?: Json | null
          experience?: Json | null
          id?: string
          improvement_suggestions?: string[] | null
          keywords_detected?: string[] | null
          missing_keywords?: string[] | null
          resume_id?: string | null
          score?: number | null
          skills?: Json | null
          strengths?: string[] | null
          updated_at?: string | null
          weaknesses?: string[] | null
        }
        Update: {
          created_at?: string | null
          education?: Json | null
          experience?: Json | null
          id?: string
          improvement_suggestions?: string[] | null
          keywords_detected?: string[] | null
          missing_keywords?: string[] | null
          resume_id?: string | null
          score?: number | null
          skills?: Json | null
          strengths?: string[] | null
          updated_at?: string | null
          weaknesses?: string[] | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string | null
          description: string | null
          extracted_text: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          storage_path: string
          storage_url: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          extracted_text?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          storage_path: string
          storage_url: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          extracted_text?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          storage_path?: string
          storage_url?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      resumes_builder: {
        Row: {
          awards: Json[]
          certifications: Json[]
          created_at: string | null
          education: Json[]
          experiences: Json[]
          id: string
          objective: string | null
          organizations: Json[]
          personalInfo: Json
          skills: Json[]
          template: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          awards?: Json[]
          certifications?: Json[]
          created_at?: string | null
          education?: Json[]
          experiences?: Json[]
          id?: string
          objective?: string | null
          organizations?: Json[]
          personalInfo?: Json
          skills?: Json[]
          template?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          awards?: Json[]
          certifications?: Json[]
          created_at?: string | null
          education?: Json[]
          experiences?: Json[]
          id?: string
          objective?: string | null
          organizations?: Json[]
          personalInfo?: Json
          skills?: Json[]
          template?: string
          updated_at?: string | null
          user_id?: string
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
