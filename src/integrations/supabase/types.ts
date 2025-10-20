export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      medication_logs: {
        Row: {
          created_at: string
          id: string
          reminder_scheduled_for: string | null
          taken_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reminder_scheduled_for?: string | null
          taken_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reminder_scheduled_for?: string | null
          taken_at?: string
          user_id?: string
        }
        Relationships: []
      }
      moderation_flags: {
        Row: {
          created_at: string | null
          id: string
          reason: string | null
          reply_id: string | null
          reporter_user_id: string | null
          status: string | null
          thread_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reason?: string | null
          reply_id?: string | null
          reporter_user_id?: string | null
          status?: string | null
          thread_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reason?: string | null
          reply_id?: string | null
          reporter_user_id?: string | null
          status?: string | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_flags_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "thread_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_flags_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      thread_replies: {
        Row: {
          alias_id: string
          content: string
          created_at: string | null
          id: string
          mood: Database["public"]["Enums"]["mood_type"] | null
          thread_id: string
          user_id: string
        }
        Insert: {
          alias_id: string
          content: string
          created_at?: string | null
          id?: string
          mood?: Database["public"]["Enums"]["mood_type"] | null
          thread_id: string
          user_id: string
        }
        Update: {
          alias_id?: string
          content?: string
          created_at?: string | null
          id?: string
          mood?: Database["public"]["Enums"]["mood_type"] | null
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "thread_replies_alias_id_fkey"
            columns: ["alias_id"]
            isOneToOne: false
            referencedRelation: "user_aliases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thread_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      threads: {
        Row: {
          alias_id: string
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_flagged: boolean | null
          is_under_review: boolean | null
          mood: Database["public"]["Enums"]["mood_type"]
          tag: Database["public"]["Enums"]["thread_tag"] | null
          updated_at: string | null
          user_id: string
          warm_replies_count: number | null
        }
        Insert: {
          alias_id: string
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_flagged?: boolean | null
          is_under_review?: boolean | null
          mood: Database["public"]["Enums"]["mood_type"]
          tag?: Database["public"]["Enums"]["thread_tag"] | null
          updated_at?: string | null
          user_id: string
          warm_replies_count?: number | null
        }
        Update: {
          alias_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_flagged?: boolean | null
          is_under_review?: boolean | null
          mood?: Database["public"]["Enums"]["mood_type"]
          tag?: Database["public"]["Enums"]["thread_tag"] | null
          updated_at?: string | null
          user_id?: string
          warm_replies_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "threads_alias_id_fkey"
            columns: ["alias_id"]
            isOneToOne: false
            referencedRelation: "user_aliases"
            referencedColumns: ["id"]
          },
        ]
      }
      user_aliases: {
        Row: {
          alias: string
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          alias: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          alias?: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_unique_alias: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      mood_type:
        | "hopeful"
        | "grateful"
        | "angry"
        | "tired"
        | "healing"
        | "resilient"
      thread_tag:
        | "treatment_wins"
        | "faith_and_healing"
        | "just_venting"
        | "none"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      mood_type: [
        "hopeful",
        "grateful",
        "angry",
        "tired",
        "healing",
        "resilient",
      ],
      thread_tag: [
        "treatment_wins",
        "faith_and_healing",
        "just_venting",
        "none",
      ],
    },
  },
} as const
