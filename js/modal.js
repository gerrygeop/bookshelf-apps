const modal = document.getElementById('modal');
const confirmModal = document.getElementById('confirmModal');

function showModal() {
    modal.style.display = 'block';
};

function closeModal() {
    modal.style.display = 'none';
    confirmModal.style.display = 'none';
};

modal.addEventListener('click', function (event) {
    event.preventDefault;
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

confirmModal.addEventListener('click', function (event) {
    event.preventDefault;
    if (event.target == confirmModal) {
        confirmModal.style.display = "none";
    }
});
