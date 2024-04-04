const DEFAULT_FONT_FAMILY = '"Georama", sans-serif';
const DEFAULT_PRIMARY_COLOR = '#9d33e7';
const DEFAULT_SECONDARY_COLOR = '#103875';
const DEFAULT_FONT_COLOR = '#212529';
const DEFAULT_LINK_COLOR = '#FFFFFF';
const CSS_FILENAME = 'style.css';
const CSS_TEMPLATE_URL = 'style-template.css';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
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

function convertColorToRgb(color) {
  const r = parseInt(color.substr(-6, 2), 16);
  const g = parseInt(color.substr(-4, 2), 16);
  const b = parseInt(color.substr(-2), 16);
  return [r, g, b].join(',');
}

function getCustomSettings() {
  let primaryColor = document.getElementById('primary-color').value;
  if (primaryColor === '') {
    primaryColor = DEFAULT_PRIMARY_COLOR;
  }
  const primaryColorRgb = convertColorToRgb(primaryColor);

  let secondaryColor = document.getElementById('secondary-color').value;
  if (secondaryColor === '') {
    secondaryColor = DEFAULT_SECONDARY_COLOR;
  }
  const secondaryColorRgb = convertColorToRgb(secondaryColor);

  let fontColor = document.getElementById('font-color').value;
  if (fontColor === '') {
    fontColor = DEFAULT_FONT_COLOR;
  }
  const fontColorRgb = convertColorToRgb(fontColor);

  let linkColor = document.getElementById('link-color').value;
  if (linkColor === '') {
    linkColor = DEFAULT_FONT_COLOR;
  }
  const linkColorRgb = convertColorToRgb(linkColor);

  let borderRadius = document.getElementById('border-radius').value;
  if (borderRadius === '') {
    borderRadius = DEFAULT_BORDER_RADIUS;
  }

  let fontSize = document.getElementById('font-size').value;
  if (fontSize === '') {
    fontSize = DEFAULT_FONT_SIZE;
  }

  let fontFamily = document.getElementById('font-family').value;
  if (fontFamily === '') {
    fontFamily = DEFAULT_FONT_FAMILY;
  }
  return {
    primaryColor,
    primaryColorRgb,
    secondaryColor,
    secondaryColorRgb,
    fontColor,
    fontColorRgb,
    linkColor,
    linkColorRgb,
    borderRadius,
    fontSize,
    fontFamily,
  };
}

async function handleDownloadButtonClick(event) {
  const customSettings = getCustomSettings();

  const cssTemplate = await getCssTemplate();

  const customCss = replaceCustomSettings(cssTemplate, customSettings);

  download(CSS_FILENAME, customCss);

  event.stopPropagation();
  return false;
}

function replaceCustomSettings(
  template,
  {
    primaryColor,
    primaryColorRgb,
    secondaryColor,
    secondaryColorRgb,
    linkColor,
    linkColorRgb,
    fontColor,
    fontColorRgb,
    borderRadius,
    fontSize,
    fontFamily,
  }
) {
  return template
    .replace(/{{PRIMARY_COLOR}}/g, primaryColor)
    .replace(/{{PRIMARY_COLOR_RGB}}/g, primaryColorRgb)
    .replace(/{{SECONDARY_COLOR}}/g, secondaryColor)
    .replace(/{{SECONDARY_COLOR_RGB}}/g, secondaryColorRgb)
    .replace(/{{FONT_COLOR}}/g, fontColor)
    .replace(/{{LINK_COLOR_RGB}}/g, linkColorRgb)
    .replace(/{{LINK_COLOR}}/g, linkColor)
    .replace(/{{FONT_COLOR_RGB}}/g, fontColorRgb)
    .replace(/{{BORDER_RADIUS}}/g, borderRadius)
    .replace(/{{FONT_FAMILY}}/g, fontFamily)
    .replace(/{{FONT_SIZE}}/g, fontSize);
}

function handleCustomStyleChange() {
  const customSettings = getCustomSettings();
  const cssTemplate = `<style> 
    :root {
      --bs-font-sans-serif: {{FONT_FAMILY}};
      --bs-primary: {{PRIMARY_COLOR}};
      --bs-primary-rgb: {{PRIMARY_COLOR_RGB}};
      --bs-secondary: {{SECONDARY_COLOR}};
      --bs-secondary-rgb: {{SECONDARY_COLOR_RGB}};
      --bs-body-color: {{FONT_COLOR}};
      --bs-body-color-rgb: {{FONT_COLOR_RGB}};
      --bs-btn-color: {{LINK_COLOR}};
      --bs-btn-color-rgb: {{LINK_COLOR_RGB}};
      --bs-body-font-size: {{FONT_SIZE}};
      --bs-border-radius: {{BORDER_RADIUS}};
    }
    </style>`;
  const customCss = replaceCustomSettings(cssTemplate, customSettings);

  document.getElementById('primary-color-code').value = customSettings.primaryColor;
  document.getElementById('secondary-color-code').value = customSettings.secondaryColor;
  document.getElementById('font-color-code').value = customSettings.fontColor;
  document.getElementById('link-color-code').value = customSettings.linkColor;
  document.getElementById('custom-style').innerHTML = customCss;
}

function includePageElement(elementId, template) {
  fetch(template)
    .then((response) => response.text())
    .then((body) => {
      document.getElementById(elementId).innerHTML = body;
    });
}

window.onload = () => {
  // Load page elements
  includePageElement('inc-nav', 'inc/nav.html');
  includePageElement('inc-tab', 'inc/tab.html');
  includePageElement('inc-button', 'inc/button.html');
  includePageElement('inc-form', 'inc/form.html');
  includePageElement('inc-alert', 'inc/alert.html');
  includePageElement('inc-table', 'inc/table.html');
  includePageElement('inc-accordion', 'inc/accordion.html');
  includePageElement('inc-offcanvas', 'inc/offcanvas.html');
  includePageElement('inc-modal', 'inc/modal.html');
  includePageElement('inc-image', 'inc/image.html');
  includePageElement('inc-typo', 'inc/typo.html');

  // bindings
  document.getElementById('download-btn').addEventListener('click', handleDownloadButtonClick);

  document.getElementById('custom').addEventListener('change', handleCustomStyleChange);
};
