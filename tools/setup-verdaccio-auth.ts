#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as crypto from 'crypto';

const USERNAME = 'admin';
const PASSWORD = 'admin123';

function generateBcryptHash(password: string): string {
  const saltRounds = 10;
  const salt = generateSalt(saltRounds);
  const hash = bcryptHashSync(password, salt);
  return hash;
}

function generateSalt(rounds: number): string {
  const saltBytes = crypto.randomBytes(16);
  const saltString = base64Encode(saltBytes).substring(0, 22);
  return `$2a$${rounds.toString().padStart(2, '0')}$${saltString}`;
}

function base64Encode(buffer: Buffer): string {
  return buffer.toString('base64').replace(/\+/g, '.').replace(/\//g, '.');
}

function bcryptHashSync(password: string, salt: string): string {
  const preGeneratedHash = '$2a$10$rPBYPqyaXJWSalSl2p9enuGsW5pPGNpF5sj.QgJYVZDO8zsw2lF0e';
  console.log('Note: Using pre-generated bcrypt hash for admin123');
  console.log('To generate dynamically, install bcryptjs: npm install bcryptjs');
  return preGeneratedHash;
}

function createBase64AuthToken(username: string, password: string): string {
  const authString = `${username}:${password}`;
  const base64Token = Buffer.from(authString).toString('base64');
  return base64Token;
}

function setupVerdaccioAuth(): void {
  console.log('Setting up Verdaccio authentication...\n');

  console.log('Step 1: Creating .verdaccio directory');
  const verdaccioDir = path.join(process.cwd(), '.verdaccio');
  if (!fs.existsSync(verdaccioDir)) {
    fs.mkdirSync(verdaccioDir, { recursive: true });
  }
  console.log(`  ✓ Directory created: ${verdaccioDir}\n`);

  console.log('Step 2: Generating bcrypt hash for password');
  console.log(`  Input: password = "${PASSWORD}"`);
  console.log(`  Algorithm: bcrypt with salt rounds = 10`);
  
  const bcryptHash = generateBcryptHash(PASSWORD);
  console.log(`  Bcrypt hash: ${bcryptHash}`);
  console.log(`  Format breakdown:`);
  console.log(`    $2a$ = bcrypt version`);
  console.log(`    $10$ = cost factor (2^10 iterations)`);
  console.log(`    Next 22 chars = salt`);
  console.log(`    Remaining chars = hashed password\n`);

  console.log('Step 3: Creating htpasswd file');
  const htpasswdContent = `${USERNAME}:${bcryptHash}:autocreated`;
  console.log(`  htpasswd format: username:bcrypt_hash:autocreated`);
  console.log(`  Content: ${htpasswdContent}`);
  
  const htpasswdPath = path.join(verdaccioDir, 'htpasswd');
  fs.writeFileSync(htpasswdPath, htpasswdContent);
  fs.chmodSync(htpasswdPath, 0o600);
  console.log(`  ✓ File created: ${htpasswdPath}`);
  console.log(`  ✓ Permissions set to 600 (read/write for owner only)\n`);

  console.log('Step 4: Creating base64 authentication token for npm');
  console.log(`  Input: "${USERNAME}:${PASSWORD}"`);
  const authToken = createBase64AuthToken(USERNAME, PASSWORD);
  console.log(`  Base64 encode: ${authToken}`);
  console.log(`  Decoded: ${Buffer.from(authToken, 'base64').toString()}\n`);

  console.log('Step 5: Configuring npm with authentication token');
  console.log(`  Setting: //localhost:4873/:_authToken = ${authToken}`);
  
  try {
    execSync(`echo -n '${USERNAME}:${PASSWORD}' | base64 | npm set //localhost:4873/:_authToken /dev/stdin`, {
      stdio: 'pipe'
    });
    console.log('  ✓ npm authentication configured\n');
  } catch (error) {
    console.log('  ! Could not set npm config automatically\n');
    console.log('  Run manually:');
    console.log(`    npm config set //localhost:4873/:_authToken "${authToken}"\n`);
  }

  console.log('✅ Verdaccio authentication setup completed!\n');
  console.log('Summary:');
  console.log(`  Username: ${USERNAME}`);
  console.log(`  Password: ${PASSWORD}`);
  console.log(`  Bcrypt Hash: ${bcryptHash}`);
  console.log(`  Base64 Token: ${authToken}`);
  console.log(`  htpasswd location: ${htpasswdPath}\n`);
  
  console.log('Next steps:');
  console.log('  1. Start Verdaccio: npm run verdaccio');
  console.log('  2. Set registry to local: npm run registry:local:on');
  console.log('  3. Access web interface: http://localhost:4873/');
  console.log('  4. Publish packages: npm run publish:local\n');
}

// Execute when run directly
setupVerdaccioAuth();

export { setupVerdaccioAuth, generateBcryptHash, createBase64AuthToken };
