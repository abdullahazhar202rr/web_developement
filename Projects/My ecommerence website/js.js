document.querySelector('.email-box').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    const email = document.querySelector('input[name="email"]').value;
    if (validateEmail(email)) {
        alert('Thank you for subscribing!');
        // You can add any backend submission logic here, for now, it's prevented.
    } else {
        alert('Please enter a valid email address.');
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@gmail\.com$/;
    return regex.test(email);
}