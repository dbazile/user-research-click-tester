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
    tasks: []
  };
}
