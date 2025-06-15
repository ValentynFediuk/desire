fetch('/icons.svg')
  .then(response => response.text())
  .then(data => {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = data;
    document.body.insertBefore(div, document.body.firstChild);
  })
  .catch(err => console.error('Failed to load SVG sprite:', err));