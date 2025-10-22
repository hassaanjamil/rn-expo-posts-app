import { Colors } from '../Colors';

describe('Colors constant', () => {
  it('exposes matching keys for light and dark themes', () => {
    expect(Object.keys(Colors.light)).toEqual([
      'text',
      'background',
      'border',
      'tint',
      'icon',
      'tabIconDefault',
      'tabIconSelected',
    ]);

    expect(Object.keys(Colors.dark)).toEqual([
      'text',
      'background',
      'border',
      'tint',
      'icon',
      'tabIconDefault',
      'tabIconSelected',
    ]);
  });

  it('uses matching tint colors for tab selection', () => {
    expect(Colors.light.tint).toBe(Colors.light.tabIconSelected);
    expect(Colors.dark.tint).toBe(Colors.dark.tabIconSelected);
  });
});
