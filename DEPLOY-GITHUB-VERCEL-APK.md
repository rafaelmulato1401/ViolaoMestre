# 🚀 Guia: GitHub → Vercel → APK (PWABuilder)
**ViolãoMestre — por Rafael Mulato**

---

## ETAPA 1 — Subir no GitHub

### 1.1 Criar repositório

1. Acesse **github.com** → faça login
2. Clique em **"New repository"** (botão verde)
3. Preencha:
   - **Repository name**: `violaomestre`
   - **Description**: `Aprenda violão do zero — PWA`
   - Marque **Public**
   - NÃO marque "Add README" (já temos um)
4. Clique **"Create repository"**

### 1.2 Enviar os arquivos

**Opção A — Interface web (mais fácil):**
1. Na página do repositório criado, clique **"uploading an existing file"**
2. Arraste TODOS os arquivos desta pasta
3. ⚠️ Suba também as pastas `icons/`, `screenshots/`, `.well-known/` — clique em cada uma e suba os arquivos dentro
4. Escreva a mensagem: `feat: primeira versão ViolãoMestre`
5. Clique **"Commit changes"**

**Opção B — Terminal (recomendado):**
```bash
cd violaomestre

git init
git add .
git commit -m "feat: primeira versão ViolãoMestre"

# Substitua SEU_USUARIO pelo seu usuário do GitHub
git remote add origin https://github.com/SEU_USUARIO/violaomestre.git
git branch -M main
git push -u origin main
```

✅ Pronto! Repositório no ar.

---

## ETAPA 2 — Deploy no Vercel

### 2.1 Conectar ao Vercel

1. Acesse **vercel.com** → clique **"Sign Up"**
2. Escolha **"Continue with GitHub"** → autorize o Vercel
3. Clique **"Add New Project"**
4. Em "Import Git Repository", procure **violaomestre** → clique **"Import"**

### 2.2 Configurar o projeto

Na tela de configuração:
- **Framework Preset**: `Other`
- **Root Directory**: `./` (deixar padrão)
- **Build Command**: *(deixar vazio)*
- **Output Directory**: *(deixar vazio)*
- **Install Command**: *(deixar vazio)*

Clique **"Deploy"** → aguarde ~30 segundos.

### 2.3 Verificar o deploy

Você receberá uma URL como:
```
https://violaomestre.vercel.app
```

Abra no celular e verifique:
- [ ] App carrega normalmente
- [ ] Microfone funciona
- [ ] Tema claro/escuro funciona
- [ ] Chrome mostra opção "Adicionar à tela inicial"

### 2.4 Domínio personalizado (opcional)

Em **Vercel → Settings → Domains**:
- Adicione `violaomestre.com.br` (se tiver um)
- O Vercel configura HTTPS automaticamente

---

## ETAPA 3 — Gerar APK com PWABuilder

### 3.1 Verificar o PWA

1. Abra o Chrome no computador
2. Acesse sua URL do Vercel
3. F12 → aba **Lighthouse** → marque só "Progressive Web App" → **Analyze**
4. Precisa de score **≥ 80** para prosseguir

### 3.2 PWABuilder

1. Acesse **pwabuilder.com**
2. Cole a URL: `https://violaomestre.vercel.app`
3. Clique **"Start"** → aguarde a análise
4. Clique **"Package for Stores"**
5. Clique no card **Android**

### 3.3 Configurar o pacote Android

Preencha os campos:
| Campo | Valor |
|---|---|
| Package ID | `com.rafaelmulato.violaomestre` |
| App name | `ViolãoMestre` |
| App version | `1` |
| App version name | `1.0.0` |
| Display mode | `Standalone` |
| Status bar color | `#c8973a` |
| Nav bar color | `#0d0a07` |
| Splash screen color | `#0d0a07` |
| Splash screen icon URL | URL do icon-512.png no seu GitHub |

Clique **"Generate Package"** → baixa um arquivo `.zip`

### 3.4 Conteúdo do ZIP gerado

```
violaomestre-android.zip
├── app-release-bundle.aab   ← Upload no Google Play
├── app-release-signed.apk   ← Teste no celular
├── signing.keystore          ← GUARDE COM SEGURANÇA!
├── signing-key-info.txt      ← SHA256 para assetlinks.json
└── readme.html
```

### 3.5 Testar o APK no celular

1. Copie `app-release-signed.apk` para o celular
2. Abra o arquivo (talvez precise habilitar "Fontes desconhecidas")
3. Instale e teste todas as funcionalidades

---

## ETAPA 4 — Configurar Digital Asset Links

Depois de gerar o APK, você terá o SHA256 da keystore.

1. Abra o arquivo `signing-key-info.txt` gerado pelo PWABuilder
2. Copie o SHA256 fingerprint
3. Edite o arquivo `.well-known/assetlinks.json` neste projeto:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.rafaelmulato.violaomestre",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:..."
    ]
  }
}]
```

4. Faça commit e push para o GitHub
5. O Vercel fará o deploy automaticamente
6. Verifique: `https://violaomestre.vercel.app/.well-known/assetlinks.json`

Isso faz o Chrome no Android esconder a barra de endereço — o app parece 100% nativo!

---

## ETAPA 5 — Google Play Console

1. Acesse **play.google.com/console** → crie conta (US$ 25 único)
2. **Criar aplicativo** → preencha nome e idioma
3. Vá em **Produção → Criar nova versão**
4. Faça upload do `app-release-bundle.aab`
5. Preencha:
   - Ícone 512×512: use `icons/icon-512.png`
   - Screenshots: use `screenshots/screen1.png` e `screen2.png`
   - Descrição curta (80 chars): `Aprenda violão com afinador e modo Guitar Hero!`
6. Classificação de conteúdo → questionário → **Classificação L (Livre)**
7. Enviar para revisão → aprovação em 3–7 dias

---

## ⚠️ Guarde com segurança

O arquivo `signing.keystore` gerado pelo PWABuilder é **ÚNICO**.
- Se perder, não consegue atualizar o app na Play Store
- Salve em nuvem (Google Drive, etc.) e offline

---

## 📋 Checklist final

- [ ] Código no GitHub
- [ ] Deploy no Vercel funcionando
- [ ] PWA score ≥ 80 no Lighthouse
- [ ] APK gerado pelo PWABuilder
- [ ] APK testado no celular
- [ ] assetlinks.json atualizado com SHA256
- [ ] Conta no Google Play Console
- [ ] `.aab` enviado para revisão
- [ ] Keystore salva em lugar seguro
