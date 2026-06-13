/**
 * Guide page script
 */

import './styles/guide.scss';

const I18N_EN = {
  title: 'Fork & Custom Build Guide',
  subtitle: 'Step-by-step guide to building custom GKI kernels with GitHub Actions',
  versions: 'Versions',
  themeLight: 'Light',
  themeDark: 'Dark',
  tocTitle: 'Table of Contents',
  toc0: 'Before You Start',
  toc1: 'Fork the Repository',
  toc2: 'Enable GitHub Actions',
  toc3: 'Choose and Run a Workflow',
  toc4: 'Download the Artifacts',
  toc5: 'Sync Fork with Upstream',
  s0title: 'Before You Start',
  s0p1: "To use GitHub Actions, you must work inside <strong>your own repository</strong> — either your personal repo or your fork of this project. Make sure the top-left corner shows your username, otherwise you won't be able to run workflows.",
  s0p2: 'This page covers only two things: <strong>how to fork this repository</strong>, and <strong>how to build with GitHub Actions workflows</strong>.',
  s1title: 'Fork the Repository',
  s1li1: 'Sign in to <a href="https://github.com" target="_blank">GitHub</a>.',
  s1li2:
    'Open the upstream repository: <a href="https://github.com/zzh20188/GKI_KernelSU_SUSFS" target="_blank"><code>zzh20188/GKI_KernelSU_SUSFS</code></a>',
  s1li3: 'Click <strong>Fork</strong> in the top-right corner and create your own copy.',
  s1li4: 'After forking, find your fork anytime from the sidebar in the top-left corner.',
  s1c1: 'Screenshot 1: Click the Fork button',
  s1c2: 'Screenshot 2: Confirm fork target and settings',
  s1c3: 'Screenshot 3: Your own repository page after forking',
  s1c4: 'Screenshot 4: Quickly find your fork from the sidebar',
  s2title: 'Enable GitHub Actions',
  s2li1: 'Open your forked repository.',
  s2li2: 'Click the <strong>Actions</strong> tab at the top.',
  s2li3: 'If GitHub asks you to enable workflows, follow the on-screen instructions.',
  s2c1: 'Screenshot 5: Open the Actions tab',
  s2c2: 'Screenshot 6: Enable workflows if prompted',
  s3title: 'Choose and Run a Workflow',
  s3li1:
    'On the Actions page, select <strong>构建内核 - 自定义版本</strong> (Custom Kernel Build).',
  s3li2: 'The 4 parameters shown decide which GKI kernel version will be built.',
  s3li3:
    'Find these values on the <a href="https://zzh20188.github.io/GKI_KernelSU_SUSFS/" target="_blank">version lookup page</a> — open a version card to see details.',
  s3li4: 'Fill in the values and click <strong>Run workflow</strong> to start the build.',
  s3tip:
    '<strong>In short:</strong> The website tells you what to enter, the workflow builds it automatically.',
  s3c1: 'Screenshot 7: Select the custom build workflow',
  s3c2: 'Screenshot 8: Find your target version on the version page',
  s3c3: 'Screenshot 9: Check version details and confirm parameters',
  s3c4: 'Screenshot 10: Fill in workflow inputs and run',
  s3c5: 'Screenshot 11: Click Run workflow to start the build',
  s4title: 'Download the Artifacts',
  s4p1: "After the build finishes, open that workflow run's detail page and download the output files from the <strong>Artifacts</strong> section at the bottom.",
  s4c1: 'Screenshot 12: Download artifacts at the bottom of the run page',
  s5title: 'Sync Fork with Upstream',
  s5p1: "When the upstream repository is updated, click <strong>Sync fork</strong> on your fork's page to pull the latest code and avoid build failures.",
  s5warn:
    "<strong>Warning:</strong> Do <strong>NOT</strong> click the <strong>Compare</strong> button next to it — that's not the sync feature.",
  s5c1: 'Screenshot 13: Click Sync fork to sync upstream updates',
  footer: 'Based on the ',
  footerEnd: ' project · Built automatically with GitHub Actions',
};

let curLang = (localStorage.getItem('lang') as 'en' | 'zh') || 'zh';

function applyLang(lang: 'en' | 'zh'): void {
  curLang = lang;
  localStorage.setItem('lang', lang);
  document.getElementById('langLabel')!.textContent = lang === 'zh' ? 'EN' : '中';

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')!;
    if (!el.dataset.zhHtml) {
      el.dataset.zhHtml = el.innerHTML;
    }
    if (lang === 'en' && I18N_EN[key as keyof typeof I18N_EN]) {
      el.innerHTML = I18N_EN[key as keyof typeof I18N_EN];
    } else {
      el.innerHTML = el.dataset.zhHtml;
    }
  });

  const t = document.documentElement.getAttribute('data-theme');
  document.getElementById('themeLabel')!.textContent =
    t === 'dark' ? (lang === 'zh' ? '浅色' : 'Light') : lang === 'zh' ? '深色' : 'Dark';
}

// Theme
const html = document.documentElement;
const saved = localStorage.getItem('guide-theme') || 'dark';
html.setAttribute('data-theme', saved);

document.getElementById('themeToggle')!.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('guide-theme', next);
  document.getElementById('themeIcon')!.textContent = next === 'dark' ? '☽' : '☀';
  document.getElementById('themeLabel')!.textContent =
    next === 'dark' ? (curLang === 'zh' ? '浅色' : 'Light') : curLang === 'zh' ? '深色' : 'Dark';
});

function updateThemeBtn(t: string): void {
  document.getElementById('themeIcon')!.textContent = t === 'dark' ? '☽' : '☀';
  document.getElementById('themeLabel')!.textContent =
    t === 'dark' ? (curLang === 'zh' ? '浅色' : 'Light') : curLang === 'zh' ? '深色' : 'Dark';
}
updateThemeBtn(saved);

// Language
document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
  el.dataset.zhHtml = el.innerHTML;
});

document.getElementById('langToggle')!.addEventListener('click', () => {
  applyLang(curLang === 'zh' ? 'en' : 'zh');
});

if (curLang === 'en') applyLang('en');

// Lightbox
function openLightbox(el: HTMLElement): void {
  const img = el.querySelector('img');
  if (!img) return;
  document.getElementById('lightboxImg')!.setAttribute('src', img.src);
  document.getElementById('lightbox')!.classList.add('active');
}

function closeLightbox(): void {
  document.getElementById('lightbox')!.classList.remove('active');
}

(window as unknown as { openLightbox: (el: HTMLElement) => void }).openLightbox = openLightbox;
(window as unknown as { closeLightbox: () => void }).closeLightbox = closeLightbox;

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Entrance animation
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).style.opacity = '1';
        (e.target as HTMLElement).style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.step').forEach(el => {
  (el as HTMLElement).style.opacity = '0';
  (el as HTMLElement).style.transform = 'translateY(20px)';
  (el as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
