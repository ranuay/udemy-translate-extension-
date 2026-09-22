// Variable untuk menyimpan teks terakhir biar gak translate ulang-ulang
let lastText = "";

// 1. Fungsi Request ke Google Translate
async function translateToIndo(text) {
    if (!text || text.trim() === "") return "";
    
    // URL API Google Translate
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURI(text)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            return data[0][0][0];
        }
    } catch (err) {
        console.error("Gagal konek ke Google Translate:", err);
    }
    return null;
}

// 2. Fungsi Utama untuk Memproses Subtitle
async function processSubtitle() {
    // UPDATE: Kita pakai selector 'data-purpose' sesuai screenshot kamu
    const subtitleElement = document.querySelector('[data-purpose="captions-cue-text"]');

    if (subtitleElement) {
        const currentText = subtitleElement.innerText;

        // Cek apakah teks berubah dan bukan teks yang sedang kita edit sendiri
        // Kita juga cek agar tidak men-translate ulang hasil terjemahan (looping)
        if (currentText && currentText !== lastText && !subtitleElement.querySelector('.indo-sub-text')) {
            
            // Simpan teks asli Inggris ke variabel
            lastText = currentText; 

            // Hapus terjemahan lama jika masih nyangkut (opsional, untuk kebersihan)
            const oldTranslations = subtitleElement.querySelectorAll(".indo-sub-text");
            oldTranslations.forEach(el => el.remove());

            // Kirim ke Google Translate
            // NOTE: Kita ambil 'firstChild.textContent' supaya yang diambil cuma teks Inggrisnya, 
            // bukan teks Inggris + teks Indo yang sudah ada (kalau ada bug)
            const textToTranslate = subtitleElement.firstChild ? subtitleElement.firstChild.textContent : currentText;
            
            const translated = await translateToIndo(textToTranslate);

            if (translated) {
                // Buat elemen baru untuk teks Indo
                const indoDiv = document.createElement("div");
                indoDiv.className = "indo-sub-text"; 
                indoDiv.innerText = translated;

                // Tempel di bawah teks Inggris
                subtitleElement.appendChild(indoDiv);
            }
        }
    }
}

// 3. Jalankan script terus menerus setiap 0.5 detik
setInterval(processSubtitle, 250);

console.log("Udemy Indo Translator Loaded - Target Locked!");