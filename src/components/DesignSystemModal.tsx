import React, { useState } from 'react';
import { X, Check, Copy, Palette, Layout, Disc, Layers } from 'lucide-react';
import { AppVersion } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  version: AppVersion;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose, version }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'radius'>('colors');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const brandTokens = version === 'v3' ? [
    { name: '--primitive__violet600', hex: '#716fe9', usage: 'Raw palette value · Violet 600' },
    { name: '--primitive__rose500', hex: '#da83a5', usage: 'Raw palette value · Rose 500' },
    { name: '--primitive__teal500', hex: '#75adb8', usage: 'Raw palette value · Teal 500' },
  ] : [
    { name: '--primitive__green', hex: '#3ab17a', usage: 'Primary brand color, buttons, active highlights' },
    { name: '--primitive__orange', hex: '#fe8463', usage: 'Secondary brand color, accents' },
  ];

  const brandRoleTokens = [
    { name: '--brand__primary', primitive: '--primitive__violet600', hex: '#716fe9', onColor: '#0a0a0a', usage: 'CTA chính, link, trạng thái active/selected' },
    { name: '--brand__secondary', primitive: '--primitive__rose500', hex: '#da83a5', onColor: '#28131d', usage: 'Điểm nhấn và điều khiển phụ' },
    { name: '--brand__tertiary', primitive: '--primitive__teal500', hex: '#75adb8', onColor: '#10272b', usage: 'Badge, highlight và minh họa' },
  ];

  const textTokens = [
    { name: '--text__heading', hex: '#0a0a0a', sample: 'Tiêu đề chính (Bold 18-20px)' },
    { name: '--text__title', hex: '#292929', sample: 'Tiêu đề phụ, Tên gia sư (SemiBold 14-16px)' },
    { name: '--text__body', hex: '#737373', sample: 'Nội dung mô tả, phụ chú (Regular 12-13px)' },
    { name: '--text__muted', hex: '#a8a8a8', sample: 'Văn bản mờ, placeholder, thời gian phụ (10-11px)' },
    { name: '--text__disabled', hex: '#d1d1d1', sample: 'Trạng thái vô hiệu hóa' },
  ];

  const semanticTokens = version === 'v3' ? [
    { title: 'Success', dark: { name: '--semantic__successdark', hex: '#26715f' }, light: { name: '--semantic__successlight', hex: '#e1f1eb' } },
    { title: 'Alert / Danger', dark: { name: '--semantic__alertdark', hex: '#b83b4b' }, light: { name: '--semantic__alertlight', hex: '#fbe7e9' } },
    { title: 'Warning', dark: { name: '--semantic__warningdark', hex: '#a85b18' }, light: { name: '--semantic__warninglight', hex: '#fff0dc' } },
    { title: 'Info', dark: { name: '--semantic__infodark', hex: '#35668a' }, light: { name: '--semantic__infolight', hex: '#e5f0f7' } },
  ] : [
    { title: 'Success', dark: { name: '--semantic__successdark', hex: '#2f806c' }, light: { name: '--semantic__successlight', hex: '#ddece6' } },
    { title: 'Alert / Danger', dark: { name: '--semantic__alertdark', hex: '#c94b4b' }, light: { name: '--semantic__alertlight', hex: '#f8e3e1' } },
    { title: 'Warning', dark: { name: '--semantic__warningdark', hex: '#d88732' }, light: { name: '--semantic__warninglight', hex: '#f9ead8' } },
    { title: 'Info', dark: { name: '--semantic__infodark', hex: '#5276b8' }, light: { name: '--semantic__infolight', hex: '#e3e8f3' } },
  ];

  const categoryTokens = version === 'v3' ? [
    { subject: 'Toán học (Math)', dark: '#302e7c', light: '#e8e7fa', darkName: '--category__mathdark', lightName: '--category__mathlight' },
    { subject: 'Tiếng Anh (English)', dark: '#6e4685', light: '#f0e7f6', darkName: '--category__englishdark', lightName: '--category__englishlight' },
    { subject: 'Hóa học (Chemistry)', dark: '#9b5128', light: '#fae9dd', darkName: '--category__chemistrydark', lightName: '--category__chemistrylight' },
    { subject: 'Văn học (Literature)', dark: '#9d3565', light: '#f8e6ef', darkName: '--category__literaturedark', lightName: '--category__literaturelight' },
    { subject: 'Lịch sử / Địa lý (Social)', dark: '#73321b', light: '#fceed8', darkName: '--category__socialdark', lightName: '--category__sociallight' },
    { subject: 'Sinh học / Kỹ năng (Bio)', dark: '#455325', light: '#edf1df', darkName: '--category__biodark', lightName: '--category__biolight' },
    { subject: 'Môn mở rộng (Ext)', dark: '#35666f', light: '#e3f0f2', darkName: '--category__extensiondark', lightName: '--category__extensionlight' },
  ] : [
    { subject: 'Toán học (Math)', dark: '#2f806c', light: '#ddece6', darkName: '--semantic__successdark', lightName: '--semantic__successlight' },
    { subject: 'Tiếng Anh (English)', dark: '#302e7c', light: '#e1e7fd', darkName: '--category__purpledark', lightName: '--category__purplelight' },
    { subject: 'Hóa học (Chemistry)', dark: '#b15829', light: '#fde2d0', darkName: '--category__orangedark', lightName: '--category__orangelight' },
    { subject: 'Văn học (Literature)', dark: '#9d3565', light: '#f8e1ec', darkName: '--category__pinkdark', lightName: '--category__pinklight' },
    { subject: 'Lịch sử / Địa lý (Social)', dark: '#73321b', light: '#fceed8', darkName: '--category__amberdark', lightName: '--category__amberlight' },
    { subject: 'Sinh học / Kỹ năng (Bio)', dark: '#6e4685', light: '#f2e2f7', darkName: '--category__violetdark', lightName: '--category__violetlight' },
    { subject: 'Môn mở rộng (Ext)', dark: '#455325', light: '#ebf0d8', darkName: '--category__olivedark', lightName: '--category__olivelight' },
  ];

  const surfaceTokens = [
    { name: '--systembg__modal', hex: '#ffffff', desc: 'Nền thẻ, Bottom sheet, Modal cards' },
    { name: '--systembg__fgbase', hex: '#e9eaeb', desc: 'Đường phân chia, chip nền base' },
    { name: '--systembg__fgalt', hex: '#f5f5f5', desc: 'Nền nút phụ, input hover' },
    { name: '--systembg__fgweak', hex: '#fafafa', desc: 'Nền màn hình app' },
    { name: '--systembg__core', hex: '#0a0a0a', desc: 'Màu nền cốt lõi tối' },
  ];

  const spacingTokens = [
    { name: '--spacing__5xs', val: '2px', num: 2 },
    { name: '--spacing__4xs', val: '4px', num: 4 },
    { name: '--spacing__3xs', val: '6px', num: 6 },
    { name: '--spacing__2xs', val: '8px', num: 8 },
    { name: '--spacing__xs', val: '10px', num: 10 },
    { name: '--spacing__sm', val: '12px', num: 12 },
    { name: '--spacing__md', val: '16px', num: 16 },
    { name: '--spacing__lg', val: '20px', num: 20 },
    { name: '--spacing__xl', val: '24px', num: 24 },
    { name: '--spacing__2xl', val: '28px', num: 28 },
    { name: '--spacing__3xl', val: '32px', num: 32 },
    { name: '--spacing__4xl', val: '40px', num: 40 },
    { name: '--spacing__5xl', val: '48px', num: 48 },
    { name: '--spacing__6xl', val: '64px', num: 64 },
    { name: '--spacing__7xl', val: '96px', num: 96 },
    { name: '--spacing__8xl', val: '128px', num: 128 },
  ];

  const radiusTokens = [
    { name: '--cornerradius__3xs', val: '2px', num: 2 },
    { name: '--cornerradius__2xs', val: '4px', num: 4 },
    { name: '--cornerradius__xs', val: '8px', num: 8 },
    { name: '--cornerradius__sm', val: '12px', num: 12 },
    { name: '--cornerradius__md', val: '16px', num: 16 },
    { name: '--cornerradius__lg', val: '24px', num: 24 },
    { name: '--cornerradius__xl', val: '32px', num: 32 },
    { name: '--cornerradius__full', val: '1000px', num: 1000 },
  ];

  const weightTokens = [
    { name: '--weight__xs', val: '1px' },
    { name: '--weight__sm', val: '1.2px' },
    { name: '--weight__md', val: '1.6px' },
    { name: '--weight__lg', val: '2px' },
    { name: '--weight__xl', val: '4px' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12161f] border border-neutral-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between bg-[#161b26]">
          <div className="flex items-center space-x-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: 'var(--primitive__green)' }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <span>TutorNest Design System Tokens</span>
                {version === 'v3' ? (
                  <Badge variant="tertiary" className="border-transparent font-mono text-[10px] px-2 py-0.5 rounded-full">
                    Version 3 · shadcn/ui
                  </Badge>
                ) : (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Varibles_68fc3023.txt Applied
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-400">
                {version === 'v3'
                  ? 'V3 tách primitive palette, brand roles, semantic states và màu category.'
                  : 'Tokens chuẩn hóa màu sắc, khoảng cách, bo góc và trọng lượng nét'}
              </p>
            </div>
          </div>
          {version === 'v3' ? (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Đóng hệ thống token" className="h-8 w-8 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          ) : (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 pb-2 flex items-center space-x-2 border-b border-neutral-800 bg-[#141822]">
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'colors' ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Màu sắc (Colors)</span>
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'typography' ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Chữ & Nền (Text & Surface)</span>
          </button>
          <button
            onClick={() => setActiveTab('spacing')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'spacing' ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Khoảng cách (Spacing)</span>
          </button>
          <button
            onClick={() => setActiveTab('radius')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'radius' ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Bo góc & Nét (Radius & Weight)</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm text-neutral-200">
          {activeTab === 'colors' && (
            <div className="space-y-6">
              {/* Brand Primitives */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">{version === 'v3' ? 'Primitive Palette · Raw Values' : 'Brand Primitives'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {brandTokens.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.hex)}
                      className="flex items-center p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60 hover:border-neutral-500 cursor-pointer transition-colors group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg shadow-inner mr-3 shrink-0 border border-white/20"
                        style={{ backgroundColor: token.hex }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-emerald-400 truncate">{token.name}</span>
                          <span className="font-mono text-xs text-neutral-400 group-hover:text-white flex items-center">
                            {copiedToken === token.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3 h-3 ml-1 opacity-60" />}
                            <span className="ml-1">{token.hex}</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate">{token.usage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {version === 'v3' && (
                <section className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Brand Roles · Alias to Primitive</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brandRoleTokens.map((token) => (
                      <Card key={token.name} className="flex items-center p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60 text-neutral-200 shadow-none">
                        <div className="w-10 h-10 rounded-lg shadow-inner mr-3 shrink-0 border border-white/20" style={{ backgroundColor: token.hex }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-xs text-emerald-400 truncate">{token.name}</div>
                          <div className="text-[10px] text-neutral-400 truncate">{token.primitive}</div>
                          <div className="text-[10px] text-neutral-400 truncate">on-color: {token.onColor}</div>
                          <p className="text-[11px] text-neutral-300 truncate">{token.usage}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Semantic States */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Semantic Feedback (Success, Alert, Warning, Info)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {semanticTokens.map((sem) => (
                    <div key={sem.title} className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60 space-y-2">
                      <span className="text-xs font-bold text-neutral-300">{sem.title}</span>
                      <div className="flex items-center space-x-2">
                        {/* Dark token */}
                        <div
                          onClick={() => copyToClipboard(sem.dark.hex)}
                          className="flex-1 flex items-center p-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-500 cursor-pointer"
                        >
                          <div className="w-6 h-6 rounded-md mr-2 shrink-0" style={{ backgroundColor: sem.dark.hex }} />
                          <div className="text-[10px] truncate">
                            <div className="text-neutral-400">Dark</div>
                            <div className="font-mono text-white">{sem.dark.hex}</div>
                          </div>
                        </div>

                        {/* Light token */}
                        <div
                          onClick={() => copyToClipboard(sem.light.hex)}
                          className="flex-1 flex items-center p-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-500 cursor-pointer"
                        >
                          <div className="w-6 h-6 rounded-md mr-2 shrink-0 border border-black/10" style={{ backgroundColor: sem.light.hex }} />
                          <div className="text-[10px] truncate">
                            <div className="text-neutral-400">Light (Subtle)</div>
                            <div className="font-mono text-white">{sem.light.hex}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Subject Categories */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Category / Subject Badges (Figma Palette)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {categoryTokens.map((cat) => (
                    <div
                      key={cat.subject}
                      className="p-2.5 rounded-xl border border-neutral-700/60 bg-neutral-800/40 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs"
                          style={{ backgroundColor: cat.light, color: cat.dark }}
                        >
                          Aa
                        </div>
                        <span className="text-xs font-semibold text-neutral-200">{cat.subject}</span>
                      </div>
                      <div className="text-right text-[10px] font-mono text-neutral-400">
                        <div>{cat.dark}</div>
                        <div>{cat.light}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6">
              {/* Text tokens */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Text Hierarchy Tokens</h3>
                <div className="space-y-2">
                  {textTokens.map((tok) => (
                    <div
                      key={tok.name}
                      onClick={() => copyToClipboard(tok.hex)}
                      className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex items-center justify-between hover:border-neutral-500 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: tok.hex }} />
                        <div>
                          <div className="font-mono text-xs text-emerald-400">{tok.name}</div>
                          <div className="text-xs text-neutral-300 font-medium">{tok.sample}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-neutral-400">{tok.hex}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Surface Backgrounds */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">System Surface & Background Tokens</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {surfaceTokens.map((surf) => (
                    <div
                      key={surf.name}
                      onClick={() => copyToClipboard(surf.hex)}
                      className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex items-center space-x-3 hover:border-neutral-500 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg border border-neutral-600 shrink-0 shadow-sm" style={{ backgroundColor: surf.hex }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-emerald-400 truncate">{surf.name}</span>
                          <span className="font-mono text-xs text-neutral-400">{surf.hex}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate">{surf.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'spacing' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Spacing Scale (4px / 8px Grid Base)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {spacingTokens.map((sp) => (
                  <div key={sp.name} className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-emerald-400">{sp.name.replace('--spacing__', '')}</span>
                      <span className="font-mono text-xs text-white font-bold">{sp.val}</span>
                    </div>
                    <div className="bg-neutral-900 rounded p-1 flex items-center">
                      <div
                        className="bg-emerald-500 h-2 rounded-xs"
                        style={{ width: `${Math.min(100, (sp.num / 64) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'radius' && (
            <div className="space-y-6">
              {/* Radius scale */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Corner Radius Scale</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {radiusTokens.map((r) => (
                    <div key={r.name} className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex flex-col items-center text-center space-y-2">
                      <div
                        className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-mono text-[10px] text-emerald-400"
                        style={{ borderRadius: r.val }}
                      >
                        {r.val}
                      </div>
                      <span className="font-mono text-xs text-emerald-400">{r.name.replace('--cornerradius__', '')}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Weight scale */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Border & Stroke Weight Tokens</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {weightTokens.map((w) => (
                    <div key={w.name} className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-8 flex items-center justify-center">
                        <div
                          className="w-full bg-emerald-400 rounded-full"
                          style={{ height: w.val }}
                        />
                      </div>
                      <span className="font-mono text-xs text-white font-bold">{w.val}</span>
                      <span className="font-mono text-[10px] text-neutral-400">{w.name.replace('--weight__', '')}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-800 bg-[#161b26] flex items-center justify-between text-xs text-neutral-400">
          <span>
            {version === 'v3'
              ? 'Primary, Secondary, Tertiary · semantic states · category palette'
              : 'All 50+ variables from Varibles_68fc3023.txt actively styled into components'}
          </span>
          {version === 'v3' ? (
            <Button variant="default" size="sm" onClick={onClose} className="rounded-lg font-bold">
              Đã hiểu
            </Button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              Đã hiểu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
