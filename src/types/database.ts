// Manual database types since auto-generated types are not synced

export type MoodType = 'hopeful' | 'grateful' | 'angry' | 'tired' | 'healing' | 'resilient';
export type ThreadTag = 'none' | 'question' | 'story' | 'support' | 'resource';

export interface MedicationLog {
  id: string;
  user_id: string;
  taken_at: string;
  reminder_scheduled_for: string | null;
  created_at: string;
}

export interface UserAlias {
  id: string;
  user_id: string | null;
  alias: string;
  created_at: string;
}

export interface Thread {
  id: string;
  user_id: string;
  alias_id: string;
  content: string;
  mood: MoodType;
  tag: ThreadTag;
  warm_replies_count: number;
  is_flagged: boolean;
  is_approved: boolean;
  is_under_review: boolean;
  created_at: string;
  updated_at: string;
  user_aliases?: { alias: string };
}

export interface ThreadReply {
  id: string;
  thread_id: string;
  user_id: string;
  alias_id: string;
  content: string;
  mood: MoodType | null;
  created_at: string;
  user_aliases?: { alias: string };
}

export interface ModerationFlag {
  id: string;
  thread_id: string | null;
  reply_id: string | null;
  reporter_user_id: string | null;
  reason: string | null;
  status: string;
  created_at: string;
}
