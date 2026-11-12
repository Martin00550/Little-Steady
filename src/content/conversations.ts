export interface ChatMessage {
  speaker: 'Parent' | 'Little Steady AI'
  text: string
}
/** Editorial examples of the owner-supplied guide topics. Not tested chatbot output. */
export const playgroundExample: ChatMessage[] = [
  {
    speaker: 'Parent',
    text: 'We need to leave the playground. What could I say?',
  },
  {
    speaker: 'Little Steady AI',
    text: 'Try: “You want to stay. It’s time to go home. Would you like to walk beside me or hold my hand?” Keep the limit simple and offer only choices you can follow through on.',
  },
]
export const mealtimeExample: ChatMessage[] = [
  {
    speaker: 'Parent',
    text: 'My child refuses dinner and asks for snacks. I’m worried they’ll go to bed hungry. Do I cook something else?',
  },
  {
    speaker: 'Little Steady AI',
    text: 'Start with making dinner manageable, rather than negotiating bites.\n\n• Include something they usually eat—plain pasta alongside the sauce, for example.\n• Try: “Here is dinner. There is food you usually like.”\n• If they’re hungry later, a predictable bedtime snack can be part of the routine. Don’t make them earn it by eating dinner.\n\nWhat do they usually accept, and is anything different about how it’s served tonight?',
  },
  {
    speaker: 'Parent',
    text: 'They eat plain pasta, but refuse it if sauce touches it. Should I insist on one bite?',
  },
  {
    speaker: 'Little Steady AI',
    text: 'Try keeping some pasta plain and the sauce separate. If they tolerate a small sauce dish nearby, that can be an opportunity to explore—there’s no need to demand a taste.\n\nYou could say: “You want them separate. Here is the plain pasta.”\n\nNotice comfort and what they can eat, rather than counting bites. If their diet keeps shrinking, eating hurts, or growth worries you, get advice from their pediatrician or a feeding professional.',
  },
]

export const tantrumExample: ChatMessage[] = [
  {
    speaker: 'Parent',
    text: 'We need to leave the park, but my child wants another turn on the slide. What can I say?',
  },
  {
    speaker: 'Little Steady AI',
    text: 'Try: “You want to keep playing. It’s time to go home. I’ll help you say goodbye to the slide.” Then pause and give them a moment to take it in.',
  },
  {
    speaker: 'Parent',
    text: 'What if they still won’t leave?',
  },
  {
    speaker: 'Little Steady AI',
    text: 'Keep the limit and make the next step small. Try: “It’s time to go. I’m here with you.” Stay close, keep everyone safe, and offer a hand or point toward the gate if that helps. It’s okay for them to feel disappointed while you help them leave.',
  },
]
