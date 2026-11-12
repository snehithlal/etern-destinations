import hills from '../assets/images/hills.jpg';
import cottage from '../assets/images/cottage.jpg';
import room from '../assets/images/room.jpg';
import forest from '../assets/images/forest.jpg';
import morning from '../assets/images/morning.jpg';
import tea from '../assets/images/tea.jpg';

// All photos are mood-board placeholders, not photographs of this property.
export const photos = {
  hills: { src: hills, alt: 'Layers of green hills beneath a misty sky — inspiration photograph', caption: 'A little closer to nature', category: 'Surroundings' },
  cottage: { src: cottage, alt: 'A secluded cabin surrounded by trees — inspiration photograph', caption: 'Room to slow down', category: 'The stay' },
  room: { src: room, alt: 'A warm, light-filled bedroom — inspiration photograph', caption: 'Unhurried mornings', category: 'The stay' },
  forest: { src: forest, alt: 'Sunlight filtering through a green forest — inspiration photograph', caption: 'Take the scenic route', category: 'Surroundings' },
  morning: { src: morning, alt: 'A quiet landscape in soft morning light — inspiration photograph', caption: 'Let the day unfold', category: 'Surroundings' },
  tea: { src: tea, alt: 'Green tea-growing hills — inspiration photograph', caption: 'A different shade of green', category: 'Surroundings' },
};
export const gallery = Object.values(photos);
