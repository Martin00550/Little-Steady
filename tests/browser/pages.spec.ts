import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [320, 360, 390, 430, 768, 1440]) {
  for (const route of ['/', '/thank-you', '/tantrums']) {
    test(`${route} fits ${width}px and has no accessibility violations`, async ({
      page,
    }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      await page.setViewportSize({ width, height: 900 })
      await page.goto(route)
      await page.evaluate(() => document.fonts.ready)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([])
      expect(errors).toEqual([])
      await page.screenshot({
        path: `test-results/${route === '/' ? 'sales' : route.slice(1)}-${width}.png`,
        fullPage: true,
      })
    })
  }
}
test('CTA scrolls to the real offer and never sends a customer to a fake checkout', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('link', { name: 'Join Little Steady — $29/month', exact: true })
    .first()
    .click()
  await expect(page).toHaveURL(/#membership$/)
  await expect(
    page.getByRole('button', { name: 'Checkout opens soon' }),
  ).toBeDisabled()
  await expect(
    page.getByRole('link', { name: 'Start my membership' }),
  ).toHaveCount(0)
})
test('FAQ and policy dialogs work with a keyboard, including focus return', async ({
  page,
}) => {
  await page.goto('/')
  const question = page.getByText(
    'Is someone personally answering my messages?',
    {
      exact: true,
    },
  )
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details[open]')).toContainText(
    'the parenting companion, is AI',
  )
  const privacy = page.getByRole('button', { name: 'AI & privacy' })
  await privacy.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(privacy).toBeFocused()
})
test('desktop composition uses columns and mobile keeps a clear product reading order', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const copy = await page.locator('.hero-copy').boundingBox()
  const product = await page.locator('.hero-product').boundingBox()
  expect(copy!.x + copy!.width).toBeLessThan(product!.x)
  expect(Math.abs(copy!.y - product!.y)).toBeLessThan(180)
  expect(
    (await page.locator('header').boundingBox())!.height,
  ).toBeLessThanOrEqual(80)
  const guides = await page.locator('.guide-feature').all()
  const leftGuide = await guides[0].boundingBox()
  const rightGuide = await guides[1].boundingBox()
  expect(leftGuide!.x + leftGuide!.width).toBeLessThan(rightGuide!.x)
  await expect(page.locator('.onboarding-sequence > li')).toHaveCount(2)
  await expect(
    page.getByText('Illustrative conversation', { exact: false }),
  ).toHaveCount(1)
  await expect(page.locator('.chat-message--ai')).toHaveCount(2)
  await expect(
    page.locator('#mealtime-chat-caption').locator('..'),
  ).toContainText('Should I insist on one bite?')

  await page.setViewportSize({ width: 390, height: 844 })
  const mobileCopy = await page.locator('.hero-copy').boundingBox()
  const mobileProduct = await page.locator('.hero-product').boundingBox()
  expect(mobileCopy!.y + mobileCopy!.height).toBeLessThan(mobileProduct!.y)
  const mobileFirstGuide = await guides[0].boundingBox()
  const mobileSecondGuide = await guides[1].boundingBox()
  expect(mobileFirstGuide!.y + mobileFirstGuide!.height).toBeLessThan(
    mobileSecondGuide!.y,
  )
  await page.locator('#membership').scrollIntoViewIfNeeded()
  await expect(page.locator('.mobile-cta')).toHaveCount(0)
})

test('uses the same monthly price across the supplied offer copy', async ({
  page,
}) => {
  await page.goto('/')
  const membership = page.locator('#membership')
  await expect(membership).toContainText('$29')
  await expect(membership).toContainText('per month')
  await expect(membership).toContainText('Your first payment is $29 today.')
  await expect(membership).toContainText('renews monthly until canceled.')
  const prices =
    (await page.locator('body').innerText()).match(/\$\s*\d+(?:[.,]\d+)?/g) ||
    []
  expect(prices.length).toBeGreaterThan(0)
  expect([...new Set(prices)]).toEqual(['$29'])
  await expect(page.locator('main')).not.toContainText('€47')
  await expect(page.locator('main')).not.toContainText('€12')
  await expect(page.locator('main')).not.toContainText('planned')
  await expect(page.locator('main')).not.toContainText('proposed')
})

test('cover images load and are accessible', async ({ page }) => {
  await page.goto('/')
  for (const name of [
    'The Calmer Parenting Playbook',
    'Calmer Tantrums',
    'Calmer Mealtimes',
  ]) {
    const cover = page.getByRole('img', {
      name: `${name} — Little Steady ebook cover`,
    })
    await expect(cover).toHaveCount(1)
    for (const image of await cover.all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toBeVisible()
      expect(
        await image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      ).toBe(true)
    }
  }
})

test('the thank-you page stays a simple redirect and copies a real starter question', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  const apiRequests: string[] = []
  page.on('request', (r) => {
    if (r.url().includes('/api/')) apiRequests.push(r.url())
  })
  await page.goto('/thank-you?success=true&payment_id=fake')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Let’s make your first step simple.',
  )
  await expect(
    page.getByText('$29/month for all three guides and the AI companion'),
  ).toBeVisible()
  const first = page.locator('.starter-question').first()
  await first.getByRole('button').click()
  await expect(first.getByRole('button')).toHaveText('Copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'What can I say when my child refuses to leave the playground?',
  )
  expect(apiRequests).toEqual([])
  await expect(page.getByText('Payment verified', { exact: true })).toHaveCount(
    0,
  )
})

test('refund details preserve consumer rights without advertising a cash-back guarantee', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('#money-back-guarantee')).toHaveCount(0)
  await expect(page.locator('main')).not.toContainText('money-back')
  await expect(page.locator('#previews')).toHaveCount(0)
  await expect(page.locator('main')).not.toContainText('[Show')
  await expect(page.locator('main')).not.toContainText('[Only add')
  const offerPolicies = page.getByRole('navigation', { name: 'Offer policies' })
  const refundLink = offerPolicies.getByRole('button', {
    name: 'Refund policy',
    exact: true,
  })
  await refundLink.click()
  const policy = page.getByRole('dialog')
  await expect(policy).toContainText('your rights under consumer law')
  await expect(policy).toContainText('policy provided at checkout')
  await expect(policy).not.toContainText('full refund')
  await expect(policy).not.toContainText('14 days')
  await page.keyboard.press('Escape')
  await expect(refundLink).toBeFocused()
  await offerPolicies
    .getByRole('button', { name: 'Membership terms', exact: true })
    .click()
  await expect(page.getByRole('dialog')).toContainText('$29/month')
  await expect(page.getByRole('dialog')).toContainText('remain yours')
  await page.goto('/thank-you')
  await expect(page.locator('main')).not.toContainText('money-back')
  await expect(page.locator('.thankyou-membership')).toContainText(
    'Companion access continues through the period you’ve paid for.',
  )
})

test('all three finished guides have real public sample pages', async ({
  page,
}) => {
  await page.goto('/')
  const previews = page.getByRole('button', { name: 'Preview a page' })
  await expect(previews).toHaveCount(3)
  for (const trigger of await previews.all()) {
    await expect(trigger).toBeEnabled()
    await trigger.click()
    const img = page.getByRole('dialog').locator('img')
    await expect(img).toBeVisible()
    expect(
      await img.evaluate(
        (i: HTMLImageElement) => i.complete && i.naturalWidth > 0,
      ),
    ).toBe(true)
    await page.keyboard.press('Escape')
  }
  await expect(page.locator('body')).not.toContainText('Whop')
  await expect(page.locator('body')).not.toContainText(
    'Interior preview not available',
  )
})

test('configured page previews support zoom, keyboard close and focus return', async ({
  page,
}) => {
  // A test-only sample exercises the lightbox; it is never published as an ebook page.
  await page.route('**/src/content/previews.ts', async (route) => {
    await route.fulfill({
      contentType: 'application/javascript',
      body: 'export const guidePreviews = { tantrums: { src: "/test-only-excerpt.svg", alt: "Test-only excerpt fixture", width: 600, height: 800, transcript: "Test-only preview text." }, mealtimes: null }',
    })
  })
  await page.route('**/test-only-excerpt.svg', async (route) => {
    await route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="600" height="800" fill="#fffdf8"/><text x="40" y="80" font-size="24">Test-only page fixture</text></svg>',
    })
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const trigger = page
    .locator('.guide-feature')
    .first()
    .getByRole('button', { name: 'Preview a page' })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Zoom in', exact: true }).click()
  await expect(dialog.getByRole('status')).toHaveText('125%')
  await dialog.getByRole('button', { name: 'Zoom out', exact: true }).click()
  await expect(dialog.getByRole('status')).toHaveText('100%')
  await dialog.getByText('Read preview as text', { exact: true }).click()
  await expect(
    dialog.getByText('Test-only preview text.', { exact: true }),
  ).toBeVisible()
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await dialog.getByRole('button', { name: 'Close preview' }).focus()
  await page.keyboard.press('Tab')
  expect(
    await page.evaluate(() => !!document.activeElement?.closest('dialog')),
  ).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.getByRole('button', { name: 'Close preview' }).click()
  await expect(trigger).toBeFocused()
})

test('parents encounter the problem and better approach before the product offer', async ({
  page,
}) => {
  await page.goto('/')
  const hero = page.locator('#hero')
  await expect(hero).toContainText('You want to stay calm.')
  await expect(hero).toContainText(
    'But the same battles keep wearing you down.',
  )
  await expect(hero).not.toContainText('$29')
  await expect(hero).not.toContainText('Explore the playbook')
  await expect(hero).not.toContainText('Join Little Steady')
  await expect(hero.getByRole('link')).toHaveCount(0)
  const ids = await page
    .locator('main > section')
    .evaluateAll((sections) => sections.map((s) => s.id))
  expect(ids.indexOf('familiar')).toBeLessThan(ids.indexOf('better-way'))
  expect(ids.indexOf('better-way')).toBeLessThan(ids.indexOf('included'))
  expect(ids.indexOf('included')).toBeLessThan(ids.indexOf('membership'))
  await expect(page.locator('#membership')).toContainText('$29')
})

test('header menu offers legal information and support without page shortcuts', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Open menu', exact: true })
  await expect(page.locator('header a')).toHaveCount(1)
  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await page.screenshot({ path: 'test-results/menu-390.png' })
  await expect(
    dialog.getByRole('link', { name: /included|different way|offer/i }),
  ).toHaveCount(0)
  await dialog
    .getByRole('button', { name: 'Privacy information', exact: true })
    .click()
  await expect(dialog).toContainText('Meta provides Messenger')
  await dialog
    .getByRole('button', { name: 'Back to menu', exact: true })
    .click()
  await dialog
    .getByRole('button', { name: 'Membership terms', exact: true })
    .click()
  await expect(dialog).toContainText('$29/month')
  await dialog
    .getByRole('button', { name: 'Back to menu', exact: true })
    .click()
  await dialog
    .getByRole('button', { name: 'Refunds & cancellation', exact: true })
    .click()
  await expect(dialog).toContainText('all three guides')
  await dialog
    .getByRole('button', { name: 'Back to menu', exact: true })
    .click()
  await dialog
    .getByRole('button', { name: 'Contact & support', exact: true })
    .click()
  await expect(dialog).toContainText('purchase confirmation or receipt')
  await expect(dialog.locator('a[href^="mailto:"]')).toHaveCount(0)
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.keyboard.press('Tab')
  expect(
    await page.evaluate(() => !!document.activeElement?.closest('dialog')),
  ).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  await page.getByRole('button', { name: 'Close menu', exact: true }).click()
  await expect(trigger).toBeFocused()
})

test('phone reading layout keeps the introduction compact and touch controls usable', async ({
  page,
}) => {
  for (const width of [320, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const copy = await page.locator('.hero-copy').boundingBox()
    expect(copy!.y + copy!.height).toBeLessThan(700)
    const h1 = await page.locator('#hero-heading').boundingBox()
    expect(h1!.width).toBeGreaterThan(width - 60)
    const menu = await page
      .getByRole('button', { name: 'Open menu', exact: true })
      .boundingBox()
    expect(menu!.height).toBeGreaterThanOrEqual(44)
    expect(menu!.width).toBeGreaterThanOrEqual(44)
    const art = await page.locator('.playbook-art').boundingBox()
    const title = await page.locator('#playbook-title').boundingBox()
    expect(art!.x + art!.width).toBeLessThan(title!.x)
    if (width === 390)
      await page
        .locator('.playbook-feature')
        .screenshot({ path: 'test-results/playbook-phone.png' })
    await expect(page.locator('#hero').getByRole('link')).toHaveCount(0)
  }
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Close menu', exact: true }),
  ).toBeInViewport()
  await page.keyboard.press('Escape')
})

test('visitors learn a practical boundary and see specific illustrative meal support', async ({
  page,
}) => {
  await page.goto('/')
  const practice = page.locator('#better-way')
  await expect(practice).toContainText('Three parts to a clearer boundary.')
  await expect(practice).toContainText(
    'You want to keep playing. It’s time to go home.',
  )
  await expect(practice).toContainText('If they still cry:')
  await expect(practice).toContainText('pages 12 and 17')
  const companion = page.locator('#companion')
  await expect(companion).not.toContainText('not a human coach')
  await expect(companion).toContainText('Illustrative conversation')
  await expect(companion).toContainText('AI parenting companion')
  await expect(companion).toContainText('What do they usually accept')
  await expect(companion).toContainText('sauce separate')
  await expect(companion).toContainText(
    'pediatrician or a feeding professional',
  )
  await expect(page.locator('footer')).toContainText(
    'Mila is AI, not a human coach.',
  )
  await page.setViewportSize({ width: 390, height: 844 })
  await page
    .locator('.practice-example')
    .screenshot({ path: 'test-results/practice-phone.png' })
  await page
    .locator('#companion .chat-panel')
    .screenshot({ path: 'test-results/chat-phone.png' })
})

test('tantrum campaign visitors see the script, featured guide and membership in order', async ({
  page,
}) => {
  for (const url of [
    '/tantrums',
    '/tantrums/',
    '/tantrums?utm_campaign=tantrums&utm_content=playground',
  ]) {
    await page.goto(url)
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'It’s time to leave the park.',
    )
    await expect(page).toHaveTitle(/Calmer Tantrums/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Calmer Tantrums/,
    )
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.locator('#hero').getByRole('link')).toHaveCount(0)
  await expect(page.locator('#better-way blockquote')).toContainText(
    'You want to keep playing.',
  )
  const headings = await page.locator('#included article h3').allTextContents()
  expect(headings).toEqual([
    'Calmer Tantrums',
    'The Calmer Parenting Playbook',
    'Calmer Mealtimes',
  ])
  const sections = await page
    .locator('main > section')
    .evaluateAll((items) => items.map((item) => item.id))
  expect(sections.indexOf('better-way')).toBeLessThan(
    sections.indexOf('included'),
  )
  expect(sections.indexOf('included')).toBeLessThan(
    sections.indexOf('companion'),
  )
  expect(sections.indexOf('companion')).toBeLessThan(
    sections.indexOf('membership'),
  )
  await expect(page.locator('#companion')).toContainText(
    'What if they still won’t leave?',
  )

  const preview = page
    .locator('#included article')
    .first()
    .getByRole('button', { name: 'Preview a page' })
  await preview.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading')).toContainText('Calmer Tantrums')
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(preview).toBeFocused()

  await expect(page.locator('#membership')).toContainText('$29')
  await expect(
    page.getByRole('button', { name: 'Checkout opens soon' }),
  ).toBeDisabled()
  await page
    .getByText('What if my child still gets upset?', { exact: true })
    .click()
  await expect(page.locator('#questions details[open]')).toContainText(
    'A clear limit can still be disappointing.',
  )
})
