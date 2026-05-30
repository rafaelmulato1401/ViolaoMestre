# 🎸 ViolãoMestre

> Aprenda violão do zero com afinador em tempo real, acordes interativos e modo Guitar Hero.

**Desenvolvido por Rafael Mulato**

---

## ✨ Funcionalidades

- 📚 **7 Lições estruturadas** — anatomia, afinação, postura, acordes e ritmo
- 🎙 **Afinador em tempo real** — detecta notas pelo microfone
- 🖐 **Diagramas de acordes** — posição da mão ilustrada com SVG
- 🎯 **Prática com detecção** — toque o acorde e o app confirma com ✓
- 🎸 **Modo Guitar Hero** — importe cifras do CifraClub e jogue
- 🌙☀️ **Tema claro e escuro** — detecta preferência do sistema
- 📱 **PWA** — instala direto no celular, funciona offline

---

## 🚀 Deploy rápido

### Vercel (recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU_USUARIO/violaomestre)

1. Clique no botão acima
2. Conecte sua conta GitHub
3. Deploy automático ✅

### Manual

```bash
# Clonar
git clone https://github.com/SEU_USUARIO/violaomestre.git
cd violaomestre

# Servir localmente (qualquer servidor estático)
npx serve .
# ou
python3 -m http.server 3000
```

Acesse `http://localhost:3000`

---

## 📱 Gerar APK (Google Play)

Com o app hospedado no Vercel:

1. Acesse **[pwabuilder.com](https://www.pwabuilder.com)**
2. Cole a URL do seu app Vercel
3. Clique em **Package for stores → Android**
4. Baixe o `.aab` e faça upload no Google Play Console

Guia completo: [`PUBLICAR-NO-GOOGLE-PLAY.md`](./PUBLICAR-NO-GOOGLE-PLAY.md)

---

## 🗂 Estrutura do projeto

```
violaomestre/
├── index.html              ← App completo (single-file PWA)
├── manifest.json           ← Configuração PWA para lojas
├── sw.js                   ← Service Worker (cache offline)
├── vercel.json             ← Configuração de headers e rotas
├── icons/                  ← Ícones 72px → 512px
├── screenshots/            ← Capturas para Google Play
└── PUBLICAR-NO-GOOGLE-PLAY.md
```

---

## 🛠 Tecnologias

- HTML5 / CSS3 / JavaScript puro — sem frameworks
- Web Audio API — afinador e detecção de acordes
- Canvas API — modo Guitar Hero e visualizador de onda
- Service Worker — cache offline
- PWA / TWA — publicação no Google Play

---

## 📄 Licença

© 2025 Rafael Mulato. Todos os direitos reservados.
