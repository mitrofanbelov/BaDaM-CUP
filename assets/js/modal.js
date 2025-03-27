// assets/js/modal.js

// Функция открытия модального окна участника
function openParticipantModal(id) {
    // Предполагается, что массив participants уже загружен (например, через другой скрипт)
    const participant = participants.find(p => p.id === id);
    if (!participant) {
        console.error('Участник с ID', id, 'не найден');
        return;
    }

    // Заполнение данных модального окна
    document.getElementById('modalParticipantName').textContent = participant.name;
    document.getElementById('modalParticipantCountry').textContent = participant.country;

    const statusBadge = document.getElementById('modalParticipantStatusBadge');
    const statusText = document.getElementById('modalParticipantStatus');
    if (participant.status === 'confirmed') {
        statusBadge.className = 'status-badge confirmed';
        statusText.textContent = 'Гарантированно участвует';
    } else {
        statusBadge.className = 'status-badge live';
        statusText.textContent = 'Проходит в лайв-формате';
    }

    document.getElementById('modalParticipantInfo').textContent = participant.info;

    const photoElement = document.getElementById('modalParticipantPhoto');
    try {
        photoElement.src = `images/players/${participant.id}.jpg`;
        photoElement.onerror = function() {
            this.src = 'images/default-avatar.png';
        };
    } catch (e) {
        photoElement.src = 'images/default-avatar.png';
        console.error('Ошибка при установке фото:', e);
    }

    // Отображение модального окна и затемнения
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('participantModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Функция закрытия модального окна
function closeParticipantModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('participantModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Обработчики событий для закрытия модального окна
document.getElementById('modalOverlay').addEventListener('click', closeParticipantModal);
document.querySelector('.close-button').addEventListener('click', closeParticipantModal);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeParticipantModal();
    }
});

// Функция для обновления обработчиков карточек участников (если они динамически генерируются)
function updateParticipantCards() {
    const cards = document.querySelectorAll('.participant');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Не реагировать на клики по кнопкам редактирования/удаления
            if (e.target.classList.contains('edit-btn') || e.target.classList.contains('delete-btn')) {
                return;
            }
            const id = parseInt(this.dataset.id);
            openParticipantModal(id);
        });
    });
}

// Экспорт функций, если требуется (например, для использования в других модулях)
// export { openParticipantModal, closeParticipantModal, updateParticipantCards };
