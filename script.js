const PER_PAGE = 10;

class View {
	constructor() {
		this.app = document.getElementById('app');
		this.title = this.createElement('h1', 'title');
		this.title.textContent = 'GitHub Seach Repos';

		this.searchLine = this.createElement('div', 'search-line');

		this.searchInut = this.createElement('input', 'search-input');
		// 
		// this.searchCounter = this.createElement('span', 'counter');
		this.searchBtn = this.createElement('button', 'submit-btn');
		this.searchBtn.setAttribute('type', 'submit');
		this.searchBtn.textContent = 'find repos';

		this.searchLine.append(this.searchInut);
		// 
		// this.searchLine.append(this.searchCounter);
		this.searchLine.append(this.searchBtn);

		this.wrapper = this.createElement('div', 'wrapper');
		this.repoList = this.createElement('ul', 'result-list');
		this.wrapper.append(this.repoList);
		
		this.main = this.createElement('div', 'main');
		this.main.append(this.wrapper);

		this.app.append(this.title);
		this.app.append(this.searchLine);
		this.app.append(this.main);

	}

	createElement(elemTag, elemClass) {
		const elem = document.createElement(elemTag);

		if (elemClass) {
			elem.classList.add(elemClass);
		}
		return elem;
	}

	createRepo(repoData) {
		const repoElem = this.createElement('li', 'repo');

		repoElem.innerHTML = `<a target="_blank" class="repo-link" href="${repoData.html_url}">${repoData.name}</a>
													<div class="info">
													<p><span class="owner">owner: </span><a class="owner-link" target="_blank" href="${repoData.owner.html_url}">${repoData.owner.login}</a></p>
													<span class="desc">description :</span><p class="desc-content">${repoData.description}</p>
													</div>`;

		this.repoList.append(repoElem);
	}
}

class Search {
	constructor(view) {
		this.view = view;

		this.view.searchBtn.addEventListener('click', this.searchRepos.bind(this));
	}

	async searchRepos() {
			this.clearRepos();
			return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchInut.value}&per_page=${PER_PAGE}`)
				.then((response) => {
					if (response.ok) {
						response.json().then(response => {
							response.items.forEach(repo => this.view.createRepo(repo))
						});
					} else {

					}
				})
	}

	clearRepos() {
		this.view.repoList.innerHTML = '';
	}

}

new Search(new View());
