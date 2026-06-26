// ========== ДАННЫЕ О СЕЗОНАХ ==========
const SEASONS = {
    "8": {
        name: "🎸 8 СЕЗОН",
        folder: "8_season",
        dev: false,
        songs: [
            "Про друзей", "Не переживай", "База", "Море", "Алые пожары", "Романс",
            "Она любовь", "Последнее лето", "Lullaby for the weary", "Прогулка с собакой",
            "Ни с одной", "SHRAMY", "Тени от пальм", "Не я", "Нуар", "Лампочки",
            "Моя душа", "Молодая красивая дрянь", "Я уёбываю в джаз",
            "Полудница - Гадкий утёнок", "УГАДАЙКТО - Suck My Balls", "Юлия Новоселова",
            "Праздник", "SAWCE", "Школа не нужна", "Зачемгород"
        ]
    },
    "7": {
        name: "🥁 7 СЕЗОН",
        folder: "7_season",
        dev: false,
        songs: [
            "Only time", "Cyberpunkz", "Shouldve Been Me", "Axilla", "Amor Nostalgico",
            "Cant Be There", "Sweep the Leg", "AKA, ШГШ - ОДНО И ТОЖЕ", "David Celeste - Ad Meliora",
            "PWR", "Poluta", "Shitty train", "Before Its Gone", "Anyway", "Edgar Hopp",
            "Сироткин - дыхание", "Шгш - Множество зобов", "Дерзкий - человеку нужен человек",
            "АКА - Ты похож на кота", "Спать с тобой", "Нам всего 16", "Шгш - преданный класс (7 сезона)",
            "АКА, ШГШ - давай, не ссы", "Дерзкий - правда или действие", "АКА - Мы",
            "Шгш - Зодиак", "Дерзкий - Лайтово", "Милкис - Аирдроп", "Шгш - Принц на белом коне",
            "Шгш - на люстрі", "Шгш - Хрущевка", "Шгш - Маленький принц", "Шгш - Пустой вокзал"
        ]
    },
    "6": {
        name: "🎹 6 СЕЗОН",
        folder: "6_season",
        dev: false,
        songs: [
            "Мужа дома нету", "Peter Sandberg", "Jakob ahlbom", "SLAMJAKE - BZNS",
            "Echo Sax End", "Panic Attack", "Шгш - Полина", "Шгш - Цензура", "Шгш - Маля",
            "Another God", "Шгш, Ксюша - на ночевке", "Candelion_Press", "Шгш - ШГШ",
            "Шгш - Легендарный", "Шгш - Наколки", "Шгш - Не переживай", "Шгш - Последняя победа",
            "Шгш - Я никогда не буду работать", "Шгш - Последняя любовь"
        ]
    },
    "5": {
        name: "🎧 5 СЕЗОН",
        folder: "5_season",
        dev: false,
        songs: [
            "Шгш - Мы рядом", "Mothers Madness", "Sven Karlsson", "Def Lev",
            "Шгш - я, Дерзкий твой", "Шгш - школа будет долгой", "Шгш - и это прекрасно"
        ]
    },
    "4": {
        name: "📻 4 СЕЗОН",
        folder: "4_season",
        dev: false,
        songs: [
            "Elliot Holmes", "Дерз, ШГШ - Я дерзкий", "Choking Feat Red", "Shiver Disk - Chase Me",
            "Confidence Is Key", "Im a Hurricane", "Manhattan Mystery", "Rocket JR",
            "Шгш - Забросили учёбу", "Шгш - преданный класс А сезон", "Шгш - АнжГерКам",
            "Шгш - Последний звонок", "Шгш - Сколько с тобой", "Шгш - Беда дисс",
            "Duke Herrington", "Rockin_For_Decades1", "Got Something Going", "Go Cat Go",
            "Harry Edvino", "Stickin' Around", "Back to My Roots", "Ludvig Moulim",
            "Peter Crosby", "Purple Guy Song", "Bring It Back", "Strange Roll",
            "Hiding in the Dark", "Palace Dinner", "More Than You", "Drunken Sailor",
            "Love on a Roll", "max_anson", "Rockin_For_Decades2", "Mike Franklyn",
            "Safe Trips", "Cleo_Kelley_Wrong_", "Left for Dead", "Pursuing",
            "Roof_Don_t_Care", "Leave Sadness", "The Whole Nine", "Hiding Out",
            "Magnetic Kid", "Джаро & Ханза", "Red Revision", "At Stake", "Of Men",
            "Bottom Of My", "Smartface", "Elijah N", "8-Bit Hop", "The Times We",
            "Rids", "Chasing the Truth", "It Was Newer", "I Dare You Dear",
            "T. Morri", "Play It Cool", "Epocha", "Tick Tock Boom", "Tricks",
            "Closer to the Light", "_Teya", "The Hardest", "Skip a Chance",
            "Coming Through", "A Shadow on Wigmore", "My Left Foot", "Moorland"
        ]
    },
    "3": {
        name: "⏳ 3 СЕЗОН",
        folder: "3_season",
        dev: true,
        songs: ["🚧 В РАЗРАБОТКЕ", "🎵 Появится в будущем обновлении"]
    },
    "2": {
        name: "⏳ 2 СЕЗОН",
        folder: "2_season",
        dev: true,
        songs: ["🚧 В РАЗРАБОТКЕ", "🎵 Появится в будущем обновлении"]
    },
    "1": {
        name: "⏳ 1 СЕЗОН",
        folder: "1_season",
        dev: true,
        songs: ["🚧 В РАЗРАБОТКЕ", "🎵 Появится в будущем обновлении"]
    },
    "0": {
        name: "🎙️ РЕМИКСЫ",
        folder: "0_season",
        dev: false,
        songs: [
            "Шгш, ремикс - маленький принц",
            "Шгш, ремикс - лайтово",
            "Шгш, ремикс - последняя любовь",
            "Шгш, ремикс - наколки"
        ]
    },
    "temp": {
        name: "🔄 ВРЕМЕННЫЕ ОРИГИНАЛЫ",
        folder: "temp_originals",
        dev: false,
        temp: true,
        songs: [
            "🔜 Скоро здесь появятся оригиналы песен из серий ШГШ",
            "⚡ Следите за обновлениями!"
        ]
    }
};