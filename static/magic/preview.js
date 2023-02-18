const mentionsRegex = /(^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-zA-Z0-9/_.]{1,15})(?:\b(?!@|＠)|$)/g;
const title = [...document.querySelectorAll('h1,h2')].find(h => h.innerText.toLowerCase() === 'magic preview');
const preview = document.getElementById('html-preview');

const markdownToHTML = md => {
  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();

  md = md.replaceAll(mentionsRegex, '$1<a href="https://micro.blog/$2">@$2</a>');

  return writer.render(reader.parse(md));
};

const render = md => {
  title.innerText = localStorage.getItem('title');
  title.style.display = title.innerText.trim() === '' ? 'none' : '';
  preview.innerHTML = markdownToHTML(localStorage.getItem('body') || '');
};

window.addEventListener('storage', render);

render();
