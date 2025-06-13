const showChengeThemeBtn = () => {
    const nav = document.querySelector('nav');
    const themeToggle = document.createElement('img');
    themeToggle.src = '/assets/images/light-theme.png';
    themeToggle.width = 24;
    themeToggle.height = 24;
    themeToggle.alt = 'Mudar Tema';
    themeToggle.classList.add('theme-toggle');
    themeToggle.style.cursor = 'pointer';
    themeToggle.id = 'theme-toggle';
    nav.appendChild(
        themeToggle
    )

    return themeToggle;
};

const toggleTheme = () => {
    const body = document.body;
    const isLightTheme = body.classList.contains('light-theme');
    const themeToggle = document.getElementById('theme-toggle');

    body.classList.toggle('light-theme');

    const elementsToToggle = [
        { selector: '.banner', lightClass: 'light-banner' },
        { selector: '.greeting', lightClass: 'light-greeting' },
        { selector: 'header', lightClass: 'light-header' },
        { selector: '.container-banner', lightClass: 'light-container-banner' },
        { selector: '.card', lightClass: 'light-card' },
        { selector: '.initial-container', lightClass: 'light-initial-container' },
        { selector: '.form-section', lightClass: 'light-section' },
        { selector: '.form-container', lightClass: 'light-form-container' },
        { selector: '.participants-container', lightClass: 'light-participants-container' },
        { selector: '.participant-card', lightClass: 'light-participant-card' },
        { selector: '.form-group', lightClass: 'light-form-group' },
        { selector: '.bg2', lightClass: 'light-bg2' },
        { selector: '.alert-box', lightClass: 'light-alert-box' },
        { selector: '.tipo-ingresso', lightClass: 'light-tipo-ingresso' },
        { selector: '.body', lightClass: 'light-body' }
    ];

    elementsToToggle.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(el => {
            el.style.transition = 'background-color 1000ms, color 1000ms';
            if (isLightTheme) {
                el.classList.remove(item.lightClass);
            } else {
                el.classList.add(item.lightClass);
            }
        });
    });

    if (isLightTheme) {
        themeToggle.src = '/assets/images/light-theme.png';
    } else {
        themeToggle.src = '/assets/images/dark-theme.png';

    localStorage.setItem('theme', isLightTheme ? 'dark' : 'light');
};


document.addEventListener('DOMContentLoaded', function() {
    const formLink = document.querySelector('a[href="#form"]');

    if(formLink) {
        formLink.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('form');

            if(formSection) {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

function getGreeting() {
    const now = new Date();
    const hour = now.toLocaleString('pt-BR', {
        hour:   '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo'
    });
    const h = parseInt(hour, 10);

    if (h >= 5 && h < 12) {
        return 'Bom dia, usuário! ☀️';
    } else if (h >= 12 && h < 18) {
        return 'Boa tarde, usuário! 🌤️';
    } else {
        return 'Boa noite, usuário! 🌙';
    }
}

function showGreeting() {
    const body = document.body;
    const isLightTheme = body.classList.contains('light-theme');
    
    const banner = document.querySelector('.user-message');
    banner.textContent = '';
    const msgElem = document.createElement('div');
    msgElem.classList.add('greeting');
    if (isLightTheme) msgElem.classList.add('light-greeting');
    msgElem.id = 'greeting';
    msgElem.style.margin = '1rem 0';
    msgElem.style.fontSize = '1.2rem';
    msgElem.textContent = getGreeting();
    banner.appendChild(msgElem);
}

setInterval(() => {
    const old = document.getElementById('greeting');
    if (old) old.remove();
    showGreeting();
}, 10);

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = showChengeThemeBtn();
    themeToggle.addEventListener('click', toggleTheme);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        toggleTheme();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    const bg2 = document.querySelector('.bg2');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        banner.style.transform = `translateY(${scrollY * 0.8}px)`;
        bg2.style.transform = `translateY(${scrollY * 0.2}px)`;
        banner.style.opacity = 1 - scrollY / 500;
    });
});

let participants = [];
const form = document.getElementById('cadastro-form');
const participantsContainer = document.getElementById('participants-container');
const novidadesCheckbox = document.getElementById('novidades');

const topicsContainer = document.getElementById('topics-container');

novidadesCheckbox.addEventListener('change', function() {
    topicsContainer.classList.toggle('hidden', !this.checked);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const presenca = document.getElementById('presenca').checked;
    const tipoIngresso = document.getElementById('tipo-ingresso').value;
    const novidades = document.getElementById('novidades').checked;

    if (!nome || !email || !tipoIngresso) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    let topics = [];
    if (novidades) {
        const topicCheckboxes = document.querySelectorAll('input[name="topics"]:checked');
        topicCheckboxes.forEach(checkbox => {
            topics.push(checkbox.value);
        });
    }

    const participant = {
        id: Date.now(),
        nome,
        email,
        presenca,
        tipoIngresso,
        novidades,
        topics
    };

    participants.push(participant);

    renderParticipants();

    form.reset();
    topicsContainer.classList.add('hidden');

    console.log('Participante adicionado:', participant);
});

function renderParticipants() {
    participantsContainer.innerHTML = '';

    if (participants.length === 0) {
        participantsContainer.innerHTML = `
                    <div class="empty-list">
                        <i class="fas fa-users-slash" style="font-size: 3rem; margin-bottom: 15px;"></i>
                        <p>Nenhum participante cadastrado ainda.</p>
                    </div>
                `;
        return;
    }

    participants.forEach(participant => {

        const body = document.body;
        const isLightTheme = body.classList.contains('light-theme');
        const card = document.createElement('div');
        card.className = `participant-card ${participant.tipoIngresso.toLowerCase()}`;
        card.classList.add(isLightTheme ? 'light-participant-card' : 'participant-card');
        
        const presenceClass = participant.presenca ? 'presence-confirmed' : 'presence-not-confirmed';
        const presenceIcon = participant.presenca ? 'fa-check-circle' : 'fa-times-circle';
        const presenceText = participant.presenca ? 'Confirmada' : 'Não confirmada';
        
        const ticketClass = participant.tipoIngresso === 'VIP' ? 'vip' :
            participant.tipoIngresso === 'Convidado' ? 'convidado' : '';

        card.innerHTML = `
                    <div class="participant-info">
                        <div class="participant-name">${participant.nome}</div>
                        <div class="participant-email">${participant.email}</div>
                        <div class="participant-details">
                            <div class="participant-presence ${presenceClass}">
                                <i class="fas ${presenceIcon}"></i> ${presenceText}
                            </div>
                            <div class="ticket-type ${ticketClass}">
                                ${participant.tipoIngresso}
                            </div>
                        </div>
                        ${participant.novidades && participant.topics.length > 0 ? `
                            <div class="topics-list">
                                ${participant.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <button class="remove-btn" data-id="${participant.id}">
                        <i class="fas fa-trash-alt"></i> Remover
                    </button>
                `;

        participantsContainer.appendChild(card);
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeParticipant(id);
        });
    });
}

function removeParticipant(id) {
    participants = participants.filter(participant => participant.id !== id);
    renderParticipants();
}

renderParticipants();