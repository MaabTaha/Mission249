import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jlvvaebqwerlozlrnfqn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnZhZWJxd2VybG96bHJuZnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MzA2MTUsImV4cCI6MjA2OTQwNjYxNX0.W3T5DR3EBKFHQmCq1y1vjCauK_jqnjlimkQuHA9PVC0'

export const supabase = createClient(supabaseUrl, supabaseKey)
