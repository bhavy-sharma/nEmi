document.getElementById('submit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('https://script.google.com/macros/s/AKfycbzVkjLqkY0ZGjf4QmoFAnaPQU3WGmoLIll3hTF2uIAkpxGYmMFQTJRtop0Cc71ucgbCVA/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Redirect or show success message
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => {
        console.error('There was a problem with the form submission:', error);
    });
});
