document.addEventListener('DOMContentLoaded', ()=>{
    const menuButton = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mainNav');
    const navLinks = Array.from(document.querySelectorAll('.nav-li-a'));
    const header = document.querySelector('header');
    let headerH = header ? header.offsetHeight : 0;
    let lastScroll = 0;

    // Atualiza altura do header ao redimensionar
    window.addEventListener('resize', () => {
        headerH = header ? header.offsetHeight : 0;
    });

    // --- TOGGLE MENU MOBILE ---
    if (menuButton && mobileMenu) {
        const icon = menuButton.querySelector('i');

        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            
            // Alterna entre hidden/block
            mobileMenu.classList.toggle('hidden', !isHidden);
            mobileMenu.classList.toggle('active', isHidden);
            
            if (icon) {
                icon.classList.toggle('fa-bars', !isHidden);
                icon.classList.toggle('fa-times', isHidden);
            }
        });

        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            const aberto = !mobileMenu.classList.contains('hidden');
            if (aberto && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
                if (icon) { 
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Evita fechar ao clicar dentro do menu
        mobileMenu.addEventListener('click', (e) => e.stopPropagation());
    }

    // Aplicar efeito de digitação no título principal
    const heroTitle = document.querySelector('.hero-h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
    
    // Suavizar rolagem para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 10,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto - CORREÇÃO COMPLETA
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('active');
                    
                    // Resetar o ícone do menu
                    const icon = menuButton.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Header hide/show on scroll
    if (header) {
        // Configura header fixo via JavaScript
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.paddingLeft = '16px';
        header.style.paddingRight = '16px';
        header.style.width = '100%';
        header.style.zIndex = '1000';
        header.style.background = '#0a0a20';
        header.style.transition = 'transform 0.3s ease';
        
        // Adiciona padding ao body para compensar header fixo
        document.body.style.paddingTop = headerH + 'px';
        
        // Throttle function para performance
        function throttle(func, wait) {
            let timeout = null;
            let previous = 0;
            
            return function() {
                const now = Date.now();
                const remaining = wait - (now - previous);
                
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    func.apply(this, arguments);
                } else if (!timeout) {
                    timeout = setTimeout(() => {
                        previous = Date.now();
                        timeout = null;
                        func.apply(this, arguments);
                    }, remaining);
                }
            };
        }

        function handleHeaderScroll() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > headerH) {
                // Rolando para BAIXO - esconde header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Rolando para CIMA - mostra header
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }

        // Evento de scroll
        window.addEventListener('scroll', throttle(handleHeaderScroll, 100));
    }
});

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}