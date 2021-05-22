import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';


interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}
  
interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

interface ContentProviderProps {
    children: ReactNode;
}

interface ContentContextData {
    genres: GenreResponseProps[];
    selectedGenreId: number;
    selectedGenre: GenreResponseProps;
    handleClickButton: (id: number) => void;
    movies: MovieProps[];
}

const ContentContext = createContext<ContentContextData>( {} as ContentContextData );

export function ContentProvider({ children }: ContentProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <ContentContext.Provider value={{ genres, selectedGenreId, selectedGenre, handleClickButton, movies}}>
            { children }
        </ContentContext.Provider>
    )
}

export function useContent() {
    const context = useContext(ContentContext);

    return context;
}