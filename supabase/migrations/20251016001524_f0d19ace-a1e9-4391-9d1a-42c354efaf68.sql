-- Create mood enum type
CREATE TYPE public.mood_type AS ENUM ('hopeful', 'grateful', 'angry', 'tired', 'healing', 'resilient');

-- Create thread tags enum
CREATE TYPE public.thread_tag AS ENUM ('treatment_wins', 'faith_and_healing', 'just_venting', 'none');

-- Create user aliases table (anonymous usernames)
CREATE TABLE public.user_aliases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  alias text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.user_aliases ENABLE ROW LEVEL SECURITY;

-- Create threads table
CREATE TABLE public.threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alias_id uuid REFERENCES public.user_aliases(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL CHECK (char_length(content) <= 280),
  mood mood_type NOT NULL,
  tag thread_tag DEFAULT 'none',
  warm_replies_count integer DEFAULT 0,
  is_flagged boolean DEFAULT false,
  is_under_review boolean DEFAULT false,
  is_approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;

-- Create thread replies table
CREATE TABLE public.thread_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid REFERENCES public.threads(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alias_id uuid REFERENCES public.user_aliases(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL CHECK (char_length(content) <= 280),
  mood mood_type,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.thread_replies ENABLE ROW LEVEL SECURITY;

-- Create moderation flags table
CREATE TABLE public.moderation_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid REFERENCES public.threads(id) ON DELETE CASCADE,
  reply_id uuid REFERENCES public.thread_replies(id) ON DELETE CASCADE,
  reporter_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reason text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CHECK (thread_id IS NOT NULL OR reply_id IS NOT NULL)
);

ALTER TABLE public.moderation_flags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_aliases
CREATE POLICY "Users can view their own alias"
  ON public.user_aliases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alias"
  ON public.user_aliases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alias"
  ON public.user_aliases FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for threads
CREATE POLICY "Anyone can view approved threads"
  ON public.threads FOR SELECT
  USING (is_approved = true AND is_under_review = false);

CREATE POLICY "Users can create threads"
  ON public.threads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own threads"
  ON public.threads FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own threads"
  ON public.threads FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for thread_replies
CREATE POLICY "Anyone can view replies on approved threads"
  ON public.thread_replies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.threads
      WHERE threads.id = thread_replies.thread_id
      AND threads.is_approved = true
      AND threads.is_under_review = false
    )
  );

CREATE POLICY "Users can create replies"
  ON public.thread_replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies"
  ON public.thread_replies FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for moderation_flags
CREATE POLICY "Users can create moderation flags"
  ON public.moderation_flags FOR INSERT
  WITH CHECK (auth.uid() = reporter_user_id);

CREATE POLICY "Users can view their own flags"
  ON public.moderation_flags FOR SELECT
  USING (auth.uid() = reporter_user_id);

-- Function to auto-generate unique alias
CREATE OR REPLACE FUNCTION public.generate_unique_alias()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  adjectives text[] := ARRAY['Sunrise', 'Moonlight', 'Gentle', 'Peaceful', 'Healing', 'Brave', 'Warm', 'Kind', 'Strong', 'Hope'];
  new_alias text;
  counter integer;
BEGIN
  counter := floor(random() * 99 + 1)::integer;
  new_alias := adjectives[floor(random() * array_length(adjectives, 1) + 1)] || counter::text;
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM public.user_aliases WHERE alias = new_alias) LOOP
    counter := floor(random() * 99 + 1)::integer;
    new_alias := adjectives[floor(random() * array_length(adjectives, 1) + 1)] || counter::text;
  END LOOP;
  
  RETURN new_alias;
END;
$$;

-- Trigger to auto-create alias for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_alias()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_aliases (user_id, alias)
  VALUES (NEW.id, public.generate_unique_alias());
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_alias
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_alias();

-- Function to update thread updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_thread_timestamp()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_threads_updated_at
  BEFORE UPDATE ON public.threads
  FOR EACH ROW EXECUTE FUNCTION public.update_thread_timestamp();

-- Function to increment warm replies count
CREATE OR REPLACE FUNCTION public.increment_warm_replies()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.threads
  SET warm_replies_count = warm_replies_count + 1
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_thread_reply_created
  AFTER INSERT ON public.thread_replies
  FOR EACH ROW EXECUTE FUNCTION public.increment_warm_replies();