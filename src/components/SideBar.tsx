

import { Button } from '../components/Button';

import '../styles/sidebar.scss';
import { useContent } from '../hooks/useContent';

export function SideBar() {
  const { genres, handleClickButton, selectedGenreId } = useContent();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}