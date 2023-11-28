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
		option.value = item.list_name
		option.textContent = item.list_name
		option.classList.add('option')

		listElement.appendChild(option)
	})
}

const renderBestSellers = () => {
	renderElement.innerHTML = ''
	const fragment = document.createDocumentFragment()

	books.forEach((book) => {
		const div = document.createElement('div')

		const h3 = document.createElement('h3')
		h3.classList.add('book-title')
		h3.textContent = book.list_name

		div.appendChild(h3)

		const innerDiv = document.createElement('div')
		innerDiv.classList.add('book-list')

		book.books.forEach((item) => {
			const bookListDiv = document.createElement('div')
			bookListDiv.classList.add('hidden')

			bookListDiv.innerHTML = `
                    
                        <img
                            class="book-image"
                            src="${item.book_image}"
                            alt="${item.title}"
                        />
                        <h4 class="pt-4 font-bold uppercase">${item.title}</h4>
                        <p class="author">${item.author}</p>
                    
                        `

			innerDiv.appendChild(bookListDiv)
		})
		const button = document.createElement('button')
		button.classList.add('cart-button')
		button.innerText = 'SEE MORE'

		div.appendChild(innerDiv)
		div.appendChild(button)

		fragment.appendChild(div)
	})

	renderElement.appendChild(fragment)
}
