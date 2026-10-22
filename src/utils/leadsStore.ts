export interface LeadItem {
  id: string;
  type: 'parceiro' | 'contato';
  name: string;
  contact: string;
  email?: string;
  phone?: string;
  cityState?: string;
  message?: string;
  createdAt: string;
  read?: boolean;
}

const STORAGE_KEY = 'valacios_leads_records_v1';

const INITIAL_DEMO_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    type: 'parceiro',
    name: 'Café & Delícias do Sul',
    contact: '+1 (312) 555-0192',
    phone: '+1 (312) 555-0192',
    cityState: 'Chicago, IL',
    message: 'Gostaria de colocar os pães de queijo e os waffles no cardápio matinal da nossa cafeteria.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    read: false,
  },
  {
    id: 'lead-2',
    type: 'parceiro',
    name: 'Mercado Latino Aurora',
    contact: '+1 (630) 555-0144',
    phone: '+1 (630) 555-0144',
    cityState: 'Aurora, IL',
    message: 'Temos interesse na linha de congelados para revenda no freezer.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    read: true,
  },
  {
    id: 'lead-3',
    type: 'contato',
    name: 'Mariana Silva',
    contact: 'mariana.silva@gmail.com',
    email: 'mariana.silva@gmail.com',
    message: 'Experimentei o pão de queijo com goiabada em Naperville e achei fantástico! Onde encontro no atacado?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: false,
  },
];

export function getLeads(): LeadItem[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse leads from storage', err);
    return INITIAL_DEMO_LEADS;
  }
}

export function saveLead(leadData: Omit<LeadItem, 'id' | 'createdAt'>): LeadItem {
  const current = getLeads();
  const newLead: LeadItem = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };

  const updated = [newLead, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('valacios-leads-updated'));
  } catch (err) {
    console.error('Failed to save lead', err);
  }
  return newLead;
}

export function deleteLead(id: string): void {
  const current = getLeads();
  const filtered = current.filter((l) => l.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('valacios-leads-updated'));
  } catch (err) {
    console.error('Failed to delete lead', err);
  }
}

export function markLeadAsRead(id: string, read: boolean = true): void {
  const current = getLeads();
  const updated = current.map((l) => (l.id === id ? { ...l, read } : l));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('valacios-leads-updated'));
  } catch (err) {
    console.error('Failed to update lead status', err);
  }
}

export function clearAllLeads(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('valacios-leads-updated'));
  } catch (err) {
    console.error('Failed to clear leads', err);
  }
}
