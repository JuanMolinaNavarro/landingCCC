import fs from 'fs';
import path from 'path';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.astro')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace instances where text/icons use the lighter accent, to use the exact logo blue
      content = content.replace(/color:\s*var\(--color-accent-light\)/g, 'color: var(--color-accent)');
      content = content.replace(/stroke="var\(--color-accent-light\)"/g, 'stroke="var(--color-accent)"');
      content = content.replace(/fill="var\(--color-accent-light\)"/g, 'fill="var(--color-accent)"');
      content = content.replace(/background:\s*var\(--color-accent-light\)/g, 'background: var(--color-accent)');
      content = content.replace(/border:\s*1px\s+solid\s+var\(--color-accent-light\)/g, 'border: 1px solid var(--color-accent)');
      content = content.replace(/border-color:\s*var\(--color-accent-light\)/g, 'border-color: var(--color-accent)');
      content = content.replace(/box-shadow:\s*0\s+0\s+6px\s+var\(--color-accent-light\)/g, 'box-shadow: 0 0 6px var(--color-accent)');

      // But fix the hover states that got accidentally overridden if they match the above regexes
      // We know .btn-primary:hover had background: var(--color-accent-light)
      // but the regex background:\s*var\(--color-accent-light\) would catch it.
      // Wait, let's just restore specific hover states if needed, or simply let the button hovers use a brightness filter or a specific class.
      // Actually, my regex `background: var(--color-accent-light)` replaced it. Let's revert .btn-primary:hover in HeroSection and PlansSection
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('./src/components');

// Fix the hover states back to accent-light
const hero = fs.readFileSync('./src/components/HeroSection.astro', 'utf8');
fs.writeFileSync('./src/components/HeroSection.astro', hero.replace('.btn-primary:hover { background: var(--color-accent);', '.btn-primary:hover { background: var(--color-accent-light);'), 'utf8');

const plans = fs.readFileSync('./src/components/PlansSection.astro', 'utf8');
fs.writeFileSync('./src/components/PlansSection.astro', plans.replace('background: var(--color-accent);\n    transform: translateY(-1px);', 'background: var(--color-accent-light);\n    transform: translateY(-1px);'), 'utf8');

const contact = fs.readFileSync('./src/components/ContactSection.astro', 'utf8');
fs.writeFileSync('./src/components/ContactSection.astro', contact.replace('background: var(--color-accent) !important;', 'background: var(--color-accent-light) !important;'), 'utf8');

console.log('Text and icons updated to exact logo blue.');
