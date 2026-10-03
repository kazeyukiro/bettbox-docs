import React, {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ParticleField from '@site/src/components/ParticleField';
import Reveal from '@site/src/components/Reveal';
import styles from './index.module.css';

const REPO_API = 'https://api.github.com/repos/appshubcc/Bettbox';
const RELEASES_URL = 'https://github.com/appshubcc/Bettbox/releases';
const LATEST_URL = 'https://github.com/appshubcc/Bettbox/releases/latest';

/* ================= 平台定义与资产匹配 ================= */

const PLATFORMS = [
  {
    id: 'android',
    label: 'Android',
    hint: 'Android 8.0+ · 手机 / 平板 / Android TV 已完整适配',
    arches: [
      {id: 'arm64-v8a', label: 'ARMv8'},
      {id: 'armeabi-v7a', label: 'ARMv7'},
      {id: 'x86_64', label: 'x86_64'},
      {id: 'universal', label: '通用'},
    ],
    defaultArch: 'arm64-v8a',
  },
  {
    id: 'windows',
    label: 'Windows',
    hint: 'Windows 8.1+ · 2012 年及更早 CPU 请选 Compatible 兼容版',
    arches: [
      {id: 'amd64', label: 'x64'},
      {id: 'arm64', label: 'ARM64'},
    ],
    defaultArch: 'amd64',
  },
  {
    id: 'macos',
    label: 'macOS',
    hint: 'macOS 10.15+ · Intel / Apple Silicon',
    arches: [
      {id: 'amd64', label: 'Intel'},
      {id: 'arm64', label: 'Apple Silicon'},
    ],
    defaultArch: 'arm64',
  },
  {
    id: 'linux',
    label: 'Linux',
    hint: 'Kernel 5.4+ · x64 / ARM64',
    arches: [
      {id: 'amd64', label: 'x64'},
      {id: 'arm64', label: 'ARM64'},
    ],
    defaultArch: 'amd64',
  },
];

function detectPlatform() {
  if (typeof window === 'undefined') return 'windows';
  const ua = navigator.userAgent || '';
  if (/Android/i.test(ua)) return 'android';
  if (/Win/i.test(ua)) return 'windows';
  if (/Mac/i.test(ua)) return 'macos';
  if (/Linux/i.test(ua)) return 'linux';
  return 'windows';
}

function assetMatches(name, platformId, archId) {
  const lower = name.toLowerCase();
  if (!lower.includes(`-${platformId}-`)) return false;
  return lower.includes(`-${platformId}-${archId}`);
}

function fileNote(name) {
  const lower = name.toLowerCase();
  const ext = name.slice(name.lastIndexOf('.') + 1).toLowerCase();
  if (lower.includes('-compatible') && ext === 'exe') return '兼容版 · 旧 CPU 可用，含安装器';
  if (lower.includes('-compatible')) return '兼容版 · 旧 CPU / 旧系统可用';
  if (lower.includes('-portable') || ext === 'zip') return '便携版 · 解压即用';
  switch (ext) {
    case 'exe':
      return '标准安装版 · 已含管理员权限处理';
    case 'dmg':
      return '标准安装版 · 拖入 Applications';
    case 'apk':
      return lower.includes('universal') ? '通用包 · 覆盖全部架构' : '标准安装包';
    case 'appimage':
      return '免安装 · AppImage 镜像';
    case 'deb':
      return 'Debian / Ubuntu 系';
    case 'rpm':
      return 'Fedora / openSUSE 系';
    default:
      return '';
  }
}

function sortScore(name) {
  const lower = name.toLowerCase();
  return (lower.includes('-compatible') ? 1 : 0) + (lower.includes('-portable') ? 1 : 0);
}

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

/* ================= 更新日志解析 ================= */

function parseChangelog(body) {
  if (!body) return [];
  const groups = [];
  let current = null;
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (line.startsWith('####')) {
      const title = line.replace(/^#+\s*/, '');
      const type = /新增|feature|feat|新功能/i.test(title)
        ? 'feat'
        : /修复|fix|bug/i.test(title)
        ? 'fix'
        : /优化|改进|perf|improve|adjust/i.test(title)
        ? 'perf'
        : /破坏|移除|breaking|remove/i.test(title)
        ? 'breaking'
        : 'other';
      current = {title, type, items: []};
      groups.push(current);
    } else if (current && line.startsWith('- ')) {
      const text = line
        .slice(2)
        .replace(/<[^>]+>/g, '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .trim();
      if (text) current.items.push(text);
    }
  }
  return groups.filter((g) => g.items.length > 0);
}

/* ================= 图标 ================= */

function Icon({d, size = 20, strokeWidth = 1.7}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {d}
    </svg>
  );
}

const FEATURE_ICONS = [
  <path d="M12 3 4 7.4v9.2L12 21l8-4.4V7.4L12 3Z" key="a" />,
  <path d="M12 3 4 7.4v9.2L12 21l8-4.4V7.4L12 3Zm0 9L4 7.4M12 12l8-4.6M12 12v9" key="a" />,
  <path d="M12 3l2 4.2 4.6.6-3.4 3.2.9 4.6L12 13.4 7.9 15.6l.9-4.6L5.4 7.8l4.6-.6L12 3Z" key="a" />,
  <path d="M12 4c-3.6 0-6.5 2.9-6.5 6.5 0 4.4 6.5 9.5 6.5 9.5s6.5-5.1 6.5-9.5C18.5 6.9 15.6 4 12 4Z" key="a" />,
  <path d="m9 12 2 2 4-4.5M12 21c-4 0-7-3-7-7m14 0c0 2.5-1.3 4.7-3.3 5.9" key="a" />,
  <path d="M13 3 5 13h6l-1 8 9-11h-6l0 0Z" key="a" />,
  <path d="M5 8h9m4 0h1M5 16h3m4 0h7M15 5.5 13.9 8m-1.8 4L11 14.5m8-1 1.2 2.5" key="a" />,
  <path d="M5 7h14M5 12h14M5 17h14" key="a" />,
  <path d="M8 5h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm1 5 2 2-2 2m3 1h3" key="a" />,
  <path d="M14 4l6 6-9.5 9.5H4.5V14L14 4Zm-3 5 5 5" key="a" />,
  <path d="M12 5v3m0 8v3M7.5 12h-3m15 0h-3M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" key="a" />,
  <path d="M4 6h11v8H4V6Zm11 3h3.5L21 12v2h-6M8 18.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm9 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" key="a" />,
  <path d="M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13V20h-13V11Z" key="a" />,
  <path d="M9 8.5a3 3 0 1 1 4.5 2.6c-1 .6-1.5 1.2-1.5 2.4m0 3.2v.2M12 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9Z" key="a" />,
];

const FEATURES = [
  {title: '开箱即用', desc: '稳定的权限处理与舒适的 TUN/VPN 体验，大量预置优化细节，开箱即达可用状态。'},
  {title: '精雕细琢', desc: '打磨每处 UI 与交互细节，前台高帧率动画流畅，移动端低能耗，桌面端低占用。'},
  {title: '安全守护', desc: '内核紧跟 Mihomo 主线，遵循各平台最小权限，通过 SignPath 审计并装载 OV 数字签名。'},
  {title: '稳定容错', desc: '优化多平台极端场景边界问题，内置双重配置检测验证，媲美企业级使用稳定性。'},
  {title: '性能优先', desc: '桌面端原生 ARM64 架构支持，硬件分级与 Flutter 深度优化，榨干硬件性能。'},
  {title: '增强工具', desc: '首个多平台无感智能启停、Android 休眠支持、一键禁用 QUIC、托盘菜单增强。'},
  {title: '可视化设置', desc: '更丰富参数的可视化调节界面，改动即时生效，无需繁琐修改配置文件。'},
  {title: '个性化定制', desc: '丰富的色彩主题、自定义图标/标题，甚至包含 30 种精美测速动画。'},
  {title: '脚本 UI 适配', desc: '首个支持 JS 覆写脚本可用的分流 UI 适配与自定义可视化便捷开关。'},
  {title: '专业编辑', desc: '多平台内置高性能重构版 code-forge 编辑器，媲美专业级编辑器体验。'},
  {title: '首页小组件', desc: '内置多款设计精良的 Widget 小组件，直观掌控实时网速与全局运行状态。'},
  {title: '设备兼容', desc: '持续维护面向旧系统与老旧硬件的 Compatible 兼容版本，延长设备使用周期。'},
  {title: '零隐私风险', desc: '开源、无广告，全透明 CI/CD 流程接受全方位审计，杜绝任何后台隐私收集。'},
  {title: '社区导向', desc: '认真评估社区反馈，优先对待高质量 Issue，你的声音不会无故被淹没。'},
];

const ICON_HUES = ['var(--pa-g1)', 'var(--pa-feat)', 'var(--pa-perf)', 'var(--pa-fix)', 'var(--pa-lilac)', 'var(--pa-rose)'];

/* ================= 小组件 ================= */

function Reel({items}) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const pausedRef = useRef(false);
  const loop = items.length + 1;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => i + 1);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index < loop) return undefined;
    // 滚到克隆项后无动画瞬移回起点
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }, 750);
    return () => clearTimeout(t);
  }, [index, loop]);

  const current = items[index % items.length];

  return (
    <button
      type="button"
      className={styles.reel}
      aria-label={`切换平台，当前 ${current}`}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onBlur={() => (pausedRef.current = false)}
      onClick={() => setIndex((i) => i + 1)}>
      <span
        className={styles.reelTrack}
        style={{
          transform: `translateY(${-index * 1.12}em)`,
          transition: animate ? undefined : 'none',
        }}
        aria-hidden="true">
        {[...items, items[0]].map((it, i) => (
          <span key={i}>{it}</span>
        ))}
      </span>
      <span className="sr-only">{current}</span>
    </button>
  );
}

function Seg({options, value, onChange, small = false, ariaLabel}) {
  const listRef = useRef(null);
  const [ink, setInk] = useState(null);
  const prevRef = useRef(value);
  const [dirClass, setDirClass] = useState('');

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const btn = list.querySelector(`[data-value="${value}"]`);
    if (btn) setInk({left: btn.offsetLeft, width: btn.offsetWidth});
  }, [value, options]);

  useEffect(() => {
    const ids = options.map((o) => o.id);
    const prevIdx = ids.indexOf(prevRef.current);
    const nextIdx = ids.indexOf(value);
    if (prevIdx !== -1 && nextIdx !== -1 && prevIdx !== nextIdx) {
      setDirClass(nextIdx > prevIdx ? styles.toEnd : styles.toStart);
    }
    prevRef.current = value;
  }, [value, options]);

  return (
    <div
      className={`${styles.seg} ${small ? styles.segSm : ''}`}
      role="tablist"
      aria-label={ariaLabel}
      ref={listRef}>
      {ink && (
        <span
          className={`${styles.segInk} ${dirClass}`}
          style={{left: ink.left, width: ink.width}}
          aria-hidden="true"
        />
      )}
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          data-value={o.id}
          aria-selected={value === o.id}
          onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CopyButton({text}) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <button
      type="button"
      className={`${styles.copy} ${done ? styles.copyDone : ''}`}
      onClick={copy}
      aria-label="复制命令">
      <Icon d={<path d="M9 9h10v10H9V9Zm-4 6V5h10" key="a" />} size={15} />
      <Icon d={<path d="m5 12.5 4.2 4.3L19 7.5" key="a" />} size={15} />
    </button>
  );
}

/* ================= Hero 应用预览（纯 CSS/SVG 模型） ================= */

function AppMock() {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.mock}>
        <div className={styles.mockBar}>
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockDot} />
          <span className={styles.mockTitle}>Bettbox</span>
          <span className={styles.mockPill}>TUN 已连接</span>
        </div>
        <div className={styles.mockBody}>
          <div className={styles.mockMain}>
            <div className={styles.mockSpeed}>
              <svg
                className={styles.mockSpeedIcon}
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M13 3 5 13h6l-1 8 9-11h-6l0 0Z" />
              </svg>
              <div>
                <div className={styles.mockSpeedNum}>
                  68.4<span className={styles.mockSpeedUnit}>MB/s</span>
                </div>
                <div className={styles.mockSpeedSub}>实时下行 · 上行 3.2 MB/s</div>
              </div>
            </div>
            <svg className={styles.mockChart} viewBox="0 0 260 84" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--pa-g2)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--pa-g2)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className={styles.mockChartArea}
                d="M0,66 C24,60 34,34 56,38 C80,42 90,58 112,50 C136,42 146,16 170,22 C194,28 202,52 226,46 C242,42 252,30 260,26 L260,84 L0,84 Z"
                fill="url(#mockGrad)"
              />
              <path
                className={styles.mockChartLine}
                d="M0,66 C24,60 34,34 56,38 C80,42 90,58 112,50 C136,42 146,16 170,22 C194,28 202,52 226,46 C242,42 252,30 260,26"
                fill="none"
                stroke="var(--pa-g2)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className={styles.mockSide}>
            {[
              {name: '香港 IEPL 01', ping: '42ms', hue: 'var(--pa-feat)', on: true},
              {name: '日本 BGP 02', ping: '88ms', hue: 'var(--pa-clay)'},
              {name: '新加坡 03', ping: '112ms', hue: 'var(--pa-slate)'},
              {name: '美国 CN2 04', ping: '156ms', hue: 'var(--pa-lilac)'},
            ].map((n) => (
              <div className={styles.mockNode} key={n.name} style={{'--i': 0, '--hue': n.hue}}>
                <span className={styles.mockNodeDot} />
                <span className={styles.mockNodeName}>{n.name}</span>
                <span className={styles.mockNodePing}>{n.ping}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.mockWidget}>
        <span className={styles.mockWidgetBar} />
        <div>
          <div className={styles.mockWidgetSpeed}>45.2 MB/s</div>
          <div className={styles.mockWidgetSub}>实时网速小组件</div>
        </div>
      </div>
    </div>
  );
}

/* ================= 区块组件 ================= */

function Hero({latest}) {
  const version = latest ? latest.tag_name.replace(/^v/, '') : null;
  const detected =
    typeof window === 'undefined'
      ? 'Windows'
      : PLATFORMS.find((p) => p.id === detectPlatform())?.label;

  return (
    <section className={styles.hero}>
      <ParticleField className={styles.field} />
      <div className="pa-container">
        <a className={styles.eyebrow} href="#changelog">
          <span className={styles.pulse} aria-hidden="true" />
          {version ? `最新版本 v${version} 已发布` : '正在获取最新版本…'}
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M6 3.5 10.5 8 6 12.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 className={styles.display}>
              <span className={`${styles.line} ${styles.word}`}>
                {'Bettbox'.split('').map((ch, i) => (
                  <span className={styles.ch} style={{'--i': i}} key={i}>
                    {ch}
                  </span>
                ))}
              </span>
              <span className={`${styles.line} ${styles.second}`}>
                <span className={styles.for}>适用于</span>{' '}
                <Reel items={PLATFORMS.map((p) => p.label)} />
              </span>
            </h1>

            <p className={styles.lede}>
              基于 Mihomo（Clash Meta）内核的多平台网络分流与 DNS 调试工具。开箱即用、前台流畅、后台省电 —
              Better Experience, Out of the box.
            </p>

            <div className={styles.cta}>
              <a className={styles.btnPrimary} href="#download">
                <span className={styles.icoClip}>
                  <svg className={styles.icoDown} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                    <path
                      d="M10 3.5v11m0 0-4.5-4.5m4.5 4.5 4.5-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className={styles.btnText}>
                  <span>选择下载</span>
                  <span className={styles.btnSub}>
                    {version ? `v${version}` : '最新版'} · 检测到 {detected ?? '桌面端'}
                  </span>
                </span>
              </a>
              <a className={styles.btnQuiet} href={LATEST_URL} target="_blank" rel="noreferrer">
                前往 GitHub Releases
              </a>
            </div>
            <p className={styles.ctaNote}>开源、无广告 · GPL-3.0 · Windows 端已装载 OV 数字签名</p>
          </div>

          <AppMock />
        </div>

        <ul className={styles.facts}>
          <li style={{'--hue': 'var(--pa-g1)'}}>
            <b>Mihomo 内核</b>
            <span>规则分流、代理组与 TUN 模式完整支持，紧跟主线更新。</span>
          </li>
          <li style={{'--hue': 'var(--pa-feat)'}}>
            <b>订阅导入</b>
            <span>订阅链接一键导入，内置双重配置检测验证与容错。</span>
          </li>
          <li style={{'--hue': 'var(--pa-perf)'}}>
            <b>智能启停</b>
            <span>多平台无感智能启停与休眠支持，后台省电长期稳定。</span>
          </li>
          <li style={{'--hue': 'var(--pa-fix)'}}>
            <b>开源安全</b>
            <span>GPL-3.0 · 全透明 CI/CD · 通过 SignPath 安全审计。</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className={styles.section} id="features">
      <div className="pa-container">
        <Reveal className={styles.sectionHeader}>
          <p className={styles.kicker}>
            <span className={styles.cap} aria-hidden="true" />
            01
          </p>
          <h2>核心特性</h2>
          <p className={styles.sectionSub}>前台流畅、后台省电，以少量资源消耗长期稳定运行</p>
        </Reveal>
        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 70} className={styles.featureCard}>
              <span className={styles.featureIcon} style={{'--hue': ICON_HUES[i % ICON_HUES.length]}}>
                <Icon d={FEATURE_ICONS[i]} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection({latest, loading}) {
  const [platform, setPlatform] = useState(PLATFORMS[0].id);
  const [archMap, setArchMap] = useState({});
  const detectedRef = useRef(false);

  useEffect(() => {
    if (detectedRef.current || typeof window === 'undefined') return;
    detectedRef.current = true;
    const id = detectPlatform();
    const def = PLATFORMS.find((p) => p.id === id);
    setPlatform(id);
    setArchMap((m) => ({...m, [id]: def.defaultArch}));
  }, []);

  const platformDef = PLATFORMS.find((p) => p.id === platform);
  const archId = archMap[platform] ?? platformDef.defaultArch;
  const assets = latest?.assets ?? [];

  const files = useMemo(() => {
    const matched = assets
      .filter((a) => assetMatches(a.name, platform, archId))
      .sort((a, b) => sortScore(a.name) - sortScore(b.name));
    return matched.map((a, idx) => {
      const ext = a.name.slice(a.name.lastIndexOf('.') + 1);
      return {
        name: a.name,
        url: a.browser_download_url,
        size: a.size,
        kind: ext.toUpperCase(),
        note: fileNote(a.name),
        rec: idx === 0 && sortScore(a.name) === 0,
      };
    });
  }, [assets, platform, archId]);

  const setPlatformAndArch = (id) => {
    setPlatform(id);
    const def = PLATFORMS.find((p) => p.id === id);
    setArchMap((m) => ({...m, [id]: m[id] ?? def.defaultArch}));
  };

  return (
    <section className={styles.section} id="download">
      <div className="pa-container">
        <div className={styles.railGrid}>
          <Reveal className={styles.rail}>
            <p className={styles.kicker}>
              <span className={styles.cap} aria-hidden="true" />
              02
            </p>
            <h2>下载</h2>
            <p className={styles.sectionSub}>
              {latest
                ? `v${latest.tag_name.replace(/^v/, '')} · ${formatDate(latest.published_at)}`
                : loading
                ? '正在获取最新版本…'
                : '前往 GitHub 获取最新版本'}
            </p>
            <p className={styles.railText}>
              已自动为当前设备选择平台。每个文件都注明了适用设备，旧 CPU 设备请选择 Compatible 兼容版。
            </p>
            <p className={styles.railLinks}>
              <a href={LATEST_URL} target="_blank" rel="noreferrer">
                最新 Release
              </a>
              <a href={RELEASES_URL} target="_blank" rel="noreferrer">
                全部历史版本
              </a>
            </p>
          </Reveal>

          <Reveal className={styles.dl} delay={80}>
            <Seg
              options={PLATFORMS.map((p) => ({id: p.id, label: p.label}))}
              value={platform}
              onChange={setPlatformAndArch}
              ariaLabel="选择平台"
            />
            <div className={styles.panel}>
              <div className={styles.panelTop}>
                <p className={styles.panelHint}>{platformDef.hint}</p>
                <Seg
                  small
                  options={platformDef.arches.map((a) => ({id: a.id, label: a.label}))}
                  value={archId}
                  onChange={(id) => setArchMap((m) => ({...m, [platform]: id}))}
                  ariaLabel="选择架构"
                />
              </div>

              {files.length > 0 ? (
                <ul className={styles.files}>
                  {files.map((f) => (
                    <li className={`${styles.file} ${f.rec ? styles.rec : ''}`} key={f.name}>
                      <span className={`${styles.kind} ${f.kind.length > 4 ? styles.long : ''}`}>
                        {f.kind}
                      </span>
                      <span className={styles.fileMain}>
                        <a className={styles.fileTitle} href={f.url} target="_blank" rel="noreferrer">
                          {f.name}
                        </a>
                        {f.rec && <span className={styles.recTag}>推荐</span>}
                        {f.note && <span className={styles.note}>{f.note}</span>}
                      </span>
                      <span className={styles.meta}>{formatSize(f.size)}</span>
                      <span className={styles.go} aria-hidden="true">
                        <svg viewBox="0 0 20 20" width="15" height="15">
                          <path
                            d="M10 3.5v11m0 0-4.5-4.5m4.5 4.5 4.5-4.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.dlError}>
                  正在获取该平台的文件列表… 也可{' '}
                  <a href={LATEST_URL} target="_blank" rel="noreferrer">
                    前往 GitHub Releases
                  </a>{' '}
                  直接下载。
                </p>
              )}

              <div className={styles.extras}>
                <div className={styles.tip}>
                  <h3>Arch Linux / 鸿蒙 NEXT</h3>
                  <div className={styles.cmd}>
                    <pre>yay -S bettbox-bin</pre>
                    <CopyButton text="yay -S bettbox-bin" />
                  </div>
                  <p>
                    旧 CPU 兼容包：<code>bettbox-compatible-bin</code>；鸿蒙 NEXT 可配合
                    <a href="https://harmonyos.cool/android-app" target="_blank" rel="noreferrer">
                      卓易通
                    </a>
                    稳定使用。
                  </p>
                </div>
                <div className={styles.tip}>
                  <h3>macOS 安装提示</h3>
                  <p>
                    下载对应架构的 DMG 后拖入「应用程序」；首次打开建议
                    <strong>右键图标选择「打开」</strong>
                    以避开安全拦截；首次开启 TUN 时请输入用户密码完成授权。
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChangelogSection({releases, loading}) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    if (!releases) return [];
    const q = query.trim().toLowerCase();
    if (!q) return releases;
    return releases.filter((r) => {
      const inTag = (r.tag_name || '').toLowerCase().includes(q);
      const inBody = (r.body || '').toLowerCase().includes(q);
      return inTag || inBody;
    });
  }, [releases, query]);

  const shown = filtered.slice(0, visible);
  const status = query.trim()
    ? `匹配到 ${filtered.length} 个版本`
    : releases
    ? `共收录 ${releases.length} 个版本`
    : loading
    ? '正在获取更新日志…'
    : '前往 GitHub 查看完整更新日志';

  const yearGroups = useMemo(() => {
    const map = new Map();
    for (const r of shown) {
      const year = new Date(r.published_at || Date.now()).getFullYear();
      if (!map.has(year)) map.set(year, []);
      map.get(year).push(r);
    }
    return [...map.entries()].map(([year, items]) => ({year, items}));
  }, [shown]);

  return (
    <section className={styles.section} id="changelog">
      <div className="pa-container">
        <div className={styles.railGrid}>
          <Reveal className={styles.rail}>
            <p className={styles.kicker}>
              <span className={styles.cap} aria-hidden="true" />
              03
            </p>
            <h2>更新日志</h2>
            <p className={styles.sectionSub}>跟着 Mihomo 主线持续演进，每一次更新都清晰可查</p>
            <label className={styles.search}>
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <circle cx="9" cy="9" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="m13.25 13.25 3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(6);
                }}
                placeholder="搜索版本或变更内容"
                aria-label="搜索更新日志"
              />
            </label>
            <p className={styles.clStatus}>{status}</p>
          </Reveal>

          <Reveal className={styles.cl} delay={80}>
            <div className={styles.timeline}>
              {yearGroups.map(({year, items}) => (
                <div key={year}>
                  <div className={styles.year}>{year}</div>
                  {items.map((r) => {
                    const groups = parseChangelog(r.body);
                    return (
                      <article className={styles.release} key={r.id}>
                        <div className={styles.releaseHead}>
                          <div className={styles.verRow}>
                            <a className={styles.ver} href={r.html_url} target="_blank" rel="noreferrer">
                              {r.tag_name || r.name}
                            </a>
                            {releases && r.id === releases[0]?.id && !query.trim() && (
                              <span className={styles.latest}>最新</span>
                            )}
                          </div>
                          <div className={styles.when}>{formatDate(r.published_at)}</div>
                        </div>
                        <div className={styles.releaseBody}>
                          {groups.length > 0 ? (
                            groups.map((g) => (
                              <div className={styles.group} data-type={g.type} key={g.title}>
                                <p className={styles.groupTitle}>
                                  <span className={styles.mark} aria-hidden="true" />
                                  {g.title}
                                </p>
                                <ul className={styles.entries}>
                                  {g.items.map((t, i) => (
                                    <li className={styles.entry} key={i}>
                                      <span className={styles.entryText}>{t}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))
                          ) : (
                            <p className={styles.empty}>
                              <a href={r.html_url} target="_blank" rel="noreferrer">
                                查看该版本完整说明 →
                              </a>
                            </p>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ))}
              {loading && <p className={styles.empty}>正在从 GitHub 获取更新日志…</p>}
              {!loading && !releases && (
                <p className={styles.empty}>
                  获取失败（可能是接口限流），
                  <a href={RELEASES_URL} target="_blank" rel="noreferrer">
                    前往 GitHub 查看更新日志
                  </a>
                  。
                </p>
              )}
            </div>
            {filtered.length > visible && (
              <button type="button" className={styles.more} onClick={() => setVisible((v) => v + 6)}>
                加载更早的 {Math.min(6, filtered.length - visible)} 个版本 ↓
              </button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Community() {
  const cards = [
    {
      title: 'Telegram 交流群',
      desc: '使用问题、经验交流与第一时间的社区讨论。',
      href: 'https://t.me/appshub_chat',
      cta: '加入交流',
      hue: 'var(--pa-slate)',
      icon: (
        <path
          d="M21 4 3.6 10.8c-.8.3-.8 1.4.05 1.7l4.35 1.4 1.6 4.9c.25.75 1.2.9 1.7.3l2.3-2.6 4.3 3.2c.6.45 1.5.1 1.65-.65L22.3 5.2c.15-.8-.6-1.45-1.3-1.2Z"
          key="a"
        />
      ),
    },
    {
      title: 'Telegram 频道',
      desc: '版本发布、更新公告与项目动态同步推送。',
      href: 'https://t.me/appshub_channel',
      cta: '订阅频道',
      hue: 'var(--pa-perf)',
      icon: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-13Zm4 4h8m-8 4h8m-8 4h5" key="a" />,
    },
    {
      title: 'GitHub Issues',
      desc: '高质量 Issue 优先处理，反馈不会无故被淹没。',
      href: 'https://github.com/appshubcc/Bettbox/issues',
      cta: '提交反馈',
      hue: 'var(--pa-g1)',
      icon: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5v5l3.5 2" key="a" />,
    },
    {
      title: '赞助支持',
      desc: '觉得项目有帮助，可以通过推荐链接或赞助支持开发。',
      href: 'https://github.com/appshubcc/Bettbox#-%E8%B5%9E%E5%8A%A9%E6%94%AF%E6%8C%81',
      cta: '了解方式',
      hue: 'var(--pa-clay)',
      icon: <path d="M12 20.5S4 15 4 9.8C4 7 6.2 5 8.7 5c1.5 0 2.6.8 3.3 1.8C12.7 5.8 13.8 5 15.3 5 17.8 5 20 7 20 9.8c0 5.2-8 10.7-8 10.7Z" key="a" />,
    },
  ];

  return (
    <section className={styles.section} id="community">
      <div className="pa-container">
        <Reveal className={styles.sectionHeader}>
          <p className={styles.kicker}>
            <span className={styles.cap} aria-hidden="true" />
            04
          </p>
          <h2>社区与反馈</h2>
          <p className={styles.sectionSub}>开源、透明、社区导向 — 加入我们，一起变得更好</p>
        </Reveal>
        <div className={styles.communityGrid}>
          {cards.map((c, i) => (
            <Reveal
              as="a"
              key={c.title}
              delay={i * 70}
              className={styles.communityCard}
              href={c.href}
              target="_blank"
              rel="noreferrer">
              <span className={styles.featureIcon} style={{'--hue': c.hue}}>
                <Icon d={c.icon} />
              </span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className={styles.communityCta}>
                {c.cta}
                <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                  <path
                    d="M3.5 8h9m0 0L8.5 4m4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({version}) {
  return (
    <section className={styles.ctaBand}>
      <div className="pa-container">
        <Reveal className={styles.ctaBandInner} scale>
          <h2>更好的体验，开箱可用</h2>
          <p>
            {version ? `最新版本 v${version.replace(/^v/, '')}` : '最新版本'} 已在全平台发布，立即下载体验。
          </p>
          <div className={styles.cta}>
            <a className={styles.btnPrimary} href={LATEST_URL} target="_blank" rel="noreferrer">
              <span className={styles.icoClip}>
                <svg className={styles.icoDown} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <path
                    d="M10 3.5v11m0 0-4.5-4.5m4.5 4.5 4.5-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.btnText}>
                <span>下载 Bettbox</span>
              </span>
            </a>
            <Link className={styles.btnQuiet} to="/docs/getting-started">
              阅读快速开始 →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 页面 ================= */

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const [releases, setReleases] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`${REPO_API}/releases?per_page=30`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (alive && Array.isArray(data) && data.length > 0) setReleases(data);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const latest = releases?.[0] ?? null;

  return (
    <Layout
      title={`${siteConfig.title} — Another Better Mihomo Client`}
      description="Bettbox 是基于 Mihomo（Clash Meta）内核的多平台代理客户端，支持 Android、Windows、macOS 与 Linux。开箱即用、前台流畅、后台省电。">
      <Hero latest={latest} />
      <main>
        <Features />
        <DownloadSection latest={latest} loading={loading} />
        <ChangelogSection releases={releases} loading={loading} />
        <Community />
        <CtaBand version={latest?.tag_name} />
      </main>
    </Layout>
  );
}
