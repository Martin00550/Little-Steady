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
    text: 'Dinner is on the table and my child says, “I don’t like it.” Where do I start?',
  },
  {
    speaker: 'Little Steady AI',
    text: 'Try keeping your reply brief: “You don’t have to eat it.” If there’s a familiar food on the table, you can point it out without asking for a taste. Choose one small change for the next meal rather than trying to change everything tonight.',
  },
  {
    speaker: 'Parent',
    text: 'What could I say if they ask for a different dinner?',
  },
]
