import fs from 'fs/promises';
import path from 'path';

export async function templateLoader(name: string): Promise<string> {
  const templatesDir = path.join(process.cwd(), 'src/email/templates');
  const partialsDir = path.join(process.cwd(), 'src/email/partials');
  const file = path.join(templatesDir, `${name}.hbs`);

  let template = await fs.readFile(file, 'utf-8');

  if (template.includes('{{> footer}}')) {
    const footer = await fs.readFile(path.join(partialsDir, 'footer.hbs'), 'utf-8');
    template = template.replace(/\{\{>\s*footer\s*\}\}/g, footer);
  }

  return template;
}
