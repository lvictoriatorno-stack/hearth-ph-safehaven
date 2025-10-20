-- Create table for ART medication tracking
CREATE TABLE public.medication_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  taken_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reminder_scheduled_for TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for medication logs
CREATE POLICY "Users can view their own medication logs"
ON public.medication_logs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medication logs"
ON public.medication_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medication logs"
ON public.medication_logs
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medication logs"
ON public.medication_logs
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_medication_logs_user_id ON public.medication_logs(user_id);
CREATE INDEX idx_medication_logs_taken_at ON public.medication_logs(taken_at);