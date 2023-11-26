// DOM Elements
const listElement = document.getElementById('list')
const renderElement = document.getElementById('render')

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	fetchCategories()
	fetchBooks()
})

// Variables
let books
let category = 'bestSeller'

// Functions
const fetchBooks = async () => {
	const response = await fetch(
		'https://books-backend.p.goit.global/books/top-books'
	)

	books = await response.json()

	if (category === 'bestSeller') {
		renderBestSellers()
	}
}

const fetchCategories = async () => {
	const response = await fetch(
		'https://books-backend.p.goit.global/books/category-list'
	)
	const data = await response.json()

	data.forEach((item) => {
		const option = document.createElement('option')
		option.value = item
		option.textContent = item.list_name
		listElement.appendChild(option)
	})
}

const renderBestSellers = () => {
	renderElement.innerHTML = ''
	const fragment = document.createDocumentFragment()

	books.forEach((book) => {
		const div = document.createElement('div')
		div.innerHTML = `
	            <div>
					<h3 class="book-title">${book.list_name}</h3>
					<img
						class="book-image"
						src="${book.books[0].book_image}"
						alt="${book.books[0].title}"
					/>
					<h4 class="pt-4 font-bold uppercase">${book.books[0].title}</h4>
					<p class="author">${book.books[0].author}</p>
					<button class="cart-button">SEE MORE</button>
				</div>`

		fragment.appendChild(div)
	})

	renderElement.appendChild(fragment)
}
