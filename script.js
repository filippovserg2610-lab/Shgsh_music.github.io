// ========== ГЛОБАЛЬНЫЙ ПЛЕЕР ==========
window.player = {
    currentSeason: null,
    currentIndex: 0,
    currentSong: null,
    audio: null,
    isPlaying: false,
    repeatMode: 0,
    shuffleMode: false,
    playlist: [],
    seasonName: '',
    shuffledPlaylist: [],
    currentShuffleIndex: 0
};

function initPlayer() {
    if (!window.player.audio) {
        window.player.audio = new Audio();
        window.player.audio.addEventListener('ended', function() {
            if (window.player.repeatMode === 1) {
                playCurrentSong();
            } else {
                nextSong();
            }
        });
        window.player.audio.addEventListener('timeupdate', function() {
            if (window.player.audio.duration) {
                const percent = (window.player.audio.currentTime / window.player.audio.duration) * 100;
                const progressBar = document.getElementById('progressBar');
                const timeDisplay = document.getElementById('timeDisplay');
                if (progressBar) progressBar.value = percent;
                if (timeDisplay) {
                    const minutes = Math.floor(window.player.audio.currentTime / 60);
                    const seconds = Math.floor(window.player.audio.currentTime % 60);
                    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }
            }
        });
    }
    updatePlayerUI();
}

function playSong(seasonId, index) {
    const season = SEASONS[seasonId];
    if (!season) return;
    const song = season.songs[index];
    const displayName = song.name || song;
    const folder = season.folder;
    window.player.currentSeason = seasonId;
    window.player.currentIndex = index;
    window.player.currentSong = displayName;
    window.player.seasonName = season.name;
    window.player.playlist = season.songs;

    findAudioFile(folder, song).then(path => {
        if (path) {
            window.player.audio.src = path;
            window.player.audio.load();
            window.player.audio.play().catch(() => {});
            window.player.isPlaying = true;
            updatePlayerUI();
            localStorage.setItem('playerState', JSON.stringify({
                seasonId: seasonId,
                index: index,
                currentTime: 0,
                isPlaying: true
            }));
        } else {
            alert(`⚠️ Файл не найден: ${displayName}`);
        }
    });
}

function playCurrentSong() {
    if (window.player.audio.src) {
        window.player.audio.play().catch(() => {});
        window.player.isPlaying = true;
        updatePlayerUI();
    }
}

function togglePlay() {
    if (window.player.audio.paused) {
        window.player.audio.play().catch(() => {});
        window.player.isPlaying = true;
    } else {
        window.player.audio.pause();
        window.player.isPlaying = false;
    }
    updatePlayerUI();
}

function prevSong() {
    if (window.player.shuffleMode) {
        window.player.currentShuffleIndex = (window.player.currentShuffleIndex - 1 + window.player.shuffledPlaylist.length) % window.player.shuffledPlaylist.length;
        const idx = window.player.shuffledPlaylist[window.player.currentShuffleIndex];
        playSong(window.player.currentSeason, idx);
        return;
    }
    const playlist = window.player.playlist;
    if (playlist.length === 0) return;
    let newIndex = window.player.currentIndex - 1;
    if (newIndex < 0) newIndex = playlist.length - 1;
    playSong(window.player.currentSeason, newIndex);
}

function nextSong() {
    if (window.player.shuffleMode) {
        window.player.currentShuffleIndex = (window.player.currentShuffleIndex + 1) % window.player.shuffledPlaylist.length;
        const idx = window.player.shuffledPlaylist[window.player.currentShuffleIndex];
        playSong(window.player.currentSeason, idx);
        return;
    }
    const playlist = window.player.playlist;
    if (playlist.length === 0) return;
    let newIndex = window.player.currentIndex + 1;
    if (newIndex >= playlist.length) {
        if (window.player.repeatMode === 2) {
            newIndex = 0;
        } else {
            window.player.audio.pause();
            window.player.isPlaying = false;
            updatePlayerUI();
            return;
        }
    }
    playSong(window.player.currentSeason, newIndex);
}

function toggleRepeat() {
    window.player.repeatMode = (window.player.repeatMode + 1) % 3;
    updatePlayerUI();
}

function toggleShuffle() {
    window.player.shuffleMode = !window.player.shuffleMode;
    if (window.player.shuffleMode) {
        const indices = window.player.playlist.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        window.player.shuffledPlaylist = indices;
        window.player.currentShuffleIndex = 0;
    }
    updatePlayerUI();
}

function downloadCurrentSong() {
    if (window.player.audio.src) {
        const link = document.createElement('a');
        link.href = window.player.audio.src;
        link.download = window.player.currentSong + '.mp3';
        link.click();
    }
}

function updatePlayerUI() {
    const playerBar = document.getElementById('playerBar');
    const songName = document.getElementById('currentSongName');
    const seasonName = document.getElementById('currentSeasonName');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const totalTime = document.getElementById('totalTime');

    if (playerBar) {
        playerBar.style.display = (window.player.audio && window.player.audio.src) ? 'flex' : 'none';
    }
    if (songName) songName.textContent = window.player.currentSong || 'Нет трека';
    if (seasonName) seasonName.textContent = window.player.seasonName || '';
    if (playPauseBtn) {
        playPauseBtn.textContent = (window.player.isPlaying && !window.player.audio.paused) ? '⏸' : '▶';
    }
    if (repeatBtn) {
        const icons = ['🔁', '🔂', '🔁'];
        repeatBtn.textContent = icons[window.player.repeatMode];
        repeatBtn.style.color = window.player.repeatMode > 0 ? '#6c5ce7' : '#888';
    }
    if (shuffleBtn) {
        shuffleBtn.style.color = window.player.shuffleMode ? '#6c5ce7' : '#888';
    }
    if (window.player.audio && window.player.audio.duration) {
        const totalMinutes = Math.floor(window.player.audio.duration / 60);
        const totalSeconds = Math.floor(window.player.audio.duration % 60);
        if (totalTime) totalTime.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initPlayer();
    const saved = localStorage.getItem('playerState');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            if (state.seasonId && state.index !== undefined) {
                const season = SEASONS[state.seasonId];
                if (season) {
                    const song = season.songs[state.index];
                    const displayName = song.name || song;
                    window.player.currentSeason = state.seasonId;
                    window.player.currentIndex = state.index;
                    window.player.currentSong = displayName;
                    window.player.seasonName = season.name;
                    window.player.playlist = season.songs;
                    findAudioFile(season.folder, song).then(path => {
                        if (path) {
                            window.player.audio.src = path;
                            window.player.audio.load();
                            if (state.isPlaying) {
                                window.player.audio.play().catch(() => {});
                                window.player.isPlaying = true;
                            }
                            updatePlayerUI();
                        }
                    });
                }
            }
        } catch(e) {}
    }
});

window.addEventListener('beforeunload', function() {
    if (window.player.audio && window.player.audio.src) {
        localStorage.setItem('playerState', JSON.stringify({
            seasonId: window.player.currentSeason,
            index: window.player.currentIndex,
            currentTime: window.player.audio.currentTime || 0,
            isPlaying: !window.player.audio.paused
        }));
    }
});

async function findAudioFile(seasonFolder, song) {
    const folder = `music/${seasonFolder}/`;
    if (song.file && song.file.length > 0) {
        const path = `${folder}${song.file}`;
        try {
            const response = await fetch(path, { method: 'HEAD' });
            if (response.ok) return path;
        } catch(e) {}
    }
    const songName = song.name || song;
    const formats = ['.mp3', '.m4a', '.mp4', '.ogg', '.wav', '.aac'];
    const variants = [
        songName, songName.toLowerCase(),
        songName.replace(/[^\wа-яА-ЯёЁ\s\-]/g, '').trim(),
        songName.replace(/\s+/g, '_'), songName.replace(/\s+/g, '-')
    ];
    const uniqueVariants = [...new Set(variants.filter(v => v && v.length > 0))];
    for (const name of uniqueVariants) {
        for (const format of formats) {
            const path = `${folder}${encodeURIComponent(name)}${format}`;
            try {
                const response = await fetch(path, { method: 'HEAD' });
                if (response.ok) return path;
            } catch(e) {}
        }
    }
    return null;
}

// ===== АНИМАЦИЯ ПЕРЕХОДОВ =====
document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-transition]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href') || target.getAttribute('data-href');
        if (href) {
            document.body.classList.add('page-transition-in');
            setTimeout(() => { window.location.href = href; }, 600);
        }
    }
});

document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-comet]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href') || target.getAttribute('data-href') || 'seasons.html';
        triggerComet(() => { window.location.href = href; });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('page-transition-in');
    document.body.classList.add('page-transition-out');
    setTimeout(() => { document.body.classList.remove('page-transition-out'); }, 500);
});

function triggerComet(callback) {
    const container = document.createElement('div');
    container.className = 'comet-container';
    document.body.appendChild(container);
    const comet = document.createElement('div');
    comet.className = 'comet';
    container.appendChild(comet);
    const glow = document.createElement('div');
    glow.className = 'comet-glow';
    container.appendChild(glow);
    const flash = document.createElement('div');
    flash.className = 'comet-flash';
    container.appendChild(flash);
    requestAnimationFrame(() => { container.classList.add('active'); });
    setTimeout(() => {
        flash.classList.add('active');
        setTimeout(() => { if (callback) callback(); }, 300);
    }, 2500);
}

// ===== СМЕНА ТЕМ =====
function changeTheme(color) {
    const app = document.getElementById('app');
    if (app) {
        app.className = 'telegram-app';
        app.classList.add('theme-' + color);
        localStorage.setItem('theme', color);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const app = document.getElementById('app');
        if (app) app.classList.add('theme-' + savedTheme);
    }
});