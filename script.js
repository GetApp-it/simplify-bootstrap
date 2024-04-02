const DEFAULT_PRIMARY_COLOR = '#9d33e7';
const DEFAULT_SECONDARY_COLOR = '#91abc1';
const CSS_FILENAME = 'style.css';
const CSS_TEMPLATE_URL = '/style-template.css';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

async function getCssTemplate() {
  const response = await fetch(CSS_TEMPLATE_URL);
  return response.text();
}

async function handleDownloadButtonClick(event) {
  let primaryColor = document.getElementById('primary-color').value;
  if (primaryColor === '') {
    primaryColor = DEFAULT_PRIMARY_COLOR;
  }

  let secondaryColor = document.getElementById('secondary-color').value;
  if (secondaryColor === '') {
    secondaryColor = DEFAULT_SECONDARY_COLOR;
  }

  let borderRadius = document.getElementById('border-radius').value;
  if (borderRadius === '') {
    borderRadius = DEFAULT_BORDER_RADIUS;
  }

  let fontSize = document.getElementById('font-size').value;
  if (fontSize === '') {
    fontSize = DEFAULT_FONT_SIZE;
  }

  const cssTemplate = await getCssTemplate();

  const customCss = cssTemplate
    .replace(/{{PRIMARY_COLOR}}/g, primaryColor)
    .replace(/{{SECONDARY_COLOR}}/g, secondaryColor)
    .replace(/{{BORDER_RADIUS}}/g, borderRadius)
    .replace(/{{FONT_SIZE}}/g, fontSize);

  download(CSS_FILENAME, customCss);
  event.stopPropagation();
  return false;
}
window.onload = () => {
  // bindings
  document
    .getElementById('download-btn')
    .addEventListener('click', handleDownloadButtonClick);
};
