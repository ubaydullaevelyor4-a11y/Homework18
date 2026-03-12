const textArea = document.getElementById('text');
const voiceSelect = document.getElementById('voices');
const speakButton = document.getElementById('speak');

function loadVoices() {
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;

speakButton.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(textArea.value);
    const selectedVoice = voiceSelect.value;

    const voice = speechSynthesis.getVoices().find(v => v.name === selectedVoice);
    if (voice) {
        utterance.voice = voice;
    }

    speechSynthesis.speak(utterance);
});

loadVoices();