import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Download,
  Copy,
  Check,
  Printer,
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Inbox,
  Store,
  MessageSquare,
  Trash2,
  ExternalLink,
  Search,
  FileSpreadsheet,
  CheckCheck,
  AlertTriangle,
  X,
} from 'lucide-react';
import { getLeads, deleteLead, markLeadAsRead, clearAllLeads, LeadItem } from '../utils/leadsStore';

interface AdminQrCodePageProps {
  onBackToHome: () => void;
}

export const AdminQrCodePage: React.FC<AdminQrCodePageProps> = ({ onBackToHome }) => {
  // Navigation tabs: 'qrcode' vs 'leads'
  const [activeTab, setActiveTab] = useState<'qrcode' | 'leads'>('leads');

  // Determine the default official domain URL (origin + pathname, excluding any #/admin hash)
  const defaultUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/`
    : 'https://valacios.com.br';

  const [targetUrl, setTargetUrl] = useState<string>(defaultUrl);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [qrSize, setQrSize] = useState<number>(360);
  const [fgColor, setFgColor] = useState<string>('#412213');
  const [includeMargin, setIncludeMargin] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Leads CRM State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [leadFilter, setLeadFilter] = useState<'all' | 'parceiro' | 'contato'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null);
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<LeadItem | 'all' | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteConfirmTarget) return;

    if (deleteConfirmTarget === 'all') {
      clearAllLeads();
      setLeads([]);
    } else {
      deleteLead(deleteConfirmTarget.id);
      setLeads((prev) => prev.filter((l) => l.id !== deleteConfirmTarget.id));
    }
    setDeleteConfirmTarget(null);
  };

  // Load and listen to leads
  useEffect(() => {
    const updateLeads = () => {
      setLeads(getLeads());
    };
    updateLeads();

    window.addEventListener('valacios-leads-updated', updateLeads);
    return () => window.removeEventListener('valacios-leads-updated', updateLeads);
  }, []);

  // Generate QR Code whenever targetUrl, size, or color changes
  useEffect(() => {
    if (!targetUrl) return;

    QRCode.toDataURL(
      targetUrl,
      {
        width: qrSize,
        margin: includeMargin ? 2 : 1,
        color: {
          dark: fgColor,
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      },
      (err, url) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return;
        }
        setQrDataUrl(url);
      }
    );

    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        targetUrl,
        {
          width: qrSize,
          margin: includeMargin ? 2 : 1,
          color: {
            dark: fgColor,
            light: '#ffffff',
          },
          errorCorrectionLevel: 'H',
        },
        (err) => {
          if (err) console.error('Canvas QR error:', err);
        }
      );
    }
  }, [targetUrl, qrSize, fgColor, includeMargin]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `qrcode-valacios-oficial.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLeadInfo = (lead: LeadItem) => {
    const text = `Tipo: ${lead.type === 'parceiro' ? 'Seja um Parceiro' : 'Mensagem do Site'}\nNome: ${lead.name}\nContato: ${lead.contact || lead.phone || lead.email}\nCidade/Estado: ${lead.cityState || 'N/A'}\nMensagem: ${lead.message || 'N/A'}\nData: ${new Date(lead.createdAt).toLocaleString('pt-BR')}`;
    navigator.clipboard.writeText(text);
    setCopiedLeadId(lead.id);
    setTimeout(() => setCopiedLeadId(null), 2000);
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Tipo', 'Nome', 'Contato', 'Email', 'Telefone', 'Cidade_Estado', 'Mensagem', 'Data'];
    const rows = leads.map((l) => [
      l.id,
      l.type === 'parceiro' ? 'Parceiro Lojista' : 'Mensagem Contato',
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.contact || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.cityState || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      new Date(l.createdAt).toLocaleString('pt-BR'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads-valacios-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    if (leadFilter !== 'all' && lead.type !== leadFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchContact = (lead.contact || '').toLowerCase().includes(q);
      const matchCity = (lead.cityState || '').toLowerCase().includes(q);
      const matchMsg = (lead.message || '').toLowerCase().includes(q);
      return matchName || matchContact || matchCity || matchMsg;
    }
    return true;
  });

  const partnerCount = leads.filter((l) => l.type === 'parceiro').length;
  const contactCount = leads.filter((l) => l.type === 'contato').length;
  const unreadCount = leads.filter((l) => !l.read).length;

  return (
    <div className="min-h-screen bg-[#140b08] text-stone-100 flex flex-col pt-8 pb-16 px-4 select-none">
      
      {/* Top Admin Security Header Bar */}
      <div className="max-w-6xl mx-auto w-full mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-amber-950/70 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                #/admin
              </span>
              <span className="text-xs text-stone-400">Painel Exclusivo Interno Valacio's</span>
            </div>
            <h1 className="font-brand font-black text-lg md:text-xl text-stone-100 uppercase tracking-wide mt-0.5">
              Gestão de Leads & QR Code Oficial
            </h1>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-bold transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Site Público</span>
        </button>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-6xl mx-auto w-full mb-8 flex items-center gap-3 border-b border-stone-800 pb-3">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'leads'
              ? 'bg-[#de8a27] text-white shadow-lg shadow-amber-900/30'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Respostas & Mensagens Recebidas</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
            activeTab === 'leads' ? 'bg-black/30 text-white' : 'bg-stone-800 text-amber-400'
          }`}>
            {leads.length}
          </span>
          {unreadCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Novos leads não lidos" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('qrcode')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'qrcode'
              ? 'bg-[#de8a27] text-white shadow-lg shadow-amber-900/30'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Gerador de QR Code</span>
        </button>
      </div>

      {/* TAB 1: LEADS & INQUIRIES */}
      {activeTab === 'leads' && (
        <div className="max-w-6xl mx-auto w-full space-y-6">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 font-medium">Total de Registros</span>
                <p className="text-2xl font-black text-stone-100 font-brand mt-1">{leads.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-stone-800 text-stone-300">
                <Inbox className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-medium">Seja um Parceiro Lojista</span>
                <p className="text-2xl font-black text-amber-300 font-brand mt-1">{partnerCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Store className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-sky-400 font-medium">Mensagens de Contato</span>
                <p className="text-2xl font-black text-sky-300 font-brand mt-1">{contactCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Controls Bar: Search, Filters, and Export */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome, telefone, email ou cidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-800/80 rounded-lg text-xs sm:text-sm text-stone-100 placeholder-stone-500 border border-stone-700 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setLeadFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  leadFilter === 'all'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                Todos ({leads.length})
              </button>
              <button
                onClick={() => setLeadFilter('parceiro')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  leadFilter === 'parceiro'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                Parceiros ({partnerCount})
              </button>
              <button
                onClick={() => setLeadFilter('contato')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  leadFilter === 'contato'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                Contato ({contactCount})
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                disabled={leads.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-600/40 text-xs font-bold transition cursor-pointer disabled:opacity-40"
                title="Exportar para Excel / CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>
              {leads.length > 0 && (
                <button
                  onClick={() => setDeleteConfirmTarget('all')}
                  className="p-2 rounded-lg bg-stone-800 hover:bg-red-950/40 text-stone-400 hover:text-red-400 border border-stone-700 hover:border-red-800 transition cursor-pointer"
                  title="Limpar todos os registros"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Leads Listing */}
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-stone-900/40 border border-stone-800 flex flex-col items-center">
              <Inbox className="w-12 h-12 text-stone-600 mb-3" />
              <h3 className="font-brand font-bold text-base text-stone-300">Nenhum registro encontrado</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm">
                As respostas do questionário "Seja um Parceiro" e as mensagens enviadas pelo formulário do site aparecerão aqui em tempo real.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead) => {
                const isPartner = lead.type === 'parceiro';
                const formattedDate = new Date(lead.createdAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={lead.id}
                    className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                      lead.read
                        ? 'bg-stone-900/50 border-stone-800 text-stone-300'
                        : 'bg-stone-900/90 border-amber-600/40 shadow-lg text-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {isPartner ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-black uppercase tracking-wider">
                            <Store className="w-3.5 h-3.5" />
                            Seja um Parceiro Lojista
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[11px] font-black uppercase tracking-wider">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Mensagem de Contato
                          </span>
                        )}

                        <span className="text-xs text-stone-400 font-medium">
                          {formattedDate}
                        </span>

                        {!lead.read && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                            Novo
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => handleCopyLeadInfo(lead)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition cursor-pointer"
                          title="Copiar dados deste lead"
                        >
                          {copiedLeadId === lead.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => markLeadAsRead(lead.id, !lead.read)}
                          className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition cursor-pointer"
                          title={lead.read ? 'Marcar como não lido' : 'Marcar como lido'}
                        >
                          <CheckCheck className={`w-3.5 h-3.5 ${lead.read ? 'text-amber-400' : 'text-stone-400'}`} />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmTarget(lead)}
                          className="p-1.5 rounded bg-stone-800 hover:bg-red-950/50 text-stone-400 hover:text-red-400 transition cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Customer Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                          Nome / Empresa
                        </span>
                        <strong className="text-sm font-bold text-stone-100">{lead.name}</strong>
                      </div>

                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                          WhatsApp / Contato
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-amber-300 font-semibold">{lead.contact || lead.phone || lead.email || 'N/A'}</span>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:underline inline-flex items-center gap-0.5 text-[11px]"
                              title="Abrir no WhatsApp"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {lead.cityState && (
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                            Cidade / Estado
                          </span>
                          <span className="text-stone-200 font-medium">{lead.cityState}</span>
                        </div>
                      )}
                    </div>

                    {/* Message or Notes */}
                    {lead.message && (
                      <div className="mt-3 p-3 rounded-lg bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300 leading-relaxed">
                        <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider mb-1">
                          Mensagem / Observação
                        </span>
                        {lead.message}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: QR CODE GENERATOR */}
      {activeTab === 'qrcode' && (
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: QR Code Visual Card & Actions */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Printable Display Card */}
            <div
              id="printable-qr-card"
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-stone-900 border-4 border-[#de8a27]/40 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Header with Logo */}
              <div className="mb-3">
                <div className="inline-flex flex-col items-center">
                  <span className="font-brand font-black text-xl text-[#412213] uppercase tracking-tight">
                    VALACIO’S
                  </span>
                  <span className="font-brand font-bold text-[10px] text-[#de8a27] tracking-widest uppercase">
                    SWEETS & BITES
                  </span>
                </div>
              </div>

              <p className="text-xs font-medium text-stone-600 mb-4 max-w-[240px]">
                Aponte a câmera do seu celular para acessar nossa página e catálogo oficial
              </p>

              {/* QR Code Canvas / Image Display */}
              <div className="relative p-3 bg-white rounded-xl shadow-inner border border-stone-200 flex items-center justify-center">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code Valacio's"
                    className="w-56 h-56 md:w-64 md:h-64 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center text-stone-400">
                    <RefreshCw className="w-8 h-8 animate-spin text-[#de8a27]" />
                  </div>
                )}
              </div>

              <p className="mt-4 text-[11px] font-mono font-bold text-amber-900/90 truncate max-w-full px-2">
                {targetUrl}
              </p>

              <div className="mt-2 text-[10px] text-stone-500 font-semibold tracking-wide uppercase">
                Muito queijo de verdade • Tradição mineira
              </div>
            </div>

            {/* Quick Actions below card */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleDownloadPng}
                disabled={!qrDataUrl}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Baixar PNG</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-brand font-bold text-xs uppercase tracking-wider border border-stone-700 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir</span>
              </button>
            </div>

          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl space-y-5">
              <h2 className="font-brand font-black text-base text-[#de8a27] uppercase tracking-wider flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#de8a27]" />
                <span>Configurações do QR Code</span>
              </h2>

              {/* Target URL Input */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Destino do QR Code (URL Oficial):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-stone-800 rounded-lg text-xs font-mono text-stone-100 border border-stone-700 focus:border-amber-500 focus:outline-none"
                    placeholder="https://..."
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    title="Copiar URL"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-1.5">
                  URL oficial limpa apontando para o site principal (sem tags ou rota interna).
                </p>
              </div>

              {/* Color Customization */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Cor do QR Code:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFgColor('#412213')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      fgColor === '#412213'
                        ? 'bg-amber-950/40 border-[#de8a27] text-white'
                        : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#412213] border border-white/20" />
                    <span>Marrom Marca (#412213)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFgColor('#000000')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      fgColor === '#000000'
                        ? 'bg-stone-800 border-[#de8a27] text-white'
                        : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-black border border-white/20" />
                    <span>Preto Puro (#000000)</span>
                  </button>
                </div>
              </div>

              {/* Size Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  <span>Tamanho da Imagem:</span>
                  <span className="font-mono text-amber-400">{qrSize} x {qrSize} px</span>
                </div>
                <input
                  type="range"
                  min="240"
                  max="640"
                  step="20"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                  <span>240px (Pequeno)</span>
                  <span>360px (Padrão)</span>
                  <span>640px (Alta Resolução)</span>
                </div>
              </div>

              {/* Margin Toggle */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Margem de Leitura Segura:
                </label>
                <button
                  type="button"
                  onClick={() => setIncludeMargin(!includeMargin)}
                  className={`px-3 py-2 rounded-lg font-bold border transition cursor-pointer text-xs ${
                    includeMargin
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  {includeMargin ? 'Margem Ativa (Recomendado)' : 'Sem Margem'}
                </button>
              </div>

              {/* Hidden canvas for direct rendering */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/90 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 leading-relaxed">
                <p className="font-bold text-amber-300">
                  Privacidade da rota #/admin:
                </p>
                <p className="text-[11px] text-stone-400">
                  Nenhum botão, menu ou link público direciona para esta tela. Ela só é acessível digitando manualmente <code>#/admin</code> na barra de endereços do navegador.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Delete Confirmation Modal Popup */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl p-6 text-stone-100 animate-in zoom-in-95">
            <button
              onClick={() => setDeleteConfirmTarget(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-800/80 text-red-400 flex-shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="font-brand font-bold text-lg text-stone-100">
                  {deleteConfirmTarget === 'all'
                    ? 'Excluir Todos os Registros?'
                    : 'Confirmar Exclusão?'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                  {deleteConfirmTarget === 'all' ? (
                    'Tem certeza de que deseja apagar permanentemente todos os registros de leads e mensagens da base? Esta ação não pode ser desfeita.'
                  ) : (
                    <>
                      Tem certeza de que deseja excluir o registro de{' '}
                      <strong className="text-amber-300">"{deleteConfirmTarget.name}"</strong>
                      {deleteConfirmTarget.type === 'parceiro' ? ' (Seja um Parceiro)' : ' (Mensagem de Contato)'}?
                    </>
                  )}
                </p>

                {deleteConfirmTarget !== 'all' && (
                  <div className="mt-3 p-3 rounded-lg bg-stone-950/80 border border-stone-800 text-xs text-stone-300 space-y-1">
                    <p><span className="text-stone-500 font-bold uppercase text-[10px]">Contato:</span> {deleteConfirmTarget.contact || deleteConfirmTarget.phone || deleteConfirmTarget.email}</p>
                    {deleteConfirmTarget.cityState && (
                      <p><span className="text-stone-500 font-bold uppercase text-[10px]">Cidade:</span> {deleteConfirmTarget.cityState}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-brand font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-brand font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-red-950/50 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sim, Excluir</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
