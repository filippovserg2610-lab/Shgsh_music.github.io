// ========== АНИМАЦИЯ ПЕРЕХОДОВ ==========

// При клике на любую ссылку или кнопку с data-transition
document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-transition]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href') || target.getAttribute('data-href');
        if (href) {
            navigateTo(href);
        }
    }
});

// Перехватываем все ссылки (кроме якорей и внешних)
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

// Основная функция перехода
function navigateTo(url) {
    // Запускаем анимацию входа (страница наплывает справа)
    document.body.classList.add('page-transition-in');
    
    // Ждём окончания анимации (0.6s), потом переходим
    setTimeout(() => {
        window.location.href = url;
    }, 600);
}

// ========== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Страница уже загружена — убираем анимацию входа
    document.body.classList.remove('page-transition-in');
    document.body.classList.add('page-transition-out');
    
    // Через 0.5s убираем класс, чтобы страница стояла на месте
    setTimeout(() => {
        document.body.classList.remove('page-transition-out');
    }, 500);
});

// ========== АНИМАЦИЯ КОМЕТЫ ==========
function triggerComet(callback) {
    // Создаём контейнер для кометы
    const cometContainer = document.createElement('div');
    cometContainer.className = 'comet-container';
    document.body.appendChild(cometContainer);
    
    // Создаём комету
    const comet = document.createElement('div');
    comet.className = 'comet';
    cometContainer.appendChild(comet);
    
    // Создаём свечение
    const glow = document.createElement('div');
    glow.className = 'comet-glow';
    cometContainer.appendChild(glow);
    
    // Создаём белый всплеск
    const flash = document.createElement('div');
    flash.className = 'comet-flash';
    cometContainer.appendChild(flash);
    
    // Запускаем анимацию
    requestAnimationFrame(() => {
        cometContainer.classList.add('active');
    });
    
    // Ждём окончания анимации (2.5s), потом белая вспышка и переход
    setTimeout(() => {
        flash.classList.add('active');
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }, 2500);
}

// ========== ПЕРЕХОД С КОМЕТОЙ (для кнопки НАЗАД и т.п.) ==========
function goBackWithComet(url) {
    triggerComet(() => {
        window.location.href = url;
    });
}

// ========== ОБРАБОТЧИК ДЛЯ КНОПОК С КОМЕТОЙ ==========
document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-comet]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href') || target.getAttribute('data-href') || 'seasons.html';
        goBackWithComet(href);
    }
});