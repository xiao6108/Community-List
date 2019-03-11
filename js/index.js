const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const data = []
const dataPanel = document.getElementById('data-panel')


function allPeople () {
	axios.get(INDEX_URL)
.then((response) => {
	data.push(...response.data.results)
	displayDataList(data)
})
.catch((err) => console.log(err))
}

function showPeople (id) {
    // get elements
    const modalImage = document.querySelector('#show-people-image')
    const modalName = document.querySelector('#show-people-name')
    const modalGender = document.querySelector('#show-people-gender')
    const modalAge = document.querySelector('#show-people-age')
    const modalEmail = document.querySelector('#show-people-email')
    const modalUpdate = document.querySelector('#show-people-update')

    // set request url
    const url = INDEX_URL + id

    // send request to show api
    axios.get(url).then(response => {
      const data = response.data

      // insert data into modal ui
      modalImage.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Responsive image" >`
      modalName.innerHTML = `${data.name}`
      modalGender.innerHTML  = `gender: ${data.gender}`
      modalAge.innerHTML  = `age: ${data.age}`
      modalEmail.innerHTML  = `e-mail: ${data.email}`
      modalUpdate.innerHTML  = `Updated at ${data.updated_at}`
    })
 }
function displayDataList (data) {
	let htmlContent = ''
	data.forEach(function (item, index) {
		htmlContent += `
		  <div class="col-sm-3">
		    <div class="namecard mb-2">
		      <img class="card-img-top show-by-img" src="${item.avatar}" alt="Card image cap" data-id="${item.id}" data-toggle="modal" data-target="#show-people-modal"> <div class="card-body movie-item-body">
		        <h6 class="card-name">${item.name}</h6>
		        <span class='card-surname'>${item.surname}</span>
		      </div>
		      <!-- "More" button -->
	            <div class="card-footer">
	              <button class="btn btn-default btn-show-people " data-toggle="modal" data-target="#show-people-modal" data-id="${item.id}">More</button>

	            </div>
		    </div>
		  </div>
		`
	})
	dataPanel.innerHTML = htmlContent
}

dataPanel.addEventListener('click', (event) => {
	if (event.target.matches('.btn-show-people') || event.target.matches('.show-by-img')) {
	  showPeople(event.target.dataset.id)
	}
})

allPeople()