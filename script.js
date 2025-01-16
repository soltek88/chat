const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const status = document.getElementById('status');

let localStream;

startButton.addEventListener('click', async () => {
    try {
        // دسترسی به میکروفون
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioTracks = localStream.getAudioTracks();
        
        if (audioTracks.length > 0) {
            status.textContent = "میکروفون روشن است. صحبت کنید...";
            startButton.disabled = true;
            stopButton.disabled = false;
        }

        // ارسال صدا به دیگران (فقط برای نمایش: نیاز به WebRTC سیگنال‌دهی)
        // این بخش باید به WebRTC و سرور متصل شود.
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(localStream);
        source.connect(audioContext.destination); // برای تست خروجی
    } catch (err) {
        console.error("خطا در دسترسی به میکروفون:", err);
        status.textContent = "خطا: دسترسی به میکروفون ممکن نیست.";
    }
});

stopButton.addEventListener('click', () => {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        status.textContent = "میکروفون خاموش شد.";
        startButton.disabled = false;
        stopButton.disabled = true;
    }
});