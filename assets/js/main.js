// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка настроек сайта
    fetch('content/settings/settings.json')
      .then(response => response.json())
      .then(settings => {
        document.getElementById('siteTitle').textContent = settings.title;
        document.getElementById('siteDescription').textContent = settings.description;
      })
      .catch(error => console.error('Ошибка загрузки настроек:', error));
  
    // Загрузка списка участников
    fetch('content/participants/participants.json')
      .then(response => response.json())
      .then(participants => {
        const participantsSection = document.getElementById('participants');
        participants.forEach(participant => {
          const participantDiv = document.createElement('div');
          participantDiv.className = 'participant';
          participantDiv.innerHTML = `
            <h2>${participant.name}</h2>
            <p><strong>Страна:</strong> ${participant.country}</p>
            <p><strong>Статус:</strong> ${participant.status === 'confirmed' ? 'Гарантированно участвует' : 'Проходит в лайв-формате'}</p>
            <p>${participant.info}</p>
            <img src="${participant.photo}" alt="${participant.name}">
          `;
          participantsSection.appendChild(participantDiv);
        });
      })
      .catch(error => console.error('Ошибка загрузки участников:', error));
  });
  