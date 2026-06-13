document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // 1. COMPORTAMIENTO HEADER ON SCROLL
    // ----------------------------------------
    const header = document.getElementById('main-header');
    const logoText = document.getElementById('logo-text');
    const logoImg = document.getElementById('logo-img');
    const headerCta = document.getElementById('header-cta');
    const updateHeaderStyles = () => {
        if (!header || !headerCta)
            return;
        if (window.scrollY > 50) {
            header.classList.remove('bg-transparent', 'text-white');
            header.classList.add('bg-white', 'shadow-md', 'text-gray-800');
            if (logoText) {
                logoText.classList.remove('text-white');
                logoText.classList.add('text-gray-800');
            }
            if (logoImg) {
                logoImg.classList.add('imagen-negativa');
            }
            headerCta.classList.remove('border-white', 'text-white', 'hover:bg-white', 'hover:text-utpRed');
            headerCta.classList.add('bg-utpRed', 'border-utpRed', 'text-white', 'hover:bg-utpDarkRed', 'hover:text-white');
        }
        else {
            header.classList.remove('bg-white', 'shadow-md', 'text-gray-800');
            header.classList.add('bg-transparent', 'text-white');
            if (logoText) {
                logoText.classList.remove('text-gray-800');
                logoText.classList.add('text-white');
            }
            if (logoImg) {
                logoImg.classList.remove('imagen-negativa');
            }
            headerCta.classList.remove('bg-utpRed', 'border-utpRed', 'text-white', 'hover:bg-utpDarkRed', 'hover:text-white');
            headerCta.classList.add('bg-transparent', 'border-white', 'text-white', 'hover:bg-white', 'hover:text-utpRed');
        }
    };
    window.addEventListener('scroll', updateHeaderStyles);
    updateHeaderStyles(); // Ejecutar al inicio para validar estado inicial
    // ----------------------------------------
    // 2. TOGGLE MENÚ HAMBURGUESA MÓVIL
    // ----------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;
    const toggleMenu = () => {
        if (!mobileMenu || !menuIcon)
            return;
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // Abrir
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                mobileMenu.classList.add('opacity-100', 'translate-y-0');
            }, 10);
            // Cambiar a icono cerrar (X)
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
        else {
            // Cerrar
            mobileMenu.classList.remove('opacity-100', 'translate-y-0');
            mobileMenu.classList.add('opacity-0', '-translate-y-4');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            // Cambiar a icono hamburguesa
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    };
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }
    // Cerrar menú al hacer clic en un enlace de navegación
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (isMenuOpen)
                toggleMenu();
        });
    });
    // ----------------------------------------
    // 3. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    // ----------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            if (!item)
                return;
            const content = item.querySelector('.accordion-content');
            const chevron = header.querySelector('.accordion-chevron');
            if (!content || !chevron)
                return;
            const isActive = item.classList.contains('active');
            // Cerrar todos los demás acordeones abiertos
            document.querySelectorAll('.accordion-item').forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherChevron = otherItem.querySelector('.accordion-chevron');
                    if (otherContent)
                        otherContent.style.maxHeight = '';
                    if (otherChevron)
                        otherChevron.classList.remove('rotate-180');
                }
            });
            // Toggle de la sección seleccionada
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = '';
                chevron.classList.remove('rotate-180');
            }
            else {
                item.classList.add('active');
                content.style.maxHeight = `${content.scrollHeight}px`;
                chevron.classList.add('rotate-180');
            }
        });
    });
});
