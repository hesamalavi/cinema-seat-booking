const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const selected = document.getElementsByClassName('selected');
//by adding + turn it into a number type
// also we use let since we need to reassign ticketPrice in the movie select event
let ticketPrice = +movieSelect.value;

// save seletced movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  // putting all selected seats into a node list
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy the selected seats into arr
  // Map through that arr
  // return new arr of indexes

  // ... is a spread operator which copies the values of array. In this case grabs the values from the node list and puts them in to an array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// movie select event

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  // e.target (the target) lets us know exactly what element in the container is being clicked on
  // contains is a method
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // we can do classList add, remove or toggle(which will also unselect it)
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
