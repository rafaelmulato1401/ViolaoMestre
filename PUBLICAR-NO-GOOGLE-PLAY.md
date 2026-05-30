# 🎸 ViolãoMestre — Guia de Publicação no Google Play
**Desenvolvido por Rafael Mulato**

---

## O que está neste pacote

```
violaomestre/
├── index.html       ← App principal (PWA)
├── manifest.json    ← Configuração do PWA
├── sw.js            ← Service Worker (cache offline)
├── icons/           ← Ícones em todos os tamanhos
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── screenshots/     ← Capturas para a loja (tirar manualmente)
```

---

## Passo 1 — Hospedar o app (OBRIGATÓRIO)

O Google Play exige que o PWA esteja em um domínio HTTPS.

### Opção A: Netlify (grátis, mais fácil)
1. Acesse https://netlify.com → crie conta grátis
2. Arraste a pasta `violaomestre/` para o painel do Netlify
3. Você receberá uma URL como `https://violaomestre.netlify.app`
4. Para domínio próprio: Configurações → Domain → Add domain

### Opção B: Vercel (grátis)
```bash
npm install -g vercel
cd violaomestre
vercel --prod
```

### Opção C: GitHub Pages (grátis)
1. Crie repositório no GitHub
2. Faça upload dos arquivos
3. Settings → Pages → Deploy from main branch

---

## Passo 2 — Verificar o PWA

Após hospedar, verifique em:
- **Lighthouse** (Chrome DevTools → aba Lighthouse → PWA)
- Deve atingir ≥90 em PWA score
- Testar no celular: adicionar à tela inicial deve funcionar

---

## Passo 3 — Publicar no Google Play via Bubblewrap (TWA)

### Instalar Node.js e Bubblewrap
```bash
npm install -g @bubblewrap/cli
bubblewrap --version
```

### Inicializar o projeto TWA
```bash
mkdir violaomestre-android
cd violaomestre-android
bubblewrap init --manifest https://SEU-DOMINIO.com/manifest.json
```

Preencha quando solicitado:
- **Package ID**: `com.rafaelmulato.violaomestre`
- **App name**: `ViolãoMestre`
- **Short name**: `ViolãoMestre`
- **Version**: `1`
- **Version name**: `1.0.0`

### Gerar o APK/AAB
```bash
bubblewrap build
```

Isso gera:
- `app-release-bundle.aab` → para Google Play (recomendado)
- `app-release-signed.apk` → para teste direto

---

## Passo 4 — Digital Asset Links (verificação)

Para que o Chrome mostre o app sem barra de endereço, hospede este arquivo:

**URL**: `https://SEU-DOMINIO.com/.well-known/assetlinks.json`

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.rafaelmulato.violaomestre",
    "sha256_cert_fingerprints": ["SEU_SHA256_AQUI"]
  }
}]
```

O SHA256 é gerado pelo Bubblewrap durante o build. Cole no arquivo acima.

---

## Passo 5 — Google Play Console

1. Acesse https://play.google.com/console
2. Crie conta de desenvolvedor (taxa única de US$ 25)
3. **Criar app** → preencha:
   - Nome: `ViolãoMestre`
   - Idioma: Português (Brasil)
   - Tipo: App
   - Grátis / Pago
4. **Produção** → Criar nova versão
5. Upload do `.aab` gerado pelo Bubblewrap
6. Preencha:
   - Descrição curta (80 chars): `Aprenda violão com afinador e modo Guitar Hero!`
   - Descrição completa (4000 chars): use o texto abaixo
   - Screenshots: mínimo 2, ideal 4-8 (1080x1920px)
   - Ícone: 512x512px (use o `icon-512.png`)
   - Feature graphic: 1024x500px (criar no Canva)

### Descrição sugerida para a loja:
```
🎸 ViolãoMestre — Aprenda violão do zero!

Desenvolvido por Rafael Mulato, o ViolãoMestre é o companheiro 
perfeito para quem quer aprender violão de forma prática e divertida.

✅ FUNCIONALIDADES:
• Lições passo a passo — anatomia, afinação, postura e acordes
• Afinador em tempo real — detecta as notas pelo microfone
• Diagramas de acordes com posição da mão ilustrada
• Modo Guitar Hero — toque junto com cifras do CifraClub
• Detecção de acordes por microfone — receba feedback em tempo real
• Tema claro e escuro
• Funciona offline

🎵 MÓDULOS:
• Módulo 1: Fundamentos (anatomia, afinação, postura, acordes básicos e maiores, ritmo)
• Módulo 2: Músicas (catálogo com progressões de acordes)
• Módulo 3: Guitar Hero (importe qualquer cifra do CifraClub)

🎯 PARA QUEM É:
Iniciantes absolutos que querem começar do zero sem precisar de professor.

🔒 PRIVACIDADE:
O microfone é usado exclusivamente para detecção de notas e acordes,
processado localmente no dispositivo. Nenhum áudio é gravado ou enviado.
```

7. **Classificação de conteúdo**: preencha o questionário → Classificação E (Everyone)
8. **Segmentação**: Brasil + outros países desejados
9. **Revisão** → Enviar para revisão

---

## Permissões necessárias no APK

O Bubblewrap cuida automaticamente, mas o app usa:
- `INTERNET` — para carregar fontes e cifras
- `RECORD_AUDIO` — para o afinador e detecção de acordes

---

## Contato e Suporte

Desenvolvido por **Rafael Mulato**  
App: ViolãoMestre v1.0.0  
Tecnologia: PWA + TWA (Trusted Web Activity)

---

## Alternativa: PWABuilder (ainda mais fácil!)

Se preferir uma interface gráfica:
1. Acesse https://www.pwabuilder.com
2. Cole a URL do seu app hospedado
3. Clique em **Package for stores** → Android
4. Baixe o APK/AAB pronto para upload

Esta é a maneira mais simples e não requer linha de comando.
