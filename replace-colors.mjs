import fs from 'fs';
import path from 'path';

const map = {
  '#0c0c0c': 'var(--color-bg)',
  '#0d0d0d': 'var(--color-bg)',
  '#0a0a0a': 'var(--color-bg)',
  '#111111': 'var(--color-surface)',
  '#111': 'var(--color-surface)',
  '#1a1a1a': 'var(--color-surface2)',
  '#1f1f1f': 'var(--color-border)',
  '#2a2a2a': 'var(--color-border)',
  '#262626': 'var(--color-border)',
  '#ededed': 'var(--color-foreground)',
  '#888888': 'var(--color-muted)',
  '#888': 'var(--color-muted)',
  '#666': 'var(--color-foreground-alt)',
  '#555': 'var(--color-foreground-alt)',
  '#444': 'var(--color-foreground-alt)',
  '#3b82f6': 'var(--color-accent-light)',
  '#1d4ed8': 'var(--color-accent)',
  'rgba(255,255,255,0.06)': 'var(--color-pill-bg)',
  'rgba(255,255,255,0.1)': 'var(--color-border-light)'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.astro')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const [hex, variable] of Object.entries(map)) {
        // Regex with word boundary or boundary for hex colors
        // Hex can end with quote, semicolon, comma, space, bracket
        const escapedHex = hex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![-_a-zA-Z0-9])(${escapedHex})(?![a-zA-Z0-9])`, 'gi');
        
        if (regex.test(content)) {
          content = content.replace(regex, variable);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('./src/components');
