import { supabase } from './supabaseClient'

export async function getMyMemberships() {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user.id
  if (!userId) return []

  const { data, error } = await supabase
    .from('user_brand_memberships')
    .select('id, membership_role, status, brand_id, brands(id, code, name, brand_type)')
    .eq('user_id', userId)
    .eq('status', 'active')

  if (error) throw error
  return data ?? []
}

export async function getMyAppAccess() {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user.id
  if (!userId) return []

  const { data, error } = await supabase
    .from('app_access')
    .select('id, app_code, access_role, status')
    .eq('user_id', userId)
    .eq('status', 'active')

  if (error) throw error
  return data ?? []
}

export async function hasAccess(appCode: string) {
  const access = await getMyAppAccess()
  return access.some((row) => row.app_code === appCode)
}
