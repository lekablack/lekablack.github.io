# Site da autora — Letícia Black

Site estático pronto para GitHub Pages.

## Estrutura

- `index.html` — página principal
- `style.css` — visual/responsividade
- `script.js` — eventos do TikTok Pixel
- `assets/` — coloque aqui capas, foto da autora e outros arquivos

## Antes de publicar

### 1. Trocar os links
No `index.html`, substitua:
- `https://www.amazon.com.br/` pelos links reais de cada livro;
- os links genéricos de Instagram/TikTok pelos perfis corretos.

### 2. Trocar as capas
Você pode colocar imagens em `assets/` e substituir cada bloco
`.cover-placeholder` por uma tag `<img src="assets/nome-da-capa.jpg">`.

### 3. Foto da autora
Substitua o bloco `.photo-placeholder` por sua foto.

### 4. TikTok Pixel
No TikTok Ads Manager, crie seu Pixel e copie o código de instalação.
Cole o código no `<head>` do `index.html`, no local indicado por:
`<!-- TIKTOK_PIXEL_AQUI -->`.

O `script.js` já está preparado para enviar um evento quando um
visitante clicar em um botão de Amazon.

## Publicar no GitHub Pages

1. Crie um repositório chamado `SEUUSUARIO.github.io`.
2. Envie estes arquivos para a raiz do repositório.
3. Vá em `Settings` → `Pages`.
4. Em `Build and deployment`, escolha `Deploy from a branch`.
5. Selecione `main` e `/ (root)`.
6. Salve e aguarde a publicação.

O endereço será:
`https://SEUUSUARIO.github.io/`

## Próxima etapa recomendada

Depois de tudo funcionando, compre/conecte um domínio próprio,
por exemplo `leticiablack.com.br`, e aponte o domínio para o GitHub Pages.
