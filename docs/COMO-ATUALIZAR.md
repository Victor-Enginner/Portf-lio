# Como atualizar o portfólio

Site: https://vitorborsari.vercel.app — todo push **só no `main`** publica sozinho em ~2 min.

Regra de ouro: só entra o que é real e verificável (link no ar, repositório público, certificado com código).
O projeto **Intelligence** é privado e não entra no site.

---

## Adicionar um projeto (site ou sistema)

1. **Print** do site em `public/projetos/<nome>.webp` (1200×750).
   Para a prévia de link do WhatsApp, uma cópia em `public/projetos/og/<nome>.jpg` (1200×630).
2. Em `src/data/portfolio.ts`, dentro de `projects`, copie um projeto existente e troque:
   - `id` (próximo número), `slug` (vira o link `/projects/<slug>`), `title`, `description`
   - `image: '/projetos/<nome>.webp'`, `demoUrl` (site no ar), `repoUrl` (GitHub)
   - `startDate` (data de criação do repositório), `status: 'completed' | 'ongoing'`
   - `category`: `'AI & Machine Learning'`, `'Software Engineering'` ou `'Creative Tech'`
3. Em `src/data/traducoes.ts`, adicione o mesmo `slug` em `en`, `es` e `ru` com `title` e `description`.
   (Se esquecer, o projeto aparece em português nos outros idiomas — não quebra.)

## Adicionar um certificado

1. PDF em `public/certificados/<CODIGO>.pdf` e imagem em `public/certificados/<CODIGO>.webp`.
2. Em `src/data/portfolio.ts`, dentro de `achievements`, copie um certificado e troque
   `id` (`cert-5`, `cert-6`...), `title`, `issuer`, `date`, `credentialId`, `image`, `credentialUrl`.
3. Em `src/data/traducoes.ts`, adicione o `id` em `achievements` de `en`, `es` e `ru`.
4. Para aparecer também no carrossel da home, inclua o código na lista de
   `src/components/ui/certificate-marquee.tsx` e `src/components/sections/CertificateHeroScroll.tsx`.

## Adicionar um cliente / trabalho

Em `src/data/portfolio.ts`, dentro de `experiences`, copie a entrada da Inovare
(`type: 'freelance'`) e traduza em `traducoes.ts` (`experiences`). O número de
"Cliente internacional" na home é calculado sozinho.

## Textos de interface

Ficam em `scripts/ui_textos.py` (botões, títulos) e `scripts/textos.py` / `scripts/textos_es_ru.py`.
Depois de editar, rode `python scripts/textos.py` para regenerar `messages/*.json`.

## Antes de publicar

```bash
node_modules/.bin/tsc --noEmit -p .
```

Depois do deploy, abra o site **no celular** para conferir.
