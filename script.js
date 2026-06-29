document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-transition]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href') || target.getAttribute('data-href');
        if (href) navigateTo(href);
    }
});

document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && link.href.startsWith(window.location.origin)) {
        const target = link.getAttribute('target');
        if (target !== '_blank') {
            e.preventDefault();
            navigateTo(link.href);
        }
    }
});

function navigateTo(url) {
    document.body.classList.add('page-transition-in');
    setTimeout(() => { window.location.href = url; }, 600);
}

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

function goBackWithComet(url) {
    triggerComet(() => { window.location.href = url; });
}

document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-comet]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href') || target.getAttribute('data-href') || 'seasons.html';
        goBackWithComet(href);
    }
});