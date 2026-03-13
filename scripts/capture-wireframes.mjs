import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../docs/wireframes');

const FLOWS = [
  'onboarding',
  'home',
  'detail',
  'register',
  'chat',
  'mypage',
  'settings',
];

const URL = 'http://localhost:4173';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--window-size=1920,1080'],
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();

  // Navigate to site and switch to screen design tab
  console.log('Loading site...');
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });

  // Click the screen design tab
  const buttons = await page.$$('nav button');
  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.textContent);
    if (text.includes('화면설계서')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 500));

  // Capture each flow
  for (const flowId of FLOWS) {
    console.log(`Capturing flow: ${flowId}`);

    // Click the flow tab
    const flowButtons = await page.$$('div[style*="sticky"] button');
    for (const btn of flowButtons) {
      const text = await btn.evaluate(el => el.textContent.trim());
      const match = {
        'onboarding': '온보딩',
        'home': '홈',
        'detail': '상세',
        'register': '옷 등록',
        'chat': '채팅',
        'mypage': 'MY',
        'settings': '설정',
      };
      if (text.includes(match[flowId])) {
        await btn.click();
        break;
      }
    }

    await new Promise(r => setTimeout(r, 800));

    // Get the phones wrapper area and capture
    const wrapper = await page.$('.screen-phones-wrapper');
    if (wrapper) {
      // Scroll wrapper into view
      await wrapper.evaluate(el => el.scrollIntoView());
      await new Promise(r => setTimeout(r, 300));

      const box = await wrapper.boundingBox();
      if (box) {
        // Full page screenshot with clip to the wrapper area
        await page.screenshot({
          path: path.join(OUT, `flow_${flowId}.png`),
          clip: {
            x: Math.max(0, box.x - 20),
            y: Math.max(0, box.y - 60),
            width: Math.min(box.width + 40, 1920),
            height: box.height + 80,
          },
        });
        console.log(`  Saved: flow_${flowId}.png`);
      }
    } else {
      // Fallback: full page screenshot
      await page.screenshot({
        path: path.join(OUT, `flow_${flowId}.png`),
        fullPage: true,
      });
      console.log(`  Saved (fullpage): flow_${flowId}.png`);
    }
  }

  // Also capture the full screen design page for each flow (full page)
  console.log('\nCapturing full page overview...');
  // Go back to first flow
  const firstBtn = (await page.$$('div[style*="sticky"] button'))[0];
  if (firstBtn) await firstBtn.click();
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(OUT, `overview_full.png`),
    fullPage: true,
  });
  console.log('  Saved: overview_full.png');

  await browser.close();
  console.log('\nDone! All wireframes saved to docs/wireframes/');
}

main().catch(e => { console.error(e); process.exit(1); });
