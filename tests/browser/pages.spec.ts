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
    .getByRole('link', { name: 'Get Little Steady — €37/month', exact: true })
    .first()
    .click()
  await expect(page).toHaveURL(/#membership$/)
  await expect(
    page.getByRole('button', { name: 'Checkout opens soon' }),
  ).toBeDisabled()
  await expect(
    page.getByRole('link', { name: /Join Little Steady/ }),
  ).toHaveCount(0)
})
test('FAQ and policy dialogs work with a keyboard, including focus return', async ({
  page,
}) => {
  await page.goto('/')
  const question = page.getByText('Is it a real person?', {
    exact: true,
  })
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details[open]')).toContainText('AI chatbot')
  const privacy = page.getByRole('button', { name: 'AI & privacy' })
  await privacy.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(privacy).toBeFocused()
})
test('mobile sticky offer appears after the hero and hides at the pricing section', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(
    page.getByRole('complementary', { name: 'Little Steady membership' }),
  ).toHaveCount(0)
  await page.locator('#included').scrollIntoViewIfNeeded()
  await expect(
    page.getByRole('complementary', { name: 'Little Steady membership' }),
  ).toBeVisible()
  await page.locator('#membership').scrollIntoViewIfNeeded()
  await expect(
    page.getByRole('complementary', { name: 'Little Steady membership' }),
  ).toHaveCount(0)
})

test('presents one monthly price without the previous upfront or add-on fees', async ({
  page,
}) => {
  await page.goto('/')
  const membership = page.locator('#membership')
  await expect(membership).toContainText('€37')
  await expect(membership).toContainText('EUR / month')
  await expect(membership).toContainText('Renews monthly until cancelled.')
  await expect(membership).toContainText('No joining fee')
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
    await expect(cover).toBeVisible()
    expect(
      await cover.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    ).toBe(true)
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
    page.getByText('€37/month for both ebooks and the AI helper'),
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
