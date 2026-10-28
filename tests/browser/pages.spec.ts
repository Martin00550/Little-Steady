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
    .getByRole('link', { name: 'See the guide bundle', exact: true })
    .first()
    .click()
  await expect(page).toHaveURL(/#offers$/)
  await expect(
    page.getByRole('button', { name: 'Guide bundle coming soon' }),
  ).toBeDisabled()
  await expect(page.getByRole('link', { name: /Get both ebooks/ })).toHaveCount(
    0,
  )
})
test('FAQ and policy dialogs work with a keyboard, including focus return', async ({
  page,
}) => {
  await page.goto('/')
  const question = page.getByText('Is the parenting helper a person?', {
    exact: true,
  })
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details[open]')).toContainText('It is AI')
  const privacy = page.getByRole('button', { name: 'Privacy & AI' })
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
    page.getByRole('complementary', { name: 'Guide bundle' }),
  ).toHaveCount(0)
  await page.locator('#included').scrollIntoViewIfNeeded()
  await expect(
    page.getByRole('complementary', { name: 'Guide bundle' }),
  ).toBeVisible()
  await page.locator('#offers').scrollIntoViewIfNeeded()
  await expect(
    page.getByRole('complementary', { name: 'Guide bundle' }),
  ).toHaveCount(0)
})

test('separates books-only payment from the combined first charge and renewals', async ({
  page,
}) => {
  await page.goto('/')
  const books = page.locator('#guide-offer')
  await expect(books).toContainText('€47.00')
  await expect(books).toContainText('No recurring book payments')
  await expect(books).not.toContainText('/ month')
  const combined = page.locator('#chatbot-offer')
  await expect(combined).toContainText('€59.99')
  await expect(combined).toContainText('EUR today')
  await expect(combined).toContainText('Then €12.99 EUR/month from month two')
  await expect(
    page.getByRole('button', { name: 'Guides + helper coming soon' }),
  ).toBeDisabled()
})
