const SERIALIZATION_KEY = 'state'

export function clear() {
  sessionStorage.clear();
}

export function deserialize() {
  console.debug('@store deserialize');
  const serialized = sessionStorage.getItem(SERIALIZATION_KEY);
  if (serialized) {
    try {
      return JSON.parse(serialized);
    } catch (error) {
      console.warn('Deserialization failed');
    }
  }
  return generateState();
}

export function serialize(state) {
  console.debug('@store serialize', state);
  sessionStorage.setItem(SERIALIZATION_KEY, JSON.stringify(state));
}

//
// Internals
//

function generateState() {
  console.debug('@store generateState');
  return {
    comments: '',
    tasks: [
      {
        "id": "alpha",
        "name": "Click any one of the purple boxes",
        "instructions": "Demonstration of landscape orientation",
        "url": "/test/fixtures/desktop.png"
      },
      {
        "id": "bravo",
        "name": "Again, click anywhere you want",
        "instructions": "Demo of portrait orientation",
        "url": "/test/fixtures/purple-boxes.png"
      },
      {
        "id": "charlie",
        "name": "Green Boxes",
        "instructions": "Demo of portrait orientation",
        "url": "/test/fixtures/green-boxes.png"
      }
    ]
  };
}
