// JavaScript para a landing page do e-book
document.addEventListener('DOMContentLoaded', function() {
    // Contador regressivo
    function updateCountdown() {
        const now = new Date();
        const hours = 23 - now.getHours();
        const minutes = 59 - now.getMinutes();
        const seconds = 59 - now.getSeconds();
        
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Atualiza o contador a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Adiciona classe active ao menu mobile
            if (nav.classList.contains('active')) {
                nav.style.display = 'block';
            } else {
                nav.style.display = '';
            }
        });
    }
    
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                nav.style.display = '';
            }
        });
    });
    
    // Smooth scroll para links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header fixo com efeito de scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scroll para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima
            header.style.transform = 'translateY(0)';
        }
        
        // Adiciona classe quando não está no topo
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animação de elementos ao scroll
    const animatedElements = document.querySelectorAll('.benefit-card, .chapter-card, .testimonial-card, .bonus-card');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.pageYOffset;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Verifica se o elemento está visível na viewport
            if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    // Verifica elementos visíveis no carregamento e no scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Adiciona classe para estilizar elementos ativos no menu
    function setActiveMenuLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const menuLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
            
            if (menuLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav a').forEach(link => link.classList.remove('active'));
                menuLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveMenuLink);
    
    // Adiciona estilos CSS adicionais para responsividade
    function addResponsiveStyles() {
        if (window.innerWidth <= 768) {
            // Estilos para mobile
            document.querySelector('.nav').style.position = 'absolute';
            document.querySelector('.nav').style.top = '100%';
            document.querySelector('.nav').style.left = '0';
            document.querySelector('.nav').style.width = '100%';
            document.querySelector('.nav').style.backgroundColor = 'white';
            document.querySelector('.nav').style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            document.querySelector('.nav').style.padding = '1rem';
            document.querySelector('.nav').style.display = 'none';
            
            document.querySelector('.nav ul').style.flexDirection = 'column';
            document.querySelector('.nav ul').style.gap = '1rem';
            
            // Ajusta tamanho dos CTAs em mobile
            document.querySelectorAll('.btn-large, .btn-xlarge').forEach(btn => {
                btn.style.width = '100%';
                btn.style.textAlign = 'center';
            });
        } else {
            // Remove estilos inline para desktop
            document.querySelector('.nav').style = '';
            document.querySelector('.nav ul').style = '';
            document.querySelectorAll('.btn-large, .btn-xlarge').forEach(btn => {
                btn.style = '';
            });
        }
    }
    
    // Aplica estilos responsivos no carregamento e no redimensionamento
    window.addEventListener('load', addResponsiveStyles);
    window.addEventListener('resize', addResponsiveStyles);
});
