import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [360, 390, 768, 1440]) {
  for (const route of ['/', '/thank-you']) {
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
        path: `test-results/${route === '/' ? 'sales' : 'thank-you'}-${width}.png`,
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
    .getByRole('link', { name: 'Join Little Steady — €37/month', exact: true })
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
    'The parenting companion is AI',
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
  await expect(page.locator('.onboarding-sequence > li')).toHaveCount(3)
  await expect(
    page.getByText('Illustrative conversation', { exact: false }),
  ).toHaveCount(2)
  await expect(page.locator('.chat-message--ai')).toHaveCount(2)
  await expect(
    page.locator('#mealtime-chat-caption').locator('..'),
  ).toContainText('What could I say if they ask for a different dinner?')

  await page.setViewportSize({ width: 390, height: 844 })
  const mobileCopy = await page.locator('.hero-copy').boundingBox()
  const mobileProduct = await page.locator('.hero-product').boundingBox()
  const chat = await page.locator('.hero-product .chat-panel').boundingBox()
  const covers = await page.locator('.hero-cover-pair').boundingBox()
  expect(mobileCopy!.y + mobileCopy!.height).toBeLessThan(mobileProduct!.y)
  expect(chat!.y + chat!.height).toBeLessThan(covers!.y)
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
  await expect(membership).toContainText('€37')
  await expect(membership).toContainText('per month')
  await expect(membership).toContainText('Your first payment is €37 today.')
  await expect(membership).toContainText('renews monthly until cancelled.')
  const prices =
    (await page.locator('body').innerText()).match(/€\s*\d+(?:[.,]\d+)?/g) || []
  expect(prices.length).toBeGreaterThan(0)
  expect([...new Set(prices)]).toEqual(['€37'])
  await expect(page.locator('main')).not.toContainText('€47')
  await expect(page.locator('main')).not.toContainText('€12')
  await expect(page.locator('main')).not.toContainText('planned')
  await expect(page.locator('main')).not.toContainText('proposed')
})

test('cover images load and are accessible', async ({ page }) => {
  await page.goto('/')
  for (const name of ['Calmer Tantrums', 'Calmer Mealtimes']) {
    const cover = page.getByRole('img', {
      name: `${name} — Little Steady ebook cover`,
    })
    await expect(cover).toHaveCount(2)
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
    page.getByText('€37/month for both ebooks and the AI companion'),
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
  await expect(page.getByRole('dialog')).toContainText('€37/month')
  await expect(page.getByRole('dialog')).toContainText('remain yours')
  await page.goto('/thank-you')
  await expect(page.locator('main')).not.toContainText('money-back')
  await expect(page.locator('.thankyou-membership')).toContainText(
    'Companion access continues through the period you’ve paid for.',
  )
})

test('missing real guide pages have an honest preview-availability state', async ({
  page,
}) => {
  await page.goto('/')
  await expect(
    page.getByRole('button', { name: 'Preview a page' }),
  ).toHaveCount(2)
  for (const trigger of await page
    .getByRole('button', { name: 'Preview a page' })
    .all()) {
    await expect(trigger).toBeDisabled()
  }
  await expect(
    page.getByText('Interior preview not available yet.'),
  ).toHaveCount(2)
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
