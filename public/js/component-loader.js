// Component Loader
async function loadComponent(componentName, targetElementId) {
  try {
    const response = await fetch(`/components/${componentName}.html`);
    if (!response.ok) {
      throw new Error(`Failed to load component: ${componentName}`);
    }
    const html = await response.text();
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      targetElement.innerHTML = html;
    } else {
      console.error(`Target element with id "${targetElementId}" not found`);
    }
  } catch (error) {
    console.error(`Error loading component ${componentName}:`, error);
  }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('hero', 'hero-section'),
    loadComponent('about', 'about-section'),
    loadComponent('experience', 'experience-section'),
    loadComponent('timeline', 'timeline-section'),
    loadComponent('recent-work', 'recent-work-section'),
    loadComponent('video-clips', 'video-clips-section'),
    loadComponent('footer', 'footer-section')
  ]);
});

// Scroll functions
function next() {
  const element = document.querySelector("#info");
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}

function go() {
  const object = document.querySelector("#Resume");
  if (object) {
    object.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}

// Make functions globally available
window.next = next;
window.go = go;

