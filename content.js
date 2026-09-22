let lastText = "";
const cache = new Map();

async function translateToIndo(text) {
    if (!text || text.trim() === "") return "";
    if (cache.has(text)) return cache.get(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURI(text)}`;
    try {
        const data = await fetch(url).then(r => r.json());
        const result = data?.[0]?.[0]?.[0] ?? null;
        if (result) cache.set(text, result);
        return result;
    } catch (err) {
        console.error("Gagal konek ke Google Translate:", err);
        return null;
    }
}

async function processSubtitle(el) {
    const text = el.firstChild?.textContent || el.innerText;
    if (!text || text === lastText || el.querySelector(".indo-sub-text")) return;

    lastText = text;
    el.querySelectorAll(".indo-sub-text").forEach(e => e.remove());

    const translated = await translateToIndo(text);
    if (!translated) return;

    const div = document.createElement("div");
    div.className = "indo-sub-text";
    div.innerText = translated;
    el.appendChild(div);
}

const observer = new MutationObserver(() => {
    const el = document.querySelector('[data-purpose="captions-cue-text"]');
    if (el) processSubtitle(el);
});

observer.observe(document.body, { childList: true, subtree: true });

console.log("Udemy Indo Translator Loaded - Target Locked!");