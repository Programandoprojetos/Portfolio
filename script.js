// Esperar pelo carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Função para ajustar o navbar ao rolar
    const adjustNavbar = () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = "0.7rem 0";
            navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
        } else {
            navbar.style.padding = "1rem 0";
            navbar.style.boxShadow = "none";
        }
    };

    // Adicionando listener para scroll
    window.addEventListener('scroll', adjustNavbar);

    // Inicializando o particles.js quando for carregado
    const particlesInit = () => {
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
            setTimeout(particlesInit, 500); // Tentar novamente em 500ms
        }
    };

    // Iniciar particles.js ou tentar novamente quando estiver disponível
    if (document.getElementById('particles-js')) {
        if (window.particlesJS) {
            particlesInit();
        } else {
            window.addEventListener('load', particlesInit);
        }
    }

    // Animação de digitação
    const textos = [
        "Desenvolvedor Web Iniciante",
        "Estudante de Gestão da TI",
        "Sou apaixonado Por Tecnologia"
    ];
    
    let textoAtual = 0;
    let letraAtual = 0;
    let estaDeletando = false;
    let tempoDigitacao = 150;
    
    function digitarTexto() {
        const texto = textos[textoAtual];
        const elementoTexto = document.getElementById('typed-text');
        
        if (!elementoTexto) return;
        
        if (estaDeletando) {
            elementoTexto.textContent = texto.substring(0, letraAtual - 1);
            letraAtual--;
            tempoDigitacao = 50; // Mais rápido ao deletar
        } else {
            elementoTexto.textContent = texto.substring(0, letraAtual + 1);
            letraAtual++;
            tempoDigitacao = 150; // Normal ao digitar
        }
        
        // Delay maior no final de uma palavra
        if (!estaDeletando && letraAtual === texto.length) {
            tempoDigitacao = 2000; // Pausa no final do texto
            estaDeletando = true;
        } 
        // Quando terminar de deletar uma palavra
        else if (estaDeletando && letraAtual === 0) {
            estaDeletando = false;
            textoAtual = (textoAtual + 1) % textos.length; // Avança para o próximo texto
            tempoDigitacao = 500; // Pausa antes de digitar o próximo
        }
        
        setTimeout(digitarTexto, tempoDigitacao);
    }

    // Iniciar animação de digitação
    if (document.getElementById('typed-text')) {
        digitarTexto();
    }

    // Toggle do menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Mudar ícone do menu
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon.classList.contains('fa-bars')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu mobile ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const menuIcon = mobileMenuBtn.querySelector('i');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Adicionar ano atual no footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Animações de entrada
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };

    // Executar animações ao carregar e ao scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Iniciar animações de progresso nas skills quando visíveis
    const animateProgress = () => {
        const progressBars = document.querySelectorAll('.skill-card:not(.animated) .progress');
        
        progressBars.forEach(progress => {
            const card = progress.closest('.skill-card');
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < window.innerHeight - 100) {
                // Definir largura para 0 inicialmente
                progress.style.width = '0%';
                
                // Forçar reflow
                void progress.offsetWidth;
                
                // Animar para o valor correto
                setTimeout(() => {
                    progress.style.width = progress.getAttribute('style').split('width:')[1];
                }, 100);
                
                card.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateProgress);
    window.addEventListener('load', animateProgress);

    // Filtro de projetos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover classe active de todos os botões
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Adicionar classe active ao botão clicado
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filtrar projetos
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        
                        // Adicionar animação
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Ocultar após a animação
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Sistema de modais para projetos
    const projectModal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const viewProjectButtons = document.querySelectorAll('.view-project');
    
    // Dados dos projetos para os modais
    const projectsData = {
        projeto1: {
            title: "E-commerce Responsivo",
            description: "Um sistema completo de e-commerce com funcionalidades de cadastro de usuários, carrinho de compras, pagamentos e painel administrativo. Desenvolvido com foco em responsividade para funcionar em qualquer dispositivo.",
            challenges: "Um dos principais desafios deste projeto foi implementar um sistema de pagamento seguro e garantir que o site tivesse alta performance mesmo com um grande número de produtos. A otimização de imagens e o carregamento lazy foram fundamentais para melhorar a experiência do usuário.",
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "API de Pagamentos"],
            gallery: ["galeria1.jpg", "galeria2.jpg", "galeria3.jpg"],
            liveLink: "https://seulink.com/projeto1",
            repoLink: "https://github.com/seuperfil/projeto1"
        },
        projeto2: {
            title: "Aplicativo de Finanças",
            description: "Um aplicativo web para controle financeiro pessoal, permitindo o registro de receitas e despesas, categorização, gráficos de desempenho e planejamento financeiro. Implementado com React e Firebase para autenticação e banco de dados em tempo real.",
            challenges: "O principal desafio foi criar uma interface intuitiva que tornasse o controle financeiro simples e acessível. Também foi desafiador implementar os gráficos de análise de dados de forma otimizada para não prejudicar a performance do aplicativo.",
            technologies: ["React", "Firebase", "Context API", "Chart.js", "Styled Components"],
            gallery: ["app1.jpg", "app2.jpg", "app3.jpg"],
            liveLink: "https://seulink.com/projeto2",
            repoLink: "https://github.com/seuperfil/projeto2"
        },
        projeto3: {
            title: "Landing Page Moderna",
            description: "Uma landing page de alto impacto visual para uma empresa de tecnologia. O projeto focou em design moderno, animações sutis e otimização para conversão de visitantes em leads ou clientes.",
            challenges: "O maior desafio foi equilibrar elementos visuais impressionantes com a performance do site. Otimizar as animações para não prejudicar o carregamento foi um aspecto importante do desenvolvimento.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Figma"],
            gallery: ["landing1.jpg", "landing2.jpg", "landing3.jpg"],
            liveLink: "https://seulink.com/projeto3",
            repoLink: "https://github.com/seuperfil/projeto3"
        }
    };
    
    // Abrir modal com detalhes do projeto
    if (viewProjectButtons.length > 0 && projectModal && modalContent) {
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const projectId = button.getAttribute('data-project');
                const project = projectsData[projectId];
                
                if (project) {
                    modalTitle.textContent = project.title;
                    
                    // Criar conteúdo do modal
                    let modalHTML = `
                        <div class="project-modal-info">
                            <h4>Descrição</h4>
                            <p>${project.description}</p>
                            
                            <h4>Desafios e Soluções</h4>
                            <p>${project.challenges}</p>
                            
                            <h4>Tecnologias Utilizadas</h4>
                            <div class="project-tags">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                            
                            <h4>Galeria</h4>
                            <div class="project-gallery">
                                ${project.gallery.map(img => `
                                    <div class="gallery-item">
                                        <i class="fas fa-image"></i>
                                        <span>Imagem do Projeto</span>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="project-modal-links">
                                <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt"></i> Visitar Projeto
                                </a>
                                <a href="${project.repoLink}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-github"></i> Ver Código
                                </a>
                            </div>
                        </div>
                    `;
                    
                    modalContent.innerHTML = modalHTML;
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Impedir scroll do body
                }
            });
        });
    }
    
    // Fechar modal
    if (closeModal && projectModal) {
        closeModal.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaurar scroll
        });
        
        // Fechar modal ao clicar fora
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Fechar modal com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obter valores do formulário
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : 'Contato do Portfólio';
            const message = document.getElementById('message').value.trim();
            
            // Validação básica
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Em uma implementação real, você enviaria estes dados para um servidor
            // Para demonstração, criamos um link mailto
            const mailtoSubject = encodeURIComponent(subject);
            const mailtoBody = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem: ${message}`);
            window.location.href = `mailto:seuemail@dominio.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Limpar formulário
            contactForm.reset();
            
            // Feedback visual (em uma implementação real, você mostraria um toast/notificação)
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        });
    }
    
    // Toggle de tema claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Verificar preferência de tema no localStorage
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            // Salvar preferência
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Aplicar lazy loading para imagens
    const imagePlaceholders = document.querySelectorAll('.image-placeholder[data-src]');
    
    const lazyLoadImage = (placeholder) => {
        const src = placeholder.getAttribute('data-src');
        if (!src) return;
        
        const img = new Image();
        img.src = src;
        
        img.onload = () => {
            placeholder.style.backgroundImage = `url(${src})`;
            placeholder.style.backgroundSize = 'cover';
            placeholder.style.backgroundPosition = 'center';
            
            // Esconder texto e ícone
            const children = placeholder.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
        };
    };
    
    // Inicializar Intersection Observer para lazy loading
    if ('IntersectionObserver' in window && imagePlaceholders.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        
        imagePlaceholders.forEach(placeholder => {
            imageObserver.observe(placeholder);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        imagePlaceholders.forEach(placeholder => {
            lazyLoadImage(placeholder);
        });
    }
    
    // Scrollspy para destacar link da seção ativa no menu
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*="' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*="' + sectionId + '"]')?.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', scrollSpy);
    
    // Navegação suave para os links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Ajuste para compensar a altura do navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});