/** Individual public samples from the owner-supplied finished PDFs. */
export type GuideKind = 'parenting' | 'tantrums' | 'mealtimes'
export interface EbookPreview {
  src: string
  alt: string
  width: number
  height: number
  transcript: string
}
export const guidePreviews: Record<GuideKind, EbookPreview | null> = {
  parenting: {
    src: '/previews/parenting.webp',
    alt: 'The Calmer Parenting Playbook: original sample page 4',
    width: 1191,
    height: 1684,
    transcript:
      'LITTLE STEADY\nBEGIN HERE\nYour first day\nChoose one recurring situation with a small, observable goal. "Put one shoe beside the\ndoor after a reminder" gives you something to notice. "Be good all morning" does not tell\neither of you what to do.\nBefore the difficult moment\nCheck whether hunger, tiredness, pain, noise, or a task that is too difficult may be\ncontributing. Prepare what you need. Decide which limit matters and which details can be\nflexible. Predictable routines and clear directions are useful foundations. [5,9,18]\nFor shoe time, put the shoes where your child can reach them. Start earlier if possible.\nDecide whether today is a day to practise putting them on or a day when you will provide\nmore help.\nDuring the moment\nGet close enough to be heard without crowding your child. Give one clear direction:\n"Bring your shoes to the mat." Pause and check understanding. Point or demonstrate if\nthat helps. If the task is manageable, help your child start and notice their effort. [5]\nIf distress rises, reduce the talking and deal with safety first. You can acknowledge a\nfeeling while keeping a necessary limit: "You want to keep playing. We are leaving. I will\nhelp with your shoes." [8]\nAfter the moment\nRecord one fact: "I gave one direction and pointed. She brought one shoe; I helped with\nthe other." This is more useful than "She never listens." Later, practise the smallest\nmissing skill when nobody is rushing.\nTonight\nAsk yourself: Was the request understandable? Was it realistic? What helped even a\nlittle? Choose just one change for tomorrow. Keep ordinary affection, food, rest, and\nconnection available regardless of how the practice went.\nA first success might be less adult arguing or a safer transition, even if your\nchild still protests.\nTHE CALMER PARENTING PLAYBOOK\n4\n',
  },
  tantrums: {
    src: '/previews/tantrums.webp',
    alt: 'Calmer Tantrums: original sample page 3',
    width: 1080,
    height: 1512,
    transcript:
      'QUICK START\nCALMER TANTRUMS 03\nWhat to do during the next tantrum\nKeep safe. Say less. Support. Teach later.\n1 / Make the space safe\nMove hazards and other children away. If necessary, move to a safer place. Stay close\nenough to supervise. Stop hitting or biting by creating space and blocking contact as safely as\npossible. Do not hold a child down to make them calm.\n2 / Lower your own volume\nPause before speaking. Relax your hands and take a slow breath if that helps you. You do not\nhave to feel peaceful to speak more quietly.\n3 / Use one short message\nTry: "You wanted more time. The tablet is finished. I\'m here." Match your words to the child\'s\nunderstanding. For a child with very little language, "All done. Here with you" may be enough.\n4 / Offer support without bargaining\nStay nearby. Offer a hug if welcome, or give space while supervising. Reduce noise and\ndemands if the child seems overwhelmed. Address hunger, pain, or other genuine needs.\nKeep a reasonable limit, unless new information shows it should change.\n5 / Wait for readiness, then teach one thing\nWhen your child can engage again, reconnect. Briefly practise the next useful action: asking\nfor help, handing over the tablet, or placing a toy down. Return to the routine with help if\nneeded.\nYou can comfort a child and still keep a limit. You do not have to make them stop feeling\nupset before you move forward.\nSources: [1], [2], [3], [4]. The five-part layout is an editorial memory aid, not a validated\nprotocol.\n',
  },
  mealtimes: {
    src: '/previews/mealtimes.webp',
    alt: 'Calmer Mealtimes: original sample page 3',
    width: 1080,
    height: 1512,
    transcript:
      'QUICK START\nCALMER MEALTIMES 03\nWhat to do at the next meal\nOffer food. Lower pressure. Notice what happens.\nBefore the meal\nChoose an achievable time and a safe seated setting. Offer a manageable selection that\nincludes something your child usually accepts, prepared in a familiar, safe way. A familiar\noption is an opportunity to eat, not a promise that they will eat today.\nServe a small amount of less familiar food if your child can tolerate it nearby. A separate little\ndish can be an option. Do not put it on their plate as a surprise if that makes the entire meal\ninaccessible.\nWhen they say no\nTry: "You don\'t have to eat that. Here is what we have." Avoid repeated bite requests, threats,\nor trading dessert for vegetables. You can keep an ordinary meal structure and still respond\nwith kindness.\nIf they eat only the familiar food\nLet the meal continue without a lecture about the rest. Consider patterns across days rather\nthan judging the child by one plate. A nutritionally narrow pattern still deserves assessment;\ncalm meals alone do not establish nutritional adequacy.\nIf they seem uncomfortable or distressed\nCheck for pain, illness, fatigue, an overwhelming smell, an unexpected texture, or a task\nbeyond their skills. Reduce pressure. Do not use hunger to force acceptance.\nAfterward\nEnd the meal respectfully and clean up. Keep normal eating opportunities available; do not\nskip food as punishment. Write down one useful observation rather than counting every bite.\nStart with one change: stop one repeated pressure phrase and include a familiar food.\nSeek help sooner if intake or safety is uncertain.\nSources: [1], [2], [3]. This layout is an editorial memory aid.\n',
  },
}
