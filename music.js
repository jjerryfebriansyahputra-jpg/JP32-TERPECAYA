const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {

    if (!isPlaying) {
        music.play();
        musicBtn.innerHTML = "🔊 Musik ON";
        isPlaying = true;
    } else {
        music.pause();
        musicBtn.innerHTML = "🎵 Musik";
        isPlaying = false;
    }

    <script>
function startMusic() {
    document.getElementById('bgMusic').play();
    document.getElementById('welcomeMusic').style.display = 'none';
}
</script>

});