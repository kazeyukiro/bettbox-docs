import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FEATURES = [
  {
    title: '开箱即用',
    desc: '稳定的权限处理与舒适的 TUN/VPN 体验，大量预置优化细节，开箱即达可用状态。',
    color: '#7c8c6e',
  },
  {
    title: '精雕细琢',
    desc: '打磨每处 UI 与交互细节，前台高帧率动画，移动端低能耗，桌面端低占用。',
    color: '#6b8f71',
  },
  {
    title: '安全守护',
    desc: '内核紧跟 Mihomo 主线，遵循最小权限原则，已通过 SignPath 安全审计并装载 OV 数字签名。',
    color: '#c4a574',
  },
  {
    title: '稳定容错',
    desc: '优化多平台极端场景边界问题，内置双重配置检测验证，媲美企业级使用稳定性。',
    color: '#8b7e9e',
  },
  {
    title: '性能优先',
    desc: '桌面端原生 ARM64 支持，硬件分级与 Flutter 深度优化，榨干硬件性能。',
    color: '#6a8eae',
  },
  {
    title: '增强工具',
    desc: '无感智能启停、Android 休眠支持、一键禁用 QUIC、托盘菜单增强等实用能力。',
    color: '#a67c7c',
  },
  {
    title: '可视化设置',
    desc: '丰富参数的可视化调节界面，改动即时生效，无需繁琐手改配置。',
    color: '#7a9e9e',
  },
  {
    title: '个性化定制',
    desc: '丰富色彩主题、自定义图标/标题，以及 30+ 种精美测速动画。',
    color: '#9e8b7a',
  },
];

const PLATFORMS = [
  {
    name: 'Android',
    req: 'Android 8.0+',
    note: '含 Android TV · ARMv8 / ARMv7 / Universal',
    href: 'https://github.com/appshubcc/Bettbox/releases/latest',
  },
  {
    name: 'Windows',
    req: 'Windows 8.1+',
    note: 'x64 / arm64 · 旧 CPU 请用 Compatible',
    href: 'https://github.com/appshubcc/Bettbox/releases/latest',
  },
  {
    name: 'macOS',
    req: 'macOS 10.15+',
    note: 'Intel / Apple Silicon',
    href: 'https://github.com/appshubcc/Bettbox/releases/latest',
  },
  {
    name: 'Linux',
    req: 'Kernel 5.4+',
    note: 'x64 / arm64 · 旧 CPU 请用 Compatible',
    href: 'https://github.com/appshubcc/Bettbox/releases/latest',
  },
];

function detectPlatform() {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent || '';
  if (/Android/i.test(ua)) return 'Android';
  if (/Win/i.test(ua)) return 'Windows';
  if (/Mac/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Desktop';
}

function HomepageHeader() {
  const platform = typeof window !== 'undefined' ? detectPlatform() : 'Desktop';
  return (
    <header className={styles.hero}>
      <div className={styles.heroDecor} aria-hidden="true">
        <span className={styles.blob1} />
        <span className={styles.blob2} />
        <span className={styles.blob3} />
        <span className={styles.blob4} />
      </div>
      <div className={clsx('container', styles.heroInner)}>
        <a
          className={styles.versionBadge}
          href="https://github.com/appshubcc/Bettbox/releases/latest"
          target="_blank"
          rel="noreferrer">
          <span className={styles.dot} />
          最新版本已发布 · 前往 Releases 查看
          <span className={styles.arrow}>→</span>
        </a>
        <Heading as="h1" className={styles.heroTitle}>
          Bettbox
          <br />
          <span className={styles.heroAccent}>适用于 {platform}</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          基于 Mihomo（Clash Meta）内核的多平台代理客户端。
          <br />
          更好的体验，亦开箱可用 — Better Experience, Out of the box.
        </p>
        <div className={styles.heroActions}>
          <a
            className={styles.btnPrimary}
            href="https://github.com/appshubcc/Bettbox/releases/latest"
            target="_blank"
            rel="noreferrer">
            ↓ 下载 {platform} 版
          </a>
          <Link className={styles.btnGhost} to="#download">
            其他平台
          </Link>
          <Link className={styles.btnGhost} to="/docs/intro">
            使用文档
          </Link>
        </div>
        <p className={styles.heroHint}>
          桌面端 2012 年及更早 CPU 请选择 Compatible 兼容版本
        </p>
      </div>
    </header>
  );
}

function FeatureGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>核心特性</h2>
          <p>前台流畅、后台省电，致力于以少量资源消耗长期稳定运行</p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <span
                className={styles.featureDot}
                style={{ background: f.color }}
              />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className={styles.section} id="download">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>下载</h2>
          <p>请选择适合您设备与系统的安装包，文件均注明适用平台</p>
        </div>
        <div className={styles.platformGrid}>
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              className={styles.platformCard}
              href={p.href}
              target="_blank"
              rel="noreferrer">
              <div className={styles.platformName}>{p.name}</div>
              <div className={styles.platformReq}>{p.req}</div>
              <div className={styles.platformNote}>{p.note}</div>
              <span className={styles.platformCta}>前往下载 →</span>
            </a>
          ))}
        </div>
        <div className={styles.extraInstall}>
          <p>
            <strong>其他安装方式</strong>
          </p>
          <ul>
            <li>
              Arch Linux：{' '}
              <code>yay -S bettbox-bin</code> 或{' '}
              <code>paru -S bettbox-bin</code>
            </li>
            <li>
              旧 CPU 兼容包：{' '}
              <code>yay -S bettbox-compatible-bin</code>
            </li>
            <li>
              鸿蒙 NEXT：可配合卓易通稳定使用
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={clsx(styles.section, styles.community)}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>社区与反馈</h2>
          <p>开源、无广告，全透明 CI/CD，认真对待每一份高质量 Issue</p>
        </div>
        <div className={styles.communityLinks}>
          <a
            className={styles.communityBtn}
            href="https://t.me/appshub_chat"
            target="_blank"
            rel="noreferrer">
            Telegram 交流群
          </a>
          <a
            className={styles.communityBtn}
            href="https://t.me/appshub_channel"
            target="_blank"
            rel="noreferrer">
            Telegram 频道
          </a>
          <a
            className={styles.communityBtn}
            href="https://github.com/appshubcc/Bettbox/issues"
            target="_blank"
            rel="noreferrer">
            GitHub Issues
          </a>
          <Link className={styles.communityBtn} to="/docs/faq">
            常见问题
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Another Better Mihomo Client`}
      description="Bettbox 是基于 Mihomo 内核的多平台代理客户端，支持 Android、Windows、macOS、Linux。开箱即用、前台流畅、后台省电。">
      <HomepageHeader />
      <main>
        <FeatureGrid />
        <DownloadSection />
        <CommunitySection />
      </main>
    </Layout>
  );
}
