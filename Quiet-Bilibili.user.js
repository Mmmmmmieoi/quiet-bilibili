// ==UserScript==
// @name         清静 B 站
// @namespace    quiet-bilibili.local
// @version      1.1.1
// @description  自动精简 B 站首页，隐藏视频推荐；保留搜索、动态、收藏及课程选集。
// @homepageURL  https://github.com/Mmmmmmieoi/quiet-bilibili
// @supportURL   https://github.com/Mmmmmmieoi/quiet-bilibili/issues
// @license      MIT
// @match        https://www.bilibili.com/*
// @match        https://bilibili.com/*
// @run-at       document-start
// @inject-into  content
// @grant        none
// @noframes
// ==/UserScript==

(() => {
  'use strict';
const config = Object.freeze({
  defaults: Object.freeze({enabled: true, cleanHome: true, hideRelated: true, hideEnd: true}),
  normalize(value = {}) {
    return Object.fromEntries(Object.entries(this.defaults).map(([key, fallback]) =>
      [key, typeof value[key] === 'boolean' ? value[key] : fallback]));
  },
  page(url) {
    const u = new URL(url);
    if (!['www.bilibili.com', 'bilibili.com'].includes(u.hostname)) return 'other';
    if (['/', '/index.html', '/index.htm'].includes(u.pathname)) return 'home';
    if (/^\/(video\/|bangumi\/play\/|list\/watchlater(?:\/|$)|medialist\/play\/|watchlater(?:\/|$))/.test(u.pathname)) return 'video';
    return 'other';
  },
  searchURL(query) {
    const value = query.trim();
    if (!value) return null;
    const url = new URL('https://search.bilibili.com/all');
    url.searchParams.set('keyword', value);
    return url.href;
  }
});

  const sheet = document.createElement('style');
  sheet.id = 'quiet-bilibili-style';
  sheet.textContent = "html[data-qb-home] { background: #fafafa !important; }\nhtml[data-qb-home] body {\n  margin: 0 !important; min-width: 0 !important; background: #fafafa !important;\n}\nhtml[data-qb-home] body > :not(#quiet-bilibili-home) { display: none !important; }\nhtml[data-qb-home] #quiet-bilibili-home { display: block !important; }\nhtml[data-qb-related] :is(.recommend-list-v1, .rec-list, #reco_list, .recommend-list, .video-recommend, .recommend-container) {\n  display: none !important;\n}\n/* Keep the player, replay controls, uploader, comments and episode/collection lists. */\nhtml[data-qb-end] :is(.bpx-player-ending-related, .bpx-player-ending-recommend, .bpx-player-ending-recommendation, .bilibili-player-video-recommend) {\n  display: none !important;\n}\n@media (prefers-color-scheme: dark) {\n  html[data-qb-home], html[data-qb-home] body { background: #17181b !important; }\n}\n";
  function ensureStyle() {
    if (!sheet.isConnected && document.documentElement) {
      (document.head || document.documentElement).append(sheet);
    }
  }
  let settings = {...config.defaults};
  let showOriginal = false;
  let host;
  let favorite;
  let lastURL = location.href;
  let queued = false;

  function mount() {
    if (!document.body) return;
    if (host?.isConnected) return;
    host = document.createElement('div');
    host.id = 'quiet-bilibili-home';
    const shadow = host.attachShadow({mode: 'open'});
    shadow.innerHTML = `
      <style>
        :host { all: initial; color-scheme: light dark; }
        * { box-sizing: border-box; }
        .page { --bg:#fafafa; --fg:#22242b; --muted:#7b7f89; --line:#e5e7eb; --field:#fff;
          background:var(--bg); color:var(--fg); font:15px -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
          min-height:100vh; min-height:100svh; display:flex; flex-direction:column; padding:30px 40px; }
        nav { display:flex; gap:26px; justify-content:flex-end; align-items:center; flex-wrap:wrap; }
        a { color:var(--muted); text-decoration:none; } a:hover { color:#df6085; }
        a:focus-visible, button:focus-visible, input:focus-visible { outline:3px solid #fb92b1; outline-offset:5px; }
        main { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding-bottom:10vh; }
        .eyebrow { color:#e16a8e; font-size:12px; letter-spacing:.2em; margin:0 0 18px; }
        h1 { font-size:36px; font-weight:550; letter-spacing:-1px; margin:0 0 34px; }
        form { display:flex; width:min(580px,100%); gap:12px; padding:8px; border:1px solid var(--line); border-radius:16px; background:var(--field); }
        input { border:0; outline:0; min-width:0; flex:1; background:transparent; color:var(--fg); font:inherit; padding:12px; }
        input::placeholder { color:var(--muted); }
        button { font:inherit; cursor:pointer; }
        .search { border:0; border-radius:10px; color:#fff; background:#de6389; padding:0 24px; }
        .search:hover { background:#c94e73; }
        .hint { color:var(--muted); font-size:13px; margin-top:20px; }
        footer { text-align:center; }
        .restore { border:0; padding:8px; background:none; color:var(--muted); font-size:12px; }
        @media(prefers-color-scheme:dark) { .page { --bg:#17181b; --fg:#eeeff2; --muted:#9a9eaa; --line:#383a41; --field:#22242a; } }
        @media(max-width:600px) { .page {padding:24px 20px;} nav {gap:18px;font-size:13px;} h1 {font-size:30px;} .search {padding:0 18px;} }
      </style>
      <div class="page">
        <nav aria-label="B 站常用入口">
          <a href="https://t.bilibili.com/">动态</a>
          <a href="https://www.bilibili.com/history">历史</a>
          <a id="favorite" href="https://space.bilibili.com/">个人空间</a>
          <a href="https://www.bilibili.com/list/watchlater">稍后再看</a>
          <a href="https://account.bilibili.com/account/home">账号 / 登录</a>
        </nav>
        <main>
          <p class="eyebrow">QUIET BILIBILI</p>
          <h1>只看你想看的。</h1>
          <form role="search" action="https://search.bilibili.com/all" method="get">
            <input name="keyword" type="search" aria-label="搜索 B 站" placeholder="今天想看什么？" autocomplete="off" required>
            <button class="search" type="submit">搜索</button>
          </form>
          <p class="hint">没有推荐，从一个问题开始。</p>
        </main>
        <footer><button class="restore" type="button">本页暂时显示原首页</button></footer>
      </div>`;
    favorite = shadow.getElementById('favorite');
    shadow.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const input = shadow.querySelector('input');
      const url = config.searchURL(input.value);
      if (url) location.assign(url);
      else input.focus();
    });
    shadow.querySelector('.restore').addEventListener('click', () => {
      showOriginal = true;
      apply();
    });
    document.body.append(host);
  }

  function updateFavorite() {
    if (!favorite) return;
    const link = document.querySelector('a[href*="space.bilibili.com/"][href*="/favlist"]');
    if (!link) return;
    try {
      const u = new URL(link.getAttribute('href'), location.href);
      if (u.hostname !== 'space.bilibili.com' || !/^\/\d+\/favlist\/?$/.test(u.pathname)) return;
      const href = `https://space.bilibili.com${u.pathname}`;
      if (favorite.href !== href) {
        favorite.href = href;
        favorite.textContent = '收藏';
      }
    } catch { /* Keep the personal-space fallback when the site link is invalid. */ }
  }

  function apply() {
    ensureStyle();
    const root = document.documentElement;
    if (!root) return;
    const page = config.page(location.href);
    const home = settings.enabled && settings.cleanHome && page === 'home' && !showOriginal;
    if (home) {
      mount();
      updateFavorite();
    } else if (host) {
      host.remove();
      host = null;
      favorite = null;
    }
    // Hide the original only after the replacement exists: failure leaves Bilibili usable.
    root.toggleAttribute('data-qb-home', Boolean(home && host?.isConnected));
    root.toggleAttribute('data-qb-related', settings.enabled && settings.hideRelated && page === 'video');
    root.toggleAttribute('data-qb-end', settings.enabled && settings.hideEnd && page === 'video');
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; apply(); });
  }

  apply();
  document.addEventListener('DOMContentLoaded', apply, {once:true});
  const observer = new MutationObserver(() => {
    if (config.page(location.href) === 'home') schedule();
  });
  observer.observe(document, {childList:true, subtree:true});
  // Isolated content scripts cannot reliably observe page-world pushState wrappers.
  setInterval(() => {
    if (lastURL !== location.href) {
      lastURL = location.href;
      showOriginal = false;
      apply();
    }
  }, 750);
  addEventListener('pageshow', apply);
})();
