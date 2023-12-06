
function createCard(name, description, pictureUrl, startDate, endDate, location) {
    return `
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">
        <p>${startDate} - ${endDate}</p>
      </div>
    </div>
    `;
}



window.addEventListener('DOMContentLoaded', async () => {

        const url = 'http://localhost:8000/api/conferences';

        try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Something went wrong');
        } else {
            const data = await response.json();

            const column = document.querySelectorAll('.col');
            let index = 0;
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);

            if (detailResponse.ok) {
                const details = await detailResponse.json();

                const title = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;

                const start = details.conference.starts;
                const end = details.conference.ends;
                const parsedStart = Date.parse(start);
                const parsedEnd = Date.parse(end);
                const startDate = new Date(parsedStart).toLocaleDateString();
                const endDate = new Date(parsedEnd).toLocaleDateString();

                const location = details.conference.location.name;

                const html = createCard(title, description, pictureUrl, startDate, endDate, location);

                column[index].innerHTML += html;
                if (index < 2) {
                    index++;
                } else {
                    index = 0;
                }

            }
        }

        }
    } catch (err) {
        console.error('ERROR: ', err);
    }



});
