/* ==========================================================================
   PROSEDURIA: APPLICATION CONTROLLER (RELIABLE & ERROR-PROOF)
   ========================================================================== */

const App = {
  playerName: 'Penjelajah',
  schoolName: 'SMP Nusantara',
  audioMuted: false,

  init() {
    console.log('Proseduria Engine Siap.');
  },

  playSound(soundId) {
    if (this.audioMuted) return;
    const el = document.getElementById(soundId);
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {
        // Mencegah browser berhenti jika audio belum diizinkan
      });
    }
  },

  toggleAudio() {
    const bgm = document.getElementById('snd-bgm');
    this.audioMuted = !this.audioMuted;
    if (bgm) {
      if (this.audioMuted) {
        bgm.pause();
      } else {
        bgm.play().catch(() => {});
      }
    }
  },

  startGame() {
    // 1. Ambil Nama Penjelajah
    const nameInput = document.getElementById('player-input');
    const schoolInput = document.getElementById('school-input');
    
    if (nameInput && nameInput.value.trim() !== '') {
      this.playerName = nameInput.value.trim();
    }
    if (schoolInput && schoolInput.value.trim() !== '') {
      this.schoolName = schoolInput.value.trim();
    }

    // Perbarui HUD Atas
    const hudName = document.getElementById('hud-player-name');
    if (hudName) hudName.innerText = this.playerName.toUpperCase();

    // 2. Mainkan Suara Klik & Putar BGM
    this.playSound('snd-click');
    const bgm = document.getElementById('snd-bgm');
    if (bgm && !this.audioMuted) {
      bgm.volume = 0.4;
      bgm.play().catch(() => console.log('Audio autoplay menunggu izin.'));
    }

    // 3. Tampilkan HUD & Pindah Layar ke Peta
    const hud = document.getElementById('global-hud');
    if (hud) hud.style.display = 'flex';

    this.navigateTo('scene-map');
  },

  navigateTo(sceneId) {
    // Sembunyikan semua scene
    document.querySelectorAll('.scene').forEach(scene => {
      scene.classList.remove('active');
    });

    // Aktifkan scene yang dituju
    const target = document.getElementById(sceneId);
    if (target) {
      target.classList.add('active');
    }
  },

  openMission(missionNumber) {
    this.playSound('snd-click');
    if (missionNumber === 1) {
      this.navigateTo('scene-mission-01');
      if (window.Mission01) {
        Mission01.start();
      }
    } else {
      alert(`Persinggahan ${missionNumber} masih terkunci! Selesaikan Persinggahan 01 terlebih dahulu.`);
    }
  }
};

window.addEventListener('DOMContentLoaded', () => App.init());