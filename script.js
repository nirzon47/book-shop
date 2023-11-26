// DOM Elements
const listElement = document.getElementById('list')

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
	books.forEach((book) => {
		console.log(book.books[0])
	})
}
