window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/states/';

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            const states = data.states;
            const optionElement = document.getElementById('state');

            for (let state of states) {
                const newEl = document.createElement('option');
                newEl.innerHTML = state.name;
                newEl.value = state.abbreviation;
                optionElement.appendChild(newEl);
        }

        }

        const formTag = document.getElementById('create-location-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData)); // formData is an array like iterable of name-value pairs. Object.fromEntries takes values form an array and turns them into an object. Then JSON.stringify() stringifies that object into a JSON object

            const locationUrl = 'http://localhost:8000/api/locations/';
            const fetchConfig = {
                method: 'POST',
                body: json,
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
            }

        });


    } catch (err) {
        console.error("ERROR: ", err);
    }
});
