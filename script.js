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

function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString(
        'pt-BR',
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'America/Sao_Paulo'
        }
    ); 
}

function showDateTime() {
    const banner = document.querySelector('nav');
    const dateTimeElem = document.createElement('div');
    dateTimeElem.id = 'dateTime';

    dateTimeElem.textContent = `${getCurrentDateTime()}`;
    banner.appendChild(dateTimeElem);
}

setInterval(
    () => {
        const banner = document.querySelector('nav');
        const dateTimeElem = document.getElementById('dateTime');
        if (dateTimeElem) {
            dateTimeElem.remove();
        }
        showDateTime()
    }, 
    1000
);

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
        const card = document.createElement('div');
        card.className = `participant-card ${participant.tipoIngresso.toLowerCase()}`;
        
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