// Funcionalidade do Formulário de Contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Mudar estado do botão
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            formStatus.style.display = 'block';
            formStatus.style.color = '#4a7c72'; // Cor do seu tema
            formStatus.textContent = 'Enviando sua mensagem...';
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.style.color = 'green';
                    formStatus.textContent = 'Mensagem enviada com sucesso!';
                    this.reset();
                } else {
                    formStatus.style.color = 'red';
                    formStatus.textContent = 'Erro ao enviar. Tente novamente.';
                }
            } catch (error) {
                formStatus.style.color = 'red';
                formStatus.textContent = 'Erro de conexão.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
                setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
            }
        });
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Classe ativa no scroll e Animações
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) { current = section.getAttribute('id'); }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) { link.classList.add('active'); }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.experience-item, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `.nav a.active { color: #4a7c72; border-bottom: 2px solid #4a7c72; padding-bottom: 5px; }`;
document.head.appendChild(style);

