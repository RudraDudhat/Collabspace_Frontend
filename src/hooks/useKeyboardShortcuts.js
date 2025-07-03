import { useEffect } from 'react';

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, metaKey, ctrlKey, shiftKey, altKey } = event;
      
      shortcuts.forEach(({ keys, action, preventDefault = true }) => {
        const [modifier, ...keySequence] = keys;
        
        let modifierPressed = false;
        
        switch (modifier) {
          case 'cmd':
          case 'meta':
            modifierPressed = metaKey;
            break;
          case 'ctrl':
            modifierPressed = ctrlKey;
            break;
          case 'shift':
            modifierPressed = shiftKey;
            break;
          case 'alt':
            modifierPressed = altKey;
            break;
          default:
            // If no modifier specified, check if the key matches
            if (modifier === key.toLowerCase()) {
              modifierPressed = true;
              keySequence.unshift(modifier);
            }
        }
        
        if (modifierPressed && keySequence.includes(key.toLowerCase())) {
          if (preventDefault) {
            event.preventDefault();
          }
          action(event);
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};

export default useKeyboardShortcuts;