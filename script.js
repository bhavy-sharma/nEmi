document.getElementById('submit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    const phoneNumber = data['phone'];
    if (!/^\d{10}$/.test(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Disable the submit button to prevent multiple submissions
    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = true;
    submitButton.value = 'Submitting...';

    fetch('https://script.google.com/macros/s/AKfycbx_RDw5qvo1M95IDus-Zj0L30aJuSt7n47tmnPkAd-zN1LYGvnqOvMsGQ3cnIZHqW6Z1A/exec', { // Replace with your Google Apps Script Web App URL
        method: 'POST',
        body: new URLSearchParams(data),
    })
    .then(response => {
        if (response.ok) {
            const queryString = new URLSearchParams(data).toString();
            // Redirect to notes.html with query parameters
            window.location.href = 'notes.html?' + queryString;
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => {
        console.error('There was a problem with the form submission:', error);
        // Re-enable the submit button if there was an error
        submitButton.disabled = false;
        submitButton.value = 'Submit';
    });
});
