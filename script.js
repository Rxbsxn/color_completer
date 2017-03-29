const endpoint = 'https://gist.githubusercontent.com/Rxbsxn/0f3d51a048b68a9c200697ccf0b60c5a/raw/1917df9020450cfad453baab98c8d8e41cfac41c/colors.json';
  
  const colors = [];

  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => colors.push(...data))

  function findMatches(colorToMatch, color) {
    return colors.filter(askedColor => {
      
      const regex = new RegExp(colorToMatch, 'gi');
      return askedColor.color.match(regex)
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, colors);
    const html = matchArray.map(askedColor => {
      const regex = new RegExp(this.value, 'gi');
      const colorName = askedColor.color.replace(regex, `<span class="h1">${this.value}</span>`);
    return `<li>
              <span class="name">${colorName}</span>
    
            </li>`}).join('');
    suggestedColor.innerHTML = html;
    document.title = suggestedColor.firstChild.innerText;
    searchInput.style.backgroundColor = suggestedColor.firstChild.innerText;
  }

  function clearInput() {
    searchInput.value = '';
    suggestedColor.innerHTML = '';
    searchInput.style.backgroundColor = '';
  }

  const searchInput = document.querySelector('.search');
  const suggestedColor = document.querySelector('.colors');
  const clearButton = document.querySelector('.btn-clear');
  clearButton.addEventListener('click', clearInput);
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);