# Dokumentacja techniczna projektu Vue 3

## Spis treści

1. [Technologie](#technologie)
2. [Uzasadnienie wyboru Vue 3](#uzasadnienie-wyboru-vue-3)
3. [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
4. [Architektura aplikacji](#architektura-aplikacji)

---

## Technologie

- **Vue 3**
- **TypeScript**
- **Vue Router**
- **Pinia** (zarządzanie stanem)
- **Axios** (zapytania HTTP)
- **Tailwind CSS** (stylowanie)
- **Vitest** (testy jednostkowe)
- **ESLint, Prettier** (formatowanie i lintowanie kodu)
- **Lucide-vue-next** (ikony SVG)
- **vue-chartjs** (diagramy)
- **my-json-server** (backend)

---

## Uzasadnienie wyboru Vue 3 i bibliotek dodatkowych

### Vue 3

Vue ma bardzo intuicyjną architekturę, jest wydajne, wspiera TypeScript, a jego CLI umożliwia łatwe tworzenie projektów zintegrowanych z funkcjonalnościami, które są obecnie standardem na rynku (zarządzanie stanem, routing, testy).

Dodatkowo Vue 3 jest przejrzyste, wyraźnie rozdziela warstwy kodu (HTML, JavaScript/TypeScript i CSS), dzięki czemu łatwo zarządza się projektami.

Warto również zaznaczyć, że Vue 3 jest bardzo popularne i aktywnie rozwijane. Dzięki temu projekty napisane w tym frameworku mogą liczyć na ciągłe wsparcie, aktualizacje oraz dostęp do bogatego ekosystemu bibliotek i narzędzi.

### TypeScript

Pozwala na statyczne typowanie, co zwiększa bezpieczeństwo kodu, ułatwia refaktoryzację i pomaga szybciej wychwytywać błędy już na etapie pisania.

### Vue Router

Standardowe narzędzie do zarządzania trasami w aplikacjach Vue. Umożliwia łatwe tworzenie wielostronicowych aplikacji SPA i kontrolę nad nawigacją.

### Pinia

Nowoczesny i prosty system zarządzania stanem dla Vue 3, który zastępuje Vuex. Zapewnia przejrzystość kodu, prostotę użycia i dobre wsparcie dla TypeScript.

### Axios

Popularna biblioteka do obsługi zapytań HTTP, łatwa w użyciu i dobrze integrująca się z Vue. Pozwala na prostą komunikację z backendem.

### Tailwind CSS

Nowoczesny framework CSS oparty na klasach narzędziowych (utility-first). Pozwala szybko i elastycznie stylować komponenty bez pisania złożonych arkuszy CSS.

### Vitest

Szybki i prosty framework do testów jednostkowych dla projektów opartych na Vue 3. Dobrze integruje się z Vite, co przyspiesza development.

### ESLint, Prettier

ESLint dba o spójność i jakość kodu, wykrywając potencjalne błędy, a Prettier automatycznie formatuje kod zgodnie z ustalonym stylem.

### Lucide-vue-next

Lekka biblioteka z ikonami SVG, która łatwo integruje się z Vue. Pozwala szybko i wygodnie korzystać z nowoczesnych ikon w aplikacji.

### vue-chartjs

Proste narzędzie do generowania czytelnych wykresów i diagramów w aplikacji Vue na bazie popularnej biblioteki Chart.js.

### my-json-server

Pozwala łatwo uruchomić fałszywe API na podstawie pliku db.json znajdującego się w repozytorium

## Instalacja i uruchomienie

```bash
# 1. Klonowanie repozytorium
git clone https://github.com/BartoszStachowski/vue-sellers-panel.git

# 2. Instalacja zależności
cd vue-sellers-panel
npm install

# 3. Uruchomienie aplikacji w trybie deweloperskim
npm run dev

# 4. Budowanie aplikacji na produkcję
npm run build

# 5. Uruchamianie testów jednostkowych
npm run test
```

## Architektura aplikacji

Aplikacja została zaprojektowana w sposób modułowy, zgodnie z dobrymi praktykami Vue 3 oraz nowoczesnymi standardami frontendowymi. Poniżej przedstawiono główne warstwy i ich role w projekcie:

- Warstwa prezentacji (components, views, layouts):

  - components/ zawiera wielokrotnego użytku komponenty podzielone na podkatalogi tematyczne (np. base, layout, SellersList).

  - views/ przechowuje główne widoki odpowiadające trasom aplikacji.

  - layouts/ umożliwia wydzielanie wspólnych szablonów (np. nagłówek, sidebar).

- Warstwa routingu (router/):

  - Za konfigurację nawigacji między stronami odpowiada Vue Router. Pliki w katalogu router/ definiują dostępne trasy i przekierowania.

- Warstwa zarządzania stanem (store/):

  - Globalny stan aplikacji utrzymywany jest za pomocą Pinia. Każdy główny zasób (np. lista sprzedawców) posiada własny store.

- Warstwa logiki biznesowej i komunikacji z API (services/, composables/, utils/):

  - services/ zawiera serwisy do komunikacji z backendem (np. z REST API lub GraphQL).

  - composables/ gromadzi logikę wielokrotnego użycia i hooki typowe dla Composition API.

  - utils/ to zbiór uniwersalnych funkcji pomocniczych.

- Typowanie i bezpieczeństwo (types/):

  - Wszelkie typy TypeScript i interfejsy umieszczone są w katalogu types/, co zapewnia statyczne typowanie i większą niezawodność kodu.

- Warstwa testów:

  - Testy jednostkowe dla komponentów trzymane są w components/tests/, natomiast inne testy (np. E2E) mogą być w katalogu tests/.

- Warstwa zasobów (assets/):

  - Przechowywane są tu pliki statyczne takie jak obrazy czy ikony.

- Pliki konfiguracyjne:

  - Plik main.ts inicjuje aplikację Vue, ładuje globalne style, rejestruje router i store.

  - App.vue jest głównym kontenerem aplikacji.

  - Pozostałe pliki, jak package.json czy vite.config.ts, odpowiadają za konfigurację środowiska, zależności i narzędzi developerskich.

### Podsumowanie:

Taka architektura pozwala na łatwą rozbudowę projektu, utrzymanie przejrzystości kodu oraz szybkie wdrażanie nowych funkcjonalności, a podział na warstwy logiczne ułatwia pracę zarówno małych, jak i większych zespołów deweloperskich.
