window.addEventListener('DOMContentLoaded', async () => {
const locationUrl = 'http://localhost:8000/api/locations/';

try {
    const locationResponse = await fetch(locationUrl);

    if (locationResponse.ok) {
        const data = await locationResponse.json();
        console.log(data);

        const selectTag = document.querySelector('select');
        for (let location of data.locations) {
            const newEl = document.createElement('option');
            newEl.value = location.id;
            newEl.innerHTML = location.name;
            selectTag.appendChild(newEl);
        }

    }




const formTag = document.getElementById('create-conference-form');
formTag.addEventListener('submit', async event => {
    event.preventDefault();



    const formData = new FormData(formTag);
    const json = JSON.stringify(Object.fromEntries(formData)); // formData is an array like iterable of name-value pairs. Object.fromEntries takes values form an array and turns them into an object. Then JSON.stringify() stringifies that object into a JSON object

    const conferenceUrl = 'http://localhost:8000/api/conferences/';

    const fetchOptions = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(conferenceUrl, fetchOptions);
        console.log("RESPONSE: ", response);
    if (response.ok) {
        formTag.reset();
    }

});

} catch (err) {
    console.log("ERROR: ", err);
}

});
