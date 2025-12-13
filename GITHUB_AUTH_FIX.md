# GitHub Authentication Fix

## Problem
You're authenticated as `Murthy7702` but trying to push to `Murthy-sys/profile-evaluator`.

## Solution: Use Personal Access Token

### Step 1: Create a Personal Access Token
1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Resume Evaluator Push`
4. Set expiration: 90 days (or as needed)
5. Select scopes:
   - ✅ **repo** (Full control of private repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Push with Token

Use this command and replace `YOUR_TOKEN` with the token you just copied:

```bash
cd /Users/admin/Desktop/resume\ evaluter

# Add remote with token in URL
git remote add origin https://YOUR_TOKEN@github.com/Murthy-sys/profile-evaluator.git

# Push
git push -u origin main
```

---

## Option 2: Use SSH (More Secure)

### Step 1: Check if you have SSH key
```bash
ls -la ~/.ssh
```

### Step 2: If no SSH key, create one
```bash
ssh-keygen -t ed25519 -C "your-email@gmail.com"
# Press Enter for all prompts (default location and no passphrase)
```

### Step 3: Copy SSH key
```bash
cat ~/.ssh/id_ed25519.pub
```

### Step 4: Add to GitHub
1. Go to: **https://github.com/settings/keys**
2. Click **"New SSH key"**
3. Paste the key
4. Click **"Add SSH key"**

### Step 5: Push with SSH
```bash
cd /Users/admin/Desktop/resume\ evaluter
git remote add origin git@github.com:Murthy-sys/profile-evaluator.git
git push -u origin main
```

---

## Option 3: Login via GitHub CLI (Easiest)

```bash
# Install GitHub CLI if not installed
brew install gh

# Login
gh auth login

# Follow the prompts:
# - Choose: GitHub.com
# - Choose: HTTPS
# - Authenticate: Y
# - Choose: Login with a web browser
# - Copy the code and press Enter

# Then push
cd /Users/admin/Desktop/resume\ evaluter
git remote add origin https://github.com/Murthy-sys/profile-evaluator.git
git push -u origin main
```

---

## Which option should you use?

- **Quickest:** Option 1 (Personal Access Token)
- **Most Secure:** Option 2 (SSH)
- **Easiest:** Option 3 (GitHub CLI)

Let me know which one you want to try!
