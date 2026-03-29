document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const currentYearElement = document.getElementById('currentYear');
    const themeToggle = document.getElementById('theme-toggle');
    const projectModal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const sections = document.querySelectorAll('section[id]');

    const adjustNavbar = () => {
        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    };

    const updateMenuState = (isOpen) => {
        if (!mobileMenuBtn || !navLinks) {
            return;
        }

        navLinks.classList.toggle('active', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu principal' : 'Abrir menu principal');

        const menuIcon = mobileMenuBtn.querySelector('i');
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', !isOpen);
            menuIcon.classList.toggle('fa-times', isOpen);
        }
    };

    const closeMenu = () => updateMenuState(false);

    const setFormStatus = (message, type) => {
        if (!formStatus) {
            return;
        }

        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
    };

    const openModal = () => {
        if (!projectModal) {
            return;
        }

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
        if (!projectModal) {
            return;
        }

        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    };

    window.addEventListener('scroll', adjustNavbar, { passive: true });
    adjustNavbar();

    const particlesInit = () => {
        if (prefersReducedMotion) {
            return;
        }

        if (window.particlesJS && document.getElementById('particles-js')) {
            window.particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 100,
                        density: { enable: true, value_area: 800 }
                    },
                    color: { value: '#5646ff' },
                    shape: { type: 'circle' },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: { enable: false }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: false }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#5646ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        } else {
            setTimeout(particlesInit, 500);
        }
    };

    if (document.getElementById('particles-js')) {
        if (window.particlesJS) {
            particlesInit();
        } else {
            window.addEventListener('load', particlesInit, { once: true });
        }
    }

    const texts = [
        'Desenvolvedor web focado em interfaces modernas',
        'Construindo projetos para publicar e evoluir',
        'Sempre estudando front-end, UX e performance'
    ];

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const typeText = () => {
        const textElement = document.getElementById('typed-text');
        if (!textElement) {
            return;
        }

        if (prefersReducedMotion) {
            textElement.textContent = texts[0];
            return;
        }

        const currentText = texts[currentTextIndex];
        textElement.textContent = isDeleting
            ? currentText.substring(0, currentCharIndex - 1)
            : currentText.substring(0, currentCharIndex + 1);

        currentCharIndex += isDeleting ? -1 : 1;

        let typingSpeed = isDeleting ? 50 : 120;

        if (!isDeleting && currentCharIndex === currentText.length) {
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        typingTimeout = window.setTimeout(typeText, typingSpeed);
    };

    typeText();

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            updateMenuState(!isOpen);
        });
    }

    document.querySelectorAll('.nav-links a').forEach((item) => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const animateOnScroll = () => {
        document.querySelectorAll('.fade-in').forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (prefersReducedMotion || elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };

    const animateProgress = () => {
        document.querySelectorAll('.skill-card:not(.animated) .progress').forEach((progress) => {
            const card = progress.closest('.skill-card');
            if (!card) {
                return;
            }

            const cardTop = card.getBoundingClientRect().top;
            if (prefersReducedMotion || cardTop < window.innerHeight - 100) {
                const targetWidth = progress.style.width;
                progress.style.width = prefersReducedMotion ? targetWidth : '0%';
                void progress.offsetWidth;

                window.setTimeout(() => {
                    progress.style.width = targetWidth;
                }, prefersReducedMotion ? 0 : 100);

                card.classList.add('animated');
            }
        });
    };

    window.addEventListener('load', animateOnScroll, { once: true });
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    window.addEventListener('load', animateProgress, { once: true });
    window.addEventListener('scroll', animateProgress, { passive: true });
    animateOnScroll();
    animateProgress();

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach((button) => button.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                projectCards.forEach((card) => {
                    const shouldShow = filter === 'all' || card.getAttribute('data-category') === filter;
                    card.style.display = shouldShow ? 'block' : 'none';
                    card.style.opacity = shouldShow ? '1' : '0';
                    card.style.transform = shouldShow ? 'translateY(0)' : 'translateY(20px)';
                });
            });
        });
    }

    const projectsData = {
        projeto1: {
            title: 'CyberSentinel',
            description: 'Landing page autoral com estética tecnológica e foco visual em segurança digital, contraste forte e apresentação de marca.',
            challenges: 'O principal cuidado foi equilibrar impacto visual com leitura clara, mantendo um visual marcante sem comprometer organização e responsividade.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'UI Design'],
            gallery: ['Interface com identidade visual escura', 'Seções destacadas por contraste', 'Layout preparado para diferentes telas'],
            liveLink: 'https://github.com/Programandoprojetos/-CyberSentinel',
            repoLink: 'https://github.com/Programandoprojetos/-CyberSentinel'
        },
        projeto2: {
            title: 'FilmesFlix',
            description: 'Projeto inspirado em plataformas de streaming, desenvolvido para praticar hierarquia visual, destaques de conteúdo e composição moderna de layout.',
            challenges: 'O foco foi criar uma página atrativa, com cara de produto real, organizando informações visuais sem poluir a experiência do usuário.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            gallery: ['Hero com destaque visual', 'Cards de conteúdo bem organizados', 'Estrutura pensada para navegação fluida'],
            liveLink: 'https://programandoprojetos.github.io/FilmesFlix/',
            repoLink: 'https://github.com/Programandoprojetos/FilmesFlix'
        },
        projeto3: {
            title: 'Portfólio Programando Projetos',
            description: 'Portfólio pessoal desenvolvido para apresentar projetos, stack, contatos e evolução como desenvolvedor front-end.',
            challenges: 'O desafio foi construir uma página com personalidade, pronta para GitHub Pages, cuidando de acessibilidade, metadados e publicação.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
            gallery: ['Hero com animações sutis', 'Sessões organizadas para leitura rápida', 'Meta tags e assets prontos para compartilhamento'],
            liveLink: 'https://programandoprojetos.github.io/Portfolio/',
            repoLink: 'https://github.com/programandoprojetos'
        }
    };

    document.querySelectorAll('.view-project').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const projectId = button.getAttribute('data-project');
            const project = projectId ? projectsData[projectId] : null;
            if (!project || !modalTitle || !modalContent) {
                return;
            }

            modalTitle.textContent = project.title;
            modalContent.innerHTML = `
                <div class="project-modal-info">
                    <h4>Descrição</h4>
                    <p>${project.description}</p>

                    <h4>Desafios e soluções</h4>
                    <p>${project.challenges}</p>

                    <h4>Tecnologias utilizadas</h4>
                    <div class="project-tags">
                        ${project.technologies.map((tech) => `<span>${tech}</span>`).join('')}
                    </div>

                    <h4>Destaques</h4>
                    <div class="project-gallery">
                        ${project.gallery.map((item) => `
                            <div class="gallery-item">
                                <i class="fas fa-image"></i>
                                <span>${item}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="project-modal-links">
                        <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Abrir Projeto
                        </a>
                        <a href="${project.repoLink}" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> Ver Código
                        </a>
                    </div>
                </div>
            `;

            openModal();
        });
    });

    if (closeModal && projectModal) {
        closeModal.addEventListener('click', hideModal);

        projectModal.addEventListener('click', (event) => {
            if (event.target === projectModal) {
                hideModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && projectModal.classList.contains('active')) {
                hideModal();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || 'Contato pelo portfólio';
            const message = document.getElementById('message')?.value.trim() || '';

            if (!name || !email || !message) {
                setFormStatus('Preencha nome, e-mail e mensagem para continuar.', 'error');
                return;
            }

            const mailtoSubject = encodeURIComponent(subject);
            const mailtoBody = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);

            setFormStatus('Abrindo seu aplicativo de e-mail com a mensagem pronta.', 'success');
            window.location.href = `mailto:projetodeprogramacao3489@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            contactForm.reset();
        });
    }

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    }

    const imagePlaceholders = document.querySelectorAll('.image-placeholder[data-src]');

    const lazyLoadImage = (placeholder) => {
        const src = placeholder.getAttribute('data-src');
        if (!src) {
            return;
        }

        const img = new Image();
        img.src = src;
        img.onload = () => {
            placeholder.style.backgroundImage = `url(${src})`;
            placeholder.style.backgroundSize = 'cover';
            placeholder.style.backgroundPosition = 'center';

            Array.from(placeholder.children).forEach((child) => {
                child.style.display = 'none';
            });
        };
    };

    if ('IntersectionObserver' in window && imagePlaceholders.length > 0 && !prefersReducedMotion) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    lazyLoadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        imagePlaceholders.forEach((placeholder) => imageObserver.observe(placeholder));
    } else {
        imagePlaceholders.forEach((placeholder) => lazyLoadImage(placeholder));
    }

    const scrollSpy = () => {
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = sectionId ? document.querySelector(`.nav-links a[href*="${sectionId}"]`) : null;

            if (!link) {
                return;
            }

            link.classList.toggle(
                'active',
                scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight
            );
        });
    };

    window.addEventListener('scroll', scrollSpy, { passive: true });
    scrollSpy();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            const target = href ? document.querySelector(href) : null;
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });

    window.addEventListener('beforeunload', () => {
        if (typingTimeout) {
            window.clearTimeout(typingTimeout);
        }
    });
});
