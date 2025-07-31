import { supabase } from './client.js'

export async function fetchMissions() {
  const { data, error } = await supabase.from('missions').select('*')
  if (error) console.error('Fetch Error:', error)
  return data
}

export async function addMission(mission) {
  const { data, error } = await supabase.from('missions').insert([mission])
  if (error) console.error('Insert Error:', error)
  return data
}
