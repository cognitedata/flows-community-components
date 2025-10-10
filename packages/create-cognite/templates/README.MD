# CDF Application Template

A React application template for building applications with Cognite Data Fusion (CDF) using AI assistance.

## Prerequisites

This project requires Node.js v22 or higher and npm (Node Package Manager).

**Don't have Node.js installed?** See [Installing Node.js and npm](#installing-nodejs-and-npm) at the bottom of this document.

## Initial Setup

1. **Configure your app:** Fill in `app.json` with your application details
2. **Install dependencies:** `npm install`
3. **Start development server:** `npm start`
4. **Deploy to CDF:** `npm run deploy`

### Optional: Enable Fast Deployment & MCP Server

Create a `.env` file with your CDF credentials:

```
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```

This enables:

- **Faster CI deployment:** `npm run deploy:ci`
- **MCP server for Cursor:** AI can query and create data models directly in CDF

## Features

- **MCP Server Integration:** Query CDF data models, spaces, views, and containers directly through Cursor
- **Cognite Design System:** Pre-configured `cdf-design-system-alpha` for consistent UI styling
- **Requirements Template:** Structured template to guide AI in building your application
- **Authentication Included:** Ready-to-use auth for both local development and CDF hosting
- **Data Modeling Support:** AI can help structure and connect to CDF data models

## Building Your Application

### 1. Request a Requirements Doc

Ask your AI assistant to create requirements based on your input:

```
"Write me a set of requirements for an application that [describe your needs]"
```

Review the generated requirements carefully. Add, remove, or modify as needed.

### 2. Review Requirements List

Go through the requirements document line by line. Make sure it accurately captures what you want to build.

### 3. Request a Dummy Data Version

Start with a working prototype using mock data:

```
"Build a dummy data version of this application based on the requirements"
```

### 4. Build and Iterate

Run `npm start` and test your application. Iterate on the UI, functionality, and user experience with your AI assistant.

### 5. Connect to CDF (Step by Step)

Once satisfied with the prototype, connect it to real CDF data:

```
"Let's connect this to CDF data models. Start by creating the space and containers we need."
```

Take this **step by step** - this is where you're most likely to run into issues. Create spaces, then containers, then views, then connect your UI.

## Tips and Tricks

### Important Warnings

⚠️ **If you get errors:** Copy-paste the error into Cursor. If it doesn't work after 3 attempts, ask it to simplify the approach.

⚠️ **Don't try to implement notifications** - This rarely works well

⚠️ **Don't extend existing data models** - It will likely not work. Create new views instead.

⚠️ **Don't delete data models** - You can't easily recover them

⚠️ **Limited availability:** Only enabled for select Cognite projects (e.g., lervik, atlas). Not to be used in customer projects.

⚠️ **Commit after every step** - Version control saves you from having to rebuild everything

### Helpful Prompts

- Open browser console to see errors, paste them into Cursor
- If AI isn't using the design system: "Please use the cdf-design-system-alpha design system"
- To get correct types: "Fetch the [ViewName] view from CDF and use that to define the type"
- To check data models: "List the available views in the [space_name] space"

## Environment Variables

Your `.env` file (optional, for MCP and fast deployment):

```
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```

## Development Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run deploy` - Deploy to CDF
- `npm run deploy:ci` - Fast deployment (requires .env)

## Security

- Never commit `.env` files
- Environment files are automatically ignored by git
- Use service account credentials for deployment only

---

## Installing Node.js and npm

This project requires Node.js v22 or higher and npm (Node Package Manager).

### macOS

**Option 1: Using Homebrew (recommended)**

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node@22
```

**Option 2: Using the official installer**

1. Download the installer from [nodejs.org](https://nodejs.org/)
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the prompts

### Windows

**Option 1: Using the official installer (recommended)**

1. Download the installer from [nodejs.org](https://nodejs.org/)
2. Choose the LTS (Long Term Support) version
3. Run the `.msi` installer and follow the prompts
4. Restart your terminal/command prompt

**Option 2: Using Chocolatey**

```powershell
# Install Chocolatey if you don't have it
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js
choco install nodejs-lts
```

### Linux

**Ubuntu/Debian:**

```bash
# Install Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Fedora/RHEL/CentOS:**

```bash
# Install Node.js 22.x
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs
```

**Arch Linux:**

```bash
sudo pacman -S nodejs npm
```

### Verify Installation

After installation, verify that Node.js and npm are installed correctly:

```bash
node --version  # Should show v22.x.x or higher
npm --version   # Should show 10.x.x or higher
```
